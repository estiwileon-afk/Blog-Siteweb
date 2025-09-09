export function scroll() {
    window.addEventListener("scroll", function () {
      const header = document.querySelector(".header");
      if (window.scrollY > 40) {
        header.classList.replace("scale-100", "scale-95");
        
      } else {
        header.classList.replace("scale-95", "scale-100");
      }
    });
    }