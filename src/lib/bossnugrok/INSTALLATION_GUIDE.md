# 🚀 BossnuGrok v0.2.0 - Installation & Integration Guide

## 📋 Overview

BossnuGrok เป็น AI Workspace ที่เต็มไปด้วยฟีเจอร์ขั้นสูง ประกอบด้วย:

1. ✅ **Mistral Workflows** - Multi-step AI workflows
2. ✅ **Agent Factory** - สร้างและจัดการเอเจนต์ด้วยบทบาทต่างๆ
3. ✅ **Sandbox Runtime** - รัน code จาก 11+ ภาษา
4. ✅ **Vibe Work** - จัดการบรรยากาศและพลวัตในการทำงาน
5. ✅ **AI Skill Booster** - ให้เอเจนต์เรียนรู้และพัฒนา
6. ✅ **Performance Optimizer** - ปรับปรุงประสิทธิภาพ
7. ✅ **Production Deployment** - Ready for production

---

## 📦 Installation

### 1. Copy Files to Your Project

```bash
# Copy TypeScript files to your src or server directory
cp mistral-workflows.ts src/
cp agent-factory.ts src/
cp sandbox-runtime.ts src/
cp vibe-work.ts src/
cp skill-booster.ts src/
cp performance-optimizer.ts src/
cp deployment-config.ts src/
cp index-integration.ts src/

# Or for server directory
cp *.ts server/src/
```

### 2. Install Dependencies

```bash
npm install axios uuid dotenv
npm install --save-dev @types/node @types/uuid typescript
```

### 3. Update Environment Variables

```bash
# .env.local or .env.production
NODE_ENV=development
MISTRAL_API_KEY=sk_your_mistral_key
GROK_API_KEY=xai_your_grok_key
DATABASE_URL=postgresql://user:pass@localhost/bossnugrok
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
```

---

## 🔧 Usage Examples

### Initialize System

```typescript
import { initializeBossnuGrokSystem } from './index-integration';

const system = await initializeBossnuGrokSystem('production');

// Now you have access to all 7 features
const { 
  mistralWorkflows, 
  agentFactory, 
  sandboxRuntime, 
  vibeWork, 
  skillBooster, 
  performanceOptimizer, 
  config 
} = system;
```

### 1. Mistral Workflows

```typescript
// Create workflow
const workflowId = system.mistralWorkflows.createWorkflow({
  id: 'analysis-workflow',
  name: 'Data Analysis Pipeline',
  description: 'Analyze data and generate report',
  steps: [
    {
      id: 'parse-data',
      name: 'Parse Input Data',
      model: 'mistral-large-latest',
      prompt: 'Parse this data: {{input}}',
      temperature: 0.3,
    },
    {
      id: 'analyze',
      name: 'Analyze Patterns',
      model: 'mistral-large-latest',
      prompt: 'Analyze patterns in: {{parse-data}}',
      temperature: 0.7,
    },
  ],
});

// Execute workflow
const result = await system.mistralWorkflows.executeWorkflow(workflowId, {
  input: 'raw data here',
});

console.log(result.results); // Get results from each step
```

### 2. Agent Factory

```typescript
// Spawn agent with role
const engineer = system.agentFactory.spawnAgent('engineer', 'Senior Code Reviewer');
const teacher = system.agentFactory.spawnAgent('teacher', 'Python Instructor');

// Add conversation history
system.agentFactory.addMessage(engineer.id, 'user', 'Review this code...');
system.agentFactory.addMessage(engineer.id, 'assistant', 'This code looks good because...');

// Get agent info
const agentInfo = system.agentFactory.getAgent(engineer.id);
const history = system.agentFactory.getConversationHistory(engineer.id);

// List all agents
const allAgents = system.agentFactory.listAgents({ status: 'active' });
```

### 3. Sandbox Runtime

```typescript
// Execute JavaScript
const jsResult = await system.sandboxRuntime.execute(
  `
console.log('Hello World');
const result = 2 + 2;
console.log('Result:', result);
  `,
  'javascript'
);

console.log(jsResult.stdout); // Output
console.log(jsResult.stderr); // Errors
console.log(jsResult.executionTime); // ms

// Execute Python
const pyResult = await system.sandboxRuntime.execute(
  `
