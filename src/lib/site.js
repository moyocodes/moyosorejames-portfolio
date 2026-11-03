// Lets the search palette and hero links drive the interactive sections
// without threading props through the page.
const send = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }))

export const scrollToId = (id) => document.getElementById(id)?.scrollIntoView()

export function openProject(name) {
  send('site:project', name)
}
