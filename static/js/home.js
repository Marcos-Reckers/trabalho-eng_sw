document.addEventListener("DOMContentLoaded", function() {
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = "0"; // Remove o padding ao colapsar
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    var submenuBtns = document.getElementsByClassName("submenu-btn");
    var submenuContents = document.getElementsByClassName("submenu-content");

    for (var i = 0; i < submenuBtns.length; i++) {
        submenuBtns[i].addEventListener("click", function() {
            for (var j = 0; j < submenuBtns.length; j++) {
                submenuBtns[j].classList.remove("active");
                submenuContents[j].style.display = "none";
            }
            this.classList.add("active");
            document.getElementById(this.dataset.target).style.display = "block";
        });
    }

    // Mostrar inicialmente o submenu CIC
    document.getElementById("cic").style.display = "block";
});
