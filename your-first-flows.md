# Your First Flows

**Scope:** two flows that between them
cover the daily repertoire — a button that
makes a message, and a web address that
answers — both built and called for real
in the lab.

## Flow one: press, see

The smallest honest flow is two nodes:

```text
[inject] ────▶ [debug]
```

Configure the *inject* node with a
*payload* of the string
`hello from the inject node` and a *topic*
of `greeting`. The *debug* node, at
first, shows just the payload — click the
inject node's button (in the editor, or
the **Deploy**-then-press ritual) and the
sidebar shows your sentence.

Now change the debug node to output the
**complete message object** and press
again. You get the specimen from chapter
4 — the `_msgid`, the payload, the topic.
This pair of nodes is the laboratory
bench of Node-RED: any time you wonder
what is travelling down a wire, the
answer is to wire a debug node onto it
and look.

**Check:** in the lab, the same presses
were fired through the editor's API and
the runtime log kept them
(`t01-t08-tests.log`): the timestamp
inject printed its milliseconds number,
and the string inject printed the whole
message above.

## Flow two: a web address that answers

Three nodes make a tiny web service:

```text
[http in  /hello] ─▶ [function] ─▶ [http response]
```

- **http in** — method `GET`, URL
  `/hello`. This node *starts* a message
  when the address is visited, and holds
  the response open: the flow **must**
  end at an *http response* node or the
  visitor's browser hangs until it times
  out. The pair of them is one idea in
  two boxes.
- **function** — builds the answer. The
  request's query string is at
  `msg.req.query`, so `?name=Robin`
  arrives ready-parsed (chapter 6 reads
  this code line by line):

```javascript
const name = (msg.req.query.name || "stranger");
msg.payload = {
    message: "Hello, " + name + "!",
    servedBy: "Node-RED",
    when: new Date().toISOString()
};
return msg;
```

- **http response** — sends `msg.payload`
  back as JSON and closes the visit.

Deploy, then try it:

```bash
curl "http://127.0.0.1:1880/hello?name=Robin"
curl "http://127.0.0.1:1880/hello"
```

**Check:** the lab's answers, verbatim
(`t01-t08-tests.log`):

```text
{"message":"Hello, Robin!","servedBy":"Node-RED","when":"2026-10-22T23:40:52.206Z"}
{"message":"Hello, stranger!","servedBy":"Node-RED","when":"2026-10-22T23:40:52.218Z"}
```

You have, at this point, written a web
service: it takes an input, computes, and
answers in JSON. Everything in the next
chapters is this shape with better
insides — real transforms, files, memory,
and other people's systems on the other
end of the wire.
