# React Game Engine
It is a basic game engine to create a simple game so that you can get to know how the game can be created.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to install the web app
```
- NodeJs
- NPM package manager 
```

### Installing
To install this web app

```
1. Download the zip folder and extract it.
2. Run npm install.This will install all the required libraries.
3. Then type npm start.This will run web app locally on server http://localhost:8080/
```

## Working

### Objects window
```
In object window ,there are two components 
- a carousel
- elements which shows selected elements.
```
### Assembly window
```
All the slected elements are shown in gray div  and workspace in yellow.
- Objects can be resized only in the gray window.
- Each object can be dropped to (yellow) workspace.
- After dropping each element "OK" button needs to be pressed to reset the position x and y to zero.
- In yellow  workspace "Camera div" can also be dragged and dropped to provide the first scene of the game .
```

### Logic window
```
In this window , you can give properties to the elements and can preview the sequence of actions(move ,jump) given.
- You can either give the movable property or static property to the object.
- For movable object you can give predefined move and jump value or you can give keyboard interactions.
- If you choose keyboard interaction and sequencing together then,only keyboard interaction will work. 
- For the static element , there's a overlap property using which element can be allowed to overlap or it can collide.
- In miscellaneous property, there's an option to add sound and give the shooting property to the player and you can use this by pressing shift key.
```

### Preview Window
```
In this all the actions are shown in sequence and you can press "preview" button to see the preview of those actions.
The preview will be opened in a new tab with only player and a platform.
```

### Game Window
```
After giving properties , press "Play" button to launch the game.

```

