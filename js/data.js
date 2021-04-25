const consoleList =[
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
    ]

//All the Colors the NES can handles
const nesColors =[
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
]

//All the colors the Game Boy can handle (all 4 of them!)
const gbColors =[
    new color("gb11", 15, 56, 15),
    new color("gb10", 48, 98, 48),
    new color("gb01", 139, 172, 15),
    new color("gb00", 155, 188, 15)
]


module.exports = {
    consoleList,
    nesColors,
    gbColors
}
