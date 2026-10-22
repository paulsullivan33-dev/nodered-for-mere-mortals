# Troubleshooting

**Scope:** the failures this guide
actually met, plus the classics — each as
symptom, cause, fix. Half of these were
found the honest way, in the lab, and the
transcripts are named so you can watch
them happen.

## The broker won't connect

**Symptom:** the log repeats, about every
fifteen seconds,
`[mqtt-broker:Lab broker] Connection failed to broker: mqtt://127.0.0.1:1883`.

**Cause:** Node-RED cannot complete an
MQTT handshake. In the lab the broker
program itself was faulty — it accepted
TCP connections and then never spoke
MQTT — but the usual causes are duller: broker
not running, wrong port, wrong address,
a firewall.

**Fix:** believe the log line and test
the broker without Node-RED — a command
line client (`mosquitto_sub`), a second
program, anything. A broker that answers
another client will answer Node-RED.
(`t08-mqtt.log`, and the failures are in
`nodered-run1.log`.)

## My flows vanished after I edited settings

**Symptom:** after a restart, the editor
opens empty. Nothing you built is there.

**Cause:** the settings file no longer
names your flows file. Without
`flowFile`, Node-RED generates one from
the machine's hostname — the lab's log
says it outright: `Flows file name not
set. Generating name using hostname`,
followed by `Creating new flow file` for
a `flows_<hostname>.json`. Your real
`flows.json` was never touched.

**Fix:** set `flowFile: "flows.json"` in
settings, restart, breathe. Then make the
chapter 11 backup.

## The password is right but the API says 401

**Symptom:** `POST /auth/token` returns
`401 Unauthorized` even with the correct
username and password, sent as JSON or as
a form.

**Cause:** the request didn't name the
client. Node-RED's token endpoint expects
`client_id: "node-red-editor"` alongside
the grant — the editor sends it silently,
so hand-rolled requests meet a wall
that looks exactly like a bad password.

**Fix:** add the `client_id` field. The
lab's transcript (`t10-adminauth.log`)
shows the 401s and then the token.

## "Port 1880 is already in use"

**Symptom:** startup dies with an
`EADDRINUSE` error.

**Cause:** a Node-RED (or something else)
is already listening — commonly the one
you forgot was running as a service while
you test one by hand.

**Fix:** find it (`ss -ltnp | grep 1880`
on Linux, or just open the address in a
browser and say hello to yourself), stop
one of them, and keep the service as the
single source of truth.

## The debug pane shows nothing

**Symptom:** messages flow — other nodes
react — but the debug sidebar is silent.

**Cause, in order of embarrassment:** the
debug node is switched off (its little
button toggles it); it's set to a
different output than you think (payload
vs complete message); or you're looking
at the sidebar of a *different* editor
tab's runtime. In the lab, debug nodes
were also set to mirror to the console,
which is the fix when the sidebar itself
is the thing you can't reach.

## A node is a grey box with a warning triangle

**Symptom:** after importing a flow, some
nodes show as unknown.

**Cause:** the flow uses nodes from a
palette package your runtime doesn't
have. Import never installs code for
you (chapter 14 explains why that's a
feature).

**Fix:** the editor's palette manager
names what's missing; install it
deliberately, restart, redeploy.

## Credentials stopped decrypting

**Symptom:** after moving a user
directory to a new machine, flows run but
every stored secret is blank, and the log
warns about credentials.

**Cause:** `credentialSecret` didn't make
the journey — the secrets are encrypted
with a key the new home doesn't have.

**Fix:** there isn't one after the fact;
that's the encryption working. Restore
the key from wherever chapter 11 told
you to keep it, or re-enter the
credentials.
