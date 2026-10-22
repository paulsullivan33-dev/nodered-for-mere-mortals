# Writing Criteria

Every guide in this repo is written to the same
standard. If you're adding or editing a guide —
human or AI — hold it to these.

1. **Plain words, real ideas.** Simple language,
   never dumbed-down concepts. Explain jargon on
   first use; collect terms in the glossary.
2. **No hype.** No marketing adjectives, no
   "revolutionary," no promises about what
   something will do for the reader.
3. **Honest about limits.** Say what the thing
   *can't* do. State uncertainty instead of
   smoothing it over. Validation notes include
   what remains unverified.
4. **No invented numbers.** Benchmarks, defaults,
   and specs are either measured or qualified with
   "depends on your setup." If it wasn't tested,
   say so.
5. **Checkable.** Commands are meant to be run,
   with "Check:" blocks showing what success looks
   like. Sources are linked, not asserted.
6. **Respect the reader's setup.** Call out
   Windows/Mac/Linux differences. Don't assume a
   GPU, a budget, or prior experience.
7. **Safety isn't skipped.** Real risks get
   stated plainly, not buried.
8. **Scoped.** Each guide says what it covers and
   points elsewhere for the rest. No guide
   pretends to be the whole subject.
9. **Structure over prose.** Tables, before/after
   examples, symptom → fix. Scannable beats essay.

## Verification notes for this guide

Built and verified 2026-10-22 against
**Node-RED v5.0.9** (the npm package
current on build day), Node.js v24.22.1,
on Linux x64.

**Ran for real** (working files in the
lab folder beside this repo during the
build; transcripts in
`nodered-lab/transcripts/`): Node-RED was
installed with `npm install node-red`
into a scratch folder and run against a
dedicated user directory. Thirty-seven
nodes across six tabs were written as a
flow file (`examples/lab-flows.json`) and
deployed through the **Admin API** —
`POST /flows`, full deployment, HTTP 204 —
the same API the editor's Deploy button
uses. Then, with output captured:

- t01 — inject → debug, payload form: the
  runtime log printed the timestamp.
- t02 — inject → debug, whole message:
  the log printed `_msgid`, `payload`,
  and `topic`, the specimen chapter 4
  quotes.
- t03 — `GET /hello?name=Robin` →
  `{"message":"Hello, Robin!",...}`;
  without a name → "Hello, stranger!".
- t04 — the function transform turned
  "the porch light is on" into
  `{ original, shouted: "THE PORCH LIGHT
  IS ON", words: 5 }`.
- t05 — two inject presses appended two
  timestamped lines via the file node;
  the file was then read from disk with
  `cat`, not via Node-RED.
- t06 — `GET /notes` (file in node)
  returned exactly those lines.
- t07 — three presses of the counter
  flow; `GET /presses` → `{"presses":3}`.
- t08 — MQTT: the sandbox's apt could not
  locate mosquitto, so the broker was
  **aedes 1.2.0** (`examples/broker.js`),
  a pure-JavaScript broker on
  127.0.0.1:1883. `GET /porch?state=on`
  published `porch/light`, the broker
  logged it, and the same flow's mqtt-in
  node received it (debug line in the
  runtime log); an independent mqtt.js
  client also round-tripped the broker.
- t09 — restart: all 37 flows returned
  from `flows.json` untouched; the
  memory context counter reset 3 → 0,
  exactly the documented default.
- t10 — `adminAuth` switched on with a
  bcrypt hash made by `node-red admin
  hash-pw`: unauthenticated `GET /flows`
  → 401, wrong password → 401, correct
  password → Bearer token, token read
  all 37 flows and fired inject buttons.
  With `contextStorage` set to
  localfilesystem, the counter then
  survived a restart (2 → 2).
- t11 — Node-RED run under a **systemd
  unit**: `systemctl is-active` →
  active, endpoints answering, and after
  a deliberate `systemctl restart` the
  persistent counter still read 2.

**Failures kept, because they teach:**
the first aedes broker used the
library's pre-1.x call shape and
accepted TCP connections without ever
completing an MQTT handshake (Node-RED's
`Connection failed to broker` retried
every ~15 s in `nodered-run1.log`); a
hand-written minimal `settings.js` that
omitted `flowFile` made Node-RED invent
`flows_<hostname>.json` and start empty
(the original flows were never deleted);
and `/auth/token` 401s without a
`client_id` field even for the correct
password. Chapters 9 and 12 tell all
three as they happened.

**Documented only, and labelled as such
in the chapters:** the editor's visual
use. Its page was fetched (HTTP 200,
title "Node-RED") and every lab flow was
built, deployed, and exercised through
the Admin API, but no browser clicked
through it on the bench — the drawing
instructions in chapters 3 and 5 are
written from the deployed flow files,
and importing `examples/lab-flows.json`
reproduces the exact screens. Also
documented only: the global
`npm install -g` route (the lab installed
locally; same package, same banner), the
project's Pi/Debian installer script and
Docker image (chapter 10), Windows and
macOS service wrappers, palette installs
beyond the core node set, Projects (git
integration), and `httpNodeAuth`.

**Fixtures:** the greeting name "Robin",
the sentence about the porch light, the
kettle note, and the lab admin account
are invented for the lab. The password
hash and access tokens appear in no file
in this repo.
