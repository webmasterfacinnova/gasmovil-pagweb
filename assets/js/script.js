// Simple i18n handling and menu toggle
const translations = {
  en: {
    'nav-home': 'Home',
    'nav-about': 'About Us',
    'nav-contact': 'Contact',
    'hero-title': 'The easiest way to get gas delivered',
    'hero-text': 'Find the best prices and nearby suppliers in seconds.',
    'feature-price-title': 'Price transparency',
    'feature-price-text': 'Know the price before ordering.',
    'feature-map-title': 'Real-time map',
    'feature-map-text': 'Track nearby gas trucks in real time.',
    'feature-safe-title': 'Secure delivery',
    'feature-safe-text': 'Your gas arrives on time and safely.',
    'feature-vendor-title': 'Benefits for vendors',
    'feature-vendor-text': 'Increase sales and optimize your routes.',
    'feature-visibility-title': 'Greater visibility',
    'feature-visibility-text': 'Reach more customers through the app.',
    'cta-title': 'Download the app',
    'cta-text': 'Coming soon to Google Play',
    'footer-terms': 'Terms',
    'footer-privacy': 'Privacy',
    'about-text': 'GasMobile is committed to making gas delivery easy and transparent for consumers and profitable for vendors.',
    'contact-title': 'Contact',
    'label-name': 'Name',
    'label-email': 'Email',
    'label-message': 'Message',
    'button-send': 'Send',
    'privacy-title': 'Privacy Policy',
    'privacy-intro': 'At GasMobile we value your privacy and are committed to protecting your personal information. This policy explains what data we collect and how we use it.',
    'privacy-data-title': 'Data We Collect',
    'privacy-data': 'We may collect your name, email address and location when you use our application.',
    'privacy-use-title': 'Use of Information',
    'privacy-use': 'We use this information to provide and improve our services.',
    'privacy-rights-title': 'Your Rights',
    'privacy-rights': 'You may request access to or deletion of your data at any time.',
    'privacy-cookies-title': 'Cookies',
    'privacy-cookies': 'This site uses cookies to enhance the user experience and compile usage statistics.',
    'privacy-law-title': 'Applicable Law',
    'privacy-law': 'This policy is governed by Mexican law and any dispute will be submitted to the courts of Mexico City.',
    'privacy-contact': 'If you have questions, contact us at soporte@gasmobile.com.',
    'terms-title': 'Terms and Conditions',
    'terms-intro': 'These terms govern the use of GasMobile and set forth the obligations between users and the application.',
    'terms-service-title': 'Use of Service',
    'terms-service': 'You must provide truthful information and comply with applicable laws.',
    'terms-liability-title': 'Limitation of Liability',
    'terms-liability': 'GasMobile is not liable for damages arising from the use of the platform.',
    'terms-intellectual-title': 'Intellectual Property',
    'terms-intellectual': 'All content of the application and website is owned by GasMobile or used with permission.',
    'terms-changes-title': 'Changes',
    'terms-changes': 'GasMobile may update these terms at any time. Changes will be posted on this page.',
    'terms-law-title': 'Governing Law',
    'terms-law': 'These terms are governed by Mexican law and any dispute will be resolved in the courts of Mexico City.'
  },
  es: {
    'nav-home': 'Inicio',
    'nav-about': 'Sobre Nosotros',
    'nav-contact': 'Contacto',
    'hero-title': 'La forma más fácil de recibir gas',
    'hero-text': 'Encuentra los mejores precios y proveedores cercanos en segundos.',
    'feature-price-title': 'Transparencia de precios',
    'feature-price-text': 'Conoce el precio antes de ordenar.',
    'feature-map-title': 'Mapa en tiempo real',
    'feature-map-text': 'Rastrea camiones de gas cerca de tu ubicación.',
    'feature-safe-title': 'Entrega segura',
    'feature-safe-text': 'Tu gas llega a tiempo y con seguridad.',
    'feature-vendor-title': 'Beneficios para vendedores',
    'feature-vendor-text': 'Aumenta tus ventas y optimiza tus rutas.',
    'feature-visibility-title': 'Mayor visibilidad',
    'feature-visibility-text': 'Llega a más clientes a través de la app.',
    'cta-title': 'Descarga la app',
    'cta-text': 'Próximamente en Google Play',
    'footer-terms': 'Términos',
    'footer-privacy': 'Privacidad',
    'about-text': 'GasMobile está dedicada a hacer la entrega de gas sencilla y transparente para los consumidores y rentable para los vendedores.',
    'contact-title': 'Contacto',
    'label-name': 'Nombre',
    'label-email': 'Correo electrónico',
    'label-message': 'Mensaje',
    'button-send': 'Enviar',
    'privacy-title': 'Política de Privacidad',
    'privacy-intro': 'En GasMobile valoramos tu privacidad y nos comprometemos a proteger tu información personal. Esta política explica qué datos recopilamos y cómo los utilizamos.',
    'privacy-data-title': 'Datos que recopilamos',
    'privacy-data': 'Podemos recopilar tu nombre, dirección de correo electrónico y ubicación cuando utilizas nuestra aplicación.',
    'privacy-use-title': 'Uso de la información',
    'privacy-use': 'Utilizamos la información para proporcionar y mejorar nuestros servicios.',
    'privacy-rights-title': 'Tus derechos',
    'privacy-rights': 'Puedes solicitar acceso o eliminación de tus datos en cualquier momento.',
    'privacy-cookies-title': 'Uso de cookies',
    'privacy-cookies': 'Este sitio utiliza cookies para mejorar la experiencia de usuario y realizar estadísticas de uso.',
    'privacy-law-title': 'Legislación aplicable',
    'privacy-law': 'La presente política se rige por las leyes mexicanas y cualquier disputa se someterá a los tribunales de Ciudad de México.',
    'privacy-contact': 'Si tienes preguntas, contáctanos en soporte@gasmobile.com.',
    'terms-title': 'Términos y Condiciones',
    'terms-intro': 'Estos términos regulan el uso de GasMobile y establecen las obligaciones entre los usuarios y la aplicación.',
    'terms-service-title': 'Uso del servicio',
    'terms-service': 'Debes proporcionar información veraz y respetar las leyes aplicables.',
    'terms-liability-title': 'Limitación de responsabilidad',
    'terms-liability': 'GasMobile no se hace responsable por daños derivados del uso de la plataforma.',
    'terms-intellectual-title': 'Propiedad intelectual',
    'terms-intellectual': 'Todos los contenidos de la aplicación y del sitio web son propiedad de GasMobile o se utilizan con autorización.',
    'terms-changes-title': 'Modificaciones',
    'terms-changes': 'GasMobile puede actualizar estos términos en cualquier momento. Los cambios se publicarán en esta página.',
    'terms-law-title': 'Ley aplicable',
    'terms-law': 'Los presentes términos se rigen por las leyes de México y cualquier controversia se resolverá en los tribunales de Ciudad de México.'
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang][key];
    if (text) {
      el.textContent = text;
    }
  });
  const selector = document.getElementById('language-switcher');
  if (selector) selector.value = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-switcher');
  const lang = localStorage.getItem('lang') || 'es';
  setLanguage(lang);
  if (selector) {
    selector.value = lang;
    selector.addEventListener('change', e => setLanguage(e.target.value));
  }
});
