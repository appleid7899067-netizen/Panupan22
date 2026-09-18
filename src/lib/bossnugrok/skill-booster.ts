/**
 * AI Skill Booster - ระบบพัฒนาและเรียนรู้สำหรับ Agents
 * ให้เอเจนต์ได้ experience points และ level up
 */

import { v4 as uuidv4 } from 'uuid';

export type SkillCategory =
  | 'communication'
  | 'problem-solving'
  | 'creativity'
  | 'technical'
  | 'analysis'
  | 'collaboration'
  | 'learning';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  level: number; // 1-10
  experience: number; // 0-1000
  requiredExperience: number; // XP needed for next level
  proficiency: number; // 0-100
  lastPracticedAt: Date;
  practiceCount: number;
  successRate: number; // 0-100
}

export interface AgentProfile {
  agentId: string;
  level: number;
  totalExperience: number;
  skills: Map<string, Skill>;
  achievements: Achievement[];
  learningPath: LearningModule[];
  stats: {
    taskCompleted: number;
    successRate: number;
    averageQuality: number;
    improvementRate: number;
  };
  lastUpdated: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  reward: number; // XP reward
}

export interface LearningModule {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: {
    lessons: string[];
    exercises: string[];
    resources: string[];
  };
  completed: boolean;
  startedAt?: Date;
  completedAt?: Date;
  score: number; // 0-100
}

export interface SkillPractice {
  id: string;
  agentId: string;
  skillId: string;
  taskDescription: string;
  difficulty: 'easy' | 'medium' | 'hard';
  quality: number; // 0-100
  success: boolean;
  timeSpent: number; // seconds
  feedback: string;
  xpGained: number;
  completedAt: Date;
}

export class SkillBooster {
  private profiles: Map<string, AgentProfile> = new Map();
  private skills: Map<string, Skill> = new Map();
  private learningModules: Map<string, LearningModule> = new Map();
  private achievements: Map<string, Achievement> = new Map();
  private practices: SkillPractice[] = [];

  private readonly BASE_XP_PER_LEVEL = 1000;
  private readonly SKILL_CATEGORIES: Record<SkillCategory, string> = {
    'communication': 'สื่อสารและนำเสนอ',
    'problem-solving': 'แก้ปัญหา',
    'creativity': 'สร้างสรรค์',
    'technical': 'ทักษะเทคนิค',
    'analysis': 'วิเคราะห์ข้อมูล',
    'collaboration': 'ทำงานเป็นทีม',
    'learning': 'เรียนรู้ต่อเนื่อง',
  };

  constructor() {
    this.initializeBaseSkills();
    this.initializeAchievements();
    this.initializeLearningModules();
  }

