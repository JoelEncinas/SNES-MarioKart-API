# 🏎️ SNES Mario Kart API
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="node" style="max-width: 100%;"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="express" style="max-width: 100%;"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" style="max-width: 100%;"> <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="bootstrap" style="max-width: 100%;">

This API provides information about the SNES version of the classic game, Mario Kart. It allows users to retrieve data about various game elements, such as:

- Characters: A list of all playable characters in the game, along with their attributes (speed, acceleration, handling and weight).
- Items: A list of all items that can be obtained during races, along with their effects and how to use them.
- Courses: A list of all race tracks in the game along with their terrain, slipperiness and obstacles.
- Cups: A list of all cup competitions in the game, including the races that make up each cup (e.g. Mushroom Cup).
- Categories: A list of all cc categories available.
- Game modes: A list of all game modes available in the game (e.g. Mario Kart GP).
- Maximum speeds of karts: A list of all karts in the game and their maximum speeds.
- Non-playable characters: A list of all non-playable characters in the game, including additional information about them.
- Rivals: A list of all the in-game rivals that the player competes against during races.

## 📭 Routes 
Each endpoint returns data in a standard format, such as JSON, that can be easily parsed and used by client applications. The API also supports various HTTP methods, such as GET, POST, PUT, and DELETE, to allow users to create, update, and delete data as needed, although POST, PUT and DELETE methods require a 'mk-token' header with a password in order to be authorized. Users can retrieve data by making HTTP requests to various endpoints, such as:

    /api/characters
    /api/items
    /api/courses
    /api/cups
    /api/categories
    /api/game-modes
    /api/maximum-speeds
    /api/non-playable
    /api/rivals

## 📜 TODO
- implement rate-limit dependency
- add data
    - cups
    - courses
    - modes
    - non playable
    - obstacles
    - terrains max speed
    - rivals    
