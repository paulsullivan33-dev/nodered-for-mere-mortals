# What Node-RED Is

**Scope:** the mental model — a workbench
where you wire boxes together instead of
writing plumbing code — plus what it is
not, and the lab this guide's claims rest
on.

## The one-paragraph version

**Node-RED** is open-source software that
lets you automate things by drawing. On a
web page you place boxes — *nodes* — and
connect them with wires. A message travels
along the wires: something happened (a
button press, a web request, a sensor
reading), and each node it passes does a
small job to it — rewords it, decides
something, files it away, sends it
somewhere. A chain of nodes doing one
whole job is a *flow*. Node-RED runs on
almost anything: a Raspberry Pi, an old
laptop, a small server, your main machine.
It began at IBM in 2013 as a way to wire
together hardware and online services
without writing the boring middle code
each time, and it is now an OpenJS
Foundation project with a large library of
community nodes.

That is the whole idea. The rest of this
guide is the fine print: what a message
actually is, the handful of nodes that do
most of the work, and how to keep the
thing running and locked once it works.

## The shape of the thing

Three ideas carry the whole program:

- **Events in, actions out.** Most flows
  start with an *input node* — a timer, a
  web address being visited, a message
  arriving over MQTT — and end with an
  *output node*: a reply, a file, a message
  sent onward. Between them sit processing
  nodes.
- **The message is the parcel.** Everything
  travels as one object, almost always
  called `msg`, with the interesting part
  in `msg.payload`. Nodes read the parcel,
  change it, and pass it along. Chapter 4
  opens the parcel up.
- **Deploying is one button.** You draw
  and rearrange freely; nothing runs until
  you press **Deploy**, at which point the
  whole drawing becomes live at once.
  Until then it's a sketch.

## What it is not

Four confusions worth clearing away
early:

- It is **not a programming language**,
  though it contains one. Most flows need
  no code at all. When you do need some,
  the *function* node holds ordinary
  JavaScript — chapter 6 — but reaching
  for it first is missing the point.
- It is **not a home-automation system**
  by itself. It has no opinions about your
  lights. It is the wiring *between*
  systems — Home Assistant, MQTT brokers,
  web services, files — which is why the
  series' Home Assistant guide treats it
  as a companion, and why chapter 13
  compares the two.
- It is **not a database.** It can
  remember small things while it runs and
  keep notes in files, but anything you
  would grieve losing belongs in a real
  store. Chapter 7 is honest about where
  the remembering stops.
- It is **not safe to leave open on the
  internet as it first starts.** A fresh
  Node-RED lets anyone who can reach the
  page edit your flows. That is fine on
  your own desk and serious anywhere
  else; chapter 9 exists because of it.

## The lab behind this guide

Every claim here was tried on the build
machine before it was written down:
**Node-RED v5.0.9** on Node.js v24,
installed with npm and run against a
throwaway user directory. Into it went
thirty-seven nodes across six tabs —
small invented flows about a porch light,
a kettle note, and a button that counts
its own presses — deployed through the
same **Admin API** the editor's Deploy
button uses, and then interrogated from
the command line: web endpoints curled,
files read back off the disk, an MQTT
round trip through a pocket broker, three
restarts, a password switched on and
tested with right and wrong credentials.

What the lab could not do, it did not
fake. There was no second machine and no
browser-driven clicking: the editor's
pages were fetched and its API exercised,
and the drawing instructions in chapter 3
are written from the flow files the lab
actually deployed — importing
`examples/lab-flows.json` rebuilds every
one of them on your screen. The full
ledger — what ran, what was only read —
is in `criteria.md`, and the transcripts
are in `nodered-lab/transcripts/`.
