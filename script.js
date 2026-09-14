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
