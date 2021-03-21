class color {
    constructor() {
        this.red;
        this.green;
        this.blue;
        console.log("Color Activated");
    }

    setColor(r, g, b){
        this.red = r;
        this.green = g;
        this.blue = b;
        console.log("My RGB vales are " + this.red + " " + this.green + " " + this.blue); 
    }
}