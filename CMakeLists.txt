cmake_minimum_required(VERSION 3.21)

set(CMAKE_TOOLCHAIN_FILE ./vcpkg/scripts/buildsystems/vcpkg.cmake)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

project(Raycaster VERSION 0.1.0 DESCRIPTION "Raycaster")

find_package(SFML COMPONENTS system window graphics network audio CONFIG REQUIRED)

if(WIN32)
    add_compile_definitions(WINDOWS=1)
endif ()

if (UNIX AND NOT APPLE)
    add_compile_definitions(LINUX=1)
endif ()

if (APPLE)
    add_compile_definitions(APPLE=1)
endif ()

if(${CMAKE_BUILD_TYPE} MATCHES Debug)
    add_compile_definitions(_DEBUG=1)
else()
    add_compile_definitions(NDEBUG=1)
endif(${CMAKE_BUILD_TYPE} MATCHES Debug)

file(GLOB_RECURSE src_files
    "src/*.hpp"
    "src/*.cpp"
)

add_executable(Raycaster ${src_files} src/RaycastingMotor/Scene/Scene.cpp src/RaycastingMotor/Scene/Scene.hpp)

target_link_libraries(Raycaster
    sfml-system sfml-window sfml-graphics sfml-audio sfml-network
)

file(COPY src/Assets DESTINATION ./)