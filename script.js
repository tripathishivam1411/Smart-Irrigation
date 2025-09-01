const langToggle = document.querySelector('#lang-toggle');
const elements = document.querySelectorAll('[data-en], [data-hi]');
let currentLang = 'en';

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  elements.forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
  langToggle.textContent = currentLang === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में स्विच करें';
  speak(`Switched to ${currentLang === 'en' ? 'English' : 'Hindi'}`);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    } else {
      window.location.href = this.getAttribute('href');
    }
  });
});

// Voice Assistance (Web Speech API)
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }
}

// Accessibility: Speak on hover
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseover', () => speak(el.textContent));
});