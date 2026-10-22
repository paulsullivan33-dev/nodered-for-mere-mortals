# Files and Context

**Scope:** Node-RED's two kinds of memory
— files on the disk, which it reads and
writes like any program, and *context*,
its own notepad — including which one
survives a restart, proved by restarting.

## Writing and reading files

Two nodes do the work. The *file* node
writes `msg.payload` to a named file —
append or overwrite, your choice per
node. The *file in* node reads a file
into `msg.payload`.

The lab's tab 4 chains both directions of
travel:

```text
[inject "the kettle has boiled"]
   ─▶ [function: stamp the time] ─▶ [file: append] ─▶ [debug]

[http in /notes] ─▶ [file in] ─▶ [http response]
```

After two presses, the file on disk —
checked with plain `cat`, not taken on
Node-RED's word:

```text
2026-10-22T23:40:52.241Z - the kettle has boiled
2026-10-22T23:40:52.288Z - the kettle has boiled
```

and `GET /notes` returned those same two
lines to the browser (`t01-t08-tests.log`).
That is the whole pattern behind a family
of useful flows: log lines, daily reports,
a CSV of sensor readings — things happen,
a function formats them, a file keeps
them. Two honest warnings:

- **Paths are the machine's paths.** A
  file node writes as the user Node-RED
  runs as, to a path on *that* machine.
  Relative names resolve against the
  folder Node-RED started from, which is
  a fine way to lose a file; the lab used
  an absolute path, and so should you.
- **Appending is not a database.** Two
  flows writing one file at the same
  moment can interleave. For a household
  log this is a shrug; for anything that
  matters, it is chapter 14's limit.

## Context: the notepad

Sometimes a flow needs to *remember*
between messages: a counter, the last
reading, "did I already send that alert".
That is **context**, in three scopes:

| Scope | Shared by | Set with |
| --- | --- | --- |
| node | one node's calls | `context.get/set` in a function |
| flow | every node on the tab | `flow.get/set` |
| global | the whole runtime | `global.get/set` |

The lab's tab 6 counts presses in flow
context and serves the total over HTTP:

```javascript
let n = flow.get("presses") || 0;
n = n + 1;
flow.set("presses", n);
msg.payload = { presses: n };
return msg;
```

Three presses, and `GET /presses` said
`{"presses":3}` (t01–t08). Then the lab
restarted Node-RED and asked again:
`{"presses":0}` (transcript
`t09-restart1.log`).

That is the default: **context lives in
memory and a restart forgets it.** The
flows themselves — all 37 nodes — came
back untouched, because flows are a file.
Context is not, until you tell it to be.

## Making context survive

One settings block (chapter 9 shows the
file it lives in) changes the store:

```javascript
contextStorage: {
    default: {
        module: "localfilesystem",
        config: { cache: true }
    }
}
```

With that set, the startup log names the
store — `[info] Context store : 'default'
[module=localfilesystem]` — and the lab
re-ran the experiment: two presses, a
restart, and `GET /presses` still said
`{"presses":2}` (t10, t11 — the second
restart was a full `systemctl restart` of
the service for good measure). Context is
kept as small files under the user
directory's `context/` folder.

Persistent context is still a notepad,
not a ledger: values are written on a
short delay, so a hard power cut can lose
the last few seconds, and there is no
transaction keeping two related values
consistent. Counters, last-known states,
and "already notified" flags are its
natural citizens.
