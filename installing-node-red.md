# Installing Node-RED

**Scope:** getting Node-RED v5 onto a
machine and seeing it answer — the npm
route the project documents, what it
needs first, and where its files live.

## What it needs

Node-RED is a **Node.js** program, so the
one hard requirement is Node itself.
Node-RED 5 wants a currently supported
Node — version 20 or later; the lab ran
v24. Everything else (npm, the package
manager) arrives with Node.

Check what you have:

```bash
node --version
npm --version
```

**Check:** two version numbers. If `node`
is "command not found", install Node from
[nodejs.org](https://nodejs.org) first —
the LTS release is the right choice on
Windows, Mac, and Linux alike. On a
Raspberry Pi or a Debian/Ubuntu server,
your distribution's Node package is often
too old; the project's documentation
links a setup script for the Pi and
NodeSource packages for Debian-family
systems. Too-old Node is the commonest
install failure: Node-RED will refuse or
misbehave rather than explain.

## The install

The project's standard route is one npm
command, which puts `node-red` on your
path:

```bash
npm install -g node-red
```

(The lab, being a lab, installed it into a
scratch folder instead — `npm install
node-red`, then ran
`./node_modules/.bin/node-red`. Same
program, same version banner; the global
route is the one to live with.)

**Windows note:** the command is the
same, run in PowerShell or a terminal;
npm may need an *administrator* terminal
on some setups, and corporate antivirus
occasionally objects to npm's script
steps — a work machine is the hard mode
of this chapter.

## First run

```bash
node-red
```

**Check:** a banner and, within seconds,
lines like the lab's first start
(transcript `nodered-run1.log`):

```text
[info] Node-RED version: v5.0.9
[info] Node.js  version: v24.22.1
[info] Server now running at http://127.0.0.1:1880/
[info] Started flows
```

Open that address in a browser and the
editor appears — chapter 3 takes the
tour. Two things in the startup chatter
deserve a look now:

- **The user directory.** Node-RED keeps
  everything that is *yours* — flows,
  settings, credentials — in one folder,
  `~/.node-red` by default (on Windows,
  `C:\Users\<you>\.node-red`). The lab used
  `-u userdir` to keep its mess in a
  labelled place. Chapter 10 explains why
  this folder *is* the backup.
- **The credentials warning.** A first
  start prints a block warning that your
  flow credentials file is encrypted with
  a *system-generated key*, and that losing
  the key means losing the credentials.
  It is not an error. It is the program
  telling you to set `credentialSecret`
  yourself — chapter 9 does it.

Stop Node-RED with `Ctrl-C`. Nothing else
to configure yet: it is deliberately
pleasant out of the box, and deliberately
open — remember that anyone on your
network can now open the editor. Chapter
9 closes that door; until then, treat a
running Node-RED like a running stove.
