// script.js

document.addEventListener('DOMContentLoaded', () => {
  const imagenes = document.querySelectorAll('.carrusel-imagenes img');
  let indiceActual = 0;
  const intervaloTiempo = 3000; // Tiempo en milisegundos (3 segundos)

  imagenes[0].style.display = 'block';

  document.getElementById('siguiente').addEventListener('click', () => {
      cambiarImagen(1);
  });

  document.getElementById('anterior').addEventListener('click', () => {
      cambiarImagen(-1);
  });

  function cambiarImagen(direccion) {
      imagenes[indiceActual].style.display = 'none';
      indiceActual += direccion;
      if (indiceActual >= imagenes.length) indiceActual = 0;
      if (indiceActual < 0) indiceActual = imagenes.length - 1;
      imagenes[indiceActual].style.display = 'block';
  }

  // Cambia la imagen automáticamente cada cierto tiempo
  setInterval(() => {
      cambiarImagen(1);
  }, intervaloTiempo);

  document.getElementById('contactForm').addEventListener('submit', function(event) {
      if (!this.checkValidity()) {
          // Si el formulario no es válido, no hacemos nada
          return;
      }

      event.preventDefault(); // Evita que el formulario se envíe

      // Muestra el modal
      var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
      myModal.show();
  });

  window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = []; 
  window.myWidgetParam.push({
      id: 17,
      cityid: '1850144',
      appid: '74e2e34a02f02f5ed20de2167f3d8d92',
      units: 'metric',
      containerid: 'openweathermap-widget-17',
  });
  (function() {
      var script = document.createElement('script');
      script.async = true;
      script.charset = "utf-8";
      script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(script, s);
  })();
});
