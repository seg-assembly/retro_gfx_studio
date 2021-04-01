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
    function tile(imageUrl) {
        this.imageUrl = imageUrl;
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
var pixel_guide = document.getElementById("pixel-guide");
var art_section = document.getElementById("art-section");
var canvas_holder = document.getElementById("canvas-holder");
var pixel_canvas = document.getElementById("pixel-canvas");
var new_button = document.getElementById("new-button");
var modal_holder = document.getElementById("modal-holder");
var modal_close = document.getElementById("modal-close");
var color_palette_holder = document.getElementById("color-palette-holder");
var new_project_name_input = document.getElementById("new-project-name-input");
var console_select = document.getElementById("console-select");
var modal_content_new = document.getElementById("modal-content-new");
var trifold_holder = document.getElementById("trifold-holder");
var color_palette_box_template = document.getElementById("color-palette-box-template");
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
var workingDirectory;
/*
    Init
*/
jQuery(function () {
    chosenColor = new color();
    changeActiveColor(5, 5, 5);
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
    modal_holder.style.display = "flex";
    modal_content_new.style.display = "flex";
}
function closeHeader() {
    modal_holder.style.display = "none";
    modal_content_new.style.display = "none";
}
/*
*   (Function)
*   Adds a Color Palette to the Working Project and creates a Color Palette Box to go with it
*/
function addColorPalette() {
    if (workingProject != null) {
        workingProject.projectColorPalettes.push(new colorPalette);
        console.log(workingProject.projectColorPalettes);
        color_palette_holder.appendChild(constructColorPaletteBox());
    }
}
/*
*   (Function)
*   Constructs and returns a Color Palette Box
*/
function constructColorPaletteBox() {
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
    //Adds the children to the Color Palette Box <div> 
    colorPaletteBox.appendChild(colorPaletteBoxTitle);
    colorPaletteBox.appendChild(colorPaletteGrid);
    //Returns the Color Palette Box 
    return colorPaletteBox;
}
function createProject() {
    var tempProjectName = new_project_name_input.value;
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
    trifold_holder.style.pointerEvents = "all";
    console.log(workingProject);
}
function initiateSave() {
    if (workingDirectory == null && workingProject != null) {
        chooseProjectDirectory();
    }
    else if (workingDirectory != null && workingProject != null) {
        saveProjectDirectory();
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
        saveProjectDirectory();
    });
}
function saveProjectDirectory() {
    if (!fs.existsSync(workingDirectory)) {
        fs.mkdir(workingDirectory, { recursive: false }, function (err) {
            if (err) {
                console.error("Save Didn't Work! PANIC!");
            }
        });
        fs.mkdir(path.join(workingDirectory, "tiles"), { recursive: false }, function (err) {
            if (err) {
                console.error("Tile Folder Creation didn't work");
            }
        });
        fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
    }
    else {
        console.log("Directory Already Exists");
        fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
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
