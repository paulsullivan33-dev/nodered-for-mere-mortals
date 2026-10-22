# The Neighbours

**Scope:** the tools Node-RED is most
often confused with or chosen against,
and the honest trade each one makes.

## Home Assistant

The closest neighbour, and usually a
housemate rather than a rival. **Home
Assistant** (this series has a guide) is
a *home-automation system*: it knows what
a light, a lock, and a household are, and
its built-in automations cover most
household logic. Node-RED is the wiring
bench: people reach for it when an
automation outgrows trigger-condition-
action — long chains, odd data, several
systems at once — and run it *alongside*,
with Home Assistant exposing devices to
it over MQTT or its own nodes. Rule of
thumb: if the sentence starts with a
device, start in Home Assistant; if it
starts with data, start here.

## n8n and the workflow services

**n8n** is Node-RED's cloud-flavoured
cousin: the same draw-the-flow idea
pointed at business services — mail,
spreadsheets, CRMs, webhooks — with
hundreds of polished service integrations
and a licensing model to read before
building anything commercial on it.
Hosted services (Zapier, Make, IFTTT)
remove the server entirely and charge by
the task. The trade is uniform: they are
better connected to other people's
software and worse at being *yours* — a
flow in Node-RED runs on your Pi, at your
pace, owing nobody a per-run fee, and it
will still run when a pricing page
changes its mind.

## Cron and a script

The oldest neighbour. A timer plus a
shell script does a large fraction of
what beginners build flows for, and if
you already write scripts fluently, the
marginal flow must earn its canvas.
Node-RED wins when the job is *several*
events, some judgement in the middle, and
a state to remember — and when the next
person to maintain it would rather read
a drawing than your bash. It loses,
happily, when the job is one command at
6 a.m.

## Plain code

A small Node.js or Python program is a
flow with the canvas removed: same
events, same logic, better version
control, worse visibility. Programmers
underestimate how much of a flow's value
is that a non-programmer in the house can
*see* it. Households have more maintainers
than they think.
