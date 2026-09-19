---
name: code-runner
description: Run JavaScript in a sandbox inside the current chat.
---

# code-runner

Use when the user pastes JS/TS or says รันโค้ด / run code.

## Sequence
1. Extract the code block.
2. Run it (browser Function sandbox or kernel code-runner).
3. Stream stdout back **in the same chat bubble**. Do not open Terminal mode.

## Do not
- Leave the chat room.
- Execute `rm`, `git push`, or deploy commands.
