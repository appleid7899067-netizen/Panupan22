# BossnuGrok Remote MCP

BossnuGrok now has a server-side registry for external MCP servers.

The runtime helper returns xAI Responses API MCP definitions with HTTPS-only validation and optional allowed-tools filtering.

Security defaults:
- HTTPS only
- disabled servers are never exposed
- allowedTools can restrict exposed operations
- permissions are planner metadata
- authorization tokens must stay server-side

xAI documents Remote MCP support in the Responses API and recommends allowed-tools filtering when a server exposes many tools.