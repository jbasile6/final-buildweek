FRONTEND
- UI Components
  - Map Window
  - Character Status Window
  - Display Window (Room title+desc+items+exits+players+etc)
  - Input Commandline
  - Room Information
- Axios Requests
  - Current Map Data (GET)
  - Moving directions (POST)
  - Move to coordinates (POST)
  - Taking items (POST)
  - Dropping items (POST)
  - Praying (POST)
  - Speaking to other players (POST)
BACKEND
- Loop and gather room information
  - Update database
  - Store everything (object over SQL)
    - stringified object information appended to a text file
while (true) {
  if (queue.length > 0) {
    // commands from the frontend
  } else {
    // exploration loop
    if (!waiting) {
      let waiting = true;
      let timer = setTimeout(cooldown, () => {
        waiting = false;
      })
    }
  }
}
- Creating the Loop
  - Use a queue to decide which command to execute next after a cooldown
  - Make the initial request that gives us our room info / exits
  - Pass room data into loop method
    - Save room information to file (with timetamp)
    - Pick a random exit to move, check that we haven't explored that direction
    - Send API request on a setTimeout set to the cooldown given back to us
    - In callback function, call the loop method again with new room data
- Take instructions from the frontend
  - moving the player location
  - interacting with things in the room
    - pick up or drop items
    - sell things
  - traverse to X location  POST /some/backend/endpoint/traverse/ {location: 'X'}
    - halt room exploration (enqueue next instruction)
    - get shortest path to X from current room (breadth-first search)
    - start walkin until we get there (queue all directions)
    - reenable room exploration (queue is empty)
  - cease movement queue
    - clear queue
API DATA
{
  "room_id": 0,
  "title": "A brightly lit room",
  "description": "You are standing in the center of a brightly lit room. You notice a shop to the west and exits to the north, south and east.",
  "coordinates": "(60,60)",
  "elevation": 0,
  "terrain": "NORMAL",
  "players": ["player109", "player84", "player60", "player83", "player72", "player74", "player75", "player127", "player76", "player92", "player96", "player97", "player121", "player106", "player116", "player133", "player124", "player141", "player119", "player81", "player53"],
  "items": [],
  "exits": ["n", "s", "e", "w"],
  "cooldown": 1,
  "errors": [],
  "messages": []
}
