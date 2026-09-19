export type RemoteMcpServer = {
  id: string;
  label: string;
  description?: string;
  serverUrl: string;
  allowedTools: string[];
  enabled: boolean;
  permissions: Array<"network" | "filesystem" | "execution" | "account">;
};

const registry: RemoteMcpServer[] = [{
  id: "deepwiki",
  label: "deepwiki",
  description: "Repository and documentation research via Remote MCP.",
  serverUrl: "https://mcp.deepwiki.com/mcp",
  allowedTools: [],
  enabled: true,
  permissions: ["network"],
}];

export function getRemoteMcpRegistry(): RemoteMcpServer[] {
  return registry.map((server) => ({ ...server, allowedTools: [...server.allowedTools], permissions: [...server.permissions] }));
}

export function getEnabledRemoteMcpTools() {
  return getRemoteMcpRegistry().filter((server) => server.enabled && /^https:\/\//i.test(server.serverUrl)).map((server) => ({
    type: "mcp" as const,
    server_url: server.serverUrl,
    server_label: server.label,
    ...(server.description ? { server_description: server.description } : {}),
    ...(server.allowedTools.length ? { allowed_tools: server.allowedTools } : {}),
  }));
}