/*
    Classes
*/
var project = /** @class */ (function () {
    function project(name) {
        this.name = name;
        this.projectConsole;
        this.projectColorPalettes = [];
        //Collection of Tiles 
    }
    return project;
}());
var color = /** @class */ (function () {
    function color() {
        this.red;
        this.green;
        this.blue;
    }
    color.prototype.setColor = function (r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
    };
    return color;
}());
var colorPalette = /** @class */ (function () {
    function colorPalette() {
        this.name;
        this.colors = [];
    }
    return colorPalette;
}());
var gameConsole = /** @class */ (function () {
    function gameConsole(name, colorPaletteLimit) {
        this.name = name;
        this.colorPaletteLimit = colorPaletteLimit;
    }
    return gameConsole;
}());
var consoleList = [
    {
        name: "NES",
        colorPaletteLimit: 4
    },
    {
        name: "SNES",
        colorPaletteLimit: 8
    },
    {
        name: "Game Boy",
        colorPaletteLimit: 4
    },
    {
        name: "Game Boy Color",
        colorPaletteLimit: 8
    }
];
//Basic JavaScript HTMLElements 
var pixel_guide = document.getElementById("pixel-guide");
var art_section = document.getElementById("art-section");
var canvas_holder = document.getElementById("canvas-holder");
var pixel_canvas = document.getElementById("pixel-canvas");
var new_button = document.getElementById("new-button");
var modal_holder = document.getElementById("modal-holder");
var modal_close = document.getElementById("modal-close");
var color_palette_holder = document.getElementById("color_palette_holder");
/*
    Working Variables
*/
var mouseX;
var mouseY;
var pixelSizeSkew = 24;
var pixelArtHeight;
var pixelArtWidth;
var canvasHolderLeft;
var canvasHolderTop;
var pixelGuideLeftPosition;
var pixelGuideTopPosition;
var chosenColor;
var workingProject;
/*
    Init
*/
jQuery(function () {
    chosenColor = new color();
    changeActiveColor(5, 5, 5);
});
/*
    Functions
*/
function changeActiveColor(r, g, b) {
    chosenColor.setColor(r, g, b);
}
function openNewHeader() {
    modal_holder.style.display = "flex";
}
function closeHeader() {
    modal_holder.style.display = "none";
}
function addColorPalette() {
    if (workingProject != null) {
    }
}
/*
    Event Listeners
*/
canvas_holder.addEventListener("mouseenter", function (e) {
    pixel_guide.style.display = "block";
});
canvas_holder.addEventListener("mouseleave", function (e) {
    pixel_guide.style.display = "none";
});
canvas_holder.addEventListener("mousemove", function (e) {
    mouseX = e.clientX - pixel_canvas.getBoundingClientRect().left;
    mouseY = e.clientY - pixel_canvas.getBoundingClientRect().top;
    pixelGuideLeftPosition = Math.floor(mouseX / pixelSizeSkew) * pixelSizeSkew;
    pixelGuideTopPosition = Math.floor(mouseY / pixelSizeSkew) * pixelSizeSkew;
    pixel_guide.style.left = pixelGuideLeftPosition + "px";
    pixel_guide.style.top = pixelGuideTopPosition + "px";
});
