/* The website works without JavaScript; these are visual enhancements only. */
(() => {
  "use strict";
  const root = document.documentElement;
  const terminal = document.querySelector(".window");
  const desktop = document.querySelector(".desktop");
  const restore = document.querySelector(".restore-terminal");
  const maximize = document.querySelector(".maximize");
  const motionButton = document.querySelector(".motion-toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const announcement = document.querySelector("#terminal-announcement");
  const panels = [...document.querySelectorAll(".project-info")];
  const frames = new Map();
  let paused = false;
  let previousFocus;
  try { paused = localStorage.getItem("portfolio-motion") === "paused"; } catch (_) { /* Storage may be unavailable. */ }
  const motionDisabled = () => paused || reducedMotion.matches;
  function finish(panel) {
    if (frames.has(panel)) cancelAnimationFrame(frames.get(panel));
    frames.delete(panel);
    panel.removeAttribute("data-loading");
    panel.removeAttribute("aria-busy");
    if (panel.open) panel.classList.add("is-ready");
  }
  function showProject(panel) {
    finish(panel);
    panel.classList.remove("is-ready");
    if (!panel.open) return;
    const code = panel.querySelector(".code-output");
    const sequence = `const project = await portfolio.open("${panel.dataset.project}");\n// ready — project notes loaded`;
    code.hidden = false;
    if (motionDisabled()) { code.textContent = sequence; finish(panel); return; }
    code.textContent = "";
    panel.setAttribute("data-loading", "");
    panel.setAttribute("aria-busy", "true");
    const start = performance.now();
    function type(now) {
      if (!panel.open) { finish(panel); return; }
      const progress = Math.min(1, (now - start) / 740);
      code.textContent = sequence.slice(0, Math.floor(sequence.length * progress));
      if (progress < 1) frames.set(panel, requestAnimationFrame(type));
      else {
        finish(panel);
        announcement.textContent = `${panel.closest("article").querySelector("h3").textContent} details ready.`;
      }
    }
    frames.set(panel, requestAnimationFrame(type));
  }
  panels.forEach(panel => panel.addEventListener("toggle", () => showProject(panel)));
  function configureMotion() {
    root.dataset.motion = motionDisabled() ? "paused" : "active";
    motionButton.hidden = reducedMotion.matches;
    motionButton.setAttribute("aria-pressed", String(paused));
    motionButton.textContent = paused ? "Motion: off" : "Motion: on";
    if (motionDisabled()) {
      for (const panel of panels) {
        if (frames.has(panel)) {
          panel.querySelector(".code-output").textContent = `const project = await portfolio.open("${panel.dataset.project}");\n// ready — project notes loaded`;
          finish(panel);
        }
      }
    }
  }
  motionButton.addEventListener("click", () => {
    paused = !paused;
    try { localStorage.setItem("portfolio-motion", paused ? "paused" : "active"); } catch (_) { /* Optional preference. */ }
    configureMotion();
  });
  reducedMotion.addEventListener("change", configureMotion);
  document.querySelectorAll(".traffic-light").forEach(button => { button.disabled = false; });
  function hideTerminal(event) {
    previousFocus = event.currentTarget;
    panels.forEach(finish);
    terminal.hidden = true;
    desktop.classList.add("has-hidden-window");
    document.body.classList.remove("window-expanded");
    maximize.setAttribute("aria-pressed", "false");
    maximize.setAttribute("aria-label", "Expand terminal");
    restore.hidden = false;
    restore.focus();
  }
  document.querySelector(".close").addEventListener("click", hideTerminal);
  document.querySelector(".minimize").addEventListener("click", hideTerminal);
  restore.addEventListener("click", () => {
    terminal.hidden = false;
    desktop.classList.remove("has-hidden-window");
    restore.hidden = true;
    (previousFocus || maximize).focus();
  });
  maximize.addEventListener("click", () => {
    const expanded = document.body.classList.toggle("window-expanded");
    maximize.setAttribute("aria-pressed", String(expanded));
    maximize.setAttribute("aria-label", expanded ? "Restore terminal size" : "Expand terminal");
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.body.classList.contains("window-expanded")) maximize.click();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      for (const panel of panels) {
        if (frames.has(panel)) {
          panel.querySelector(".code-output").textContent = `const project = await portfolio.open("${panel.dataset.project}");\n// ready — project notes loaded`;
          finish(panel);
        }
      }
    }
  });
  motionButton.hidden = false;
  configureMotion();
})();
