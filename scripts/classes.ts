export class project {
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

export class tile {
    imageData: string;
    tilePaletteID: number;

    constructor() {
    }
}

export class color {
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
    }

    getRGB() {
        return this.rgbColorString;
    }
}

export class colorPalette {
    name: string;
    colors: color[]

    constructor() {
        this.name;
        this.colors = [];
    }
}

export class gameConsole {
    name: string;
    colorPaletteLimit: number;

    constructor(name: string, colorPaletteLimit: number) {
        this.name = name;
        this.colorPaletteLimit = colorPaletteLimit;
    }
}