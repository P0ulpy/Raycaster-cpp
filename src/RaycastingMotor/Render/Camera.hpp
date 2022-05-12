//
// Created by Flo on 12/05/2022.
//

#ifndef RAYCASTER_CAMERA_HPP
#define RAYCASTER_CAMERA_HPP

#include "SFML/System/Vector2.hpp"
#include "SFML/Graphics/RenderTarget.hpp"
#include "SFML/Graphics/RectangleShape.hpp"
#include <vector>

#include "Ray.hpp"

class Camera {
private:
    sf::RenderTarget& m_target;

    float m_fov             {60};
    float m_fovRate         {0};
    float m_far             {100};
    float m_slicesWidth     {1};

    sf::Vector2f m_position {0, 0};
    float m_heading         {0};

    std::vector<Ray> m_rays;

public:
    explicit Camera(sf::RenderTarget& target, sf::Vector2f position, float heading = 0, float fov = 60);

    void rotate(const float& angle);
    void rasterize(Scene& scene);

public:
    [[nodiscard]] const float& getFov() const;
    [[nodiscard]] const float& getFovRate() const;
    [[nodiscard]] const float& getFar() const;

    [[nodiscard]] const sf::Vector2f& getPosition();
    [[nodiscard]] const float& getHeading() const;

    const std::vector<Ray>& getRays();

private:
    void drawLine(const sf::FloatRect& rect, sf::Color color);
};


#endif //RAYCASTER_CAMERA_HPP
