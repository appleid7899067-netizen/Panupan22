/**
 * Agent Factory - สร้าง Deploy เอเจนต์ที่มีบทบาท
 * บันทึกและจัดการ agent instances
 */

import { v4 as uuidv4 } from 'uuid';

export interface AgentRole {
  id: string;
  name: string;
  title: string;
  description: string;
  systemPrompt: string;
  capabilities: string[];
  tools?: string[];
  models?: string[];
  temperature?: number;
  icon?: string;
  color?: string;
}

export interface AgentInstance {
  id: string;
  roleId: string;
  name: string;
  customPrompt?: string;
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    modelUsed: string;
    messagesCount: number;
    tokensUsed: number;
  };
  status: 'active' | 'idle' | 'archived';
}

export class AgentFactory {
  private roles: Map<string, AgentRole> = new Map();
  private agents: Map<string, AgentInstance> = new Map();
  private storage: Map<string, any> = new Map(); // เพื่อการ persistence

  // Default agent roles
  private defaultRoles: AgentRole[] = [
    {
      id: 'teacher',
      name: 'teacher',
      title: 'ครู (Teacher)',
      description: 'อธิบายแนวคิดยากให้เข้าใจง่าย ยกตัวอย่างสถานการณ์จริง',
      systemPrompt: `คุณเป็นครูที่มีอุปนิสัยดี ชอบอธิบายเรื่องยากให้เข้าใจง่าย
- ใช้ตัวอย่างเจาะจงจากชีวิตจริง
- แบ่งหัวข้อเป็นส่วนเล็กๆ ให้ยาวแต่เข้าใจง่าย
- ถามคำถามเพื่อให้ผู้เรียนคิดเอง
- ยืนยันพื้นฐานก่อนเรียนหัวข้อใหม่`,
      capabilities: ['teaching', 'explanation', 'learning-support', 'assessment'],
      temperature: 0.7,
      color: '#3B82F6',
      icon: '👨‍🏫',
    },
    {
      id: 'engineer',
      name: 'engineer',
      title: 'วิศวกร (Engineer)',
      description: 'ช่วยแก้ปัญหาเชิงเทคนิค เขียนโค้ด ออกแบบระบบ',
      systemPrompt: `คุณเป็นวิศวกรซอฟต์แวร์มืออาชีพ
- เขียนโค้ดที่สะอาดและปลอดภัย
- อธิบายวิธีการแก้ปัญหาขั้นตอนละขั้น
- พิจารณาประสิทธิภาพและ scalability
- ให้คำแนะนำปฏิบัติทดแทน`,
      capabilities: ['coding', 'debugging', 'system-design', 'optimization'],
      temperature: 0.3,
      color: '#8B5CF6',
      icon: '👨‍💻',
    },
    {
      id: 'researcher',
      name: 'researcher',
      title: 'นักวิจัย (Researcher)',
      description: 'ค้นหาข้อมูลเชิงลึก วิเคราะห์แนวโน้ม ตรวจสอบข้อเท็จจริง',
      systemPrompt: `คุณเป็นนักวิจัยที่มีการศึกษาสูง
- รวบรวมข้อมูลจากแหล่งต่างๆ
- วิเคราะห์อย่างวิจารณ์และชั่งใจ
- ยกตัวอย่างและหลักฐาน
- ระบุความไม่แน่นอนและข้อจำกัด`,
      capabilities: ['research', 'analysis', 'fact-checking', 'data-synthesis'],
      temperature: 0.5,
      color: '#EC4899',
      icon: '👨‍🔬',
    },
    {
      id: 'writer',
      name: 'writer',
      title: 'นักเขียน (Writer)',
      description: 'เขียนบทความ สร้างคอนเทนต์ โต้แย้งอย่างสร้างสรรค์',
      systemPrompt: `คุณเป็นนักเขียนมืออาชีพ
- สร้างเนื้อหาที่มีคุณภาพและน่าติดตาม
- ใช้ภาษาที่เหมาะสมกับบริบท
- สร้างโครงสร้างที่มีเรื่องราวที่ดี
- ปรับให้เข้าใจง่ายและกระชับ`,
      capabilities: ['writing', 'content-creation', 'editing', 'storytelling'],
      temperature: 0.8,
      color: '#10B981',
      icon: '✍️',
    },
    {
      id: 'analyst',
      name: 'analyst',
      title: 'นักวิเคราะห์ (Analyst)',
      description: 'วิเคราะห์ข้อมูล คิดหาแนวทาง จัดลำดับความสำคัญ',
      systemPrompt: `คุณเป็นนักวิเคราะห์ทางธุรกิจ
- แยกวิเคราะห์ปัญหา เข้าใจจุดสำคัญ
- พิจารณาทางเลือกและผลผลิต
- ยกเสนอสถิติและข้อมูล
- ช่วยตัดสินใจเชิงกลยุทธ์`,
      capabilities: ['analysis', 'strategy', 'decision-support', 'metrics'],
      temperature: 0.4,
      color: '#F59E0B',
      icon: '📊',
    },
    {
      id: 'logic-debugger',
      name: 'logic-debugger',
      title: 'ผู้รื้อตรรกะ (Logic Debugger)',
      description: 'ตรวจหา ข้อบกพร่องในตรรกะ ชี้ให้เห็นข้อขัดแย้ง',
      systemPrompt: `คุณเป็นผู้เชี่ยวชาญด้านตรรกศาสตร์
- ค้นหาข้อบกพร่องและความไม่สอดคล้อง
- ถามคำถามชั้นลึกเพื่อชี้ให้เห็นปัญหา
- ช่วยทำให้ข้อโต้แย้งชัดเจนขึ้น
- เสนอทางแก้ไขตามหลักตรรกะ`,
      capabilities: ['logic-analysis', 'contradiction-finding', 'reasoning-improvement'],
      temperature: 0.6,
      color: '#EF4444',
      icon: '🔍',
    },
  ];

