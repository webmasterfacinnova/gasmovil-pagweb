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
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
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
