import { Camera } from './Camera.js';
import { Wall } from './Wall.js';

export let canvas = null;
export let sketch2D = null;

export let camera;
export const bundaries = [];

function randomColor()
{
    const CSS_COLOR_NAMES = [ "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];    
    return CSS_COLOR_NAMES[Math.floor(Math.random() * CSS_COLOR_NAMES.length)];
}

export const p5Instance = new p5((sketch) => 
{
    sketch2D = sketch;
    const { createVector } = sketch;

    sketch.setup = () =>
    {
        canvas = sketch.createCanvas(725, 815);

        // Edges
        bundaries.push(new Wall(createVector(0, 0), createVector(sketch.width, 0)));
        bundaries.push(new Wall(createVector(sketch.width, 0), createVector(sketch.width, sketch.height)));
        bundaries.push(new Wall(createVector(sketch.width, sketch.height), createVector(0, sketch.height)));
        bundaries.push(new Wall(createVector(0, sketch.height), createVector(0, 0)));



        // custom
        
        bundaries.push(new Wall(createVector(50, 170), createVector(51, 377), randomColor()));
        bundaries.push(new Wall(createVector(51, 376), createVector(208, 508), randomColor()));
        bundaries.push(new Wall(createVector(209, 508), createVector(6, 517), randomColor()));
        bundaries.push(new Wall(createVector(8, 516), createVector(2, 759), randomColor()));
        bundaries.push(new Wall(createVector(0, 761), createVector(285, 760), randomColor()));
        bundaries.push(new Wall(createVector(137, 607), createVector(132, 670), randomColor()));
        bundaries.push(new Wall(createVector(133, 670), createVector(204, 690), randomColor()));
        bundaries.push(new Wall(createVector(137, 608), createVector(204, 689), randomColor()));
        bundaries.push(new Wall(createVector(288, 760), createVector(287, 807), randomColor()));
        bundaries.push(new Wall(createVector(286, 805), createVector(405, 802), randomColor()));
        bundaries.push(new Wall(createVector(403, 802), createVector(401, 763), randomColor()));
        bundaries.push(new Wall(createVector(402, 765), createVector(655, 761), randomColor()));
        bundaries.push(new Wall(createVector(658, 760), createVector(506, 609), randomColor()));
        bundaries.push(new Wall(createVector(503, 605), createVector(714, 592), randomColor()));
        bundaries.push(new Wall(createVector(713, 590), createVector(706, 339), randomColor()));
        bundaries.push(new Wall(createVector(705, 340), createVector(653, 341), randomColor()));
        bundaries.push(new Wall(createVector(576, 342), createVector(517, 343), randomColor()));
        bundaries.push(new Wall(createVector(516, 340), createVector(508, 171), randomColor()));
        bundaries.push(new Wall(createVector(47, 167), createVector(262, 171), randomColor()));
        bundaries.push(new Wall(createVector(51, 168), createVector(51, 42), randomColor()));
        bundaries.push(new Wall(createVector(51, 41), createVector(269, 42), randomColor()));
        bundaries.push(new Wall(createVector(505, 170), createVector(474, 170), randomColor()));
        bundaries.push(new Wall(createVector(348, 171), createVector(405, 170), randomColor()));
        bundaries.push(new Wall(createVector(349, 168), createVector(267, 42), randomColor()));
        bundaries.push(new Wall(createVector(138, 305), createVector(317, 463), randomColor()));
        bundaries.push(new Wall(createVector(143, 304), createVector(328, 268), randomColor()));
        bundaries.push(new Wall(createVector(318, 464), createVector(326, 268), randomColor()));
        bundaries.push(new Wall(createVector(266, 43), createVector(265, 18), randomColor()));
        bundaries.push(new Wall(createVector(264, 19), createVector(708, 32), randomColor()));
        bundaries.push(new Wall(createVector(702, 340), createVector(708, 31), randomColor()));
        bundaries.push(new Wall(createVector(540, 108), createVector(546, 171), randomColor()));
        bundaries.push(new Wall(createVector(538, 107), createVector(607, 102), randomColor()));
        bundaries.push(new Wall(createVector(545, 169), createVector(607, 168), randomColor()));
        bundaries.push(new Wall(createVector(605, 104), createVector(605, 167), randomColor()));
        bundaries.push(new Wall(createVector(452, 459), createVector(451, 525), randomColor()));
        bundaries.push(new Wall(createVector(452, 461), createVector(506, 460), randomColor()));
        bundaries.push(new Wall(createVector(451, 524), createVector(503, 524), randomColor()));
        bundaries.push(new Wall(createVector(505, 460), createVector(503, 524), randomColor()));
        bundaries.push(new Wall(createVector(446, 651), createVector(509, 707), randomColor()));
        bundaries.push(new Wall(createVector(428, 719), createVector(506, 707), randomColor()));
        bundaries.push(new Wall(createVector(447, 651), createVector(428, 716), randomColor()));
        bundaries.push(new Wall(createVector(637, 528), createVector(637, 571), randomColor()));
        bundaries.push(new Wall(createVector(683, 572), createVector(682, 526), randomColor()));
        bundaries.push(new Wall(createVector(638, 526), createVector(681, 526), randomColor()));
        bundaries.push(new Wall(createVector(637, 573), createVector(683, 569), randomColor()));
        

        camera = new Camera(createVector(sketch.width / 2, sketch.height / 2));
    }

    sketch.draw = () =>
    {
        sketch.background(0);

        camera.position = createVector(sketch.mouseX, sketch.mouseY);

        for(const wall of bundaries)
        {
            wall.draw2D();
        }

        camera.cast(bundaries);
        camera.draw2D();

        // wall creation
        if(wallCreationApos)
        {
            sketch.noStroke();
            sketch.fill('green');
            sketch.circle(wallCreationApos.x, wallCreationApos.y, 8);
        }
    }

    let wallCreationApos = null;

    sketch.mousePressed = () =>
    {
        if(!wallCreationApos)
        {
            wallCreationApos = createVector(sketch.mouseX, sketch.mouseY);
        }
        else
        {
            bundaries.push(new Wall(wallCreationApos, createVector(sketch.mouseX, sketch.mouseY)));
            wallCreationApos = null;
        }
    }

    sketch.keyPressed = () =>
    {
        if(sketch.keyCode == sketch.ENTER)
        {
            displayBundariesCreation();
        }
    }

    function displayBundariesCreation()
    {
        let string = "";

        for(const bundarie of bundaries)
        {
            string += `bundaries.push(new Wall(createVector(${bundarie.a.x - 140}, ${bundarie.a.y}), createVector(${bundarie.b.x - 140}, ${bundarie.b.y})));\n`;
        }

        console.log(string);
    }
});