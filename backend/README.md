# Dev Radar: Back-End

This is a Node.js api that implements basic database operations with mongoDB and some websock messages between server side and client side.

Was implemented the follow routes:

- Developer register: Create and persist new devs.
- Developer search by nearness and technologies: Receive a list of technologies and location coordinates to return a list of devs near the user that makes the search.
- Developer list: This route return all registered devs.
- Developer deletion: A route to delete devs by Github username.
- Developer update: This route offer a possibility to update developer infos.
- Websock communication: Mobile users can see new registered devs in real-time if they attend the search requirements (location and tecnologies).

## To Implement in future versions
- Semantic search to accept incomplete words (technologies).
- Websock communication to update in real-time deleted devs.
