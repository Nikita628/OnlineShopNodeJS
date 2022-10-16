const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#side-menu-toggle");
const html = document.querySelector("html");
const themeToggler = document.querySelector(".theme-toggler");

function backdropClickHandler() {
  backdrop.style.display = "none";
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  backdrop.style.display = "block";
  sideDrawer.classList.add("open");
}

backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);
themeToggler.addEventListener("click", toggleTheme);

function toggleTheme() {
  if (!html) {
    return;
  }

  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  const currentTheme = html.getAttribute("theme");

  const themeToSet = currentTheme === "dark" ? "light" : "dark";

  fetch("/toggle-theme", {
    credentials: "same-origin",
    headers: {
      "CSRF-Token": token,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      theme: themeToSet,
    }),
  })
    .then(() => {
      html.setAttribute("theme", themeToSet);
    })
    .catch((err) => {
      console.log(err);
    });
}
