const tabList = document.querySelector(".demo-tabs");
const tabs = Array.from(tabList.querySelectorAll("button"));
const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

function selectTab(index, moveFocus = false) {
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[i].hidden = !selected;
    if (!selected) panels[i].querySelector("video").pause();
  });
  if (moveFocus) tabs[index].focus();
}

tabList.setAttribute("role", "tablist");
tabs.forEach((tab, index) => {
  tab.setAttribute("role", "tab");
  panels[index].setAttribute("role", "tabpanel");
  panels[index].setAttribute("aria-labelledby", tab.id);
  tab.addEventListener("click", () => selectTab(index));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(next, true);
  });
});
selectTab(0);
