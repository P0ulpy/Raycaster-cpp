import { Ray } from './Ray.js';
import { sketch2D } from './View2D.js';
import { sketch3D } from './View3D.js';

export class Camera 
{
    constructor(position = sketch2D.createVector(), fov = 60)
    {
        this.position = position;
        this.heading = 0;
        this.rays = [];
        
        this.fov = fov;
        this.fovRate = Math.abs(
            sketch3D.map(0, 0, sketch3D.width - 1, -(this.fov / 2), this.fov / 2) 
            - sketch3D.map(1, 0, sketch3D.width - 1, -(this.fov / 2), this.fov / 2));
        
        let angle = -(this.fov / 2);
        for(let w = 0; w < sketch3D.width; w++)
        {
            angle += this.fovRate;
            this.rays.push(new Ray(this.position, sketch2D.radians(angle)));
        }

        this.linesWidth = sketch3D?.width / this.rays.length;
    }

    rotate(angle = 0)
    {
        this.heading += angle;

        let a = -this.fov / 2;
        for(const ray of this.rays)
        {
            ray.setAngle(sketch2D.radians(a) + this.heading);
            a += this.fovRate;
        }
    }

    cast(walls = [])
    {
        if(!sketch2D || !sketch3D) return;

        let currentRow = 0;
        for(const ray of this.rays)
        {
            ray.origin = this.position;
            
            let hitRecord = { euclideanDistance: Infinity };

            for(const wall of walls)
            {
                let hit = ray.cast(wall);
                if(hit && hitRecord.euclideanDistance > hit.euclideanDistance)
                {
                    hitRecord = hit;
                }
            }

            if(hitRecord.position)
            {
                ray.lastHit = hitRecord;
                const hitPosition = hitRecord.position;

                sketch2D.stroke(sketch2D.color(255, 0, 0));
                sketch2D.line(ray.origin.x, ray.origin.y, hitPosition.x, hitPosition.y);
                
                sketch2D.noStroke();
                sketch2D.fill(sketch2D.color(255, 0, 0));
                sketch2D.circle(hitPosition.x, hitPosition.y, 5);
            }
            else
            {
                ray.lastHit = null;
            }

            if(hitRecord.position)
            {
                const projectionDistance = 100;

                const forwardHeadingAngle = ray.direction.heading() - this.heading;
                const headingLenght = hitRecord.euclideanDistance * sketch3D.cos(forwardHeadingAngle);

                const rayDirectionDeg = this.fov * (Math.floor(0.5 * sketch3D.width) - currentRow) / (sketch3D.width - 1);
                const rayProjectionPosition = 0.5 * Math.tan(sketch3D.radians(rayDirectionDeg)) / Math.tan(sketch3D.radians(0.5 * this.fov));
                
                const x = Math.round(sketch3D.width * (0.5 - rayProjectionPosition));
                const y = sketch3D.height / 2;
                const width = sketch3D.width / this.rays.length;
                const height = Math.round(sketch3D.height * projectionDistance / (hitRecord.euclideanDistance * Math.cos(sketch3D.radians(rayDirectionDeg))));
                const brightness = sketch3D.map(headingLenght * headingLenght, 0, projectionDistance * projectionDistance, 255, 0);

                // Draw ray result on 2D view
                sketch3D.push();

                sketch3D.noStroke();
                sketch3D.rectMode(sketch3D.CENTER);

                sketch3D.fill(hitRecord.color);
                sketch3D.rect(x, y, width + 1, height);

                sketch3D.pop();
            }

            currentRow += this.linesWidth;
        }
    }

    draw2D()
    {
        sketch2D.noStroke();
        sketch2D.fill(255);
        sketch2D.circle(this.position.x, this.position.y, 10);

        sketch2D.push();

        // Position
        const textOffset = { x:20, y:10 };

        sketch2D.textSize(15);
        sketch2D.text(`pos: ${this.position.x.toFixed(2)}, ${this.position.y.toFixed(2)}`, 
            this.position.x + textOffset.x,
            this.position.y + textOffset.y
        );

        // Heading
        const headingOffset = { x:20, y:25 };

        sketch2D.textSize(15);
        sketch2D.text(`rot: ${this.heading.toFixed(2)}`, 
            this.position.x + headingOffset.x,
            this.position.y + headingOffset.y
        );

        // Fov infos
        const fovInfosOffset = { x:20, y:40 };

        sketch2D.textSize(15);
        sketch2D.text(`fov: ${this.fov}, fovRate: ${this.fovRate}, linesWidth: ${this.linesWidth.toFixed(2)}`, 
            this.position.x + fovInfosOffset.x,
            this.position.y + fovInfosOffset.y
        );

        // Rays info
        const raysInfosOffset = { x:20, y:55 };

        sketch2D.textSize(15);
        sketch2D.text(`rays: ${this.rays.length}`, 
            this.position.x + raysInfosOffset.x,
            this.position.y + raysInfosOffset.y
        );

        sketch2D.pop();
    }
}