//Imports 
const electron = require('electron');
const path = require('path');
const fs = require('fs');
window.$ = window.jQuery = require('jquery');
const {project, tile, color, colorPalette, gameConsole} = require('./js/classes.js');
const {consoleList, nesColors, gbColors} = require('./js/data.js');

//Const Definitions 
const dialog = electron.remote.dialog;

//Basic JavaScript HTMLElements 
let pixel_guide = $("#pixel-guide");
let art_section = $("#art-section");
let canvas_holder = $("#canvas-holder");
let pixel_canvas = document.getElementById("pixel-canvas");
let new_button = $("#new-button");
let modal_holder = $("#modal-holder");
let modal_close = $("#modal-close");
let color_palette_holder = $("#color-palette-holder");
let new_project_name_input = $("#new-project-name-input");
let console_select = document.getElementById("console-select");
let modal_content_new = $("#modal-content-new");
let trifold_holder = $("#trifold-holder");
let color_picker_container = $("#color-picker-container");
let art_grid = $("#art-grid");

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
var workingTileIndex = null;

/*
    Init 
*/
jQuery(function () {
    chosenColor = new color();
    //changeActiveColor(5, 5, 5);
    //console.log(chosenColor.getRGB());
    //console.log(consoleList);
    //console.log(console_select.options);
    nesColorPopulation();
    gameBoyColorPopulation();
})

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
        var index = workingProject.projectColorPalettes.length - 1;
        //console.log(workingProject.projectColorPalettes);

        color_palette_holder.append(constructColorPaletteBox());
    }

}

/*
*   (Function) 
*   Constructs and returns a Color Palette Box 
*/
function constructColorPaletteBox(passColorPalette = null) {
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
        } else {
            colorButton.style.backgroundColor = "rgb(255, 255, 255)";
        }

        colorPaletteGrid.appendChild(colorButton);
    }

    //Adds the children to the Color Palette Box <div> 
    colorPaletteBox.appendChild(colorPaletteBoxTitle);
    colorPaletteBox.appendChild(colorPaletteGrid);
    colorPaletteBox.setAttribute("draggable", "true");

    //Returns the Color Palette Box 
    return colorPaletteBox;
}

//  (Function)
//  Adds a tile to the working project and a tile button to boot
function addTile() {
    if(workingProject != null) {
        workingProject.projectTiles.push(new tile);
        console.log(workingProject.projectTiles);

        art_grid.append(constructArtBox());
    }
}

function constructArtBox(passTile = null) {
    /*
        Building Composite HTML Components 
    */
    var newArtBox = document.createElement("div");
    newArtBox.classList.add("art-box");

    var newArtBoxCanvas = document.createElement("canvas")
    newArtBoxCanvas.classList.add("art-box-canvas");
    newArtBoxCanvas.setAttribute("width", 32);
    newArtBoxCanvas.setAttribute("height", 32);

    var newArtPaletteColorHolder = document.createElement("div");
    newArtPaletteColorHolder.classList.add("art-palette-color-holder");

    var newArtPaletteColorBox0 = document.createElement("div");
    newArtPaletteColorBox0.classList.add("art-palette-color-box");

    var newArtPaletteColorBox1 = document.createElement("div");
    newArtPaletteColorBox1.classList.add("art-palette-color-box");

    var newArtPaletteColorBox2 = document.createElement("div");
    newArtPaletteColorBox2.classList.add("art-palette-color-box");

    var newArtPaletteColorBox3 = document.createElement("div");
    newArtPaletteColorBox3.classList.add("art-palette-color-box");

    //Appending to combine the elements into one element tree 
    newArtBox.append(newArtBoxCanvas);
    newArtBox.append(newArtPaletteColorHolder);
    newArtPaletteColorHolder.append(newArtPaletteColorBox0);
    newArtPaletteColorHolder.append(newArtPaletteColorBox1);
    newArtPaletteColorHolder.append(newArtPaletteColorBox2);
    newArtPaletteColorHolder.append(newArtPaletteColorBox3);

    if(passTile != null) {

    } else {

    }

    return newArtBox;
}

