# Functions and Transforms

**Scope:** the function node without
mystery — what the code receives, what it
must hand back — and the no-code nodes to
reach for first.

## Reach for the boring node first

Most message surgery has a dedicated node:

| Job | Node |
| --- | --- |
| Set, change, move, or delete a property | **change** |
| Send a message one of several ways by rules | **switch** |
| Pick a slice out of a string or fields out of an object | **change** or **json** |
| Reshape text with placeholders (`{{payload.name}}`) | **template** |
| Parse or produce JSON text | **json** |
| Slow, queue, or rate-limit | **delay** |

These are configured, not coded: no
syntax to get wrong, and the next reader
can see the intent on the canvas. The
*function* node is for the residue — real
logic. There is less residue than
beginners think.

## The function node, honestly

A function node holds JavaScript that
runs once per message. It is given `msg`
and must `return msg` (or return nothing,
to swallow the message). Returning an
array sends to multiple outputs.

The lab's transform (tab 3) takes a
sentence and reports on it:

```javascript
const text = String(msg.payload);
msg.payload = {
    original: text,
    shouted: text.toUpperCase(),
    words: text.trim().split(/\s+/).length
};
return msg;
```

Fed `the porch light is on`, the debug
log kept the result (`t01-t08-tests.log`):

```text
{
  original: 'the porch light is on',
  shouted: 'THE PORCH LIGHT IS ON',
  words: 5
}
```

Three rules of the house:

- **The function replaces what it
  returns.** If you build a fresh object,
  the topic and anything else you cared
  about must be carried across by you —
  the lab's hello function *replaces*
  `msg.payload` but leaves the rest of
  `msg` standing, which is the safer
  habit.
- **`node.warn()` is your printf.** It
  prints to the log and debug sidebar
  without disturbing the flow. Combined
  with debug nodes, it means a function
  never has to be debugged blind.
- **Errors stop the message, not the
  world.** A thrown error is caught by
  any *catch* node on the tab, or logged.
  One bad message should not take the
  other flows down with it — and in
  Node-RED, it doesn't.

## Two small print items

Functions run in a sandboxed context:
`require` is not freely available (a
settings file can bless specific modules
— chapter 9's territory), and each call
gets a fresh scope unless you deliberately
use context, which is the next chapter's
subject. And a function is code: it can be
wrong in ways a change node cannot. Keep
functions short, name them after the job,
and let the canvas carry the story.
