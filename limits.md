# Limits

**Scope:** what Node-RED cannot do, or
does badly, stated before you build on
the wrong assumption.

- **One runtime, one thread of logic.**
  Node-RED executes flows on Node.js's
  event loop. It juggles thousands of
  sleepy messages beautifully; one
  function node doing heavy arithmetic
  stalls *every* flow while it thinks.
  Number-crunching and bulk data belong
  in a program a flow *calls*, not in the
  flow.
- **Memory is the default memory.**
  Context forgets at restart unless you
  opt into the file store (chapter 7),
  and even that store flushes on a delay.
  A flow is not a ledger; anything
  resembling records belongs in a file
  you designed or a real database.
- **Ordering is weaker than it looks.**
  Wires fan out in parallel; two branches
  finish in whatever order they finish.
  Flows that quietly assume "this branch
  first" work in testing and lie in
  production. The *join* node exists
  because this is a real problem.
- **The function node is a sandbox with
  the door unlocked.** Sandboxed globals,
  yes — but a function is arbitrary code
  running as the Node-RED user. Combined
  with an editor anyone can reach, that
  is why chapter 9 is not optional.
- **Community nodes are other people's
  code.** The palette's library is the
  ecosystem's glory and its supply chain.
  Installed nodes run with full runtime
  privileges. Install like you would
  install software — because you are.
- **It is one process on one machine.**
  No clustering, no failover, no queue
  that survives the box dying. For a
  house, that's proportionate. For
  anything whose silence costs money,
  it's the wrong tool, and chapter 13's
  neighbours won't save it either.
- **Versions move.** Node-RED 5 is
  current as this guide was built; major
  versions occasionally retire nodes or
  change defaults. The lab's gotchas in
  chapter 12 include one caused by a
  *library* changing its API under a
  familiar name — pin your important
  installs and read upgrade notes before,
  not after.
