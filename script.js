document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.menu-section');
  const nav = document.querySelector('.category-nav');
  let isManualClick = false;
  let clickTimeout = null;

  // Smooth scrolling for navigation links
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);

      // Immediately set active state on click and lock scroll-spy during smooth scroll animation
      isManualClick = true;
      clearTimeout(clickTimeout);
      setActiveLink(targetId);

      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const navHeight = nav ? nav.offsetHeight : 64;
          const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 10;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }

      // Unlock manual click after smooth scroll finishes
      clickTimeout = setTimeout(() => {
        isManualClick = false;
      }, 800);
    });
  });

  // Scroll spy function to activate the current category link
  function updateActiveLink() {
    if (isManualClick) return;

    const navHeight = nav ? nav.offsetHeight : 64;
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 1. If at the very top of the page, activate 'All'
    if (scrollPos < 80) {
      setActiveLink('top');
      return;
    }

    // 2. If scrolled near the bottom of the page (so last section 'water' is in view), activate last section
    if (windowHeight + scrollPos >= documentHeight - 120) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        setActiveLink(lastSection.getAttribute('id'));
        return;
      }
    }

    // 3. Otherwise, activate the last section whose top has scrolled past the nav.
    // Using "last section passed" instead of a narrow detection band means short
    // sections (e.g. V60, Water) never get skipped over.
    let activeSectionId = null;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navHeight + 40) {
        activeSectionId = section.getAttribute('id');
      }
    });

    setActiveLink(activeSectionId || 'top');
  }

  function setActiveLink(targetId) {
    links.forEach(link => {
      const isMatch = link.getAttribute('data-target') === targetId;
      const wasActive = link.classList.contains('active');
      link.classList.toggle('active', isMatch);

      // Auto-scroll horizontal category nav bar to keep active item centered
      if (isMatch && !wasActive && nav) {
        const navContainer = nav.querySelector('.nav-links');
        if (navContainer) {
          const linkLeft = link.offsetLeft;
          const linkWidth = link.offsetWidth;
          const containerWidth = navContainer.offsetWidth;
          navContainer.scrollTo({
            left: linkLeft - containerWidth / 2 + linkWidth / 2,
            behavior: 'smooth'
          });
        }
      }
    });
  }

  // Update active link on scroll and window resize
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink, { passive: true });

  // iOS/iPadOS Safari throttles or drops 'scroll' events during momentum
  // (inertial) touch scrolling, so relying on 'scroll' alone can leave a
  // section's nav link stuck un-highlighted after a fast flick. IntersectionObserver
  // is tracked by the browser independently of scroll-event timing, so back the
  // same updateActiveLink() check with observer callbacks as a reliable trigger.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(() => updateActiveLink(), {
      root: null,
      rootMargin: `-${(nav ? nav.offsetHeight : 64) + 1}px 0px -60% 0px`,
      threshold: 0
    });
    sections.forEach(section => observer.observe(section));
  }

  // Initial check on page load
  updateActiveLink();
});
