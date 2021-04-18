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
    colorID: string;
    red: number;
    green: number;
    blue: number;
    rgbColorString: string;

    constructor(colorID: string = null, red: number = null, green: number = null, blue: number = null) {
        this.colorID = colorID;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.setColorString();
    }

    setColor(r: number, g: number, b: number) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.setColorString();
    }

    setColorString() {
        this.rgbColorString = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
    }

    setColorByRGB(rgb: string) {
        //Removes the rgb string elements from the string to get the rgb values 
        rgb = rgb.replace("rgb(", "");
        rgb = rgb.replace(")", "");
        rgb = rgb.replace(",", "");
        rgb = rgb.replace(",", "");

        //Splits the rgb values into three substrings for r, g, and b 
        var values = rgb.split(" ");

        this.setColor(parseInt(values[0]), parseInt(values[1]), parseInt(values[2]));

        //Test log  
        console.log(this.getRGB());
    }

    getRGB() {
        return this.rgbColorString;
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

    constructor(name: string, colorPaletteLimit: number) {
        this.name = name;
        this.colorPaletteLimit = colorPaletteLimit;
    }
}

/* 
    Data 
*/

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

//All the Colors the NES can handle 
const nesColors: color[] = [
    new color("nes00", 84, 84, 84),     //nes00
    new color("nes01", 0, 30, 116),     //nes01 
    new color("nes02", 8, 16, 144),     //nes02 
    new color("nes03", 48, 0, 136),     //nes03 
    new color("nes04", 68, 0, 100),     //nes04 
    new color("nes05", 92, 0, 48),      //nes05 
    new color("nes06", 84, 4, 0),       //nes06
    new color("nes07", 60, 24, 0),      //nes07
    new color("nes08", 32, 42, 0),      //nes08
    new color("nes09", 8, 58, 0),       //nes09
    new color("nes0a", 0, 64, 0),       //nes0a
    new color("nes0b", 0, 60, 0),       //nes0b
    new color("nes0e", 0, 50, 60),      //nes0c
    new color("nes0d", 0, 0, 0),        //nes0d
    new color("nes0e", 0, 0, 0),        //nes0e
    new color("nes0f", 0, 0, 0),        //nes0f
    new color("nes10", 152, 150, 152),  //nes10
    new color("nes11", 8, 76, 196),     //nes11
    new color("nes12", 48, 50, 236),    //nes12
    new color("nes13", 92, 30, 228),    //nes13
    new color("nes14", 136, 20, 176),   //nes14
    new color("nes15", 160, 20, 100),   //nes15
    new color("nes16", 152, 34, 32),    //nes16
    new color("nes17", 120, 60, 0),     //nes17
    new color("nes18", 84, 90, 0),      //nes18
    new color("nes19", 40, 114, 0),     //nes19
    new color("nes1a", 8, 124, 0),      //nes1a
    new color("nes1b", 0, 118, 40),     //nes1b
    new color("nes1c", 0, 102, 120),    //nes1c
    new color("nes1d", 0, 0, 0),        //nes1d
    new color("nes1e", 0, 0, 0),        //nes1e
    new color("nes1f", 0, 0, 0),        //nes1f
    new color("nes20", 236, 238, 236),  //nes20
    new color("nes21", 76, 154, 236),   //nes21
    new color("nes22", 120, 124, 236),  //nes22
    new color("nes23", 176, 98, 236),   //nes23
    new color("nes24", 228, 84, 236),   //nes24
    new color("nes25", 236, 88, 180),   //nes25
    new color("nes26", 236, 106, 100),  //nes26
    new color("nes27", 212, 136, 32),   //nes27
    new color("nes28", 160, 170, 0),    //nes28
    new color("nes29", 116, 196, 0),    //nes29
    new color("nes2a", 76, 208, 32),    //nes2a
    new color("nes2b", 56, 204, 108),   //nes2b
    new color("nes2c", 56, 280, 204),   //nes2c
    new color("nes2d", 60, 60, 60),     //nes2d
    new color("nes2e", 0, 0, 0),        //nes2e
    new color("nes2f", 0, 0, 0),        //nes2f
    new color("nes30", 236, 238, 236),  //nes30
    new color("nes31", 168, 204, 236),  //nes31
    new color("nes32", 188, 188, 236),  //nes32
    new color("nes33", 212, 178, 236),  //nes33
    new color("nes34", 236, 174, 236),  //nes34
    new color("nes35", 236, 174, 212),  //nes35
    new color("nes36", 236, 180, 176),  //nes36
    new color("nes37", 228, 196, 144),  //nes37
    new color("nes38", 204, 210, 120),  //nes38
    new color("nes39", 180, 222, 120),  //nes39
    new color("nes3a", 168, 226, 144),  //nes3a
    new color("nes3b", 152, 226, 180),  //nes3b
    new color("nes3c", 160, 214, 228),  //nes3c
    new color("nes3d", 160, 162, 160),  //nes3d
    new color("nes3e", 0, 0, 0),        //nes3e
    new color("nes3f", 0, 0, 0)         //nes3f
];

//All the colors the Game Boy can handle (all 4 of them!)
const gbColors: color[] = [
    new color("gb11", 15, 56, 15),
    new color("gb10", 48, 98, 48),
    new color("gb01", 139, 172, 15),
    new color("gb00", 155, 188, 15)
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
let color_picker_container = $("#color-picker-container");

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

function nesColorPopulation() {
    nesColors.forEach(element => {
        var nesColorSquare: HTMLElement = document.createElement("button");
        nesColorSquare.style.backgroundColor = element.getRGB();
        nesColorSquare.style.borderColor = element.getRGB();
        nesColorSquare.classList.add("color-picker-button");
        $("#nes-color-picker").children(".color-picker-button-grid").append(nesColorSquare);
    });
}

function gameBoyColorPopulation() {
    gbColors.forEach(element => {
        var gbColorSquare: HTMLElement = document.createElement("button");
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
    chosenColor.setColorByRGB(button.style.backgroundColor);
}

function openColorPicker(button: HTMLElement) {
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

    pixel_guide.css("left", pixelGuideLeftPosition + "px");
    pixel_guide.css("top", pixelGuideTopPosition + "px");
});

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
    console.log("paletteIndex = " + paletteIndex);
    workingProject.projectColorPalettes[paletteIndex].name = <string>$(this).val();
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
    $(".choosing-button").css("background-color", newColor);
})