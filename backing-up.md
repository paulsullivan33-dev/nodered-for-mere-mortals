# Backing Up

**Scope:** what "a Node-RED backup"
actually is — a short list of files in
one folder — and the one item everyone
forgets until it costs them.

## The whole truth, in one folder

Node-RED keeps everything that is yours
in its **user directory** (`~/.node-red`
unless you changed it). The lab's whole
existence — six flows, their settings,
the counter's memory — fit in that one
folder, and every restart in the previous
chapters was quietly a restore test:
kill the process, start it against the
folder, everything returns.

The files that matter:

| File | What it is |
| --- | --- |
| `flows.json` | your flows, exactly as deployed |
| `flows_cred.json` | the flows' stored secrets, encrypted |
| `settings.js` | your configuration — including `adminAuth` and `credentialSecret` |
| `context/` | the persistent context store, if you enabled it |
| `node_modules/`, `package.json` | extra nodes you installed from the palette |

A backup is: **stop Node-RED (or accept a
heartbeat's worth of staleness), copy the
folder, keep the copy somewhere else.**
Restore is the same journey backwards.
The lab's transcripts are, in effect, a
dozen small demonstrations that a started
Node-RED against an intact user directory
is the whole product back.

## The item everyone forgets

`credentialSecret`. If your flows store
any credentials — a broker password, an
API token — they sit in `flows_cred.json`
encrypted with that key. A backup of the
folder *without* the key is a backup of
everything except your secrets, and you
find out on restore day, when nodes ask
you to re-enter credentials you may no
longer remember.

Two ways to not lose it, pick one
deliberately:

- Keep `credentialSecret` set in
  `settings.js` (chapter 9) — then the
  key travels inside the backup folder,
  and protecting the backup protects
  both. Simple, and the usual household
  answer.
- Or keep the secret in a password
  manager and note beside it which
  backup it belongs to. Better hygiene,
  one more thing to keep track of.

## What a backup is not

- **Not version control.** `flows.json`
  is one file that changes at every
  deploy. For history — "what did this
  flow look like last month, and why did
  I change it" — the editor's **Projects**
  feature puts the user directory under
  git. The lab left projects off (its
  startup log says so); enabling them is
  a settings change, and worth it once
  flows stop being toys.
- **Not the machine.** Node itself, the
  service unit, and the extra npm modules
  all need reinstalling on a new box —
  `package.json` in the backup is what
  makes that a ten-minute job instead of
  an archaeology dig.
