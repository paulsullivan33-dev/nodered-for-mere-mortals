# The Editor

**Scope:** a tour of the page where flows
are drawn — palette, workspace, sidebar,
and the Deploy button — described from
the flow files the lab deployed, which
you can import to see the same screens
filled in.

## The layout

The editor at `http://127.0.0.1:1880/` has
three regions:

| Region | Where | What it's for |
| --- | --- | --- |
| **Palette** | left | every node you can use, grouped: common, function, network, storage, and more |
| **Workspace** | middle | the drawing itself; one *tab* (also called a flow) at a time |
| **Sidebar** | right | information, help, and the **debug** pane |

Across the top sit the **Deploy** button
and the menu. Along the bottom of the
workspace, zoom controls and a minimap.

## Drawing a flow

The whole grammar has four moves:

1. **Drag** a node from the palette onto
   the workspace.
2. **Wire** it: drag from the small square
   port on one node's right edge to the
   port on the next node's left edge.
3. **Configure** it: double-click a node
   to open its properties — name, and the
   settings that make it *this* flow's
   node rather than the palette's idea.
4. **Deploy.** Nothing you drew is live
   until you press Deploy. Deploy restarts
   the flows (in a blink, for small ones)
   with your changes in.

Tabs keep unrelated jobs apart. The lab's
six tabs — *First steps*, *A small web
service*, *Working on the message*,
*Writing and reading files*, *Talking
MQTT*, *Remembering things* — are
`examples/lab-flows.json`. **Import** it
(menu → Import, or drag the file onto the
workspace) and every flow in the next
three chapters is on your screen to pull
apart, which is a better tour than any
screenshot.

## The sidebar earns its keep

Two panes matter daily:

- **Debug.** Messages sent to *debug*
  nodes appear here as a feed, each
  expandable into the whole `msg` object.
  The lab's debug nodes also mirrored to
  the runtime log (a per-node setting), so
  the transcripts show the same lines the
  sidebar would. When a flow misbehaves,
  this pane — fed generously — is how you
  find out where.
- **Information / Help.** Select any node
  and the sidebar tells you what it does
  and what its properties mean, in the
  node's own words. The built-in help is
  good enough that this guide rarely
  repeats it.

## Three habits worth starting with

- **Name your nodes.** A flow of nine
  anonymous rectangles is a riddle in a
  month. The name shows on the canvas.
- **One job per tab.** Tabs deploy
  together, but they read separately.
- **Comment nodes exist.** The *comment*
  node is a sticky note on the canvas.
  Future you is a stranger; leave them
  notes.
