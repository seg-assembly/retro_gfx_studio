var chosenColor = new color();

jQuery(function() {
    setChosenColor(5, 5, 5);
})

function setChosenColor(r, g, b) {
    chosenColor.setColor(r, g, b);
}