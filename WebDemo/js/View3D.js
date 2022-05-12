import { camera } from "./View2D.js";

export let canvas = null;
export let sketch3D = null;

export const p5Instance = new p5((sketch) => 
{
    sketch3D = sketch;

    const createVector = sketch3D.createVector;
    const radians = sketch3D.radians;

    sketch3D = sketch;

    sketch.setup = () => 
    {
        sketch.createCanvas(900, 500);
    };

    sketch.draw = () =>
    {
        sketch.background(0);

        sketch3D.rectMode(sketch3D.CORNER);

        sketch.fill(40);
        sketch.rect(0, 0, sketch.width, sketch.height / 2);

        sketch.fill(100);
        sketch.rect(0, sketch.height / 2, sketch.width, sketch.height);

        if(sketch.keyIsDown(sketch.RIGHT_ARROW)) camera.rotate(0.03);
        if(sketch.keyIsDown(sketch.LEFT_ARROW)) camera.rotate(-0.03);
    };
});