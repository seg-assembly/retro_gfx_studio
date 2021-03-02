//Local Variables
var isDragging = false; //This denotes if the user is dragging the canvas holder. 


art_section.addEventListener("mousedown", function (e) {
    if (e.which == 2) {
        e.preventDefault();
        art_section.style.cursor = "grabbing";
        isDragging = true;
    }
})

art_section.addEventListener("mouseup", function (e) {
    if (e.which == 2) {
        e.preventDefault();
        art_section.style.cursor = "auto";
        isDragging = false;
    }
})

art_section.addEventListener("mousemove", function (e) {
    if (isDragging == true) {
        canvasHolderLeft += 1;
        console.log(canvasHolderLeft);
        setCanvasHolderPosition();
    }

})

//Functions
function setCanvasHolderPosition() {
    canvas_holder.style.left = canvasHolderLeft;
}