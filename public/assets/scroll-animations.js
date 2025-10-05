// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
  // Elements to animate
  const animatedElements = document.querySelectorAll([
    '.fade-in',
    '.slide-in-left',
    '.slide-in-right',
    '.slide-in-up',
    '.slide-in-down',
    '.scale-in',
    '.section-title',
    '.contact-detail',
    '.footer',
    'img'
  ].join(', '));
  
  // Staggered animation containers
  const staggerContainers = document.querySelectorAll('.stagger-animation');
  
  // Options for the Intersection Observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% of element is visible
  };
  
  // Create the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If this is a stagger container, activate its children
        if (entry.target.classList.contains('stagger-animation')) {
          entry.target.classList.add('active');
        }
        
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Observe stagger containers
  staggerContainers.forEach(container => {
    observer.observe(container);
  });
  
  // Special handling for hero section - animate immediately
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    // Small delay to ensure smooth transition
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Animate elements with staggered delays
  const animateWithDelay = (elements, baseDelay = 100) => {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('active');
      }, baseDelay * index);
    });
  };
  
  // Special case for service cards and portfolio items
  const serviceCards = document.querySelectorAll('.service-card');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (serviceCards.length > 0) {
    const servicesObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateWithDelay(serviceCards, 100);
        servicesObserver.unobserve(entries[0].target);
      }
    }, observerOptions);
    
    // Observe the first service card or the services section
    const servicesSection = document.querySelector('.services') || serviceCards[0];
    if (servicesSection) {
      servicesObserver.observe(servicesSection);
    }
  }
  
  if (portfolioItems.length > 0) {
    const portfolioObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateWithDelay(portfolioItems, 150);
        portfolioObserver.unobserve(entries[0].target);
      }
    }, observerOptions);
    
    // Observe the first portfolio item or the portfolio section
    const portfolioSection = document.querySelector('.portfolio') || portfolioItems[0];
    if (portfolioSection) {
      portfolioObserver.observe(portfolioSection);
    }
  }
  
  // Animate contact details with staggered delay
  const contactDetails = document.querySelectorAll('.contact-detail');
  if (contactDetails.length > 0) {
    const contactObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateWithDelay(contactDetails, 100);
        contactObserver.unobserve(entries[0].target);
      }
    }, observerOptions);
    
    const contactSection = document.querySelector('.contact') || contactDetails[0];
    if (contactSection) {
      contactObserver.observe(contactSection);
    }
  }
  
  // Animate footer when it comes into view
  const footer = document.querySelector('.footer');
  if (footer) {
    const footerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        footer.classList.add('active');
        footerObserver.unobserve(footer);
      }
    }, observerOptions);
    
    footerObserver.observe(footer);
  }
});