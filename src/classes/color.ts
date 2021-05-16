class color {
    colorID: string;
    red: number;
    green: number;
    blue: number;
    exportCode: string;
    rgbColorString: string;

    constructor(colorID: string, red: number, green: number, blue: number, exportCode: string) {
        this.colorID = colorID;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.exportCode = exportCode;
        this.rgbColorString = this.setColorString();
    }

    setColor(r: number, g: number, b: number) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.setColorString();
    }

    setColorString(): string {
        return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
    }

    setColorByRGB(rgb: String) {
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