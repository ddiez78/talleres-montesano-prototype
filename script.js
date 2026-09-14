(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav-principal");
  var form = document.getElementById("form-cita");
  var statusEl = document.getElementById("form-status");

  /* --- Menú hamburguesa --- */
  if (toggle && nav) {
    function setMenu(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      if (open) {
        nav.removeAttribute("hidden");
        document.body.classList.add("nav-open");
      } else {
        nav.setAttribute("hidden", "");
        document.body.classList.remove("nav-open");
      }
      // En desktop el CSS muestra el nav aunque tenga [hidden]
      if (window.matchMedia("(min-width: 900px)").matches) {
        nav.removeAttribute("hidden");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    }

    function syncDesktopNav() {
      if (window.matchMedia("(min-width: 900px)").matches) {
        nav.removeAttribute("hidden");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      } else if (toggle.getAttribute("aria-expanded") !== "true") {
        nav.setAttribute("hidden", "");
      }
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      setMenu(open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (!window.matchMedia("(min-width: 900px)").matches) {
          setMenu(false);
        }
      });
    });

    window.addEventListener("resize", syncDesktopNav);
    syncDesktopNav();

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* --- Reveal sutil --- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");

  if (prefersReduced) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* --- Formulario (solo frontend) --- */
  if (form && statusEl) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nombre = form.nombre;
      var telefono = form.telefono;
      var servicio = form.servicio;
      var valid = true;

      [nombre, telefono, servicio].forEach(function (field) {
        var wrap = field.closest(".field");
        if (!field.value.trim()) {
          valid = false;
          wrap.classList.add("is-invalid");
        } else {
          wrap.classList.remove("is-invalid");
        }
      });

      statusEl.hidden = false;

      if (!valid) {
        statusEl.textContent =
          "No hemos podido enviar. Llámanos al 913 410 820 o escribe a talleresmonesano@hotmail.com.";
        statusEl.className = "form-status is-error";
        var firstInvalid = form.querySelector(".is-invalid input, .is-invalid select");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      statusEl.textContent =
        "Gracias. Te contactamos para confirmar cita y siguiente paso. Si tienes prisa, llama al 913 410 820.";
      statusEl.className = "form-status is-success";
      form.reset();
      form.querySelectorAll(".is-invalid").forEach(function (el) {
        el.classList.remove("is-invalid");
      });
    });

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        var wrap = field.closest(".field");
        if (wrap) wrap.classList.remove("is-invalid");
      });
    });
  }
})();

  // Elastic gallery accordion (desktop) / snap carousel (mobile)
  const gallery = document.querySelector('.elastic-gallery');
  if (gallery) {
    const cards = Array.from(gallery.querySelectorAll('.elastic-card'));
    const mq = window.matchMedia('(max-width: 720px)');
    const activate = (card, scrollInto = false) => {
      cards.forEach((c) => {
        const on = c === card;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (scrollInto && mq.matches) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    };
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        if (!mq.matches) activate(card);
      });
      card.addEventListener('focus', () => activate(card, true));
      card.addEventListener('click', (e) => {
        if (e.target.closest('.elastic-cta')) return;
        activate(card, true);
      });
    });
  }

  // Journey stages (scroll + click)
  const journeySteps = Array.from(document.querySelectorAll('.journey-step'));
  const journeyStages = Array.from(document.querySelectorAll('.journey-stage'));
  const journeyCaption = document.getElementById('journey-caption');
  const captions = [
    '1 / 5 · Llegada',
    '2 / 5 · Diagnóstico',
    '3 / 5 · Chapa',
    '4 / 5 · Pintura',
    '5 / 5 · Entrega',
  ];
  const setJourney = (index) => {
    journeySteps.forEach((step, i) => step.classList.toggle('is-active', i === index));
    journeyStages.forEach((stage, i) => stage.classList.toggle('is-active', i === index));
    if (journeyCaption) journeyCaption.textContent = captions[index] || '';
  };
  journeySteps.forEach((step, index) => {
    step.tabIndex = 0;
    step.addEventListener('click', () => setJourney(index));
    step.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setJourney(index);
      }
    });
  });
  if ('IntersectionObserver' in window && journeySteps.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = journeySteps.indexOf(entry.target);
        if (idx >= 0) setJourney(idx);
      });
    }, { root: null, threshold: 0.6, rootMargin: '-20% 0px -35% 0px' });
    journeySteps.forEach((step) => io.observe(step));
  }

