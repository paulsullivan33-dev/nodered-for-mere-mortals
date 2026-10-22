# Running It for Real

**Scope:** from a program you start by
hand to a service the machine starts for
you — the systemd shape, proved live in
the lab — and the settings that make a
deployment boring in the good way.

## Why a service at all

`node-red` in a terminal dies with the
terminal. A service manager — **systemd**
on most Linux systems — starts it at
boot, restarts it after a crash, and
collects its logs in one place. The
project also documents installers (its
Raspberry Pi / Debian script creates a
service for you, and there are official
Docker images); this chapter shows the
unit file itself, because the lab
verified exactly that and because every
managed install ends up looking like it.

## A systemd unit

The lab ran Node-RED under this unit
(transcript `t11-systemd.log`):

```ini
[Unit]
Description=Node-RED
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi
ExecStart=/usr/bin/node-red -u /home/pi/.node-red
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

(Paths and the user are the lab's shape
translated to a typical Pi home; the
running copy in the lab pointed at its
own folder. Adjust all three to your
machine — `ExecStart` must be the full
path to `node-red`, findable with
`which node-red`.)

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now nodered
systemctl status nodered
```

**Check:** `active (running)`, and the
flows answering as before. The lab's
service-run instance served `/hello`,
`/presses` — with the persistent counter
still at 2 — and survived a deliberate
`systemctl restart`, coming back with
flows and context intact.

Three service habits:

- **One user, on purpose.** Node-RED's
  powers are the powers of the account it
  runs as. A dedicated unprivileged user
  is the right default; root is a
  decision, not a default.
- **Logs live in the journal:**
  `journalctl -u nodered -f` follows them.
  The debug-to-console setting from
  chapter 3 earns its keep here.
- **`Restart=on-failure`, not `always`.**
  A flow that crashes the runtime at
  startup will loop forever under
  `always`, filling the journal with the
  same error; `on-failure` plus a human
  is the calmer failure mode.

## Elsewhere

- **Windows and Mac:** Node-RED runs
  happily in a terminal, and both
  platforms have their own service
  wrappers (the project documents running
  it at login on macOS and as a Windows
  service via NSSM-style tools).
  Documented, not lab-verified — the lab
  was Linux-only.
- **Docker:** the official `nodered/node-red`
  image exists and is the tidy route on a
  machine already running containers: the
  user directory becomes a volume, which
  makes chapter 11's backup a folder copy.
  Also documented here, not run — this
  guide's lab deliberately kept one
  install shape and did it thoroughly.
