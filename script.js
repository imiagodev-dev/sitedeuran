const WHATSAPP_NUMBER = '5531980530926';
const WHATSAPP_MESSAGE = 'Olá! Quero solicitar um orçamento para um site profissional da Deuran Code.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

document.querySelectorAll('.js-whatsapp').forEach((link) => {
  link.setAttribute('href', whatsappUrl);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobileMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#mobileMenu a').forEach((item) => {
  item.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const header = document.querySelector('#header');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
};

updateHeader();

window.addEventListener('scroll', updateHeader, { passive: true });

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const button = item.querySelector('button');

  button.addEventListener('click', () => {
    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove('active');
      }
    });

    item.classList.toggle('active');
  });
});

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  observer.observe(element);
});

window.addEventListener('click', (event) => {
  const clickedOutside = !mobileMenu.contains(event.target) && !menuToggle.contains(event.target);

  if (clickedOutside && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});