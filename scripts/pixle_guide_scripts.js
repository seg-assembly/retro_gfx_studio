//Local Variables 
var mouseX;
var mouseY;
var pixelSizeSkew = 24;
var pixelArtHeight;
var pixelArtWidth;
var pixelGuideLeftPosition;
var pixelGuideTopPosition;


/*
    Shows/Hides the Pixel Guide when the Mouse enters or leaves the Art Canvas 
*/
canvas_holder.addEventListener("mouseenter", e => {
    pixel_guide.style.display = "block";
});

canvas_holder.addEventListener("mouseleave", e => {
    pixel_guide.style.display = "none";
});

canvas_holder.addEventListener("mousemove", e => {
    mouseX = e.clientX - pixel_canvas.getBoundingClientRect().left;
    mouseY = e.clientY - pixel_canvas.getBoundingClientRect().top;

    holdX = mouseX / pixelSizeSkew;
    holdY = mouseY / pixelSizeSkew;

    pixelGuideLeftPosition = Math.floor(holdX) * pixelSizeSkew;
    pixelGuideTopPosition = Math.floor(holdY) * pixelSizeSkew;

    pixel_guide.style.left = pixelGuideLeftPosition + "px";
    pixel_guide.style.top = pixelGuideTopPosition + "px";
});