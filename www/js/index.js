window.onload = function() {
    AppController.init();
};

function hideShowDiv() {
    var x = document.getElementById("card-details");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}