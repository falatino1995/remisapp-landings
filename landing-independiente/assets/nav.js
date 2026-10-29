// Menu del celular: abre/cierra el panel y bloquea el scroll de fondo.
(function () {
  var btn = document.querySelector(".nav-burger");
  var menu = document.getElementById("mnav");
  if (!btn || !menu) return;
  function set(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.hidden = !open;
    document.body.classList.toggle("mnav-open", open);
  }
  btn.addEventListener("click", function () { set(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); } });
  window.addEventListener("resize", function () { if (window.innerWidth > 900 && !menu.hidden) set(false); });
})();
