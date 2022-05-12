import { sketch2D } from "./View2D.js";

export class Wall
{
    constructor(a = sketch2D.createVector(), b = sketch2D.createVector(), color = "white")
    {
        this.a = a;
        this.b = b;
        this.color = color;
    }

    draw2D()
    {
        sketch2D.stroke(255);    
        sketch2D.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}