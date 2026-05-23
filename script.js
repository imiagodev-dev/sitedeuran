const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const topBtn = document.getElementById("topBtn");
const glow = document.querySelector(".cursor-glow");

/* HEADER AO ROLAR */

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

/* MENU MOBILE */

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
  });
});

/* SCROLL SUAVE */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");

    if (id.length > 1) {
      event.preventDefault();

      document.querySelector(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* BOTÃO VOLTAR AO TOPO */

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ANIMAÇÃO REVEAL NO SCROLL */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

/* CONTADOR ANIMADO */

const counters = document.querySelectorAll("[data-target]");
let counted = false;

const countObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;

      counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        let current = 0;

        const speed = Math.max(12, Math.floor(1100 / target));

        const updateCounter = () => {
          current += Math.ceil(target / 70);

          if (current >= target) {
            counter.textContent = target;
            return;
          }

          counter.textContent = current;
          setTimeout(updateCounter, speed);
        };

        updateCounter();
      });
    }
  },
  {
    threshold: 0.35,
  }
);

countObserver.observe(document.querySelector(".numbers"));

/* GLOW ACOMPANHANDO O MOUSE */

if (matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  });
}

/* FILTROS DO PORTFÓLIO */

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });
});