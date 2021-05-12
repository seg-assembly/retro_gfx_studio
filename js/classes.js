const emptyBitMap = [
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
]

class project {
    constructor(name, projectConsole) {
        this.name = name;
        this.projectConsole = projectConsole;
        this.projectColorPalettes = [];
        this.projectArt = [];
    }
}

class tile {
    tilePaletteID = 0;
    tileBits = [["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"],
    ["00","00","00","00","00","00","00","00"]];

    constructor() {
    }
}

class art {
    tiles = [[]];

    constructor() {

    }
}

class color {
    colorID;
    red;
    green;
    blue;
    rgbColorString;

    constructor(colorID = null, red = null, green = null, blue = null) {
        this.colorID = colorID;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.setColorString();
    }

    setColor(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.setColorString();
    }

    setColorString() {
        this.rgbColorString = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
    }

    setColorByRGB(rgb) {
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

class colorPalette {
    name;
    colors;

    constructor() {
        this.name;
        this.colors = [new color(), new color(), new color(), new color()];
    }
}

class gameConsole {
    name;
    colorPaletteLimit;

    constructor(name, colorPaletteLimit) {
        this.name = name;
        this.colorPaletteLimit = colorPaletteLimit;
    }
}

module.exports = {
    project,
    tile,
    art,
    color,
    colorPalette,
    gameConsole
}