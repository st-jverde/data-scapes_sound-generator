export function initializeSliders() {
    // HAPPY
    const happySlider = document.getElementById('happy-slider');
    const happyNumber = document.getElementById('happy-number');
  
    happySlider.addEventListener('input', function() {
      happyNumber.value = happySlider.value;
    });
  
    // CONFIDENCE
    const confidenceSlider = document.getElementById('confidence-slider');
    const confidenceNumber = document.getElementById('confidence-number');
  
    confidenceSlider.addEventListener('input', function() {
      confidenceNumber.value = confidenceSlider.value;
    });
  
    // CALM
    const calmSlider = document.getElementById('calm-slider');
    const calmNumber = document.getElementById('calm-number');
  
    calmSlider.addEventListener('input', function() {
      calmNumber.value = calmSlider.value;
    });
  
    // AGE
    const ageSlider = document.getElementById('age-slider');
    const ageNumber = document.getElementById('age-number');
  
    ageSlider.addEventListener('input', function() {
      ageNumber.value = ageSlider.value;
    });
  
    // OTHER
    const otherSlider = document.getElementById('other-slider');
    const otherNumber = document.getElementById('other-number');
  
    otherSlider.addEventListener('input', function() {
      otherNumber.value = otherSlider.value;
    });
  }

  