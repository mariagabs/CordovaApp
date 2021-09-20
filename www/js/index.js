window.onload = function () {
  AppController.init();
};

function hideShowDiv(index) {
  var x = document.getElementById(index);
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
