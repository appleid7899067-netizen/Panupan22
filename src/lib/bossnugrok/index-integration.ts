/**
 * BossnuGrok System Integration
 * รวมทั้ง 7 ฟีเจอร์หลักเข้าด้วยกัน
 */

import { createMistralWorkflows, type MistralWorkflows } from './mistral-workflows';
import { createAgentFactory, type AgentFactory } from './agent-factory';
import { createSandboxRuntime, type SandboxRuntime } from './sandbox-runtime';
import { createVibeWork, type VibeWork } from './vibe-work';
import { createSkillBooster, type SkillBooster } from './skill-booster';
import { createPerformanceOptimizer, type PerformanceOptimizer } from './performance-optimizer';
import { getDeploymentConfig, type DeploymentConfig } from './deployment-config';

export interface BossnuGrokSystem {
  mistralWorkflows: MistralWorkflows;
  agentFactory: AgentFactory;
  sandboxRuntime: SandboxRuntime;
  vibeWork: VibeWork;
  skillBooster: SkillBooster;
  performanceOptimizer: PerformanceOptimizer;
  config: DeploymentConfig;
}

/**
 * Initialize BossnuGrok System
 */
export async function initializeBossnuGrokSystem(
  environment: string = process.env.NODE_ENV || 'development'
): Promise<BossnuGrokSystem> {
  console.log(`
╔════════════════════════════════════════════╗
║       🚀 BossnuGrok System Initializing    ║
║         AI Workspace LIVE v0.2.0           ║
╚════════════════════════════════════════════╝
  `);

  const config = getDeploymentConfig(environment);

  console.log(`📌 Environment: ${environment}`);
  console.log(`📦 Version: ${config.version}`);

  // 1. Initialize Mistral Workflows
  console.log('\n[1/6] 🔗 Initializing Mistral Workflows...');
  const mistralWorkflows = createMistralWorkflows(
    process.env.MISTRAL_API_KEY || 'sk-mistral-test'
  );
  console.log('✅ Mistral Workflows ready');

  // 2. Initialize Agent Factory
  console.log('[2/6] 🤖 Initializing Agent Factory...');
  const agentFactory = createAgentFactory();
  console.log('✅ Agent Factory ready');

  // 3. Initialize Sandbox Runtime
  console.log('[3/6] 📦 Initializing Sandbox Runtime...');
  const sandboxRuntime = createSandboxRuntime({
    timeout: config.api.timeout,
    maxMemory: 512,
    tempDir: '/tmp/bossnugrok-sandbox',
  });
  console.log('✅ Sandbox Runtime ready');

  // 4. Initialize Vibe Work
  console.log('[4/6] ✨ Initializing Vibe Work...');
  const vibeWork = createVibeWork();
  console.log('✅ Vibe Work ready');

  // 5. Initialize Skill Booster
  console.log('[5/6] 🎓 Initializing Skill Booster...');
  const skillBooster = createSkillBooster();
  console.log('✅ Skill Booster ready');

  // 6. Initialize Performance Optimizer
  console.log('[6/6] ⚡ Initializing Performance Optimizer...');
  const performanceOptimizer = createPerformanceOptimizer();
  console.log('✅ Performance Optimizer ready');

  console.log(`
╔════════════════════════════════════════════╗
║    ✨ BossnuGrok System Initialized ✨    ║
║  All 7 Features Ready for Production       ║
╚════════════════════════════════════════════╝
  `);

  return {
    mistralWorkflows,
    agentFactory,
    sandboxRuntime,
    vibeWork,
    skillBooster,
    performanceOptimizer,
    config,
  };
}

/**
 * Example: การใช้ BossnuGrok System
 */
