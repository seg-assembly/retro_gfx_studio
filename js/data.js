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
    new color("nes00", 84, 84, 84, "$00"),     //nes00
    new color("nes01", 0, 30, 116, "$01"),     //nes01 
    new color("nes02", 8, 16, 144, "$02"),     //nes02 
    new color("nes03", 48, 0, 136, "$03"),     //nes03 
    new color("nes04", 68, 0, 100, "$04"),     //nes04 
    new color("nes05", 92, 0, 48, "$05"),      //nes05 
    new color("nes06", 84, 4, 0, "$06"),       //nes06
    new color("nes07", 60, 24, 0, "$07"),      //nes07
    new color("nes08", 32, 42, 0, "$08"),      //nes08
    new color("nes09", 8, 58, 0, "$09"),       //nes09
    new color("nes0a", 0, 64, 0, "$0a"),       //nes0a
    new color("nes0b", 0, 60, 0, "$0b"),       //nes0b
    new color("nes0e", 0, 50, 60, "$0c"),      //nes0c
    new color("nes0d", 0, 0, 0, "$0d"),        //nes0d
    new color("nes0e", 0, 0, 0, "$0e"),        //nes0e
    new color("nes0f", 0, 0, 0, "$0f"),        //nes0f
    new color("nes10", 152, 150, 152, "$10"),  //nes10
    new color("nes11", 8, 76, 196, "$11"),     //nes11
    new color("nes12", 48, 50, 236, "$12"),    //nes12
    new color("nes13", 92, 30, 228, "$13"),    //nes13
    new color("nes14", 136, 20, 176, "$14"),   //nes14
    new color("nes15", 160, 20, 100, "$15"),   //nes15
    new color("nes16", 152, 34, 32, "$16"),    //nes16
    new color("nes17", 120, 60, 0, "$17"),     //nes17
    new color("nes18", 84, 90, 0, "$18"),      //nes18
    new color("nes19", 40, 114, 0, "$19"),     //nes19
    new color("nes1a", 8, 124, 0, "$1a"),      //nes1a
    new color("nes1b", 0, 118, 40, "$1b"),     //nes1b
    new color("nes1c", 0, 102, 120, "$1c"),    //nes1c
    new color("nes1d", 0, 0, 0, "$1d"),        //nes1d
    new color("nes1e", 0, 0, 0, "$1e"),        //nes1e
    new color("nes1f", 0, 0, 0, "$1f"),        //nes1f
    new color("nes20", 236, 238, 236, "$20"),  //nes20
    new color("nes21", 76, 154, 236, "$21"),   //nes21
    new color("nes22", 120, 124, 236, "$22"),  //nes22
    new color("nes23", 176, 98, 236, "$23"),   //nes23
    new color("nes24", 228, 84, 236, "$24"),   //nes24
    new color("nes25", 236, 88, 180, "$25"),   //nes25
    new color("nes26", 236, 106, 100, "$26"),  //nes26
    new color("nes27", 212, 136, 32, "$27"),   //nes27
    new color("nes28", 160, 170, 0, "$28"),    //nes28
    new color("nes29", 116, 196, 0, "$29"),    //nes29
    new color("nes2a", 76, 208, 32, "$2a"),    //nes2a
    new color("nes2b", 56, 204, 108, "$2b"),   //nes2b
    new color("nes2c", 56, 280, 204, "$2c"),   //nes2c
    new color("nes2d", 60, 60, 60, "$2d"),     //nes2d
    new color("nes2e", 0, 0, 0, "$2e"),        //nes2e
    new color("nes2f", 0, 0, 0, "$2f"),        //nes2f
    new color("nes30", 236, 238, 236, "$30"),  //nes30
    new color("nes31", 168, 204, 236, "$31"),  //nes31
    new color("nes32", 188, 188, 236, "$32"),  //nes32
    new color("nes33", 212, 178, 236, "$33"),  //nes33
    new color("nes34", 236, 174, 236, "$34"),  //nes34
    new color("nes35", 236, 174, 212, "$35"),  //nes35
    new color("nes36", 236, 180, 176, "$36"),  //nes36
    new color("nes37", 228, 196, 144, "$37"),  //nes37
    new color("nes38", 204, 210, 120, "$38"),  //nes38
    new color("nes39", 180, 222, 120, "$39"),  //nes39
    new color("nes3a", 168, 226, 144, "$3a"),  //nes3a
    new color("nes3b", 152, 226, 180, "$3b"),  //nes3b
    new color("nes3c", 160, 214, 228, "$3c"),  //nes3c
    new color("nes3d", 160, 162, 160, "$3d"),  //nes3d
    new color("nes3e", 0, 0, 0, "$3e"),        //nes3e
    new color("nes3f", 0, 0, 0, "$3f")         //nes3f
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
