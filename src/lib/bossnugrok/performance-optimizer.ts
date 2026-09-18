/**
 * Performance Optimizer - ปรับปรุงประสิทธิภาพระบบ
 * Caching, Rate Limiting, Resource Management
 */

import * as os from 'os';

export interface CacheEntry<T> {
  value: T;
  timestamp: Date;
  ttl: number; // Time to live in milliseconds
  hits: number;
}

export interface PerformanceMetrics {
  timestamp: Date;
  cpuUsage: number; // percentage
  memoryUsage: number; // MB
  requestCount: number;
  averageResponseTime: number; // ms
  cacheHitRate: number; // percentage
  errors: number;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // milliseconds
  key: string; // identifier (e.g., agentId)
}

export class PerformanceOptimizer {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private rateLimiters: Map<string, { count: number; resetTime: number }> = new Map();
  private metrics: PerformanceMetrics[] = [];
  private requestTimings: number[] = [];

  private cacheMaxSize: number = 1000; // max entries
  private metricsInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startMetricsCollection();
  }

  set<T>(key: string, value: T, ttlMs: number = 5 * 60 * 1000): void {
    this.clearExpiredCache();

    if (this.cache.size >= this.cacheMaxSize) {
      const sortedEntries = Array.from(this.cache.entries()).sort(
        ([, a], [, b]) => a.hits - b.hits
      );
      this.cache.delete(sortedEntries[0][0]);
    }

    this.cache.set(key, {
      value,
      timestamp: new Date(),
      ttl: ttlMs,
      hits: 0,
    });
  }

  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) return undefined;

    if (Date.now() - entry.timestamp.getTime() > entry.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    entry.hits += 1;
    return entry.value as T;
  }

  private clearExpiredCache(): void {
    const now = Date.now();
    const toDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp.getTime() > entry.ttl) {
        toDelete.push(key);
      }
    });

    toDelete.forEach((key) => this.cache.delete(key));
  }

  checkRateLimit(config: RateLimitConfig): boolean {
    const now = Date.now();
    const limiter = this.rateLimiters.get(config.key);

    if (!limiter) {
      this.rateLimiters.set(config.key, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return true;
    }

    if (now > limiter.resetTime) {
      limiter.count = 1;
      limiter.resetTime = now + config.windowMs;
      return true;
    }

    if (limiter.count < config.maxRequests) {
      limiter.count += 1;
      return true;
    }

    return false;
  }

  getRateLimitStatus(key: string): {
    remaining: number;
    resetTime: Date;
  } | null {
    const limiter = this.rateLimiters.get(key);
    if (!limiter) return null;

    return {
      remaining: Math.max(0, 100 - limiter.count),
      resetTime: new Date(limiter.resetTime),
    };
  }

  trackRequestTiming(responseTimeMs: number): void {
    this.requestTimings.push(responseTimeMs);

    if (this.requestTimings.length > 1000) {
      this.requestTimings.shift();
    }
  }

  private startMetricsCollection(): void {
    this.metricsInterval = setInterval(() => {
      this.collectMetrics();
    }, 60000);
  }

  private collectMetrics(): void {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = (totalMemory - freeMemory) / 1024 / 1024;

    const cpuUsage = this.getCpuUsage();

    const metric: PerformanceMetrics = {
      timestamp: new Date(),
      cpuUsage,
      memoryUsage: usedMemory,
      requestCount: this.requestTimings.length,
      averageResponseTime:
        this.requestTimings.length > 0
          ? this.requestTimings.reduce((a, b) => a + b) /
            this.requestTimings.length
          : 0,
      cacheHitRate: this.calculateCacheHitRate(),
      errors: 0,
    };

    this.metrics.push(metric);

    if (this.metrics.length > 1440) {
      this.metrics.shift();
    }

    console.log(`📊 Performance Metrics:`, metric);
  }

  private getCpuUsage(): number {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach((cpu) => {
      Object.values(cpu.times).forEach((time) => {
        totalTick += time;
      });
      totalIdle += cpu.times.idle;
    });

    const idle = totalIdle / cpus.length;
    const total = totalTick / cpus.length;
    const usage = 100 - ~~(100 * idle / total);

    return usage;
  }

  private calculateCacheHitRate(): number {
    if (this.cache.size === 0) return 0;

    let totalHits = 0;
    this.cache.forEach((entry) => {
      totalHits += entry.hits;
    });

    return Math.round((totalHits / (totalHits + this.cache.size)) * 100);
  }

  getLatestMetrics(): PerformanceMetrics | undefined {
    return this.metrics[this.metrics.length - 1];
  }

  getMetricsHistory(minutes: number = 60): PerformanceMetrics[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return this.metrics.filter((m) => m.timestamp > cutoff);
  }

  getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    const latestMetrics = this.getLatestMetrics();

    if (!latestMetrics) return recommendations;

    if (latestMetrics.cpuUsage > 80) {
      recommendations.push('⚠️ High CPU usage - Consider optimizing algorithms');
    }

    if (latestMetrics.memoryUsage > 512) {
      recommendations.push('⚠️ High memory usage - Clear cache or optimize data structures');
    }

    if (latestMetrics.averageResponseTime > 1000) {
      recommendations.push(
        '⚠️ Slow response times - Check database queries and API calls'
      );
    }

    if (latestMetrics.cacheHitRate < 50) {
      recommendations.push('💡 Low cache hit rate - Review caching strategy');
    }

    if (latestMetrics.cacheHitRate > 90) {
      recommendations.push('✅ Excellent cache performance!');
    }

    return recommendations;
  }

  async batchProcess<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    batchSize: number = 10
  ): Promise<R[]> {
    const results: R[] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(processor));
      results.push(...batchResults);

      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    return results;
  }

  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }

  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false;

    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }

  memoize<T extends (...args: any[]) => any>(func: T): T {
    const cache: Map<string, any> = new Map();

    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = func(...args);
      cache.set(key, result);
      return result;
    }) as T;
  }

  getCacheStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    totalHits: number;
  } {
    let totalHits = 0;
    this.cache.forEach((entry) => {
      totalHits += entry.hits;
    });

    return {
      size: this.cache.size,
      maxSize: this.cacheMaxSize,
      hitRate: this.calculateCacheHitRate(),
      totalHits,
    };
  }

  clearAllCache(): void {
    this.cache.clear();
    console.log('✅ Cache cleared');
  }

  cleanup(): void {
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
    }
  }
}

// Export factory
export function createPerformanceOptimizer(): PerformanceOptimizer {
  return new PerformanceOptimizer();
}

/**
 * Async queue for managing concurrent operations
 */
export class AsyncQueue {
  private queue: Array<() => Promise<any>> = [];
  private running: number = 0;
  private concurrency: number = 5;

  constructor(concurrency: number = 5) {
    this.concurrency = concurrency;
  }

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.process();
    });
  }

  private async process(): Promise<void> {
    while (this.running < this.concurrency && this.queue.length > 0) {
      this.running += 1;
      const task = this.queue.shift();

      if (task) {
        await task();
      }

      this.running -= 1;
    }
  }

  size(): number {
    return this.queue.length;
  }
}