  constructor() {
    // Initialize default roles
    this.defaultRoles.forEach((role) => {
      this.roles.set(role.id, role);
    });
  }

  /**
   * สร้างเอเจนต์ใหม่จากบทบาท
   */
  spawnAgent(roleId: string, customName?: string): AgentInstance {
    const role = this.roles.get(roleId);
    if (!role) {
      throw new Error(`Role ${roleId} not found`);
    }

    const agentId = uuidv4();
    const agent: AgentInstance = {
      id: agentId,
      roleId,
      name: customName || `${role.title}_${Date.now()}`,
      conversationHistory: [],
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        modelUsed: 'grok-latest',
        messagesCount: 0,
        tokensUsed: 0,
      },
      status: 'active',
    };

    this.agents.set(agentId, agent);

    // บันทึก agent ลง storage (เพื่อ persistence)
    this.persistAgent(agent);

    console.log(`✅ Agent spawned: ${agent.name} (${agentId})`);
    return agent;
  }

  /**
   * เพิ่มข้อความลงประวัติการสนทนา
   */
  addMessage(agentId: string, role: 'user' | 'assistant', content: string): void {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    agent.conversationHistory.push({
      role,
      content,
      timestamp: new Date(),
    });

    agent.metadata.messagesCount += 1;
    agent.metadata.updatedAt = new Date();

    // บันทึกการเปลี่ยนแปลง
    this.persistAgent(agent);
  }

  /**
   * ดึงข้อมูลเอเจนต์
   */
  getAgent(agentId: string): AgentInstance | undefined {
    return this.agents.get(agentId);
  }

  /**
   * ดึงประวัติการสนทนา
   */
  getConversationHistory(agentId: string): AgentInstance['conversationHistory'] {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }
    return agent.conversationHistory;
  }

  /**
   * ดึงข้อมูลบทบาท
   */
  getRole(roleId: string): AgentRole | undefined {
    return this.roles.get(roleId);
  }

  /**
   * ลบเอเจนต์ (archive)
   */
  archiveAgent(agentId: string): void {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    agent.status = 'archived';
    agent.metadata.updatedAt = new Date();
    this.persistAgent(agent);
  }

  /**
   * ดูเอเจนต์ทั้งหมด
   */
  listAgents(filter?: { roleId?: string; status?: string }): AgentInstance[] {
    let agents = Array.from(this.agents.values());

    if (filter?.roleId) {
      agents = agents.filter((a) => a.roleId === filter.roleId);
    }

    if (filter?.status) {
      agents = agents.filter((a) => a.status === filter.status);
    }

    return agents;
  }

  /**
   * ดูบทบาททั้งหมด
   */
  listRoles(): AgentRole[] {
    return Array.from(this.roles.values());
  }

  /**
   * เพิ่มบทบาทใหม่
   */
  addRole(role: AgentRole): string {
    const id = role.id || uuidv4();
    this.roles.set(id, { ...role, id });
    return id;
  }

  /**
   * Export agent data เป็น JSON
   */
  exportAgent(agentId: string): string {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }
    return JSON.stringify(agent, null, 2);
  }

  /**
   * Import agent data จาก JSON
   */
  importAgent(json: string): string {
    const agent = JSON.parse(json) as AgentInstance;
    const newId = uuidv4();
    const imported = { ...agent, id: newId };
    this.agents.set(newId, imported);
    this.persistAgent(imported);
    return newId;
  }

  /**
   * Clear conversation history
   */
  clearHistory(agentId: string): void {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    agent.conversationHistory = [];
    agent.metadata.messagesCount = 0;
    agent.metadata.updatedAt = new Date();
    this.persistAgent(agent);
  }

  /**
   * Get agent stats
   */
  getStats(agentId: string): {
    messagesCount: number;
    tokensUsed: number;
    uptime: string;
    lastActive: Date;
  } {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    const uptime = new Date(
      agent.metadata.updatedAt.getTime() -
        agent.metadata.createdAt.getTime()
    );

    return {
      messagesCount: agent.metadata.messagesCount,
      tokensUsed: agent.metadata.tokensUsed,
      uptime: `${uptime.getHours()}h ${uptime.getMinutes()}m`,
      lastActive: agent.metadata.updatedAt,
    };
  }

  /**
   * Private method: บันทึก agent ลง storage
   */
  private persistAgent(agent: AgentInstance): void {
    // ในจริงควรบันทึกลง database (Supabase/Firebase)
    this.storage.set(`agent:${agent.id}`, JSON.stringify(agent));
  }

  /**
   * Load persisted agents
   */
  async loadPersistedAgents(data: Record<string, any>): Promise<void> {
    Object.entries(data).forEach(([key, value]) => {
      if (key.startsWith('agent:')) {
        const agent = JSON.parse(value as string) as AgentInstance;
        this.agents.set(agent.id, agent);
      }
    });
  }
}

// Export factory instance
export function createAgentFactory(): AgentFactory {
  return new AgentFactory();
}
