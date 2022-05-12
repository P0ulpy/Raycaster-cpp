//
// Created by Flo on 12/05/2022.
//

#ifndef RAYCASTER_SCENE_HPP
#define RAYCASTER_SCENE_HPP

#include "SFML/System/Vector2.hpp"
#include <vector>

struct Wall {
    sf::Vector2f a {0, 0};
    sf::Vector2f b {0, 0};
};

class Scene {
private:
    std::vector<Wall> m_walls;

public:
    std::vector<Wall>& getWalls();
};


#endif //RAYCASTER_SCENE_HPP
