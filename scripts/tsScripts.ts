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
    imageUrl: string;

    constructor(imageUrl: string) {
        this.imageUrl = imageUrl;
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
let pixel_canvas = document.getElementById("pixel-canvas");
let new_button = document.getElementById("new-button");
let modal_holder = document.getElementById("modal-holder");
let modal_close = document.getElementById("modal-close");
let color_palette_holder = document.getElementById("color_palette_holder");
let new_project_name_input = <HTMLInputElement>document.getElementById("new-project-name-input");
let console_select = <HTMLSelectElement>document.getElementById("console-select");
let modal_content_new = document.getElementById("modal-content-new");
let trifold_holder = document.getElementById("trifold-holder");

/*
    Working Variables 
*/
var mouseX: number;
var mouseY: number;
var pixelSizeSkew: number = 24;
var pixelArtHeight: number;
var pixelArtWidth: number;
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

function addColorPalette() {

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
    }).then(result => {
        workingDirectory = path.join(result.filePaths[0], workingProject.name);
        console.log(workingDirectory);
        saveProjectDirectory();
    })
}

function saveProjectDirectory() {
    if (!fs.existsSync(workingDirectory)) {
        fs.mkdir(workingDirectory, { recursive: false }, (err) => {
            if(err) { console.error("Save Didn't Work! PANIC!"); }
        });
        fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
    } else {
        console.log("Directory Already Exists");
        fs.writeFileSync(path.join(workingDirectory, workingProject.name + ".rgsproj"), JSON.stringify(workingProject));
    }

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