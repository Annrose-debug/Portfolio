// Projects Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Project Slider Functionality
    const setupSlider = (sliderContainer) => {
      const container = sliderContainer.querySelector('.slider-container');
      const images = container.querySelectorAll('img');
      const dotsContainer = sliderContainer.querySelector('.slider-dots');
      const prevBtn = sliderContainer.querySelector('.slider-prev');
      const nextBtn = sliderContainer.querySelector('.slider-next');
      
      let currentIndex = 0;
      
      // Create dots
      images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
      
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      
      // Update slider
      const updateSlider = () => {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      };
      
      // Go to specific slide
      const goToSlide = (index) => {
        currentIndex = index;
        updateSlider();
      };
      
      // Next slide
      const nextSlide = () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
      };
      
      // Previous slide
      const prevSlide = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
      };
      
      // Event listeners
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
      
      // Auto-advance slides (optional)
      let slideInterval = setInterval(nextSlide, 5000);
      
      // Pause on hover
      sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
      });
    };
    
    // Initialize all sliders on the page
    document.querySelectorAll('.project-slider').forEach(setupSlider);
    
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectItems = document.querySelectorAll('.project-detail');
    
    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Filter projects
          const filterValue = button.getAttribute('data-filter');
          
          projectItems.forEach(project => {
            if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
              project.style.display = 'block';
            } else {
              project.style.display = 'none';
            }
          });
        });
      });
    }
    
    // Animation for project details
    const projectDetails = document.querySelectorAll('.project-detail');
    
    const detailObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    projectDetails.forEach(detail => {
      detail.style.opacity = '0';
      detail.style.transform = 'translateY(20px)';
      detail.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      detailObserver.observe(detail);
    });
  });