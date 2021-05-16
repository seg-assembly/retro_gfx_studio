class tile {
    tileColorPalette: colorPalette; //Copy (or Reference) of the colorPalette used by the tile 
    bitMap: string[][]; //2D Array of strings that represents the bitmap of the tile (The 1's and 0's that are tied to the colorPalette colors) 

    constructor(tileColorPalette: colorPalette, tileSize: number) {
        this.tileColorPalette = tileColorPalette;
        this.bitMap = [];

        for (var i: number = 0; i < tileSize; i++) {
            for(var j: number = 0; j < tileSize; j++) {
                this.bitMap[i][j] = "00";
            }
        }
    }
}