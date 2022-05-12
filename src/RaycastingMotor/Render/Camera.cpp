//
// Created by Flo on 12/05/2022.
//

#include "Camera.hpp"
#include "../../Utils/Utils.hpp"
#include <limits>

Camera::Camera(sf::RenderTarget& target, sf::Vector2f position, float heading, float fov)
    : m_target(target)
    , m_position(position)
    , m_heading(heading)
    , m_fov(fov)
{
    auto targetSize = target.getSize();

    // plutôt sale il y a une façon bien plus rapide et simple pour calculer ça
    m_fovRate = abs(
        Utils::map(0, 0, targetSize.x - 1, -(m_fov / 2), m_fov / 2)
        - Utils::map(1, 0, targetSize.x - 1, -(m_fov / 2), m_fov / 2)
    );

    float angle = -(m_fov / 2);
    for(int w = 0; w < targetSize.x; w++)
    {
        angle += m_fovRate;
        m_rays.emplace_back(m_position, (float)Utils::degreeToRadian(angle));
    }

    m_slicesWidth = (float)targetSize.x / (float)m_rays.size();
}

void Camera::rotate(const float &angle)
{
    m_heading += angle;

    float a = -m_fov / 2;
    for(auto& ray : m_rays)
    {
        ray.setAngle((float)Utils::degreeToRadian(a) + m_heading);
        a += m_fovRate;
    }
}

void Camera::rasterize(Scene &scene)
{
    float currentX = 0;

    for(auto& ray : m_rays)
    {
        ray.origin = m_position;

        Ray::RayCastHitResult hitRecord { false, {0, 0}, {0, 0}, {0, 0}, std::numeric_limits<int>::max()};

        // cast the ray in all walls
        for(auto& wall : scene.getWalls())
        {
            auto hit = ray.cast(wall);

            //select the shortest hit (so the one to be displayed)
            if(hit.hit && hitRecord.length > hit.length)
            {
                hitRecord = hit;
            }
        }

        // TODO : Display or store data for 2D display

        if(hitRecord.hit)
        {
            auto renderTargetSize = m_target.getSize();

            auto forwardHeadingAngle = (float)Utils::heading(ray.direction);
            auto headingLength = hitRecord.length * cos(forwardHeadingAngle);

            float rayDirectionAngle = m_fov * (float)(floor(0.5 * renderTargetSize.x) - currentX) / (float)(renderTargetSize.x - 1);
            auto rayDirectionAngleRad = (float)Utils::degreeToRadian(rayDirectionAngle);
            float rayProjectionPosition = 0.5f * (float)tan(rayDirectionAngleRad / (float)tan(0.5f * m_fov));

            auto x = (float)round(renderTargetSize.x * (0.5 * rayProjectionPosition));
            float y = (float)renderTargetSize.y / 2;
            auto width = m_slicesWidth;
            auto height = (float)round((float)renderTargetSize.y * m_far / (hitRecord.length * cos(rayDirectionAngleRad)));

            drawLine(
                {
                    {x, y},
                    {width + 1, height}
                },
            sf::Color(255, 255, 0)
            );
        }

        currentX += m_slicesWidth;
    }
}

void Camera::drawLine(const sf::FloatRect& rect, sf::Color color)
{
    sf::RectangleShape rectangleShape ({rect.width, rect.height});
    rectangleShape.setPosition({rect.top, rect.left});
    rectangleShape.setFillColor(color);

    m_target.draw(rectangleShape);
}


// getters / setters

const float &Camera::getFov() const { return m_fov; }
const float &Camera::getFovRate() const { return m_fovRate; }
const float &Camera::getFar() const { return m_far; }

const sf::Vector2f &Camera::getPosition() { return m_position; }
const float &Camera::getHeading() const { return m_heading; }

const std::vector<Ray> &Camera::getRays() { return m_rays; }
