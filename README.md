# DUM-E — The arm that runs the lab

> **A local-first orchestrator for AI coding agents.** DUM-E runs Qwen, Claude,
> Codex, and OpenCode as one robot team — real terminals, shared tasks, memory,
> and mailboxes, all on a 2D workshop floor you can watch.

**[Live site](https://dum-e-lab.com/)** · **[Download v0.1.1](https://github.com/uppalasrichaitanya/DUM-E-site/releases)** · MIT · Windows 10+ x64

![DUM-E — the arm that runs the lab](assets/social/og.png)

<video src="assets/motion/floor-loop.webm" poster="assets/motion/floor-loop-poster.webp" controls muted loop playsinline width="800"></video>

> This repository publishes the DUM-E landing page and release binaries. The
> application source lives in a separate, currently private repository.

## What it is

DUM-E is an Electron desktop app, not a chat wrapper. Every robot runs a live CLI
session in a real PTY (xterm.js). Each one gets its own working directory, a
`memory.md`, an `inbox/outbox`, and a seat on a shared `tasks.json` kanban.

- **Real terminals** — one live PTY per robot. Open a single session, or pool every robot's terminal at once.
- **Memory + mailboxes** — `memory.md` per robot, `inbox/outbox` routing with reply tracking, and hop caps that stop two robots talking forever.
- **Orchestrated delegation** — DUM-E spawns first, reads the board, delegates work, routes replies, and escalates to you.
- **Cost guardrails** — token caps, cost caps, a per-robot max-turns limit, and a circuit breaker.
- **Triggers** — scheduled missions, HTTP webhooks, and Slack ingestion.
- **The floor is the status system** — rack LEDs blink, the charger steams, robots bob and blink; a completed task sends the reactor pulse across the room.

![The crew — 13 robots, drawn in code](assets/cast/cast-sheet.png)

## Engines

| Engine | Status |
|---|---|
| **OpenCode** | **default** |
| Qwen Code | supported |
| Claude Code | supported |
| OpenAI Codex | bridged |
| Custom / local LLM endpoints | configurable |

Bring your own keys where an engine requires them. DUM-E coordinates the
engines; it does not replace them.

## Download — v0.1.1 (Windows x64)

- **Windows installer** — `DUM-E-0.1.1-win-x64-setup.exe` — [direct download](https://github.com/uppalasrichaitanya/DUM-E-site/releases/download/v0.1.1/DUM-E-0.1.1-win-x64-setup.exe) · standard per-user install, no administrator access required.
- **Windows portable** — `DUM-E-0.1.1-win-x64-portable.exe` — [direct download](https://github.com/uppalasrichaitanya/DUM-E-site/releases/download/v0.1.1/DUM-E-0.1.1-win-x64-portable.exe) · single file, no install, no registry changes.

All releases and checksums: **[Releases](https://github.com/uppalasrichaitanya/DUM-E-site/releases)**

> **These are unsigned builds.** Windows SmartScreen may ask you to trust DUM-E
> the first time. Free, MIT licensed, local-first — no telemetry, no analytics,
> no DUM-E cloud.

Linux has an AppImage build configuration but no published asset yet. The macOS
build is experimental. See the [live site](https://dum-e-lab.com/) for current
platform status.

## How this site is built

The page is a static `index.html` + `styles.css` + `app.js` — no framework, no
build step, no trackers, and no external requests (fonts are self-hosted). It is
generated from the app repository's `web/` folder through an **allowlist** staging
script, so only page files and browser-consumable media ship — never build tools,
raw captures, or source video. It is served by GitHub Pages from this repository.

## License

MIT — see [LICENSE](LICENSE).

**Third-party assets.** The self-hosted fonts — Press Start 2P, Inter, and
JetBrains Mono — are licensed under the SIL Open Font License 1.1; the full text
ships with them at [`assets/fonts/LICENSE.txt`](assets/fonts/LICENSE.txt). All app
screenshots, the robot cast portraits, and the workshop art are original,
procedurally drawn work from the DUM-E project.

**Robot names** are Marvel-inspired internal names and may change before public
distribution.
