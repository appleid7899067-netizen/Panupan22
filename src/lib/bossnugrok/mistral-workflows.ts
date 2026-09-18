/**
 * Mistral Workflows Integration
 * เชื่อมต่อ Mistral API สำหรับ multi-step workflows
 */

import axios, { AxiosInstance } from 'axios';

interface WorkflowStep {
  id: string;
  name: string;
  model: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

interface WorkflowConfig {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  conditions?: Record<string, any>;
}

interface WorkflowExecution {
  id: string;
  configId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  results: Record<string, any>;
  errors?: string[];
  startedAt: Date;
  completedAt?: Date;
}

export class MistralWorkflows {
  private client: AxiosInstance;
  private apiKey: string;
  private workflows: Map<string, WorkflowConfig> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: 'https://api.mistral.ai/v1',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * สร้าง workflow configuration ใหม่
   */
  createWorkflow(config: WorkflowConfig): string {
    const id = config.id || `workflow_${Date.now()}`;
    this.workflows.set(id, {
      ...config,
      id,
    });
    return id;
  }

  /**
   * รัน workflow แบบลำดับ (sequential execution)
   */
  async executeWorkflow(
    workflowId: string,
    context: Record<string, any> = {}
  ): Promise<WorkflowExecution> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    const executionId = `exec_${Date.now()}`;
    const execution: WorkflowExecution = {
      id: executionId,
      configId: workflowId,
      status: 'running',
      results: {},
      errors: [],
      startedAt: new Date(),
    };

    this.executions.set(executionId, execution);

    try {
      let currentContext = { ...context };

      for (const step of workflow.steps) {
        try {
          // แทนที่ placeholders ในPrompt ด้วย context ปัจจุบัน
          const resolvedPrompt = this.resolvePrompt(step.prompt, currentContext);

          // เรียก Mistral API
          const response = await this.client.post('/chat/completions', {
            model: step.model || 'mistral-large-latest',
            messages: [
              {
                role: 'user',
                content: resolvedPrompt,
              },
            ],
            temperature: step.temperature || 0.7,
            max_tokens: step.maxTokens || 1024,
          });

          const result = response.data.choices[0].message.content;
          execution.results[step.id] = result;
          currentContext[step.id] = result;

          console.log(`✅ Step ${step.name} completed`);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          execution.errors?.push(`Step ${step.name} failed: ${errorMsg}`);
          console.error(`❌ Step ${step.name} failed:`, error);

          // ถ้า fail ให้ stop workflow
          break;
        }
      }

      execution.status = execution.errors?.length ? 'failed' : 'completed';
      execution.completedAt = new Date();
    } catch (error) {
      execution.status = 'failed';
      execution.errors?.push(error instanceof Error ? error.message : String(error));
      execution.completedAt = new Date();
    }

    return execution;
  }

  /**
   * รัน workflow แบบ parallel (บาง steps)
   */
  async executeWorkflowParallel(
    workflowId: string,
    parallelStepIds: string[],
    context: Record<string, any> = {}
  ): Promise<WorkflowExecution> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    const executionId = `exec_${Date.now()}`;
    const execution: WorkflowExecution = {
      id: executionId,
      configId: workflowId,
      status: 'running',
      results: {},
      errors: [],
      startedAt: new Date(),
    };

    const parallelSteps = workflow.steps.filter((s) =>
      parallelStepIds.includes(s.id)
    );

    try {
      const promises = parallelSteps.map((step) =>
        this.executeStep(step, context).then((result) => ({
          stepId: step.id,
          result,
        }))
      );

      const results = await Promise.all(promises);

      results.forEach(({ stepId, result }) => {
        execution.results[stepId] = result;
      });

      execution.status = 'completed';
    } catch (error) {
      execution.status = 'failed';
      execution.errors?.push(error instanceof Error ? error.message : String(error));
    }

    execution.completedAt = new Date();
    return execution;
  }

  /**
   * Execute single step
   */
  private async executeStep(
    step: WorkflowStep,
    context: Record<string, any>
  ): Promise<string> {
    const resolvedPrompt = this.resolvePrompt(step.prompt, context);

    const response = await this.client.post('/chat/completions', {
      model: step.model || 'mistral-large-latest',
      messages: [
        {
          role: 'user',
          content: resolvedPrompt,
        },
      ],
      temperature: step.temperature || 0.7,
      max_tokens: step.maxTokens || 1024,
    });

    return response.data.choices[0].message.content;
  }

  /**
   * แทนที่ placeholders เช่น {{key}} ด้วยค่า context
   */
  private resolvePrompt(prompt: string, context: Record<string, any>): string {
    let resolved = prompt;
    Object.entries(context).forEach(([key, value]) => {
      resolved = resolved.replace(
        new RegExp(`{{${key}}}`, 'g'),
        String(value)
      );
    });
    return resolved;
  }

  /**
   * ดู workflow execution
   */
  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  /**
   * List all workflows
   */
  listWorkflows(): WorkflowConfig[] {
    return Array.from(this.workflows.values());
  }

  /**
   * Delete workflow
   */
  deleteWorkflow(workflowId: string): boolean {
    return this.workflows.delete(workflowId);
  }

  /**
   * Export workflow as JSON
   */
  exportWorkflow(workflowId: string): string {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }
    return JSON.stringify(workflow, null, 2);
  }

  /**
   * Import workflow from JSON
   */
  importWorkflow(json: string): string {
    const config = JSON.parse(json) as WorkflowConfig;
    return this.createWorkflow(config);
  }
}

// Export singleton instance builder
export function createMistralWorkflows(apiKey: string): MistralWorkflows {
  return new MistralWorkflows(apiKey);
}
