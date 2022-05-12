#include <SFML/Window.hpp>
#include "Logger/Logger.hpp"

int main()
{
    Logger::SetThreadLabel("MainTread");

    sf::Window window(sf::VideoMode(800, 600), "Raycasting Engine");

    Logger::DeleteThreadLabel();

    return 0;
}