def factorial(n):
    return 1 if n <= 1 else n * factorial(n-1)

print(f"5! = {factorial(5)}")
  `,
  'python'
);

// Execute with context
const withContext = await system.sandboxRuntime.executeJavaScriptWithContext(
  `
console.log('User:', user.name);
console.log('Total:', calculations.sum);
  `,
  {
    user: { name: 'Alice', id: 123 },
    calculations: { sum: 100 },
  }
);

// Supported languages
const languages = system.sandboxRuntime.listSupportedLanguages();
// ['javascript', 'python', 'typescript', 'bash', 'sql', ...]
```

### 4. Vibe Work

```typescript
// Create session from template
const session = system.vibeWork.createSession(
  'Sprint Planning',
  'focused-coding', // template ID
  [engineer.id, teacher.id]
);

// Start session
system.vibeWork.startSession(session.id);

// Record metrics during session
system.vibeWork.recordMetric(session.id, {
  type: 'focused',
  intensity: 8,
  participants: [engineer.id],
  description: 'Deep focus on code review',
  tags: ['productive', 'collaborative'],
});

// End session and get score
const { score, summary } = system.vibeWork.endSession(
  session.id,
  'Great progress!'
);

console.log(`Session Score: ${score}/100`);

// Get recommendations
const recommendedVibe = system.vibeWork.recommendVibe({
  taskType: 'coding',
  teamSize: 2,
  energy: 7,
});

// View stats
const stats = system.vibeWork.getStats();
// { totalSessions: 10, averageScore: 85, mostUsedVibe: 'focused' }
```

### 5. Skill Booster

```typescript
// Create agent profile
const profile = system.skillBooster.createProfile(engineer.id);

// Record practice/task
const practice = system.skillBooster.recordPractice(
  engineer.id,
  'tech-1', // skill ID
  {
    taskDescription: 'Code review for payment module',
    difficulty: 'hard',
    quality: 92,
    success: true,
    timeSpent: 1800, // seconds
    feedback: 'Excellent attention to edge cases',
  }
);

console.log(`XP Gained: ${practice.xpGained}`);

// Start learning module
system.skillBooster.startLearning(
  engineer.id,
  'mod-tech-201' // Advanced Coding module
);

// Complete module with score
system.skillBooster.completeLearning(engineer.id, 'mod-tech-201', 95);

// Get profile stats
const stats = system.skillBooster.getProfile(engineer.id);
console.log(`Level: ${stats?.level}, XP: ${stats?.totalExperience}`);

// Get recommendations
const recommendations = system.skillBooster.getRecommendations(engineer.id);
console.log(recommendations.nextSkillToTrain); // Skill to focus on
console.log(recommendations.recommendedModule); // Learning module
```

### 6. Performance Optimizer

```typescript
// Cache operations
system.performanceOptimizer.set('agent:123', agentData, 5 * 60 * 1000);
const cached = system.performanceOptimizer.get('agent:123');

// Rate limiting
const allowed = system.performanceOptimizer.checkRateLimit({
  maxRequests: 100,
  windowMs: 60000,
  key: engineer.id,
});

if (allowed) {
  // Process request
}

// Track request timing
const startTime = Date.now();
// ... do work ...
const duration = Date.now() - startTime;
system.performanceOptimizer.trackRequestTiming(duration);

// Get metrics
const metrics = system.performanceOptimizer.getLatestMetrics();
console.log(`CPU: ${metrics?.cpuUsage}%`);
console.log(`Memory: ${metrics?.memoryUsage} MB`);

// Get optimization tips
const recommendations = system.performanceOptimizer.getOptimizationRecommendations();

// Batch operations
const results = await system.performanceOptimizer.batchProcess(
  largeArray,
  async (item) => await processItem(item),
  10 // batch size
);

// Utility functions
const debounced = system.performanceOptimizer.debounce(
  (value) => console.log(value),
  300
);

const throttled = system.performanceOptimizer.throttle(
  () => updateUI(),
  1000
);

const memoized = system.performanceOptimizer.memoize(
  (a, b) => expensiveCalculation(a, b)
);
```

