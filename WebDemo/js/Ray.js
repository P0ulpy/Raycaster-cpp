import { sketch2D } from './View2D.js';

export class Ray
{
    constructor(origin = sketch2D.createVector(), angle = 0)
    {
        this.origin = origin;
        this.direction = p5.Vector.fromAngle(angle);
        this.lastHit = null;
    }

    setAngle(angle = 0)
    {
        this.direction = p5.Vector.fromAngle(angle);
    }

    draw2D()
    {
        /* for early testing
        sketch2D.stroke(255);

        const b = this.origin.copy().add(this.direction.copy().mult(50));
        sketch2D.line(this.origin.x, this.origin.y, b.x, b.y);
        */
    }

    cast(wall = new Wall())
    {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        
        const x3 = this.origin.x;
        const y3 = this.origin.y;
        const x4 = this.origin.x + this.direction.x;
        const y4 = this.origin.y + this.direction.y;

        const devider = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        // the tow segements are perfectly parallels
        if(devider == 0) return null;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / devider;
        const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / devider;
        
        // old wikipedia formula for u
        //const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / devider;
        
        if(t > 0 && t < 1 && u > 0)
        {
            const xCollision = x1 + t * (x2 - x1);
            const yCollision = y1 + t * (y2 - y1);

            const hitPosition = sketch2D.createVector(xCollision, yCollision);

            return {
                origin: this.origin.copy(),
                position: hitPosition.copy(),
                direction: this.direction.copy(),
                euclideanDistance: p5.Vector.dist(this.origin, hitPosition),
                color: wall.color
            }
        }

        return null;
    }

    // for debug purposes
    lookAt(position = sketch2D.createVector())
    {
        this.direction = position.copy()
            .sub(this.origin)
            .normalize();
    }
}