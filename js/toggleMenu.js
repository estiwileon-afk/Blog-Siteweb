export function toggleMenu() {
    const navMovil = document.getElementById("nav-movil");
    if (navMovil.classList.contains("clip-hide")) {
      navMovil.classList.replace("clip-hide", "clip");
    } else {
      navMovil.classList.replace("clip", "clip-hide");
    }
  }