### 7. Deployment

```typescript
import { 
  getDeploymentConfig, 
  validateDeploymentConfig,
  preDeploymentChecklist,
  VERCEL_JSON,
  DOCKER_COMPOSE_CONFIG 
} from './deployment-config';

// Get config for environment
const config = getDeploymentConfig('production');

// Validate config
const { valid, errors } = validateDeploymentConfig(config);
if (!valid) {
  console.error('Config errors:', errors);
}

// Run pre-deployment checks
const { passed, checks } = await preDeploymentChecklist();
checks.forEach(check => {
  console.log(`${check.name}: ${check.status} - ${check.message}`);
});

// Use Vercel config
// Copy VERCEL_JSON content to vercel.json

// Use Docker Compose
// Save DOCKER_COMPOSE_CONFIG to docker-compose.yml
// Then: docker-compose up -d
```

---

## 📚 File Structure

```
src/
├── mistral-workflows.ts      # 1. Mistral API integration
├── agent-factory.ts          # 2. Agent creation & management
├── sandbox-runtime.ts        # 3. Code execution engine
├── vibe-work.ts             # 4. Team dynamics management
├── skill-booster.ts         # 5. Agent learning system
├── performance-optimizer.ts # 6. Caching & optimization
├── deployment-config.ts     # 7. Production deployment
└── index-integration.ts     # 8. System integration
```

---

## 🚀 Quick Start

```typescript
import { initializeBossnuGrokSystem, exampleWorkflow } from './index-integration';

async function main() {
  // Initialize
  const system = await initializeBossnuGrokSystem();
  
  // Run example
  await exampleWorkflow(system);
  
  // Cleanup
  // cleanupBossnuGrokSystem(system);
}

main().catch(console.error);
```

---

## 🔑 Key Features Checklist

- ✅ Multi-model AI workflows (Mistral + Grok)
- ✅ 6 default agent roles (Teacher, Engineer, Researcher, Writer, Analyst, Logic Debugger)
- ✅ 11+ programming languages in sandbox
- ✅ 6 Vibe templates for team dynamics
- ✅ Skill progression & XP system
- ✅ Intelligent caching & rate limiting
- ✅ Production-ready deployment configs
- ✅ Comprehensive monitoring & metrics

---

## 📖 Environment Variables Required

```env
# APIs
MISTRAL_API_KEY=sk_...
GROK_API_KEY=xai_...

# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Security
JWT_SECRET=...
ENCRYPTION_KEY=...

# Deployment
NODE_ENV=production
APP_VERSION=0.2.0
```

---

## 🐳 Docker Deployment

```bash
# Build image
docker build -t bossnugrok:0.2.0 .

# Run with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f
```

---

## 📊 Monitoring

```typescript
// Get system health
const metrics = system.performanceOptimizer.getLatestMetrics();
const recommendations = system.performanceOptimizer.getOptimizationRecommendations();

// Check deployment
const health = await healthCheck(system.config);

// View agent stats
system.agentFactory.listAgents().forEach(agent => {
  const stats = system.skillBooster.getProfile(agent.id);
  console.log(`${agent.name}: Level ${stats?.level}, ${stats?.totalExperience} XP`);
});
```

---

## 🆘 Troubleshooting

**Mistral Workflow fails:**
- Check `MISTRAL_API_KEY` environment variable
- Verify API quotas
- Check network connectivity

**Sandbox errors:**
- Ensure Node.js/Python installed
- Check tempDir permissions
- Monitor memory usage

**Performance issues:**
- Enable caching for frequently accessed data
- Use rate limiting for API endpoints
- Monitor metrics regularly

---

## 📝 Next Steps

1. Copy all files to your project
2. Install dependencies: `npm install`
3. Set environment variables
4. Import and initialize: `await initializeBossnuGrokSystem()`
5. Deploy to production using provided configs

---

## 📞 Support

For issues or questions:
- Check the example workflow in `index-integration.ts`
- Review configuration in `deployment-config.ts`
- Monitor system with performance optimizer

---

**🎉 Ready to deploy BossnuGrok v0.2.0!**
