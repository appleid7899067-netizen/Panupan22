/**
 * Vibe Work - ระบบจัดการบรรยากาศและพลวัตในการทำงาน
 * วัดและปรับปรุง team dynamics
 */

import { v4 as uuidv4 } from 'uuid';

export type VibeType =
  | 'focused'
  | 'collaborative'
  | 'creative'
  | 'energetic'
  | 'calm'
  | 'productive'
  | 'exploratory';

export interface VibeMetrics {
  timestamp: Date;
  type: VibeType;
  intensity: number; // 0-10
  participants: string[]; // agent IDs
  description: string;
  tags: string[];
}

export interface VibeSession {
  id: string;
  name: string;
  vibe: VibeType;
  description: string;
  duration: number; // minutes
  targetMetrics: {
    productivity: number;
    creativity: number;
    collaboration: number;
    focus: number;
  };
  participants: Array<{
    agentId: string;
    role: string;
    contribution: number; // 0-100
  }>;
  metrics: VibeMetrics[];
  tools: string[]; // recommended tools/resources
  background?: {
    music?: string;
    environment?: string;
    lighting?: string;
  };
  startedAt: Date;
  endedAt?: Date;
  status: 'planning' | 'active' | 'completed';
  feedback?: string;
}

export interface VibeTemplate {
  id: string;
  name: string;
  vibe: VibeType;
  description: string;
  recommendedDuration: number;
  recommendedParticipants: number;
  targetMetrics: VibeSession['targetMetrics'];
  tools: string[];
  background?: VibeSession['background'];
  bestPractices: string[];
}

export class VibeWork {
  private sessions: Map<string, VibeSession> = new Map();
  private templates: Map<string, VibeTemplate> = new Map();
  private metrics: VibeMetrics[] = [];
  private vibeHistory: Array<{
    timestamp: Date;
    vibe: VibeType;
    intensity: number;
  }> = [];

  constructor() {
    this.initializeTemplates();
  }

  /**
   * สร้าง Vibe Templates
   */
  private initializeTemplates(): void {
    const templates: VibeTemplate[] = [
      {
        id: 'focused-coding',
        name: 'Focused Coding Session',
        vibe: 'focused',
        description: 'เซตสำหรับการเขียนโค้ดที่ต้องความเข้มข้น',
        recommendedDuration: 90,
        recommendedParticipants: 1,
        targetMetrics: {
          productivity: 9,
          creativity: 6,
          collaboration: 3,
          focus: 10,
        },
        tools: ['IDE', 'Documentation', 'Debugger'],
        background: {
          music: 'lo-fi beats',
          environment: 'minimalist',
          lighting: 'dim blue',
        },
        bestPractices: [
          'No notifications',
          'Block 90 minutes',
          'Single monitor focus',
          'Coffee breaks every 30 mins',
        ],
      },
      {
        id: 'brainstorm-creative',
        name: 'Creative Brainstorm',
        vibe: 'creative',
        description: 'เซตสำหรับสร้างไอเดียใหม่',
        recommendedDuration: 60,
        recommendedParticipants: 3,
        targetMetrics: {
          productivity: 7,
          creativity: 10,
          collaboration: 9,
          focus: 6,
        },
        tools: ['Whiteboard', 'Mindmap', 'Timer'],
        background: {
          music: 'upbeat indie',
          environment: 'open collaborative',
          lighting: 'bright warm',
        },
        bestPractices: [
          'No judgment zone',
          'Encourage wild ideas',
          'Quick iterations',
          'Document everything',
        ],
      },
      {
        id: 'collab-debugging',
        name: 'Collaborative Debugging',
        vibe: 'collaborative',
        description: 'หลายคนช่วยแก้ปัญหา',
        recommendedDuration: 45,
        recommendedParticipants: 2,
        targetMetrics: {
          productivity: 8,
          creativity: 5,
          collaboration: 10,
          focus: 8,
        },
        tools: ['Shared Screen', 'Code Review', 'Chat'],
        background: {
          music: 'ambient',
          environment: 'collaborative',
          lighting: 'natural',
        },
        bestPractices: [
          'Driver/Navigator pattern',
          'Frequent role switches',
          'Explain out loud',
          'Use pair programming tools',
        ],
      },
      {
        id: 'research-exploratory',
        name: 'Research & Exploration',
        vibe: 'exploratory',
        description: 'ค้นหาและศึกษาเนื้อหาใหม่',
        recommendedDuration: 120,
        recommendedParticipants: 2,
        targetMetrics: {
          productivity: 6,
          creativity: 8,
          collaboration: 7,
          focus: 7,
        },
        tools: ['Browser', 'Note-taking', 'Research Papers'],
        background: {
          music: 'classical',
          environment: 'library-like',
          lighting: 'soft natural',
        },
        bestPractices: [
          'Deep dive sessions',
          'Note important findings',
          'Share discoveries',
          'No time pressure',
        ],
      },
      {
        id: 'calm-review',
        name: 'Calm Review Session',
        vibe: 'calm',
        description: 'ทบทวนและประเมินผลอย่างเยือกเย็น',
        recommendedDuration: 45,
        recommendedParticipants: 1,
        targetMetrics: {
          productivity: 7,
          creativity: 4,
          collaboration: 3,
          focus: 8,
        },
        tools: ['Documentation', 'Reflection', 'Metrics'],
        background: {
          music: 'meditation',
          environment: 'quiet',
          lighting: 'soft',
        },
        bestPractices: [
          'No rush decisions',
          'Write reflections',
          'Mindful approach',
          'Tea/water breaks',
        ],
      },
      {
        id: 'energetic-sprint',
        name: 'Energetic Sprint',
        vibe: 'energetic',
        description: 'รวมคนเยอะๆ เข้ม ร้อน',
        recommendedDuration: 60,
        recommendedParticipants: 4,
        targetMetrics: {
          productivity: 9,
          creativity: 7,
          collaboration: 8,
          focus: 7,
        },
        tools: ['Shared Board', 'Timer', 'Leaderboard'],
        background: {
          music: 'upbeat electronic',
          environment: 'open energetic',
          lighting: 'bright vivid',
        },
        bestPractices: [
          'Time-boxed tasks',
          'Frequent updates',
          'Celebrate wins',
          'Maintain momentum',
        ],
      },
    ];

    templates.forEach((template) => {
      this.templates.set(template.id, template);
    });
  }