  private initializeBaseSkills(): void {
    const baseSkills: Skill[] = [
      {
        id: 'comm-1',
        name: 'Basic Communication',
        category: 'communication',
        description: 'ความสามารถในการสื่อสารพื้นฐาน',
        level: 1,
        experience: 0,
        requiredExperience: 1000,
        proficiency: 0,
        lastPracticedAt: new Date(),
        practiceCount: 0,
        successRate: 0,
      },
      {
        id: 'ps-1',
        name: 'Problem Analysis',
        category: 'problem-solving',
        description: 'วิเคราะห์ปัญหาและหาทางแก้',
        level: 1,
        experience: 0,
        requiredExperience: 1000,
        proficiency: 0,
        lastPracticedAt: new Date(),
        practiceCount: 0,
        successRate: 0,
      },
      {
        id: 'cr-1',
        name: 'Ideation',
        category: 'creativity',
        description: 'สร้างไอเดียใหม่',
        level: 1,
        experience: 0,
        requiredExperience: 1000,
        proficiency: 0,
        lastPracticedAt: new Date(),
        practiceCount: 0,
        successRate: 0,
      },
      {
        id: 'tech-1',
        name: 'Code Writing',
        category: 'technical',
        description: 'เขียนโค้ดที่มีคุณภาพ',
        level: 1,
        experience: 0,
        requiredExperience: 1000,
        proficiency: 0,
        lastPracticedAt: new Date(),
        practiceCount: 0,
        successRate: 0,
      },
      {
        id: 'ana-1',
        name: 'Data Analysis',
        category: 'analysis',
        description: 'วิเคราะห์ข้อมูลและค้นหารูปแบบ',
        level: 1,
        experience: 0,
        requiredExperience: 1000,
        proficiency: 0,
        lastPracticedAt: new Date(),
        practiceCount: 0,
        successRate: 0,
      },
      {
        id: 'coll-1',
        name: 'Team Work',
        category: 'collaboration',
        description: 'ทำงานร่วมกันเป็นทีมอย่างมีประสิทธิภาพ',
        level: 1,
        experience: 0,
        requiredExperience: 1000,
        proficiency: 0,
        lastPracticedAt: new Date(),
        practiceCount: 0,
        successRate: 0,
      },
      {
        id: 'learn-1',
        name: 'Continuous Learning',
        category: 'learning',
        description: 'เรียนรู้สิ่งใหม่และปรับตัว',
        level: 1,
        experience: 0,
        requiredExperience: 1000,
        proficiency: 0,
        lastPracticedAt: new Date(),
        practiceCount: 0,
        successRate: 0,
      },
    ];

    baseSkills.forEach((skill) => {
      this.skills.set(skill.id, skill);
    });
  }

  private initializeAchievements(): void {
    const achievements: Achievement[] = [
      {
        id: 'first-task',
        name: 'Getting Started',
        description: 'สำเร็จงานแรก',
        icon: '🚀',
        unlockedAt: new Date(),
        reward: 100,
      },
      {
        id: 'skill-master',
        name: 'Skill Master',
        description: 'ยกระดับทักษะใด ๆ ให้เป็นระดับ 5',
        icon: '⭐',
        unlockedAt: new Date(),
        reward: 500,
      },
      {
        id: 'level-up',
        name: 'Level Up',
        description: 'ขึ้นเลเวลเป็นครั้งแรก',
        icon: '📈',
        unlockedAt: new Date(),
        reward: 200,
      },
      {
        id: 'perfect-execution',
        name: 'Perfect Execution',
        description: 'ทำงานได้ 100% คุณภาพ',
        icon: '💯',
        unlockedAt: new Date(),
        reward: 300,
      },
      {
        id: 'team-player',
        name: 'Team Player',
        description: 'ร่วมมือทำงานสำเร็จ 10 ครั้ง',
        icon: '👥',
        unlockedAt: new Date(),
        reward: 250,
      },
    ];

    achievements.forEach((achievement) => {
      this.achievements.set(achievement.id, achievement);
    });
  }

  private initializeLearningModules(): void {
    const modules: LearningModule[] = [
      {
        id: 'mod-comm-101',
        name: 'Effective Communication 101',
        category: 'communication',
        description: 'เรียนรู้พื้นฐานการสื่อสารที่มีประสิทธิภาพ',
        duration: 30,
        difficulty: 'beginner',
        content: {
          lessons: [
            'Active Listening',
            'Clear Expression',
            'Feedback Handling',
          ],
          exercises: ['Write a Clear Message', 'Practice Listening'],
          resources: [
            'Communication Guide',
            'Video Tutorials',
          ],
        },
        completed: false,
        score: 0,
      },
      {
        id: 'mod-ps-101',
        name: 'Problem Solving Fundamentals',
        category: 'problem-solving',
        description: 'เรียนรู้ขั้นตอนแก้ปัญหาที่เป็นระบบ',
        duration: 45,
        difficulty: 'beginner',
        content: {
          lessons: [
            'Define the Problem',
            'Brainstorm Solutions',
            'Evaluate Options',
          ],
          exercises: ['Case Study Analysis', 'Real Problem Solving'],
          resources: [
            'Problem Framework',
            'Tools and Techniques',
          ],
        },
        completed: false,
        score: 0,
      },
      {
        id: 'mod-tech-201',
        name: 'Advanced Coding Practices',
        category: 'technical',
        description: 'ศึกษาแนวปฏิบัติการเขียนโค้ดขั้นสูง',
        duration: 60,
        difficulty: 'intermediate',
        content: {
          lessons: [
            'Code Design Patterns',
            'Performance Optimization',
            'Testing Strategies',
          ],
          exercises: ['Refactor Code', 'Write Tests'],
          resources: [
            'Design Patterns Guide',
            'Best Practices',
          ],
        },
        completed: false,
        score: 0,
      },
    ];

    modules.forEach((module) => {
      this.learningModules.set(module.id, module);
    });
  }

