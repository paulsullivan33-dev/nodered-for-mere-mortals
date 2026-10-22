# Recipes

**Scope:** four small builds that combine
the previous chapters into the shapes
real flows take. Each is described as a
wiring list; all the parts are ones the
lab ran.

## 1. The five-minute heartbeat

*Know within minutes when a machine goes
quiet.*

```text
[inject: every 5 minutes] ─▶ [http request: the machine's page]
                          ─▶ [switch: status not 200]
                          ─▶ [mqtt out: alerts/heartbeat]
```

The *inject* node repeats on a schedule
as happily as it fires by hand, and the
*switch* node does the judging without a
line of code. Publish only failures, or
the alert channel teaches everyone to
ignore it.

## 2. A form on the wall

*A web page button that does one thing
in the house.*

Chapter 5's `/hello` pattern, pointed
inward: an *http in* at `/porch` (chapter
8's actual flow) that publishes one MQTT
message and answers the browser. Laminate
the address into a QR code by the door
and the porch light has a web switch.
Remember chapter 9: that endpoint is
open to your network unless you planned
otherwise.

## 3. The daily note, kept by the house

*Chapter 7's file flow, on a timer.*

```text
[inject: 07:00 daily] ─▶ [http request: weather or a sensor API]
                      ─▶ [function: one line, stamped]
                      ─▶ [file: append to notes.txt]
                      ─▶ [http in /notes] serves it back
```

The lab wrote kettle notes by hand;
scheduling the writer and serving the
file over HTTP are the same nodes in a
different order. A year of these lines is
a genuinely pleasant artefact.

## 4. Count, remember, report

*Chapter 7's counter, grown up.*

Any event — an *mqtt in* on a door
sensor, say — increments a flow-context
counter. A second flow reads the counter
on request (the lab's `/presses`), and a
third resets it at midnight with an
*inject* and a *change* node. With
persistent context on, the count survives
restarts; with it off, it doesn't, and
now you know which behaviour you're
choosing and why.
