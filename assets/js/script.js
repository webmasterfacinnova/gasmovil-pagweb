// Placeholder JavaScript for basic interactivity
function toggleMenu() {
    const nav = document.getElementById('nav');
    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-es').forEach(el => {
        el.style.display = lang === 'es' ? '' : 'none';
    });
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('language-switcher');
    if (selector) {
        selector.addEventListener('change', (e) => setLanguage(e.target.value));
        setLanguage(selector.value);
    } else {
        setLanguage('es');
    }
});