export async function exampleWorkflow(system: BossnuGrokSystem) {
  console.log('\n🎬 Running Example Workflow...\n');

  // Step 1: Spawn agents
  const agent1 = system.agentFactory.spawnAgent('engineer', 'CodeReview-Engineer');
  const agent2 = system.agentFactory.spawnAgent('teacher', 'Learning-Coach');

  console.log(`✅ Spawned ${agent1.name} and ${agent2.name}`);

  // Step 2: Create skill profiles
  const engineer = system.skillBooster.createProfile(agent1.id);
  const teacher = system.skillBooster.createProfile(agent2.id);

  console.log(`✅ Created skill profiles`);

  // Step 3: Create Mistral workflow
  const workflowId = system.mistralWorkflows.createWorkflow({
    id: 'code-review-workflow',
    name: 'Code Review Process',
    description: 'Review code and provide feedback',
    steps: [
      {
        id: 'analyze-code',
        name: 'Analyze Code',
        model: 'mistral-large',
        prompt: 'Analyze this code: {{code}}',
        temperature: 0.3,
        maxTokens: 1024,
      },
      {
        id: 'suggest-improvements',
        name: 'Suggest Improvements',
        model: 'mistral-large',
        prompt:
          'Based on this analysis: {{analyze-code}}, suggest improvements',
        temperature: 0.7,
        maxTokens: 1024,
      },
    ],
  });

  console.log(`✅ Created workflow: ${workflowId}`);

  // Step 4: Start Vibe session
  const vibeSession = system.vibeWork.createSession(
    'Code Review Sprint',
    'collab-debugging',
    [agent1.id, agent2.id]
  );

  system.vibeWork.startSession(vibeSession.id);
  console.log(`✅ Started Vibe session: ${vibeSession.name}`);

  // Step 5: Execute sandbox code
  const codeResult = await system.sandboxRuntime.execute(
    `
console.log('Hello from BossnuGrok!');
const sum = (a, b) => a + b;
console.log('2 + 3 =', sum(2, 3));
    `,
    'javascript'
  );

  console.log(`✅ Sandbox execution: ${codeResult.success ? 'Success' : 'Failed'}`);
  console.log(`Output: ${codeResult.stdout}`);

  // Step 6: Record skill practice
  const practice = system.skillBooster.recordPractice(agent1.id, 'tech-1', {
    agentId: agent1.id,
    skillId: 'tech-1',
    taskDescription: 'Review code quality',
    difficulty: 'medium',
    quality: 85,
    success: true,
    timeSpent: 1200,
    feedback: 'Great job analyzing the code structure',
  });

  console.log(`✅ Skill practice recorded: ${practice.xpGained} XP gained`);

  // Step 7: Performance metrics
  const metrics = system.performanceOptimizer.getLatestMetrics();
  console.log(`
✅ Performance Metrics:
   - CPU Usage: ${metrics?.cpuUsage.toFixed(2)}%
   - Memory: ${metrics?.memoryUsage.toFixed(2)} MB
   - Cache Hit Rate: ${metrics?.cacheHitRate.toFixed(2)}%
  `);

  // Step 8: Get recommendations
  const recommendations =
    system.performanceOptimizer.getOptimizationRecommendations();
  if (recommendations.length > 0) {
    console.log('💡 Optimization Recommendations:');
    recommendations.forEach((r) => console.log(`   ${r}`));
  }

  // Step 9: End Vibe session
  const sessionResult = system.vibeWork.endSession(vibeSession.id, 'Great collaboration!');
  console.log(`✅ Vibe session completed with score: ${sessionResult.score}/100`);

  // Step 10: Get agent stats
  const engineerStats = system.skillBooster.getProfile(agent1.id);
  if (engineerStats) {
    console.log(`
✅ Agent ${agent1.name} Stats:
   - Level: ${engineerStats.level}
   - Total XP: ${engineerStats.totalExperience}
   - Tasks Completed: ${engineerStats.stats.taskCompleted}
   - Success Rate: ${engineerStats.stats.successRate.toFixed(2)}%
    `);
  }
}

/**
 * System cleanup
 */
export function cleanupBossnuGrokSystem(system: BossnuGrokSystem): void {
  console.log('\n🧹 Cleaning up BossnuGrok System...');

  system.sandboxRuntime.cleanup();
  system.performanceOptimizer.cleanup();

  console.log('✅ Cleanup completed');
}

/**
 * Export all features
 */
export {
  createMistralWorkflows,
  createMistralWorkflows,
  createAgentFactory,
  createSandboxRuntime,
  createVibeWork,
  createSkillBooster,
  createPerformanceOptimizer,
  getDeploymentConfig,
};

// Main entry point
if (require.main === module) {
  (async () => {
    const system = await initializeBossnuGrokSystem();
    await exampleWorkflow(system);
    cleanupBossnuGrokSystem(system);
  })().catch(console.error);
}
