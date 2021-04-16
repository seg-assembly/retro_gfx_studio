"use strict";
exports.__esModule = true;
var electron = require("electron");
var path = require("path");
var fs = require("fs");
var dialog = electron.remote.dialog;
/*
    Classes
*/
var project = /** @class */ (function () {
    function project(name, projectConsole) {
        this.name = name;
        this.projectConsole = projectConsole;
        this.projectColorPalettes = [];
        this.projectTiles = [];
    }
    return project;
}());
var tile = /** @class */ (function () {
    function tile(tileID) {
        this.tileID = tileID;
    }
    return tile;
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
        this.rgbColorString = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
    };
    color.prototype.setColorByRGB = function (rgb) {
        //Removes the rgb string elements from the string to get the rgb values 
        rgb = rgb.replace("rgb(", "");
        rgb = rgb.replace(")", "");
        rgb = rgb.replace(",", "");
        rgb = rgb.replace(",", "");
        //Splits the rgb values into three substrings for r, g, and b 
        var values = rgb.split(" ");
        this.setColor(parseInt(values[0]), parseInt(values[1]), parseInt(values[2]));
        //Test log  
        console.log(this.getRGB);
    };
    color.prototype.getRGB = function () {
        return this.rgbColorString;
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
        colorPaletteLimit: 4
    }
];
//Basic JavaScript HTMLElements 
var pixel_guide = $("#pixel-guide");
var art_section = $("#art-section");
var canvas_holder = $("#canvas-holder");
var pixel_canvas = document.getElementById("pixel-canvas");
var new_button = $("#new-button");
var modal_holder = $("#modal-holder");
var modal_close = $("#modal-close");
var color_palette_holder = $("#color-palette-holder");
var new_project_name_input = $("#new-project-name-input");
var console_select = document.getElementById("console-select");
var modal_content_new = $("#modal-content-new");
var trifold_holder = $("#trifold-holder");
/*
    Working Variables
*/
var mouseX;
var mouseY;
var mousePixelX;
var mousePixelY;
var pixelSizeSkew = 48;
var pixelArtHeight = 8;
var pixelArtWidth = 8;
var canvasHolderLeft;
var canvasHolderTop;
var pixelGuideLeftPosition;
var pixelGuideTopPosition;
var chosenColor;
var workingProject;
var workingDirectory;
/*
    Init
*/
jQuery(function () {
    chosenColor = new color();
    changeActiveColor(5, 5, 5);
    renderPixelCanvas();
    console.log(chosenColor.getRGB());
    console.log(consoleList);
    console.log(console_select.options);
});
/*
    Functions
*/
function changeActiveColor(r, g, b) {
    chosenColor.setColor(r, g, b);
}
function openNewHeader() {
    modal_holder.css("display", "flex");
    modal_content_new.css("display", "flex");
}
function closeHeader() {
    modal_holder.css("display", "none");
    modal_content_new.css("display", "none");
}
/*
*   (Function)
*   Adds a Color Palette to the Working Project and creates a Color Palette Box to go with it
*/
function addColorPalette() {
    if (workingProject != null) {
        workingProject.projectColorPalettes.push(new colorPalette);
        console.log(workingProject.projectColorPalettes);
        color_palette_holder.append(constructColorPaletteBox());
    }
}
/*
*   (Function)
*   Constructs and returns a Color Palette Box
*/
function constructColorPaletteBox(passColorPalette) {
    if (passColorPalette === void 0) { passColorPalette = null; }
    //Create the Color Palette Box <div> itself 
    var colorPaletteBox = document.createElement("div");
    colorPaletteBox.classList.add("color-palette-box");
    //Creates the Color Palette Box Title Text <input>  
    var colorPaletteBoxTitle = document.createElement("input");
    colorPaletteBoxTitle.classList.add("color-palette-name");
    colorPaletteBoxTitle.type = "text";
    colorPaletteBoxTitle.placeholder = "Palette #";
    //Creates the Color Palette Box Color Grid <div>
    var colorPaletteGrid = document.createElement("div");
    colorPaletteGrid.classList.add("color-palette-grid");
    //Adds the color buttons to the color palettes based on the project console color palette limit 
    for (var i = 0; i < workingProject.projectConsole.colorPaletteLimit; i++) {
        var colorButton = document.createElement("button");
        colorButton.classList.add("color-button");
        if (passColorPalette != null) {
            colorButton.style.backgroundColor = passColorPalette.colors[i].getRGB();
        }
        else {
            colorButton.style.backgroundColor = "rgb(255, 255, 255)";
        }
        colorPaletteGrid.appendChild(colorButton);
    }
    //Adds the children to the Color Palette Box <div> 
    colorPaletteBox.appendChild(colorPaletteBoxTitle);
    colorPaletteBox.appendChild(colorPaletteGrid);
    //Returns the Color Palette Box 
    return colorPaletteBox;
}
/*
*   (Function)
*   Constructs the workingProject from the specifications of the new project dialog
*/
function createProject() {
    var tempProjectName = new_project_name_input.val().toString();
    var tempProjectConsole;
    switch (console_select.selectedIndex) {
        case 1:
            tempProjectConsole = consoleList[0];
            break;
        case 2:
            tempProjectConsole = consoleList[1];
            break;
        case 3:
            tempProjectConsole = consoleList[2];
            break;
        case 4:
            tempProjectConsole = consoleList[3];
            break;
        default:
            console.error("What how did you get here? No console is selected.");
            break;
    }
    var tempProject = new project(tempProjectName, tempProjectConsole);
    console.log(tempProject);
    closeHeader();
    workingProject = tempProject;
    workingDirectory = null;
    trifold_holder.css("pointerEvents", "all");
    console.log(workingProject);
}
function initiateSave() {
    if (workingDirectory == null && workingProject != null) {
        chooseProjectDirectory();
    }
    else if (workingDirectory != null && workingProject != null) {
        saveProjectNewDirectory();
    }
}
function chooseProjectDirectory() {
    dialog.showOpenDialog({
        title: "Save project where...",
        defaultPath: __dirname,
        buttonLabel: "Save",
        properties: [
            'createDirectory',
            'openDirectory'
        ]
    }).then(function (result) {
        workingDirectory = path.join(result.filePaths[0], workingProject.name);
        console.log(workingDirectory);
        saveProjectNewDirectory();
    });
}
function saveProjectNewDirectory() {
    if (!fs.existsSync(workingDirectory)) {
        fs.mkdir(workingDirectory, { recursive: false }, function (err) {
            if (err) {
                console.error("Save Didn't Work! PANIC!");
            }
        });
        fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
        fs.mkdir((workingDirectory + "/tiles"), { recursive: false }, function (err) {
            if (err) {
                console.error("Tile Folder Creation didn't work");
            }
        });
    }
    else {
        console.log("Moving to saveProject()");
        saveProject();
    }
}
function saveProject() {
    fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
}
function openProject() {
}
function loadProject() {
}
function plotPixel() {
    var paintLeft = mousePixelX * pixelSizeSkew;
    var paintTop = mousePixelY * pixelSizeSkew;
    console.log(paintLeft);
    console.log(paintTop);
    var drawing = pixel_canvas.getContext("2d");
    drawing.lineWidth = 1;
    drawing.fillStyle = chosenColor.getRGB();
    drawing.fillRect(paintLeft, paintTop, pixelSizeSkew, pixelSizeSkew);
}
function renderPixelCanvas() {
    pixel_canvas.setAttribute("width", (pixelSizeSkew * pixelArtWidth).toString() + "px");
    pixel_canvas.setAttribute("height", (pixelSizeSkew * pixelArtHeight).toString() + "px");
    pixel_guide.css("width", (pixelSizeSkew - 2).toString() + "px");
    pixel_guide.css("height", (pixelSizeSkew - 2).toString() + "px");
}
function setChosenColor(button) {
    console.log(button.style.backgroundColor);
    chosenColor.setColorByRGB(button.style.backgroundColor);
}
function openColorPicker(button) {
    $("#nes-color-picker").css("left", button.getBoundingClientRect().left);
    $("#nes-color-picker").css("top", button.getBoundingClientRect().top);
}
//function setChosenColor(button: JQuery<HTMLElement>) {
//    alert(button.css("background-color"));
//}
//function openColorPicker(button: JQuery<HTMLElement>) {
//    $("#nes-color-picker").css("left", button.position().left);
//    $("#nes-color-picker").css("top", button.position().top);
//}
/*
    Event Listeners
*/
canvas_holder.on("mouseenter", function (e) {
    pixel_guide.css("display", "block");
});
canvas_holder.on("mouseleave", function (e) {
    pixel_guide.css("display", "none");
});
canvas_holder.on("mousemove", function (e) {
    mouseX = e.clientX - pixel_canvas.getBoundingClientRect().left;
    mouseY = e.clientY - pixel_canvas.getBoundingClientRect().top;
    pixelGuideLeftPosition = Math.floor(mouseX / pixelSizeSkew) * pixelSizeSkew;
    pixelGuideTopPosition = Math.floor(mouseY / pixelSizeSkew) * pixelSizeSkew;
    mousePixelX = pixelGuideLeftPosition / pixelSizeSkew;
    mousePixelY = pixelGuideTopPosition / pixelSizeSkew;
    //console.log("mousePixelX: " + mousePixelX);
    //console.log("mousePixelY: " + mousePixelY);
    pixel_guide.css("left", pixelGuideLeftPosition + "px");
    pixel_guide.css("top", pixelGuideTopPosition + "px");
});
canvas_holder.on("click", function () {
    plotPixel();
});
//  (Event Handler)
//  Makes sure the Project has a name and console before creating allowing creation 
$("#create-project-button").on("click", function () {
    if ($("#new-project-name-input").val() == "") {
        alert("Please enter a project name.");
    }
    else if (console_select.value == "") {
        alert("Please select a console for the project.");
    }
    else {
        createProject();
    }
});
//  (Event Handler) 
//  Updates the color palette name in the project when changed on the GUI 
$("#color-palette-holder").on("change", ".color-palette-name", function () {
    var paletteIndex = $(".color-palette-name").index(this);
    console.log("paletteIndex = " + paletteIndex);
    workingProject.projectColorPalettes[paletteIndex].name = $(this).val();
    console.log("paletteName = " + $(this).val());
});
//  (Event Handler)
//  .color-buttons LMB 
$("#color-palette-holder").on("click", ".color-button", function () {
    //var button = $("this");
    //setChosenColor(button);
    setChosenColor(this);
});
//  (Event Handler)
//  .color-buttons RMB  
$("#color-palette-holder").on("contextmenu", ".color-button", function () {
    //var button = $("this");
    //openColorPicker(button);
    openColorPicker(this);
});
