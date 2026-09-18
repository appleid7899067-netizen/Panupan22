/**
 * Sandbox Runtime - Execute code safely in multiple languages
 * รองรับ JavaScript, Python, TypeScript, Bash, SQL, etc.
 */

import { exec, spawn } from 'child_process';
import { writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface SandboxConfig {
  timeout?: number; // milliseconds
  maxMemory?: number; // MB
  allowNetworking?: boolean;
  allowFileSystem?: boolean;
  tempDir?: string;
}

export interface ExecutionResult {
  language: string;
  code: string;
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  success: boolean;
  error?: string;
}

export type SupportedLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'bash'
  | 'sql'
  | 'html'
  | 'css'
  | 'java'
  | 'go'
  | 'rust'
  | 'php';

interface LanguageRuntime {
  name: SupportedLanguage;
  extension: string;
  command: string;
  setup?: string; // commands to run before execution
  timeout: number;
}

export class SandboxRuntime {
  private config: SandboxConfig;
  private tempDir: string;
  private runtimes: Map<SupportedLanguage, LanguageRuntime> = new Map();
  private executions: Map<string, ExecutionResult> = new Map();

  constructor(config: SandboxConfig = {}) {
    this.config = {
      timeout: 30000, // 30 seconds default
      maxMemory: 512, // 512MB default
      allowNetworking: false,
      allowFileSystem: true,
      tempDir: '/tmp/bossnugrok-sandbox',
      ...config,
    };

    this.tempDir = this.config.tempDir!;

    // สร้าง temp directory
    if (!existsSync(this.tempDir)) {
      mkdirSync(this.tempDir, { recursive: true });
    }

    // Initialize runtimes
    this.initializeRuntimes();
  }

  /**
   * สร้างรายการ runtimes ที่ support
   */
  private initializeRuntimes(): void {
    this.runtimes.set('javascript', {
      name: 'javascript',
      extension: '.js',
      command: 'node',
      timeout: 30000,
    });

    this.runtimes.set('typescript', {
      name: 'typescript',
      extension: '.ts',
      command: 'npx ts-node',
      setup: 'npm install -g ts-node',
      timeout: 30000,
    });

    this.runtimes.set('python', {
      name: 'python',
      extension: '.py',
      command: 'python3',
      timeout: 30000,
    });

    this.runtimes.set('bash', {
      name: 'bash',
      extension: '.sh',
      command: 'bash',
      timeout: 30000,
    });

    this.runtimes.set('sql', {
      name: 'sql',
      extension: '.sql',
      command: 'sqlite3',
      timeout: 30000,
    });

    this.runtimes.set('html', {
      name: 'html',
      extension: '.html',
      command: 'cat', // สำหรับแสดง HTML (ใช้กับ browser)
      timeout: 5000,
    });

    this.runtimes.set('css', {
      name: 'css',
      extension: '.css',
      command: 'cat',
      timeout: 5000,
    });

    this.runtimes.set('java', {
      name: 'java',
      extension: '.java',
      command: 'java',
      setup: 'javac',
      timeout: 60000,
    });

    this.runtimes.set('go', {
      name: 'go',
      extension: '.go',
      command: 'go run',
      timeout: 30000,
    });

    this.runtimes.set('rust', {
      name: 'rust',
      extension: '.rs',
      command: 'rustc',
      timeout: 60000,
    });

    this.runtimes.set('php', {
      name: 'php',
      extension: '.php',
      command: 'php',
      timeout: 30000,
    });
  }

  /**
   * Execute code ใน sandbox
   */
  async execute(
    code: string,
    language: SupportedLanguage,
    metadata?: { agentId?: string; workflowId?: string }
  ): Promise<ExecutionResult> {
    const runtime = this.runtimes.get(language);
    if (!runtime) {
      throw new Error(`Language ${language} not supported`);
    }

    const startTime = Date.now();
    const filename = join(this.tempDir, `script_${Date.now()}${runtime.extension}`);

    try {
      // เขียนโค้ดลง file
      writeFileSync(filename, code, 'utf-8');

      // Execute code
      const result = await this.executeFile(filename, runtime, language);
      const executionTime = Date.now() - startTime;

      const execution: ExecutionResult = {
        language,
        code,
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.exitCode,
        executionTime,
        success: result.exitCode === 0,
      };

      // บันทึก execution
      const executionId = `exec_${Date.now()}`;
      this.executions.set(executionId, execution);

      return execution;
    } catch (error) {
      return {
        language,
        code,
        stdout: '',
        stderr: error instanceof Error ? error.message : String(error),
        exitCode: 1,
        executionTime: Date.now() - startTime,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    } finally {
      // ล้าง temp file
      try {
        unlinkSync(filename);
      } catch {}
    }
  }

  /**
   * Execute JavaScript code with additional context
   */
  async executeJavaScriptWithContext(
    code: string,
    context: Record<string, any> = {}
  ): Promise<ExecutionResult> {
    const wrappedCode = `
(async () => {
  ${Object.entries(context)
    .map(([key, value]) => `const ${key} = ${JSON.stringify(value)};`)
    .join('\n')}
  
  try {
    ${code}
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
    `;

    return this.execute(wrappedCode, 'javascript');
  }

  /**
   * Execute Python code with additional context
   */
  async executePythonWithContext(
    code: string,
    context: Record<string, any> = {}
  ): Promise<ExecutionResult> {
    const imports = `
import json
${Object.entries(context)
  .map(([key, value]) => `${key} = json.loads('${JSON.stringify(value)}')`)
  .join('\n')}
    `;

    const wrappedCode = `${imports}\n\n${code}`;
    return this.execute(wrappedCode, 'python');
  }

  /**
   * Execute file
   */
  private async executeFile(
    filename: string,
    runtime: LanguageRuntime,
    language: SupportedLanguage
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve({
          stdout: '',
          stderr: `Execution timeout (${this.config.timeout}ms)`,
          exitCode: 124,
        });
      }, this.config.timeout);

      const command =
        language === 'java'
          ? `cd ${this.tempDir} && javac ${filename} && java ${filename.replace(/\\/g, '/').split('/').pop()?.replace('.java', '') || 'Main'}`
          : `${runtime.command} ${filename}`;

      exec(
        command,
        {
          maxBuffer: this.config.maxMemory! * 1024,
          timeout: this.config.timeout,
          cwd: this.tempDir,
        },
        (error, stdout, stderr) => {
          clearTimeout(timeout);
          resolve({
            stdout: stdout || '',
            stderr: stderr || error?.message || '',
            exitCode: error?.code || 0,
          });
        }
      );
    });
  }

  /**
   * Get execution history
   */
  getExecution(executionId: string): ExecutionResult | undefined {
    return this.executions.get(executionId);
  }

  /**
   * List supported languages
   */
  listSupportedLanguages(): SupportedLanguage[] {
    return Array.from(this.runtimes.keys());
  }

  /**
   * Get language info
   */
  getLanguageInfo(language: SupportedLanguage): LanguageRuntime | undefined {
    return this.runtimes.get(language);
  }

  /**
   * Add custom runtime
   */
  addRuntime(runtime: LanguageRuntime): void {
    this.runtimes.set(runtime.name, runtime);
  }

  /**
   * Cleanup temp directory
   */
  cleanup(): void {
    try {
      const { rmSync } = require('fs');
      if (existsSync(this.tempDir)) {
        rmSync(this.tempDir, { recursive: true, force: true });
      }
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }

  /**
   * Get execution stats
   */
  getStats(): {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageExecutionTime: number;
  } {
    const executions = Array.from(this.executions.values());
    const successful = executions.filter((e) => e.success).length;

    return {
      totalExecutions: executions.length,
      successfulExecutions: successful,
      failedExecutions: executions.length - successful,
      averageExecutionTime:
        executions.reduce((acc, e) => acc + e.executionTime, 0) /
        Math.max(1, executions.length),
    };
  }
}

// Export factory
export function createSandboxRuntime(
  config?: SandboxConfig
): SandboxRuntime {
  return new SandboxRuntime(config);
}
