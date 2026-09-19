import { FlowIcon } from "@/components/BotFlow";
import type { TimelineEvent } from "@/lib/bot-flow";
import { cn } from "@/lib/utils";

interface BotTimelineProps {
  events: TimelineEvent[];
  title?: string;
}

export function BotTimeline({ events, title }: BotTimelineProps) {
  if (events.length === 0) return null;

  return (
    <div className="bot-timeline">
      {title ? <h4 className="bot-timeline-title">{title}</h4> : null}

      <div className="bot-timeline-list">
        {events.map((event, i) => (
          <div key={event.id} className="bot-timeline-item">
            <div className="bot-timeline-marker">
              <div className={cn("marker-dot", `type-${event.type ?? "info"}`)} />
              {i < events.length - 1 ? <div className="marker-line" /> : null}
            </div>
            <div className="bot-timeline-content">
              <div className="bot-timeline-header">
                <span className="timeline-icon">
                  <FlowIcon name={event.icon} />
                </span>
                <span className="timeline-label">{event.label}</span>
                <span className="timeline-time">{event.time}</span>
              </div>
              {event.duration !== undefined ? (
                <span className="timeline-duration">{event.duration}ms</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