  createProfile(agentId: string): AgentProfile {
    const profile: AgentProfile = {
      agentId,
      level: 1,
      totalExperience: 0,
      skills: new Map(),
      achievements: [],
      learningPath: [],
      stats: {
        taskCompleted: 0,
        successRate: 0,
        averageQuality: 0,
        improvementRate: 0,
      },
      lastUpdated: new Date(),
    };

    this.skills.forEach((skill) => {
      profile.skills.set(skill.id, { ...skill });
    });

    this.profiles.set(agentId, profile);
    return profile;
  }

  recordPractice(
    agentId: string,
    skillId: string,
    practice: Omit<SkillPractice, 'id' | 'xpGained' | 'completedAt'>
  ): SkillPractice {
    const profile = this.profiles.get(agentId);
    if (!profile) {
      throw new Error(`Profile for agent ${agentId} not found`);
    }

    const skill = profile.skills.get(skillId);
    if (!skill) {
      throw new Error(`Skill ${skillId} not found for agent ${agentId}`);
    }

    const baseXp = this.calculateXpReward(practice.quality, practice.difficulty);
    const xpGained = practice.success ? baseXp : Math.floor(baseXp * 0.5);

    const skillPractice: SkillPractice = {
      ...practice,
      id: uuidv4(),
      agentId,
      skillId,
      xpGained,
      completedAt: new Date(),
    };

    this.practices.push(skillPractice);

    skill.experience += xpGained;
    skill.practiceCount += 1;
    skill.lastPracticedAt = new Date();
    skill.successRate =
      (skill.successRate * (skill.practiceCount - 1) +
        (practice.success ? 100 : 0)) /
      skill.practiceCount;

    skill.proficiency = Math.min(100, skill.experience / 10);

    this.checkSkillLevelUp(agentId, skillId);

    profile.stats.taskCompleted += 1;
    profile.stats.successRate =
      (profile.stats.successRate * (profile.stats.taskCompleted - 1) +
        (practice.success ? 100 : 0)) /
      profile.stats.taskCompleted;
    profile.stats.averageQuality =
      (profile.stats.averageQuality * (profile.stats.taskCompleted - 1) +
        practice.quality) /
      profile.stats.taskCompleted;

    profile.totalExperience += xpGained;

    this.checkAgentLevelUp(agentId);

    profile.lastUpdated = new Date();

    return skillPractice;
  }

  private checkSkillLevelUp(agentId: string, skillId: string): void {
    const profile = this.profiles.get(agentId);
    if (!profile) return;

    const skill = profile.skills.get(skillId);
    if (!skill) return;

    while (skill.experience >= skill.requiredExperience) {
      skill.level += 1;
      skill.experience -= skill.requiredExperience;
      skill.requiredExperience = Math.floor(skill.requiredExperience * 1.15);
      console.log(
        `⬆️ Skill Level Up! ${skill.name} is now level ${skill.level}`
      );
    }
  }

