/* =========================================================
   BELII — Scripts globales
   1) Header (scroll + menú móvil)  2) Animaciones de aparición
   3) Chatbot "Hablemos"            4) Formulario de contacto
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1) Header ---------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  /* ---------- Cinta: bucle perfecto del texto ---------- */
  var loopRibbons = function () {
    document.querySelectorAll('.ribbon text').forEach(function (t) {
      var tp = t.querySelector('textPath');
      var an = tp && tp.querySelector('animate');
      var unit = tp && tp.querySelector('.unit');
      if (!an || !unit || !unit.getComputedTextLength) return;
      var len = unit.getComputedTextLength();
      if (len > 0) { an.setAttribute('to', '-' + len); try { an.beginElement(); } catch (e) {} }
    });
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(loopRibbons);
  else window.addEventListener('load', loopRibbons);

  /* ---------- 2) Reveal ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 3) Chatbot ---------- */
  /* EDITA AQUÍ las respuestas del chatbot. Cada entrada tiene:
       k: palabras clave (en minúscula y sin tildes)
       a: respuesta (puede llevar HTML básico)                  */
  var BOT = {
    nombre: 'Belii',
    saludo: '¡Hola! ✦ Soy el asistente de Belii. Puedo resolver dudas generales sobre el estudio, los servicios, los proyectos y cómo trabajar juntos. ¿Qué te gustaría saber?',
    sugerencias: ['¿Qué servicios ofrecen?', '¿Cómo es el proceso?', '¿Cómo cotizo?', '¿Dónde están?'],
    respuestas: [
      { k: ['hola', 'buenas', 'hey', 'buen dia', 'buenos dias', 'buenas tardes', 'buenas noches'],
        a: '¡Hola! Qué bueno tenerte por aquí ✦ ¿En qué te puedo ayudar?' },
      { k: ['servicio', 'ofrecen', 'hacen', 'que hacen', 'que ofrecen'],
        a: 'En Belii creamos: <b>Branding e identidad visual</b>, <b>diseño gráfico</b>, <b>estrategia de marca</b> y <b>contenido digital</b>. Mira el detalle en <a href="servicios.html">Servicios</a>.' },
      { k: ['branding', 'identidad', 'logo', 'logotipo'],
        a: 'En <a href="servicio-branding.html">Branding e identidad visual</a> construimos marcas auténticas y memorables: logo, paleta, tipografías y lineamientos de uso.' },
      { k: ['grafico', 'diseno', 'piezas', 'flyer', 'afiche', 'empaque'],
        a: 'El <a href="servicio-diseno-grafico.html">diseño gráfico</a> da forma a tus ideas con piezas que comunican: papelería, piezas para redes, empaques, material impreso y más.' },
      { k: ['estrategia', 'posicionamiento', 'plan de marca'],
        a: 'Con la <a href="servicio-estrategia-de-marca.html">estrategia de marca</a> definimos el camino para que tu marca brille: propósito, público, tono de voz y posicionamiento.' },
      { k: ['contenido', 'redes', 'instagram', 'community', 'social', 'posts'],
        a: 'En <a href="servicio-contenido-digital.html">contenido digital</a> creamos contenido que conecta y genera valor: piezas para redes, calendario editorial y dirección creativa.' },
      { k: ['proceso', 'como trabajan', 'metodo', 'pasos', 'etapas'],
        a: 'Trabajamos en 4 pasos: <b>1. Escuchar</b> (brief y objetivos), <b>2. Explorar</b> (investigación y estrategia), <b>3. Crear</b> (diseño y propuestas) y <b>4. Conectar</b> (entrega y acompañamiento). Más en <a href="estudio.html">Estudio</a>.' },
      { k: ['precio', 'cuanto cuesta', 'costo', 'cotiza', 'cotizar', 'tarifa', 'presupuesto', 'valor'],
        a: 'Cada proyecto es distinto, así que preparamos una propuesta a la medida. Cuéntanos tu idea en <a href="contacto.html">Contacto</a> o escríbenos a <b>hola@belii.studio</b> y te respondemos con una cotización.' },
      { k: ['tiempo', 'demora', 'tarda', 'cuanto dura', 'plazo', 'entrega'],
        a: 'Los tiempos dependen del alcance de cada proyecto. Después de conocer tu idea te compartimos un cronograma claro desde el inicio.' },
      { k: ['proyecto', 'portafolio', 'trabajos', 'ejemplos', 'casos'],
        a: 'Puedes ver algunos de nuestros trabajos en <a href="proyectos.html">Proyectos</a> ✦' },
      { k: ['donde', 'ubicacion', 'ciudad', 'direccion', 'medellin', 'colombia'],
        a: 'Estamos en <b>Medellín, Colombia</b> y trabajamos con marcas de cualquier lugar de forma remota.' },
      { k: ['contacto', 'correo', 'email', 'mail', 'escribir', 'whatsapp', 'telefono'],
        a: 'Escríbenos a <b>hola@belii.studio</b> o por Instagram <a href="https://instagram.com/belii.studio" target="_blank" rel="noopener">@belii.studio</a>. También puedes usar el formulario en <a href="contacto.html">Contacto</a>.' },
      { k: ['horario', 'atienden', 'disponible', 'hora'],
        a: 'Respondemos mensajes en horario laboral, de lunes a viernes. Déjanos tu mensaje y te escribimos pronto.' },
      { k: ['quienes', 'estudio', 'historia', 'belii', 'equipo', 'disenadora'],
        a: 'Belii es un estudio creativo que cree en el poder de las ideas. Creamos con intención y acompañamos a cada marca con cercanía. Conoce más en <a href="estudio.html">Estudio</a>.' },
      { k: ['valores', 'esencia', 'filosofia'],
        a: 'Nuestros valores: <b>Creatividad</b>, <b>Cercanía</b> y <b>Autenticidad</b>. Creemos en marcas reales, con propósito.' },
      { k: ['revision', 'cambios', 'ajustes', 'correcciones'],
        a: 'Claro: el proceso es colaborativo y las propuestas se afinan contigo. Los detalles de revisiones se acuerdan en la propuesta de cada proyecto.' },
      { k: ['gracias', 'genial', 'perfecto', 'listo', 'chao', 'adios'],
        a: '¡Con gusto! Si quieres avanzar, cuéntanos tu idea en <a href="contacto.html">Contacto</a> ✦ Ideas que conectan, marcas que brillan.' }
    ],
    fallback: 'Esa pregunta es muy específica y prefiero que la responda el equipo. Escríbenos a <b>hola@belii.studio</b> o usa el formulario de <a href="contacto.html">Contacto</a>. Mientras tanto, puedo contarte sobre servicios, proceso, proyectos o ubicación.'
  };

  var chat = document.getElementById('chat');
  if (chat) {
    var body = chat.querySelector('.chat-body');
    var quick = chat.querySelector('.quick');
    var form = chat.querySelector('.chat-form');
    var input = form.querySelector('input');
    var started = false;

    var norm = function (s) {
      return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?¡!.,]/g, ' ');
    };
    var addMsg = function (html, who) {
      var d = document.createElement('div');
      d.className = 'msg ' + who;
      if (who === 'me') d.textContent = html; else d.innerHTML = html;
      body.appendChild(d);
      body.scrollTop = body.scrollHeight;
    };
    var answer = function (text) {
      var t = ' ' + norm(text) + ' ';
      var best = null, score = 0;
      BOT.respuestas.forEach(function (r) {
        var s = 0;
        r.k.forEach(function (k) { if (t.indexOf(k) > -1) s += k.length; });
        if (s > score) { score = s; best = r; }
      });
      return best ? best.a : BOT.fallback;
    };
    var send = function (text) {
      text = text.trim();
      if (!text) return;
      addMsg(text, 'me');
      var typing = document.createElement('div');
      typing.className = 'msg bot typing';
      typing.innerHTML = '<i></i><i></i><i></i>';
      body.appendChild(typing);
      body.scrollTop = body.scrollHeight;
      setTimeout(function () {
        typing.remove();
        addMsg(answer(text), 'bot');
      }, 650);
    };
    var open = function () {
      chat.classList.add('open');
      chat.setAttribute('aria-hidden', 'false');
      if (!started) {
        started = true;
        addMsg(BOT.saludo, 'bot');
        BOT.sugerencias.forEach(function (s) {
          var b = document.createElement('button');
          b.type = 'button';
          b.textContent = s;
          b.addEventListener('click', function () { send(s); });
          quick.appendChild(b);
        });
      }
      setTimeout(function () { input.focus(); }, 400);
    };
    var close = function () {
      chat.classList.remove('open');
      chat.setAttribute('aria-hidden', 'true');
    };

    document.querySelectorAll('[data-open-chat]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); open(); });
    });
    chat.querySelector('.chat-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      send(input.value);
      input.value = '';
    });
  }

  /* ---------- 4) Formulario de contacto (abre el correo del usuario) ---------- */
  var cf = document.getElementById('contact-form');
  if (cf) {
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(cf);
      var subject = encodeURIComponent('Nueva idea para Belii — ' + (f.get('nombre') || ''));
      var bodyTxt = encodeURIComponent(
        'Nombre: ' + f.get('nombre') + '\nCorreo: ' + f.get('correo') +
        '\nServicio: ' + f.get('servicio') + '\n\n' + f.get('mensaje'));
      var ok = document.querySelector('.form-ok');
      if (ok) ok.style.display = 'block';
      window.location.href = 'mailto:hola@belii.studio?subject=' + subject + '&body=' + bodyTxt;
      cf.reset();
    });
  }
})();
