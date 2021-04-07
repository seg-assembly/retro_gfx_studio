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

    constructor(tileID : number) {
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
let pixel_guide = document.getElementById("pixel-guide");
let art_section = document.getElementById("art-section");
let canvas_holder = document.getElementById("canvas-holder");
let pixel_canvas = <HTMLCanvasElement>document.getElementById("pixel-canvas");
let new_button = document.getElementById("new-button");
let modal_holder = document.getElementById("modal-holder");
let modal_close = document.getElementById("modal-close");
let color_palette_holder = document.getElementById("color-palette-holder");
let new_project_name_input = <HTMLInputElement>document.getElementById("new-project-name-input");
let console_select = <HTMLSelectElement>document.getElementById("console-select");
let modal_content_new = document.getElementById("modal-content-new");
let trifold_holder = document.getElementById("trifold-holder");
let color_palette_box_template = document.getElementById("color-palette-box-template");

/*
    Working Variables 
*/
var mouseX: number;
var mouseY: number;
var mousePixelX : number;
var mousePixelY : number;
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
    if(workingProject != null) {
        workingProject.projectColorPalettes.push(new colorPalette);
        console.log(workingProject.projectColorPalettes);
        
        color_palette_holder.appendChild(constructColorPaletteBox());
    }
    
}

/*
*   (Function) 
*   Constructs and returns a Color Palette Box 
*/
function constructColorPaletteBox() : HTMLElement {
    //Create the Color Palette Box <div> itself 
    var colorPaletteBox : HTMLElement = document.createElement("div");
    colorPaletteBox.classList.add("color-palette-box");

    //Creates the Color Palette Box Title Text <input>  
    var colorPaletteBoxTitle : HTMLInputElement = document.createElement("input");
    colorPaletteBoxTitle.classList.add("color-palette-name");
    colorPaletteBoxTitle.type = "text";
    colorPaletteBoxTitle.placeholder = "Palette #";

    //Creates the Color Palette Box Color Grid <div>
    var colorPaletteGrid : HTMLElement = document.createElement("div");
    colorPaletteGrid.classList.add("color-palette-grid");

    //Adds the children to the Color Palette Box <div> 
    colorPaletteBox.appendChild(colorPaletteBoxTitle);
    colorPaletteBox.appendChild(colorPaletteGrid);

    //Returns the Color Palette Box 
    return colorPaletteBox;
}

function createProject() {
    var tempProjectName: string = new_project_name_input.value;
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
    trifold_holder.style.pointerEvents = "all"
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
            if(err) { console.error("Save Didn't Work! PANIC!"); }
        });
        fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
        fs.mkdir((workingDirectory + "/tiles"), { recursive: false }, (err) => {
            if(err) { console.error("Tile Folder Creation didn't work"); }
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
    var paintLeft : number = mousePixelX * pixelSizeSkew;
    var paintTop : number = mousePixelY * pixelSizeSkew;

    console.log(paintLeft);
    console.log(paintTop);

    var drawing = pixel_canvas.getContext("2d");
    drawing.fillStyle = chosenColor.getRGB();
    drawing.fillRect(paintLeft, paintTop, pixelSizeSkew, pixelSizeSkew);

}

function renderPixelCanvas() {
    canvas_holder.style.width = (pixelSizeSkew * pixelArtWidth).toString() + "px";
    canvas_holder.style.height = (pixelSizeSkew * pixelArtHeight).toString() + "px";

    pixel_guide.style.width = (pixelSizeSkew - 2).toString() + "px";
    pixel_guide.style.height = (pixelSizeSkew - 2).toString() + "px";
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

    mousePixelX = pixelGuideLeftPosition / pixelSizeSkew;
    mousePixelY = pixelGuideTopPosition / pixelSizeSkew;

    console.log("mousePixelX: " + mousePixelX);
    console.log("mousePixelY: " + mousePixelY);

    pixel_guide.style.left = pixelGuideLeftPosition + "px";
    pixel_guide.style.top = pixelGuideTopPosition + "px";
});

canvas_holder.addEventListener("click", e => {
    plotPixel();
})

//  (Event Handler)
//  Makes sure the Project has a name and console before creating allowing creation 
$("#create-project-button").on("click", function() {
    if($("#new-project-name-input").val() == "") {
        alert("Please enter a project name.")
    } else if(console_select.value == "") {
        alert("Please select a console for the project.");
    } else {
        createProject();
    }
});

//  (Event Handler) 
//  Updates the color palette name in the project when changed on the GUI 
$("#color-palette-holder").on("change", ".color-palette-name", function() {
    var paletteIndex = $(".color-palette-name").index(this);
    console.log("paletteIndex = " + paletteIndex);
    workingProject.projectColorPalettes[paletteIndex].name = <string>$(this).val();
    console.log("paletteName = " + $(this).val());
})