"use strict";
exports.__esModule = true;
exports.gameConsole = exports.colorPalette = exports.color = exports.tile = exports.project = void 0;
var project = /** @class */ (function () {
    function project(name, projectConsole) {
        this.name = name;
        this.projectConsole = projectConsole;
        this.projectColorPalettes = [];
        this.projectTiles = [];
    }
    return project;
}());
exports.project = project;
var tile = /** @class */ (function () {
    function tile() {
    }
    return tile;
}());
exports.tile = tile;
var color = /** @class */ (function () {
    function color(colorID, red, green, blue) {
        if (colorID === void 0) { colorID = null; }
        if (red === void 0) { red = null; }
        if (green === void 0) { green = null; }
        if (blue === void 0) { blue = null; }
        this.colorID = colorID;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.setColorString();
    }
    color.prototype.setColor = function (r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.setColorString();
    };
    color.prototype.setColorString = function () {
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
    };
    color.prototype.getRGB = function () {
        return this.rgbColorString;
    };
    return color;
}());
exports.color = color;
var colorPalette = /** @class */ (function () {
    function colorPalette() {
        this.name;
        this.colors = [];
    }
    return colorPalette;
}());
exports.colorPalette = colorPalette;
var gameConsole = /** @class */ (function () {
    function gameConsole(name, colorPaletteLimit) {
        this.name = name;
        this.colorPaletteLimit = colorPaletteLimit;
    }
    return gameConsole;
}());
exports.gameConsole = gameConsole;
