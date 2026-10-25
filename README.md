# Node-RED for Mere Mortals

Somewhere in your house there is a job
being done by hand that a handful of boxes
and wires could do while you sleep:
when this happens, tell that, write the
other down. **Node-RED** is the open-source
workbench for that wiring — a web page
where you place nodes, connect them, and
press Deploy, and the drawing starts
working: answering web requests, moving
messages between systems, keeping notes
in files, remembering just enough. This
guide explains what a flow really is,
what travels down the wires, how to
install and secure the thing, and how to
run it like you mean it.

The lab behind this guide ran the real
thing: **Node-RED v5.0.9**, installed with
npm and exercised through the same
**Admin API** the editor's Deploy button
uses. Into it went thirty-seven invented
nodes across six tabs — a greeting
service, a sentence that gets shouted and
counted, a kettle note written to a file
and served back, a porch light that
talks MQTT, a button that counts its own
presses — and every behaviour the
chapters describe was provoked and
watched: endpoints curled, files read off
the disk, an MQTT round trip through a
pocket broker, three restarts (one of
them a full service restart), and a
password switched on and tested with
right and wrong credentials. What the lab
could not do, it did not fake: there was
no browser-driven clicking, so the
drawing lessons are taught from the flow
files themselves — importing
`examples/lab-flows.json` puts every lab
flow on your own canvas — and the full
ledger of what ran versus what was only
read is kept in `criteria.md`.

## What this guide covers

- [**What Node-RED is**](what-node-red-is.md) —
  the mental model: events in, actions
  out, the message as a parcel; what it
  is not (a language, a database, safe
  to leave open)
- [**Installing Node-RED**](installing-node-red.md) —
  Node.js first, the one npm command,
  the first banner, and where your files
  live
- [**The editor**](the-editor.md) —
  palette, workspace, sidebar; the four
  moves of drawing; importing the lab's
  flows for the tour
- [**Nodes, wires, and messages**](nodes-wires-and-messages.md) —
  the three families of nodes, what a
  wire promises, and the `msg` object
  opened up
- [**Your first flows**](your-first-flows.md) —
  press-and-see, then a web address that
  answers in JSON
- [**Functions and transforms**](functions-and-transforms.md) —
  the boring nodes to reach for first,
  and the function node without mystery
- [**Files and context**](files-and-context.md) —
  writing and reading files, the notepad
  called context, and which memory
  survives a restart — proved by
  restarting
- [**Talking MQTT**](mqtt.md) —
  publishing, subscribing, and a round
  trip through a pocket broker
- [**Securing the editor**](securing-node-red.md) —
  the password that is not optional,
  your own credentials key, and what
  neither of them protects
- [**Running it for real**](running-it-for-real.md) —
  a systemd service, proved live; one
  user, on purpose; logs in the journal
- [**Backing up**](backing-up.md) — one
  folder is the whole kingdom, and the
  one item everyone forgets
- [**Recipes**](recipes.md) — a heartbeat,
  a form on the wall, a daily note, and
  a counter that reports itself
- [**The neighbours**](the-neighbours.md) —
  Home Assistant, n8n and the hosted
  workflow services, cron and a script,
  plain code
- [**Limits**](limits.md) — one thread of
  logic, parallel wires, community code,
  one machine
- [**Troubleshooting**](troubleshooting.md) —
  the broker that won't connect, the
  flows that "vanished", the 401 that
  wasn't the password
- [**Glossary**](glossary.md) — the
  terms, collected in one place

## What it doesn't cover

Writing nodes of your own (a real topic,
with its own documentation on the
project site), the dashboard add-ons that
build control panels in flows, Node-RED
in commercial products, and high-
availability anything — chapter 14
explains why the last one is a different
tool's job. Deep dives this guide leans
on instead of repeating: the **MQTT**
guide in this series for the protocol
itself, and the **Home Assistant** guide
for the system Node-RED so often wires
into.

## How to use this guide

Read chapter 1 for the model, install
with chapter 2, and take chapter 3's tour
with the lab flows imported — the canvas
makes sense faster with real flows on it.
Chapters 5 to 8 are one sitting each and
build on each other in order. Do not
skip chapter 9: everything before it
assumes a network of people you trust,
and the password takes ten minutes.
Chapter 11 is short enough to read
before your first real deploy, which is
exactly when a backup habit is cheapest
to start. The lab's transcripts live in
`nodered-lab/transcripts/`; its notes
are `examples/lab-notes.txt`.

---

## Part of the series

This guide is one of the [For Mere Mortals](https://paulsullivan33-dev.github.io/mere-mortals/) guides: plain-language guides to the tools programmers and makers use.

Related guides:

- [MQTT for Mere Mortals](https://paulsullivan33-dev.github.io/mqtt-for-mere-mortals/)
- [Home Assistant for Mere Mortals](https://paulsullivan33-dev.github.io/home-assistant-for-mere-mortals/)
- [Docker Compose for Mere Mortals](https://paulsullivan33-dev.github.io/docker-compose-for-mere-mortals/)

## License

The writing in this guide is licensed under [CC BY 4.0](https://github.com/paulsullivan33-dev/nodered-for-mere-mortals/blob/main/LICENSE). Code examples and lab scripts are licensed under the [MIT License](https://github.com/paulsullivan33-dev/nodered-for-mere-mortals/blob/main/LICENSE-CODE).
