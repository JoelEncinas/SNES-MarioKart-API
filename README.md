# SNES Mario Kart API
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

Users can retrieve data by making HTTP requests to various endpoints, such as:

/api/characters: Returns a list of all playable characters in the game.
/api/items: Returns a list of all items that can be obtained during races.
/api/courses: Returns a list of all race tracks in the game.
/api/cups: Returns a list of all cup competitions in the game.
/api/categories: Returns a list of all cc categories.
/api/game-modes: Returns a list of all game modes available in the game.
/api/maximum-speeds: Returns a list of the maximum speeds on various terrains.
/api/non-playable: Returns a list of all non-playable characters in the game.
/api/rivals: Returns a list of all the rivals that the player competes against during races.

Each endpoint returns data in a standard format, such as JSON, that can be easily parsed and used by client applications. The API also supports various HTTP methods, such as GET, POST, PUT, and DELETE, to allow users to create, update, and delete data as needed, although POST, PUT and DELETE methods require a 'mk-token' header with a password in order to be authorized.

## todo
- implement rate-limit dependency
- add data
    - cups
    - courses
    - modes
    - non playable
    - obstacles
    - terrains max speed
    - rivals    