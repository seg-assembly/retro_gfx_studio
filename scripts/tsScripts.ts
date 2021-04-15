import * as electron from 'electron';
import * as path from 'path';
import * as fs from 'fs';
const dialog = electron.remote.dialog;

/*
    Classes 
*/
class project {
    name: string;
    projectConsole: gameConsole;
    projectColorPalettes: colorPalette[];
    projectTiles: tile[];

    constructor(name: string, projectConsole: gameConsole) {
        this.name = name;
        this.projectConsole = projectConsole;
        this.projectColorPalettes = [];
        this.projectTiles = [];
    }
}

class tile {
    tileID: number;
    imageData: string;

    constructor(tileID: number) {
        this.tileID = tileID;
    }
}

class color {
    red: number;
    green: number;
    blue: number;

    constructor() {
        this.red;
        this.green;
        this.blue;
    }

    setColor(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }

    getRGB() {
        var rgb = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
        return rgb;
    }
}

class colorPalette {
    name: string;
    colors: color[]

    constructor() {
        this.name;
        this.colors = [];
    }
}

class gameConsole {
    name: string;
    colorPaletteLimit: number;

    constructor(name, colorPaletteLimit) {
        this.name = name;
        this.colorPaletteLimit = colorPaletteLimit;
    }
}

const consoleList: gameConsole[] = [
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
let pixel_guide = $("#pixel-guide");
let art_section = $("#art-section");
let canvas_holder = $("#canvas-holder");
let pixel_canvas = <HTMLCanvasElement>document.getElementById("pixel-canvas");
let new_button = $("#new-button");
let modal_holder = $("#modal-holder");
let modal_close = $("#modal-close");
let color_palette_holder = $("#color-palette-holder");
let new_project_name_input = $("#new-project-name-input"); 
let console_select = <HTMLSelectElement>document.getElementById("console-select");
let modal_content_new = $("#modal-content-new");
let trifold_holder = $("#trifold-holder");

/*
    Working Variables 
*/
var mouseX: number;
var mouseY: number;
var mousePixelX: number;
var mousePixelY: number;
var pixelSizeSkew: number = 48;
var pixelArtHeight: number = 8;
var pixelArtWidth: number = 8;
var canvasHolderLeft: number;
var canvasHolderTop: number;
var pixelGuideLeftPosition: number;
var pixelGuideTopPosition: number;
var chosenColor: color;
var workingProject: project;
var workingDirectory: string;

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
        console.log(workingProject.projectColorPalettes);

        color_palette_holder.append(constructColorPaletteBox());
    }

}

/*
*   (Function) 
*   Constructs and returns a Color Palette Box 
*/
function constructColorPaletteBox(passColorPalette: colorPalette = null): HTMLElement {
    //Create the Color Palette Box <div> itself 
    var colorPaletteBox: HTMLElement = document.createElement("div");
    colorPaletteBox.classList.add("color-palette-box");

    //Creates the Color Palette Box Title Text <input>  
    var colorPaletteBoxTitle: HTMLInputElement = document.createElement("input");
    colorPaletteBoxTitle.classList.add("color-palette-name");
    colorPaletteBoxTitle.type = "text";
    colorPaletteBoxTitle.placeholder = "Palette #";

    //Creates the Color Palette Box Color Grid <div>
    var colorPaletteGrid: HTMLElement = document.createElement("div");
    colorPaletteGrid.classList.add("color-palette-grid");

    //Adds the color buttons to the color palettes based on the project console color palette limit 
    for (var i = 0; i < workingProject.projectConsole.colorPaletteLimit; i++) {
        var colorButton: HTMLElement = document.createElement("button");
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

    //Returns the Color Palette Box 
    return colorPaletteBox;
}

/*
*   (Function) 
*   Constructs the workingProject from the specifications of the new project dialog 
*/
function createProject() {
    var tempProjectName: string = new_project_name_input.val().toString();
    var tempProjectConsole: gameConsole;

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

    var tempProject: project = new project(tempProjectName, tempProjectConsole);
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
    } else if (workingDirectory != null && workingProject != null) {
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
    }).then(result => {
        workingDirectory = path.join(result.filePaths[0], workingProject.name);
        console.log(workingDirectory);
        saveProjectNewDirectory();
    })
}

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

function saveProject() {
    fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
}

function openProject() {

}

function loadProject() {

}

function plotPixel() {
    var paintLeft: number = mousePixelX * pixelSizeSkew;
    var paintTop: number = mousePixelY * pixelSizeSkew;

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

function setChosenColor(button: HTMLElement) {
    alert(button.style.backgroundColor);
}

function openColorPicker(button: HTMLElement) {
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
canvas_holder.on("mouseenter", e => {
    pixel_guide.css("display", "block");
});

canvas_holder.on("mouseleave", e => {
    pixel_guide.css("display", "none");
});

canvas_holder.on("mousemove", e => {
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

canvas_holder.on("click", function() {
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
    console.log("paletteIndex = " + paletteIndex);
    workingProject.projectColorPalettes[paletteIndex].name = <string>$(this).val();
    console.log("paletteName = " + $(this).val());
})

//  (Event Handler)
//  .color-buttons LMB 
$("#color-palette-holder").on("click", ".color-button", function() {
    //var button = $("this");
    //setChosenColor(button);
    setChosenColor(this);
})

//  (Event Handler)
//  .color-buttons RMB  
$("#color-palette-holder").on("contextmenu", ".color-button", function() {
    //var button = $("this");
    //openColorPicker(button);
    openColorPicker(this);
})