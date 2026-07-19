document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = Array.from(document.querySelectorAll('main section[id], footer[id]'));
  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const backToTop = document.querySelector('.back-to-top');
  const typedText = document.getElementById('typedText');

  const activateLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateLink(entry.target.id);
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        const href = link.getAttribute('href');
        if (href?.startsWith('#')) {
          const targetId = href.slice(1);
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 80);
    });
  });

  const phrases = ['Web Developer', 'UI Enthusiast', 'Future Software Engineer'];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeLoop = () => {
    if (!typedText) return;

    const current = phrases[phraseIndex];
    typedText.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex += 1;
      setTimeout(typeLoop, 90);
    } else if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(typeLoop, 60);
    } else {
      deleting = !deleting;
      if (!deleting) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(typeLoop, deleting ? 500 : 900);
    }
  };

  typeLoop();

  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 480);
    }
  });
});
