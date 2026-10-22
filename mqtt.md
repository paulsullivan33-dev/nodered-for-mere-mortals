# Talking MQTT

**Scope:** connecting flows to an MQTT
broker — publishing, subscribing, and the
round trip proved in the lab — and where
the subject's own guide takes over.

**MQTT** is the household post service of
small devices: programs publish messages
to named *topics* at a central *broker*,
and anything subscribed to a topic
receives a copy. If the protocol itself
is new to you, this series' **MQTT for
Mere Mortals** guide is the deep dive.
This chapter is only about Node-RED's
two nodes for it.

## The shape

Two nodes and one shared configuration:

- **mqtt out** publishes `msg.payload`
  to a topic you name (or one taken from
  `msg.topic`).
- **mqtt in** subscribes to a topic and
  starts a message for each arrival.
- Both point at an **mqtt-broker** config
  node — the broker's address, port, and
  credentials, set once and shared by
  every MQTT node. Config nodes are the
  grey, behind-the-scenes entries in the
  editor; you'll meet them again wherever
  a connection needs describing once.

## The lab's round trip

The lab had no broker installed and its
package manager couldn't fetch one, so it
ran a pocket broker in pure JavaScript
(**aedes**; `examples/broker.js`) on
`127.0.0.1:1883` — a lab toy, and a fine
way to practise. Tab 5 then made a loop:

```text
[http in /porch?state=on] ─▶ [function] ─▶ [mqtt out  porch/light]
                                        └─▶ [http response]

[mqtt in  porch/light] ─▶ [debug "Porch traffic"]
```

One command walked the whole loop
(transcript `t08-mqtt.log`):

```bash
curl "http://127.0.0.1:1880/porch?state=on"
```

```text
{"published":"porch/light","state":"on"}     <- the web answer
broker saw publish: porch/light -> on        <- the broker's log
[info] [debug:Porch traffic] on              <- the subscription, receiving
```

The flow published to the broker and its
own subscription heard the message come
back — with an independent MQTT client
also round-tripping the same broker to
prove the broker itself honest. Publish
and subscribe are separate wires in
Node-RED; nothing obliges a publisher to
listen, and the lab listened mainly to
*show its working*.

## Practical notes

- **The connecting log line matters.**
  When Node-RED cannot reach the broker
  it retries about every fifteen seconds
  and logs
  `[mqtt-broker:...] Connection failed to broker`.
  During the lab that line meant the
  broker program itself was broken — the
  chapter 12 story. When you see it,
  believe it and go look at the broker.
- **Payloads arrive as strings by
  default.** The mqtt in node can also
  parse JSON for you ("Output: a parsed
  JSON object"); know which you've asked
  for before a function trips over it
  (chapter 4's type warning, in the
  wild).
- **Retained messages and QoS** are
  broker concepts with real consequences
  (a retained "off" from yesterday can
  greet a device today). The MQTT guide
  covers them properly; the nodes expose
  both as plain settings.
