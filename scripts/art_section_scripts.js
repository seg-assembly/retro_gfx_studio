art_section.addEventListener("mousedown", function(e) {
    if(e.which == 2){
        e.preventDefault();
        art_section.style.cursor = "grabbing";
    }
})

art_section.addEventListener("mouseup", function(e) {
    if(e.which == 2){
        e.preventDefault();
        art_section.style.cursor = "auto";
    }
})