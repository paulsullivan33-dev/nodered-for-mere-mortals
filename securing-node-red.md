# Securing the Editor

**Scope:** the door and how to close it —
an editor password with `adminAuth`, your
own credentials key, and the plain truth
about what this does and doesn't protect.

## The problem, stated plainly

A fresh Node-RED asks no questions.
Anyone who can open
`http://your-machine:1880/` can edit the
flows, deploy them, and — through
perfectly ordinary nodes — read files the
Node-RED user can read and run a great
deal else. On a desk machine behind your
home router, the exposure is your
household. The moment the port is
reachable from anywhere wider — a port
forward, a VPS, a work network — an open
editor is an open machine. **Do not
port-forward an unsecured editor.** This
chapter is short because the fix is
short; skip the rest of the guide before
skipping this.

## A password on the editor

Two steps. First, hash a password:

```bash
node-red admin hash-pw
```

It prompts (`Password:`), and prints a
**bcrypt** hash — a one-way scramble, not
the password itself. (Piping a password
in works too, which is how the lab did
it.) Second, put an `adminAuth` block in
the settings file — `~/.node-red/settings.js`,
the file the startup log names — and
restart Node-RED:

```javascript
adminAuth: {
    type: "credentials",
    users: [{
        username: "admin",
        password: "$2y$08$...your hash...",
        permissions: "*"
    }]
},
```

`examples/settings-snippet.js` holds the
lab's whole settings file with the hash
replaced by a placeholder.

**Check:** the lab tested all three doors
(transcript `t10-adminauth.log`):

```text
GET /flows, no token        -> 401 Unauthorized
POST /auth/token, wrong pw  -> 401 Unauthorized
POST /auth/token, right pw  -> a Bearer token;
GET /flows with it          -> all 37 nodes
```

The editor in a browser simply shows a
login prompt and then behaves as before.
(The API detail the lab tripped on: a
token request must name
`client_id: "node-red-editor"`, or the
401s continue even with the right
password — chapter 12 tells it as a
troubleshooting story.)

Permissions can be narrowed — `"read"`
gives a look-but-don't-touch account,
which suits a shared dashboard machine —
and multiple users can be listed.

## Your own credentials key

While the settings file is open, fix the
warning from chapter 2: set

```javascript
credentialSecret: "a-passphrase-you-choose-and-keep"
```

Flows can store secrets (a broker
password, an API key) in encrypted
*credentials*. This phrase is the key
that decrypts them. Lose it and the
credentials are gone — which is the point
of setting one you chose over one the
system generated silently. It belongs in
your password manager and in the backup
(chapter 11), not in git.

## What this does not do

- **It is not encryption on the wire.**
  Logins travel over plain HTTP. On your
  own network that may be acceptable;
  beyond it, put Node-RED behind a
  reverse proxy with HTTPS, or reach it
  through a VPN or Tailscale — the networking
  guides in this series cover those
  shapes, and they are the right layer
  for the job.
- **Your flow endpoints are still open.**
  `adminAuth` guards the *editor and
  admin API*. The `/hello` and `/notes`
  addresses from earlier chapters answer
  anyone who can reach them, password or
  no. A separate setting, `httpNodeAuth`,
  puts one shared password on those, or
  you design endpoints knowing they're
  public to the network. Decide per flow,
  on purpose.
- **It doesn't sandbox your flows.** A
  logged-in editor user is trusted
  completely. The password sorts strangers
  from editors; it does not sort editors
  from each other.
