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