  private checkAgentLevelUp(agentId: string): void {
    const profile = this.profiles.get(agentId);
    if (!profile) return;

    const requiredXp = this.BASE_XP_PER_LEVEL * profile.level;

    if (profile.totalExperience >= requiredXp) {
      profile.level += 1;
      profile.totalExperience -= requiredXp;
      console.log(`🎉 Agent Level Up! Now level ${profile.level}`);

      if (profile.level === 2) {
        this.unlockAchievement(agentId, 'level-up');
      }
    }
  }

  private unlockAchievement(agentId: string, achievementId: string): void {
    const profile = this.profiles.get(agentId);
    if (!profile) return;

    const achievement = this.achievements.get(achievementId);
    if (!achievement) return;

    if (!profile.achievements.find((a) => a.id === achievementId)) {
      profile.achievements.push(achievement);
      profile.totalExperience += achievement.reward;
      console.log(`🏆 Achievement Unlocked! ${achievement.name}`);
    }
  }

  private calculateXpReward(quality: number, difficulty: string): number {
    const baseXp = difficulty === 'easy' ? 100 : difficulty === 'hard' ? 300 : 200;
    return Math.floor(baseXp * (quality / 100));
  }

  startLearning(agentId: string, moduleId: string): void {
    const profile = this.profiles.get(agentId);
    if (!profile) throw new Error(`Profile for agent ${agentId} not found`);

    const module = this.learningModules.get(moduleId);
    if (!module) throw new Error(`Module ${moduleId} not found`);

    const existingModule = profile.learningPath.find(
      (m) => m.id === moduleId
    );

    if (!existingModule) {
      const newModule = { ...module, startedAt: new Date() };
      profile.learningPath.push(newModule);
      console.log(`📚 Learning started: ${module.name}`);
    }
  }

  completeLearning(agentId: string, moduleId: string, score: number): void {
    const profile = this.profiles.get(agentId);
    if (!profile) throw new Error(`Profile for agent ${agentId} not found`);

    const module = profile.learningPath.find((m) => m.id === moduleId);
    if (!module) throw new Error(`Module not found in learning path`);

    module.completed = true;
    module.completedAt = new Date();
    module.score = score;

    const xpReward = Math.floor((score / 100) * 500);
    profile.totalExperience += xpReward;

    console.log(`✅ Learning completed: ${module.name} (Score: ${score})`);
  }

  getProfile(agentId: string): AgentProfile | undefined {
    return this.profiles.get(agentId);
  }

  getSkill(agentId: string, skillId: string): Skill | undefined {
    const profile = this.profiles.get(agentId);
    return profile?.skills.get(skillId);
  }

  getLearningModules(category?: SkillCategory): LearningModule[] {
    let modules = Array.from(this.learningModules.values());
    if (category) {
      modules = modules.filter((m) => m.category === category);
    }
    return modules;
  }

  getRecommendations(agentId: string): {
    nextSkillToTrain: Skill | undefined;
    recommendedModule: LearningModule | undefined;
    nextAchievementTarget: Achievement | undefined;
  } {
    const profile = this.profiles.get(agentId);
    if (!profile) throw new Error(`Profile for agent ${agentId} not found`);

    const nextSkillToTrain = Array.from(profile.skills.values()).sort(
      (a, b) => a.level - b.level
    )[0];

    const completedModuleIds = new Set(
      profile.learningPath.filter((m) => m.completed).map((m) => m.id)
    );

    const recommendedModule = Array.from(this.learningModules.values()).find(
      (m) =>
        !completedModuleIds.has(m.id) &&
        m.difficulty === 'beginner'
    );

    const unlockedIds = new Set(profile.achievements.map((a) => a.id));
    const nextAchievementTarget = Array.from(
      this.achievements.values()
    ).find((a) => !unlockedIds.has(a.id));

    return {
      nextSkillToTrain,
      recommendedModule,
      nextAchievementTarget,
    };
  }
}

// Export factory
export function createSkillBooster(): SkillBooster {
  return new SkillBooster();
}
