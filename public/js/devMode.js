function toggleDevRoutes() {
  var devRoutes = document.querySelectorAll(".dev-route");
  for (var i = 0; i < devRoutes.length; i++) {
    devRoutes[i].classList.toggle("d-none");
  }
}