function nesColorPopulation() {
    nesColors.forEach(element => {
        var nesColorSquare = document.createElement("button");
        nesColorSquare.style.backgroundColor = element.getRGB();
        nesColorSquare.style.borderColor = element.getRGB();
        nesColorSquare.classList.add("color-picker-button");
        $("#nes-color-picker").children(".color-picker-button-grid").append(nesColorSquare);
    });
}

function gameBoyColorPopulation() {
    gbColors.forEach(element => {
        var gbColorSquare = document.createElement("button");
        gbColorSquare.style.backgroundColor = element.getRGB();
        gbColorSquare.style.borderColor = element.getRGB();
        gbColorSquare.classList.add("color-picker-button");
        $("#gb-color-picker").children(".color-picker-button-grid").append(gbColorSquare);
    });
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
            console.error("What how did you get here? No console is selected.")
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

//  (Function)
//  
function initiateSave() {
    if (workingDirectory == null && workingProject != null) {
        chooseProjectDirectory();
    } else if (workingDirectory != null && workingProject != null) {
        saveProjectNewDirectory();
    }
}

//  (Function)
//  
function chooseProjectDirectory() {
    dialog.showOpenDialog({
        title: "Save project where...",
        defaultPath: __dirname,
        buttonLabel: "Save",
        properties: [
            'createDirectory',
            'openDirectory'
        ]
    }).then(result => {
        workingDirectory = path.join(result.filePaths[0], workingProject.name);
        console.log(workingDirectory);
        saveProjectNewDirectory();
    })
}

//  (Function)
//  
function saveProjectNewDirectory() {
    if (!fs.existsSync(workingDirectory)) {
        fs.mkdir(workingDirectory, { recursive: false }, (err) => {
            if (err) { console.error("Save Didn't Work! PANIC!"); }
        });
        fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
        fs.mkdir((workingDirectory + "/tiles"), { recursive: false }, (err) => {
            if (err) { console.error("Tile Folder Creation didn't work"); }
        });
    } else {
        console.log("Moving to saveProject()");
        saveProject();
    }

}

//  (Function)
//  
function saveProject() {
    fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
}

//  (Function)
//  
function openProject() {

}

//  (Function)
//  
function loadProject() {

}

//  (Function)
//  Draws a pixel to the active canvas 
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

function saveDrawingToProject() {
    var data = pixel_canvas.toDataURL();

    workingProject.projectTiles[workingTileIndex].imageData = data;
}

//  (Function)
//  Sets the width and height of the pixel_canvas and the pixel_guide 
function renderPixelCanvas(imageURL = null) {
    pixel_canvas.setAttribute("width", (pixelSizeSkew * pixelArtWidth).toString() + "px");
    pixel_canvas.setAttribute("height", (pixelSizeSkew * pixelArtHeight).toString() + "px");

    pixel_guide.css("width", (pixelSizeSkew - 2).toString() + "px");
    pixel_guide.css("height", (pixelSizeSkew - 2).toString() + "px");

    pixel_canvas.style.display = "block";
    pixel_guide.css("display", "block");

    drawPixelCanvasImage(imageURL);
}

// (Function)
//  
function drawPixelCanvasImage(imageURL) {
    var drawing = pixel_canvas.getContext("2d");
    var img = new Image;
    img.src = imageURL;

    drawing.drawImage(img, 0, 0);
}

//  (Function)
//  
function setChosenColor(button) {
    chosenColor.setColorByRGB(button.style.backgroundColor);
}

//  (Function)
//  Opens the color picker for the appropriate console 
function openColorPicker(button) {
    var colorPickerLeft = button.getBoundingClientRect().left;
    var colorPickerTop = button.getBoundingClientRect().top + button.clientHeight + 15;

    color_picker_container.css("display", "block");
    switch (workingProject.projectConsole.name) {
        case "NES":
            $("#nes-color-picker").css("left", colorPickerLeft);
            $("#nes-color-picker").css("top", colorPickerTop);
            $("#nes-color-picker").css("display", "block");
            break;
        case "SNES":
            break;
        case "Game Boy":
            $("#gb-color-picker").css("left", colorPickerLeft);
            $("#gb-color-picker").css("top", colorPickerTop);
            $("#gb-color-picker").css("display", "block");
            break;
        case "Game Boy Color":
            break;
    }

}

function testFunction() {
    alert("Guess What!");
}

/*
    Event Listeners  
*/

//  (Event Handler)
//  Shows the pixel_guide when the mouse enters the pixel_canvas 
canvas_holder.on("mouseenter", e => {
    pixel_guide.css("display", "block");
});

//  (Event Handler)
//  Hides the pixel_guide when the mouse leaves the pixel_canvas 
canvas_holder.on("mouseleave", e => {
    pixel_guide.css("display", "none");
});

//  (Event Handler)
//  Changes the position of the pixel_guide to match up to the mouse's location 
canvas_holder.on("mousemove", e => {
    mouseX = e.clientX - pixel_canvas.getBoundingClientRect().left;
    mouseY = e.clientY - pixel_canvas.getBoundingClientRect().top;

    pixelGuideLeftPosition = Math.floor(mouseX / pixelSizeSkew) * pixelSizeSkew;
    pixelGuideTopPosition = Math.floor(mouseY / pixelSizeSkew) * pixelSizeSkew;

    mousePixelX = pixelGuideLeftPosition / pixelSizeSkew;
    mousePixelY = pixelGuideTopPosition / pixelSizeSkew;

    pixel_guide.css("left", pixelGuideLeftPosition + "px");
    pixel_guide.css("top", pixelGuideTopPosition + "px");
});

//  (Event Handler)
//  Draws a pixel to canvas when clicked 
canvas_holder.on("click", function () {
    plotPixel();
    saveDrawingToProject();
})

//  (Event Handler)
//  Makes sure the Project has a name and console before creating allowing creation 
$("#create-project-button").on("click", function () {
    if ($("#new-project-name-input").val() == "") {
        alert("Please enter a project name.")
    } else if (console_select.value == "") {
        alert("Please select a console for the project.");
    } else {
        createProject();
    }
});

//  (Event Handler) 
//  Updates the color palette name in the project when changed on the GUI 
$("#color-palette-holder").on("change", ".color-palette-name", function () {
    var paletteIndex = $(".color-palette-name").index(this);
    console.log("paletteIndex = " + paletteIndex);
    workingProject.projectColorPalettes[paletteIndex].name = $(this).val().toString();
    console.log("paletteName = " + $(this).val());
})

//  (Event Handler)
//  .color-buttons LMB 
$("#color-palette-holder").on("click", ".color-button", function () {
    setChosenColor(this);
})

//  (Event Handler)
//  .color-buttons RMB  
$("#color-palette-holder").on("contextmenu", ".color-button", function () {
    $(".choosing-button").removeClass("choosing-button");
    $(this).addClass("choosing-button");
    openColorPicker(this);
})

//  (Event Handler)
//  Closes the color picker when you click outside of it 
$(window).on("click", function (event) {
    var $target = $(event.target);
    if (!$target.closest(color_picker_container).length &&
        color_picker_container.css("display") == "block") {
        color_picker_container.css("display", "none");
        $(".choosing-button").removeClass("choosing-button");
    }
})

//  (Event Handler)
//  Sets the color of the color button when you choose a color in the color picker 
$(".color-picker").on("click", ".color-picker-button", function () {
    var newColor = $(this).css("background-color");
    var choosingButton = $(".choosing-button");
    
    choosingButton.css("background-color", newColor);
})

//  (Event Handler)
//  Sets the pixel grid and the workingTile to tile associated with the tile-button 
$("#art-grid").on("click", ".art-box", function() {
    console.log($(this).index());
    workingTileIndex = $(this).index();
    renderPixelCanvas(workingProject.projectTiles[workingTileIndex].imageData);
})

/*
    Renderer Handoffs (Menu and Such)
*/
electron.ipcRenderer.on("new-project", function () {
    openNewHeader();
}) 

electron.ipcRenderer.on("open-project", function() {
    
})

electron.ipcRenderer.on("save-project", function() {
    initiateSave();
})

electron.ipcRenderer.on("print-working-project", function() {
    console.log(workingProject);
})