# Nodes, Wires, and Messages

**Scope:** the vocabulary everything else
uses — the families of nodes, what a wire
really promises, and the message object
opened up, with the lab's whole-message
debug output as the specimen.

## The families

Nodes sort into three roles:

- **Inputs** start messages: *inject* (a
  button, or a schedule), *http in* (a web
  request arrived), *mqtt in* (a message
  on a topic), *file in*, and many more
  from the palette and the community
  library.
- **Processing** nodes change, route, or
  judge messages: *function* (JavaScript),
  *change* (set or move properties without
  code), *switch* (route by rules), *split*
  and *join* (take arrays apart and put
  them back), *template*, *delay*, and
  friends.
- **Outputs** finish the job: *debug*,
  *http response*, *mqtt out*, *file*
  (write), and the wider world's nodes.

A wire promises only this: when a node
sends a message, a copy travels to every
node wired from that output, in parallel.
There is no queue and no memory in a
wire; order between branches is not
guaranteed. Most beginner surprises live
in that sentence.

## The message

Everything travels as one JavaScript
object named `msg`. The lab pressed an
inject button wired to a debug node set
to *complete message object*, and the log
kept the specimen (transcript
`t01-t08-tests.log`):

```text
{
  _msgid: '81c002c326361d4d',
  payload: 'hello from the inject node',
  topic: 'greeting'
}
```

Three properties do nearly all the work,
across every node in this guide:

| Property | What it holds |
| --- | --- |
| `msg.payload` | the point of the message: a string, a number, a parsed JSON object, whatever the last node put there |
| `msg.topic` | a label, often the route the message took — MQTT's topic, or one you set yourself |
| `msg._msgid` | Node-RED's own tracking stamp; you read it, you never set it |

Nodes are allowed to add more — an *http
in* node adds `msg.req` and `msg.res`
(the request and response), a *file in*
adds `msg.filename` — and the convention
is that a node documents what it adds and
otherwise leaves the parcel alone. When
in doubt, debug the *whole* message, not
just the payload: chapter 3's debug node
has a setting for exactly that, and it is
the difference between guessing and
looking.

## A word about payloads and types

`msg.payload` has no fixed type, and that
is both the freedom and the trap. An
*mqtt in* node can hand you a string,
a parsed object, or a raw buffer
depending on its settings; a *file in*
can give you one long string or a stream
of chunks. Flows that work in the editor
and fail in the world usually fail here:
a node downstream expected an object and
got a string. The *json* node converts
between the two, deliberately; automatic
conversions elsewhere are conveniences
to verify, not to trust.
