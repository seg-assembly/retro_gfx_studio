//Imports 
const electron = require('electron');
const path = require('path');
const fs = require('fs');
window.$ = window.jQuery = require('jquery');
const { project, tile, art, color, colorPalette, gameConsole } = require('./js/classes.js');
const { consoleList, nesColors, gbColors } = require('./js/data.js');

//Const Definitions 
const dialog = electron.remote.dialog;
const colorPalette2BitStrings = ["00", "01", "10", "11"];
const colorPalette3BitStrings = ["000", "001", "010", "011", "100", "101", "110", "111"];

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
var workingProject = new project();
var workingDirectory;
var workingArtIndex = null;
var bitBrush = null;
var exportDirectory;

/*
    Init 
*/
jQuery(function () {
    chosenColor = new color();
    nesColorPopulation();
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
function addColorPalette(passPalette = null) {
    if (workingProject != null) {
        var tempPalette = new colorPalette();
        if (passPalette == null) {
            Object.assign(tempPalette.colors[0], nesColors[48]);
            Object.assign(tempPalette.colors[1], nesColors[48]);
            Object.assign(tempPalette.colors[2], nesColors[48]);
            Object.assign(tempPalette.colors[3], nesColors[48]);
        } else {
            tempPalette.colors[0] = passPalette[0];
            tempPalette.colors[1] = passPalette[1];
            tempPalette.colors[2] = passPalette[2];
            tempPalette.colors[3] = passPalette[3];
        }


        color_palette_holder.append(constructColorPaletteBox(tempPalette));
        workingProject.projectColorPalettes.push(tempPalette);
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

    var colorPaletteBoxHeadHolder = document.createElement("div");
    colorPaletteBoxHeadHolder.classList.add("color-palette-box-head-holder");

    //Creates the Color Palette Box Title Text <input>  
    var colorPaletteBoxTitle = document.createElement("input");
    colorPaletteBoxTitle.classList.add("color-palette-name");
    colorPaletteBoxTitle.type = "text";
    colorPaletteBoxTitle.placeholder = "New Palette";
    if(passColorPalette != null && passColorPalette.name != undefined) {
        colorPaletteBoxTitle.value = passColorPalette.name;
    }

    var colorPaletteCheckBox = document.createElement("input");
    colorPaletteCheckBox.classList.add("color-palette-check-box");
    colorPaletteCheckBox.type = "checkbox";


    colorPaletteBoxHeadHolder.appendChild(colorPaletteBoxTitle);
    colorPaletteBoxHeadHolder.appendChild(colorPaletteCheckBox);

    //Creates the Color Palette Box Color Grid <div>
    var colorPaletteGrid = document.createElement("div");
    colorPaletteGrid.classList.add("color-palette-grid");

    //Adds the color buttons to the color palettes based on the project console color palette limit 
    for (var i = 0; i < workingProject.projectConsole.colorPaletteLimit; i++) {

        //Element creation for each color of the color Palette 
        var colorButtonHolder = document.createElement("div");
        var colorButton = document.createElement("button");
        var colorButtonBitLabel = document.createElement("p");

        //Class Assigning 
        colorButtonHolder.classList.add("color-button-holder");
        colorButton.classList.add("color-button");
        colorButtonBitLabel.classList.add("color-button-bit-label");

        //If a color is passed in (i.e. a project was opened), it would set the buttons color the the appropriate color 
        if (passColorPalette != null) {
            colorButton.style.backgroundColor = passColorPalette.colors[i].rgbColorString;
        } else {
            colorButton.style.backgroundColor = "rgb(255, 255, 255)";
        }

        colorButtonBitLabel.innerHTML = colorPalette2BitStrings[i];

        colorButtonHolder.appendChild(colorButton);
        colorButtonHolder.appendChild(colorButtonBitLabel);

        colorPaletteGrid.appendChild(colorButtonHolder);
    }

    //Adds the children to the Color Palette Box <div> 
    colorPaletteBox.appendChild(colorPaletteBoxHeadHolder);
    colorPaletteBox.appendChild(colorPaletteGrid);
    colorPaletteBox.setAttribute("draggable", "true");

    //Returns the Color Palette Box 
    return colorPaletteBox;
}

//  (Function)
//  Adds a tile to the working project and a tile button to boot
function addTile() {
    if (workingProject != null) {
        workingProject.projectArt.push(new tile);
        console.log(workingProject.projectArt);

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

    //Appending to combine the elements into one element tree 
    newArtBox.append(newArtBoxCanvas);

    if (passTile != null) {

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
        default:
            console.error("What how did you get here? No console is selected.")
            break;
    }

    var tempProject = new project(tempProjectName, tempProjectConsole);
    console.log(tempProject);
    closeHeader();
    workingProject = tempProject;
    workingDirectory = null;
    addColorPalette();
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
    dialog.showOpenDialog({
        title: "Open project...",
        defaultPath: __dirname,
        buttonLabel: "Open",
        filters: [{
            name: "Retro Graphics Studio Projects",
            extensions: [".rgsproj"]
        }],
        properties: [
            'openFile'
        ]
    }).then(result => {
        workingDirectory = (result.filePaths[0].replace(path.basename(result.filePaths[0]), ""));
        var openTempString = fs.readFileSync(result.filePaths[0]).toString();
        var openTempProject = new project();
        openTempProject = JSON.parse(openTempString);
        loadProject(openTempProject);
    })
}

//  (Function)
//  
function loadProject(openedProject) {
    Object.assign(workingProject, openedProject);
    console.log(workingProject);

    for(var i = 0; i < workingProject.projectColorPalettes.length; i++) {
        color_palette_holder.append(constructColorPaletteBox(workingProject.projectColorPalettes[i]));
    }

    for(var i = 0; i < workingProject.projectArt.length; i++) {
        art_grid.append(constructArtBox());
    }

    trifold_holder.css("pointerEvents", "all");
}

//  (Function)
//  Draws a pixel to the active canvas 
function plotPixel() {
    var paintLeft = mousePixelX * pixelSizeSkew;
    var paintTop = mousePixelY * pixelSizeSkew;

    workingProject.projectArt[workingArtIndex].tileBits[mousePixelX][mousePixelY] = bitBrush;

    var drawing = pixel_canvas.getContext("2d");
    drawing.lineWidth = 1;
    drawing.fillStyle = chosenColor.rgbColorString
    drawing.fillRect(paintLeft, paintTop, pixelSizeSkew, pixelSizeSkew);

}

//  (Function)
//  Sets the width and height of the pixel_canvas and the pixel_guide 
function renderPixelCanvas(artIndex) {
    pixel_canvas.setAttribute("width", (pixelSizeSkew * pixelArtWidth).toString() + "px");
    pixel_canvas.setAttribute("height", (pixelSizeSkew * pixelArtHeight).toString() + "px");

    pixel_guide.css("width", (pixelSizeSkew - 2).toString() + "px");
    pixel_guide.css("height", (pixelSizeSkew - 2).toString() + "px");

    pixel_canvas.style.display = "block";
    pixel_guide.css("display", "block");

    drawPixelCanvasImage(artIndex);
}

// (Function)
//  
function drawPixelCanvasImage(artIndex) {
    var drawing = pixel_canvas.getContext("2d");

    for (var i = 0; i < 8; i++) {    //Bad Programming, but every tile is 8x8 so this works 
        for (var j = 0; j < 8; j++) {
            var bitValue = colorPalette2BitStrings.findIndex(x => x == workingProject.projectArt[artIndex].tileBits[j][i]);
            var workingPalette = workingProject.projectArt[artIndex].tilePaletteID;
            var color = workingProject.projectColorPalettes[workingPalette].colors[bitValue].rgbColorString;

            drawing.lineWidth = 1;
            drawing.fillStyle = color;
            drawing.fillRect(pixelSizeSkew * j, pixelSizeSkew * i, pixelSizeSkew, pixelSizeSkew);
        }
    }
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
    }

}


function setPaletteCheck() {
    var pIndex = workingProject.projectArt[workingArtIndex].tilePaletteID;

    $(".color-palette-check-box").eq(pIndex).prop("checked", true);

    $(".color-palette-check-box").not($(".color-palette-check-box").eq(pIndex)).prop("checked", false);
}

function exportProject() {
    dialog.showOpenDialog({
        title: "Export tiles/palettes where...",
        defaultPath: __dirname,
        buttonLabel: "Export",
        properties: [
            'createDirectory',
            'openDirectory'
        ]
    }).then(result => {
        exportDirectory = path.join(result.filePaths[0]);
        var tileBin = exportTileBin();
        var paletteBin = exportPaletteBin();
        fs.writeFileSync(path.join(exportDirectory, workingProject.name + "_tiles.asm"), tileBin);
        fs.writeFileSync(path.join(exportDirectory, workingProject.name + "_palettes.asm"), paletteBin);
    })
}


function exportTileBin() {
    if (workingProject != null) {
        var fullBitString = "";
        workingProject.projectArt.forEach(element => {

            for (var i = 0; i < 8; i++) {    //Bad Programming, but every tile is 8x8 so this works 
                for (var j = 0; j < 8; j++) {
                    var bitValue = element.tileBits[j][i];
                    fullBitString += bitValue.toString();
                }
            }
        });

        return fullBitString;
    }
}

function exportPaletteBin() {
    if (workingProject != null) {
        var fullPaletteString = "";
        workingProject.projectColorPalettes.forEach(element => {
            element.colors.forEach(element => {
                fullPaletteString += element.exportCode;
            });
        });

        return fullPaletteString;
    }
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
    //console.log("paletteIndex = " + paletteIndex);
    workingProject.projectColorPalettes[paletteIndex].name = $(this).val().toString();
    //console.log("paletteName = " + $(this).val());
})

//  (Event Handler)
//  .color-buttons LMB 
$("#color-palette-holder").on("click", ".color-button", function () {
    var colorIndex = $(this).parent().index();
    bitBrush = colorPalette2BitStrings[colorIndex];
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
//  Sets the selected tiles palette when the checkbox is clicked 
$("#color-palette-holder").on("click", ".color-palette-check-box", function () {
    var paletteIndex = $(this).parent().parent().index();
    workingProject.projectArt[workingArtIndex].tilePaletteID = paletteIndex;

    $(".color-palette-check-box").not(this).prop("checked", false);

    drawPixelCanvasImage(workingArtIndex);
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
    var colorIndex = choosingButton.parent().index();
    var paletteIndex = choosingButton.parent().parent().parent().index();
    workingProject.projectColorPalettes[paletteIndex].colors[colorIndex].setColorByRGB(newColor);
    workingProject.projectColorPalettes[paletteIndex].colors[colorIndex].exportCode = nesColors[$(this).index()].exportCode;

    if (workingArtIndex != null) {
        renderPixelCanvas(workingArtIndex);
    }


    choosingButton.css("background-color", newColor);
})

//  (Event Handler)
//  Sets the pixel grid and the workingTile to tile associated with the tile-button 
$("#art-grid").on("click", ".art-box", function () {
    console.log($(this).index());
    workingArtIndex = $(this).index();
    setPaletteCheck();
    renderPixelCanvas(workingArtIndex);
})

/*
    Renderer Handoffs (Menu and Such)
*/
electron.ipcRenderer.on("new-project", function () {
    openNewHeader();
})

electron.ipcRenderer.on("open-project", function () {
    openProject();
})

electron.ipcRenderer.on("save-project", function () {
    initiateSave();
})

electron.ipcRenderer.on("print-working-project", function () {
    console.log(workingProject);
})

electron.ipcRenderer.on("export-project", function () {
    exportProject();
})