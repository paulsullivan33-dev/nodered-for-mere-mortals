# Glossary

The terms this guide uses, collected in
one place. Each is explained in the
chapter that leans on it; these are the
short versions.

**Admin API** — the HTTP interface behind
the editor: listing and deploying flows,
firing inject buttons, logging in. The
lab drove Node-RED through it; anything
the editor can do, it can do.

**adminAuth** — the settings block that
puts a username and password on the
editor and Admin API.

**Broker** — the MQTT server that
receives published messages and hands
them to subscribers. Node-RED is a
client of one, never the broker itself.

**Config node** — a shared, behind-the-
scenes node describing a connection (an
MQTT broker, a database) once, for many
flow nodes to point at.

**Context** — Node-RED's notepad:
node-, flow-, and global-scoped values
kept between messages. In memory by
default; a file-backed store can make it
survive restarts.

**credentialSecret** — the passphrase in
settings that encrypts the flows' stored
credentials. Lose it, lose them.

**Deploy** — the act of making the drawn
flows live. Until Deploy, edits are a
sketch.

**Flow** — one job drawn as nodes on a
tab; also the tab itself, and the JSON
that describes it.

**Function node** — the node that holds
JavaScript for the logic the configured
nodes can't express.

**Inject node** — the button (and timer)
that starts a message by hand or on a
schedule.

**Message (`msg`)** — the object that
travels the wires. Its payload is the
point; its topic is a label; its `_msgid`
is Node-RED's stamp.

**MQTT** — the publish/subscribe
messaging protocol of small devices;
this series' MQTT guide is the deep dive.

**Node** — one box on the canvas: an
input, a processing step, or an output.
Comes from the core set or a community
package installed into the palette.

**Palette** — the editor's left-hand
library of available nodes, and the
manager for installing more.

**Payload** — `msg.payload`: the data a
message is *about*, whatever type the
last node left it as.

**Topic** — MQTT's address for a message
(`porch/light`), and by borrowing,
`msg.topic` on any message.

**User directory** — the folder
(`~/.node-red` by default) holding
flows, settings, and credentials. It is,
for backup purposes, the whole kingdom.

**Wire** — a connection between nodes.
A message sent travels to every node
wired from that output.
