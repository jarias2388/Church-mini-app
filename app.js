// Shows the main menu or one section based on the URL hash (e.g. #anuncios).
// Using the hash means the phone's back button works and each section can be linked directly.
(function () {
  var menu = document.getElementById("menu");
  var pages = document.querySelectorAll(".page");

  function render() {
    var id = location.hash.replace("#", "");
    var target = id && document.getElementById(id);
    var isPage = target && target.classList.contains("page");

    menu.hidden = !!isPage;
    pages.forEach(function (p) { p.hidden = p !== target; });
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", render);
  render();
})();

// Visitor card: builds a message from the form and opens WhatsApp or the
// phone's text messages with it filled in. Nothing is stored on a server.
(function () {
  var form = document.getElementById("visitor-form");
  if (!form) return;
  var phone = form.getAttribute("data-phone");
  var error = document.getElementById("v-error");
  var via = "whatsapp";

  form.querySelectorAll("button[data-via]").forEach(function (btn) {
    btn.addEventListener("click", function () { via = btn.getAttribute("data-via"); });
  });

  function val(name) {
    var el = form.elements[name];
    if (!el) return "";
    if (el.type === "checkbox") return el.checked ? "Sí" : "No";
    return (el.value || "").trim();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!val("nombre")) {
      error.hidden = false;
      form.elements.nombre.focus();
      return;
    }
    error.hidden = true;

    // asterisks make the title bold in WhatsApp; plain text messages would show them literally
    var title = via === "sms" ? "Tarjeta de Visitante" : "*Tarjeta de Visitante*";
    var lines = [title, "Nombre: " + val("nombre")];
    if (val("telefono")) lines.push("Teléfono: " + val("telefono"));
    if (val("email")) lines.push("Correo: " + val("email"));
    lines.push("Primera visita: " + val("primera"));
    if (val("como")) lines.push("Cómo se enteró: " + val("como"));
    if (val("oracion")) lines.push("Petición de oración: " + val("oracion"));
    lines.push("Desea ser contactado: " + val("contacto"));
    var text = encodeURIComponent(lines.join("\n"));

    var url;
    if (via === "sms") {
      // iPhone uses "&body=", Android uses "?body="
      var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      url = "sms:+" + phone + (isIOS ? "&" : "?") + "body=" + text;
    } else {
      url = "https://wa.me/" + phone + "?text=" + text;
    }
    window.location.href = url;
  });
})();
