import { createFileRoute } from "@tanstack/react-router";
import { CommandCenter } from "@/components/command-center";
import { PuterAuthProvider } from "@/lib/puter-auth";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <PuterAuthProvider>
      <TooltipProvider delayDuration={200}>
        <CommandCenter />
      </TooltipProvider>
    </PuterAuthProvider>
  );
}
