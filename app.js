// Shows the main menu or one section based on the URL hash (e.g. #anuncios).
// Using the hash means the phone's back button works and each section can be linked directly.
(function () {
  var menu = document.getElementById("menu");
  var pages = document.querySelectorAll(".page");
  var header = document.querySelector(".header");

  function render() {
    var id = location.hash.replace("#", "");
    // sections are named "pagina-<name>" so the browser doesn't jump down to them
    var target = id && document.getElementById("pagina-" + id);
    var isPage = target && target.classList.contains("page");

    menu.hidden = !!isPage;
    pages.forEach(function (p) { p.hidden = p !== target; });
    // lets a page use its own header photo (see styles.css: .header[data-page=...])
    header.setAttribute("data-page", isPage ? id : "menu");
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

  // Show the extra question that goes with the chosen "¿Cómo se enteró?" answer
  var como = form.elements.como;
  var followups = form.querySelectorAll(".followup");
  function showFollowup() {
    followups.forEach(function (f) { f.hidden = f.getAttribute("data-for") !== como.value; });
  }
  como.addEventListener("change", showFollowup);
  showFollowup();

  var otro = form.elements.otro;
  var otroCount = document.getElementById("v-otro-count");
  otro.addEventListener("input", function () { otroCount.textContent = otro.value.length; });

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
    var heard = {
      miembro: "Invitado por un miembro" + (val("miembro") ? " (" + val("miembro") + ")" : ""),
      redes: "Redes sociales" + (val("red") ? " (" + val("red") + ")" : ""),
      vi: "Vi la iglesia",
      otro: "Otro" + (val("otro") ? ": " + val("otro") : "")
    }[val("como")];
    if (heard) lines.push("Cómo se enteró: " + heard);
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
