// Tiny cross-panel handoff: HeroPanel (or anywhere else) can request that the
// Projects carousel open on a specific project when it next activates.
//
// Consumed on a delay rather than immediately: React 18 StrictMode
// double-invokes effects in dev (mount → cleanup → mount again, synchronously
// in the same tick), so a "consume and clear on read" design loses the
// request on the second invocation. Clearing on a macrotask instead means
// both StrictMode invocations still see it, but it's gone before any later,
// genuinely separate activation (always async relative to the click that set it).
let requested = null

export function requestProject(name) {
  requested = name
  setTimeout(() => {
    requested = null
  }, 0)
}

export function consumeRequestedProject() {
  return requested
}
