const emblem = document.querySelector(".copilot-emblem");
const stage = document.querySelector(".copilot-stage");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionFrame;

function resetEmblem() {
  cancelAnimationFrame(motionFrame);
  emblem.style.removeProperty("--tilt-x");
  emblem.style.removeProperty("--tilt-y");
}

document.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches || event.pointerType === "touch") return;
  const { clientX, clientY } = event;
  cancelAnimationFrame(motionFrame);
  motionFrame = requestAnimationFrame(() => {
    const bounds = stage.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (clientX - (bounds.left + bounds.width / 2)) / (window.innerWidth / 2)));
    const y = Math.max(-1, Math.min(1, (clientY - (bounds.top + bounds.height / 2)) / (window.innerHeight / 2)));
    emblem.style.setProperty("--tilt-x", `${-y * 14}deg`);
    emblem.style.setProperty("--tilt-y", `${x * 18}deg`);
  });
});

document.addEventListener("pointerout", (event) => {
  if (!event.relatedTarget) resetEmblem();
});
window.addEventListener("blur", resetEmblem);
reducedMotion.addEventListener("change", resetEmblem);
