/*
    Classes 
*/
class project {
    name : string;
    projectConsole : gameConsole;
    projectColorPalettes : colorPalette[];

    constructor(name : string) {
        this.name = name;
        this.projectConsole; 
        this.projectColorPalettes = [];
        //Collection of Tiles 
    }
}

class color {
    red : number;
    green : number;
    blue : number;

    constructor() {
        this.red;
        this.green;
        this.blue;
    }

    setColor(r, g, b){
        this.red = r;
        this.green = g;
        this.blue = b;
    }
}

class colorPalette {
    name : string;
    colors : color[]

    constructor() {
        this.name;
        this.colors = [];
    }
}

class gameConsole {
    name : string;
    colorPaletteLimit : number;

    constructor(name, colorPaletteLimit) {
        this.name = name;
        this.colorPaletteLimit = colorPaletteLimit;
    }
}

const consoleList : gameConsole[] = [
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
let pixel_guide = document.getElementById("pixel-guide");
let art_section = document.getElementById("art-section");
let canvas_holder = document.getElementById("canvas-holder");
let pixel_canvas = document.getElementById("pixel-canvas");
let new_button = document.getElementById("new-button");
let modal_holder = document.getElementById("modal-holder");
let modal_close = document.getElementById("modal-close");
let color_palette_holder = document.getElementById("color_palette_holder");

/*
    Working Variables 
*/
var mouseX : number;
var mouseY : number;
var pixelSizeSkew : number = 24;
var pixelArtHeight : number;
var pixelArtWidth : number;
var canvasHolderLeft : number;
var canvasHolderTop : number; 
var pixelGuideLeftPosition : number;
var pixelGuideTopPosition : number;
var chosenColor : color;
var workingProject : project;

/*
    Init 
*/
jQuery(function() {
    chosenColor = new color();
    changeActiveColor(5, 5, 5);
})

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
    
}

/*
    Event Listeners  
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

    pixelGuideLeftPosition = Math.floor(mouseX / pixelSizeSkew) * pixelSizeSkew;
    pixelGuideTopPosition = Math.floor(mouseY / pixelSizeSkew) * pixelSizeSkew;

    pixel_guide.style.left = pixelGuideLeftPosition + "px";
    pixel_guide.style.top = pixelGuideTopPosition + "px";
});