//
// Created by Flo on 12/05/2022.
//

#include "Ray.hpp"
#include "../../Utils/Utils.hpp"

Ray::Ray(const sf::Vector2f &origin, const sf::Vector2f &direction)
    : origin(origin)
    , direction(direction)
{

}

Ray::Ray(const sf::Vector2f &origin, const float &angle)
    : origin(origin)
    , direction(Utils::fromAngle(angle))
{

}

void Ray::setAngle(const float &angle) {
    direction = Utils::fromAngle(angle);
}

Ray::RayCastHitResult Ray::cast(const Wall &wall)
{
    const float x1 = wall.a.x;
    const float y1 = wall.a.y;
    const float x2 = wall.b.x;
    const float y2 = wall.b.y;

    const float x3 = origin.x;
    const float y3 = origin.y;
    const float x4 = origin.x + direction.x;
    const float y4 = origin.y + direction.y;

    const float devider = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    // the two segments are perfectly parallels
    if(devider == 0) return {};

    const float t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / devider;
    const float u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / devider;

    if(t > 0 && t < 1 && u > 0)
    {
        const float xCollision = x1 + t * (x2 - x1);
        const float yCollision = y1 + t * (y2 - y1);

        const sf::Vector2 hitPosition = { xCollision, yCollision };

        return {
            true,
            origin,
            direction,
            hitPosition,
            Utils::dist(origin, hitPosition)
        };
    }

    return {};
}

void Ray::lookAt(const sf::Vector2f &position)
{
    direction = Utils::normalize(position - origin);
}

const sf::Vector2f &Ray::getOrigin() const { return origin; }
const sf::Vector2f &Ray::getDirection() const { return direction; }
