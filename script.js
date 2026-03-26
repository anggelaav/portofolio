(function() {
  const themeBtn = document.getElementById('theme-toggle');
  
  const updateButtonUI = () => {
    const isDark = document.body.classList.contains('dark-mode');
    const themeSpan = document.getElementById('theme-text');
    
    if (isDark) {
      themeBtn.innerHTML = '<i class="fas fa-sun"></i> <span id="theme-text">Light Mode</span>';
    } else {
      themeBtn.innerHTML = '<i class="fas fa-moon"></i> <span id="theme-text">Dark Mode</span>';
    }
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  };
  
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  updateButtonUI(); 
  
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      updateButtonUI();
    });
  }
  
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const sections = document.querySelectorAll('.cv-section, .cv-header');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
})();