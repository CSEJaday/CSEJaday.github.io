document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.test-card')); // get all testimonal cards
    const dots = Array.from(document.querySelectorAll('.dot')); // existing dot
    const prevBtn = document.querySelector('.arrow-left');
    const nextBtn = document.querySelector('.arrow-right');
  
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('current'));
    let current = 0;
    slides[current].classList.add('current'); // show first slide
  
    // helper function: light the correct dot 
    function lightDotForSlideIndex(slideIndex) {
      if (!dots.length) return; 
      dots.forEach(d => d.classList.remove('active'));
      // loops back to the beginning %
      const dotIndex = ((slideIndex % dots.length) + dots.length) % dots.length;
      dots[dotIndex].classList.add('active');
    }
  
    // show first dot when the page first loads
    lightDotForSlideIndex(current);
  
    //change slides function
    function goTo(index) {
      const newIndex = ((index % slides.length) + slides.length) % slides.length;
      if (newIndex == current) return;
  
      slides[current].classList.remove('current'); //hide current slide
      slides[newIndex].classList.add('current'); // show new slide
  
      // update dots by mapping to current slide 
      lightDotForSlideIndex(newIndex);
  
      current = newIndex; 
    }
  
    function nextSlide() { 
        goTo(current + 1); 
    }
    function prevSlide() { 
        goTo(current - 1); 
    }
  
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  });