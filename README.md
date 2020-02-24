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
```
1. In object window ,there are two components -a carousel  and elements which shows selected elements.
2. In Assembly window,all the slected elements are shown in gray div  and workspace in yellow.
  2.a. Objects can be resized only in the gray window.
  2.b. Each object can be dropped to (yellow) workspace.
  2.c. After dropping each element "OK" button needs to be pressed to reset the position x and y to zero.
  2.d. In yellow  workspace "Camera div" can also be dragged and dropped to provide the first scene of the game . 
3. In this window , you can give properties to the elements.
  3.a. You can either give the movable property or static property to the object.
  3.b. For movable object you can give predefined move and jump value or you can give keyboard interactions.
  3.c. For the static element , there's a overlap property using which element can be allowed to overlap or it can collide.
  3.d. In miscellaneous property, there's an option to add sound and give the shooting property to the player and you can use this by pressing shift key.
4. In third window , there's a preview screen where all the actions are shown in sequence and you can press "preview" button to see the preview of those actions.
5. After giving properties , press "Play" button to launch the game.
```