  /**
   * สร้าง Vibe Session
   */
  createSession(
    name: string,
    templateId: string,
    participants: string[]
  ): VibeSession {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    const sessionId = uuidv4();
    const session: VibeSession = {
      id: sessionId,
      name,
      vibe: template.vibe,
      description: template.description,
      duration: template.recommendedDuration,
      targetMetrics: template.targetMetrics,
      participants: participants.map((agentId) => ({
        agentId,
        role: template.vibe,
        contribution: 0,
      })),
      metrics: [],
      tools: template.tools,
      background: template.background,
      startedAt: new Date(),
      status: 'planning',
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * เริ่ม Vibe Session
   */
  startSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.status = 'active';
    console.log(`✨ Vibe Session started: ${session.name} (${session.vibe})`);
  }

  /**
   * บันทึก metrics ระหว่าง session
   */
  recordMetric(
    sessionId: string,
    metric: Omit<VibeMetrics, 'timestamp'>
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const vibeMetric: VibeMetrics = {
      ...metric,
      timestamp: new Date(),
    };

    session.metrics.push(vibeMetric);
    this.metrics.push(vibeMetric);

    // Update vibe history
    this.vibeHistory.push({
      timestamp: new Date(),
      vibe: session.vibe,
      intensity: metric.intensity,
    });

    console.log(`📊 Metric recorded: ${metric.description}`);
  }

  /**
   * จบ Session
   */
  endSession(sessionId: string, feedback?: string): {
    score: number;
    summary: string;
  } {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.status = 'completed';
    session.endedAt = new Date();
    session.feedback = feedback;

    // คำนวณ score
    const score = this.calculateSessionScore(session);

    const summary = `
✅ Vibe Session Completed!
- Vibe: ${session.vibe}
- Duration: ${Math.floor((session.endedAt.getTime() - session.startedAt.getTime()) / 60000)} minutes
- Participants: ${session.participants.length}
- Score: ${score}/100
- Feedback: ${feedback || 'N/A'}
    `.trim();

    console.log(summary);
    return { score, summary };
  }

  /**
   * คำนวณ session score
   */
  private calculateSessionScore(session: VibeSession): number {
    if (session.metrics.length === 0) return 0;

    const avgIntensity =
      session.metrics.reduce((acc, m) => acc + m.intensity, 0) /
      session.metrics.length;

    // คำนวณจาก target metrics กับ actual metrics
    const actualMetrics = this.aggregateMetrics(session.metrics);
    const targetMetrics = session.targetMetrics;

    const accuracy =
      (Math.abs(actualMetrics.productivity - targetMetrics.productivity) +
        Math.abs(actualMetrics.creativity - targetMetrics.creativity) +
        Math.abs(actualMetrics.collaboration - targetMetrics.collaboration) +
        Math.abs(actualMetrics.focus - targetMetrics.focus)) /
      40;

    const score = Math.max(0, Math.min(100, 100 - accuracy * 20));

    return Math.round(score);
  }

  /**
   * Aggregate metrics
   */
  private aggregateMetrics(
    metrics: VibeMetrics[]
  ): {
    productivity: number;
    creativity: number;
    collaboration: number;
    focus: number;
  } {
    // ตัวอย่าง: ถ้ามี productivity tags ให้ score สูง
    return {
      productivity: metrics.filter((m) => m.tags.includes('productive')).length,
      creativity: metrics.filter((m) => m.tags.includes('creative')).length,
      collaboration: metrics.filter((m) => m.tags.includes('collaborative'))
        .length,
      focus: metrics.filter((m) => m.tags.includes('focused')).length,
    };
  }

  /**
   * ดู session
   */
  getSession(sessionId: string): VibeSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * List all sessions
   */
  listSessions(filter?: { status?: string; vibe?: VibeType }): VibeSession[] {
    let sessions = Array.from(this.sessions.values());

    if (filter?.status) {
      sessions = sessions.filter((s) => s.status === filter.status);
    }

    if (filter?.vibe) {
      sessions = sessions.filter((s) => s.vibe === filter.vibe);
    }

    return sessions;
  }

  /**
   * Get template
   */
  getTemplate(templateId: string): VibeTemplate | undefined {
    return this.templates.get(templateId);
  }

  /**
   * List templates
   */
  listTemplates(): VibeTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Get vibe history for analysis
   */
  getVibeHistory(hours: number = 24): Array<{
    timestamp: Date;
    vibe: VibeType;
    intensity: number;
  }> {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.vibeHistory.filter((v) => v.timestamp > cutoff);
  }

  /**
   * Get recommended vibe for current context
   */
  recommendVibe(context: {
    taskType: 'coding' | 'design' | 'research' | 'collaboration';
    teamSize: number;
    energy: number; // 0-10
  }): VibeTemplate | null {
    const templates = Array.from(this.templates.values());

    let recommended = templates[0];
    let bestScore = -1;

    templates.forEach((template) => {
      let score = 0;

      // Match by task type
      if (
        context.taskType === 'coding' &&
        template.vibe === 'focused'
      ) {
        score += 30;
      }
      if (
        context.taskType === 'design' &&
        template.vibe === 'creative'
      ) {
        score += 30;
      }
      if (
        context.taskType === 'research' &&
        template.vibe === 'exploratory'
      ) {
        score += 30;
      }
      if (
        context.taskType === 'collaboration' &&
        template.vibe === 'collaborative'
      ) {
        score += 30;
      }

      // Match by team size
      const sizeMatch = Math.abs(
        template.recommendedParticipants - context.teamSize
      );
      score += Math.max(0, 20 - sizeMatch * 5);

      // Match by energy
      const energyTarget = template.vibe === 'energetic' ? 9 : template.vibe === 'calm' ? 3 : 5;
      const energyDiff = Math.abs(energyTarget - context.energy);
      score += Math.max(0, 20 - energyDiff * 2);

      if (score > bestScore) {
        bestScore = score;
        recommended = template;
      }
    });

    return recommended;
  }

  /**
   * Get statistics
   */
  getStats(): {
    totalSessions: number;
    averageScore: number;
    mostUsedVibe: VibeType;
    totalParticipants: number;
  } {
    const sessions = Array.from(this.sessions.values()).filter(
      (s) => s.status === 'completed'
    );
    const scores = sessions
      .map((s) => this.calculateSessionScore(s))
      .filter((s) => s > 0);

    const vibeCountMap: Record<VibeType, number> = {} as any;
    sessions.forEach((s) => {
      vibeCountMap[s.vibe] = (vibeCountMap[s.vibe] || 0) + 1;
    });

    const mostUsedVibe = Object.entries(vibeCountMap).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0] as VibeType;

    const totalParticipants = sessions.reduce(
      (acc, s) => acc + s.participants.length,
      0
    );

    return {
      totalSessions: sessions.length,
      averageScore:
        scores.length > 0
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : 0,
      mostUsedVibe: mostUsedVibe || 'focused',
      totalParticipants,
    };
  }
}

// Export factory
export function createVibeWork(): VibeWork {
  return new VibeWork();
}
