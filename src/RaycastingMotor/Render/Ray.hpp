//
// Created by Flo on 12/05/2022.
//

#ifndef RAYCASTER_RAY_HPP
#define RAYCASTER_RAY_HPP

#include "SFML/System/Vector2.hpp"
#include "../Scene/Scene.hpp"
#include <vector>

class Ray {
public:
    struct RayCastHitResult {
        bool hit                {false};
        sf::Vector2f origin     {0, 0};
        sf::Vector2f direction  {0, 0};
        sf::Vector2f position   {0, 0};
        double length           {0};
    };

public:
    sf::Vector2f origin;
    sf::Vector2f direction;

public:
    explicit Ray(const sf::Vector2f& origin, const float& angle = 0);
    explicit Ray(const sf::Vector2f& origin, const sf::Vector2f& direction);

    void setAngle(const float& angle);
    RayCastHitResult cast(const Wall& wall);
    void lookAt(const sf::Vector2f& position);

public:
    [[nodiscard]] const sf::Vector2f& getOrigin() const;
    [[nodiscard]] const sf::Vector2f& getDirection() const;
};


#endif //RAYCASTER_RAY_HPP
