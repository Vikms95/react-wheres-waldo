- Functionalities
  Be able to select a map (start with only one)
  Timer started on app load and stopped when all three characters are found
  Click the photo to make a dropdown appear with all three characters to find

-Hierarchy
  App
    Header
      Just informational text
    Picture

    Sidebar with learderboards
      Title
      Grid with name - score
-Todo
<!-- - Layout a basic UI with only one component -->
<!-- - Setup router -->
<!-- - Create components -->
<!-- - Establish connection with Firebase -->
<!-- - Pass in image as a prop to Gameview -->
<!-- - Set timer when Gameview loads
  :do I have to set the state on App? it will be set to the database, so no need to pass it to Leaderboards -->
<!-- - Setup character showcase and timer elements -->
<!-- - Setup drowpdown when user clicks the screen
  :got the position on px but seems like I need to substract another unit(offset position?) -->
<!-- - Get 3 images per console(12) -->
<!-- - Assign 3 characters per console(use an object? snes:{mario: 'image.png'...} and conditionally import each one) -->
- Setup event listener to check with coordinates were clicked

- Setup character positions in the database
  :object with character name as key and coordinates as value?
  :from this link onwards seems like it might be the info I need
  https://firebase.google.com/codelabs/firebase-web#7 
  :Store coordinates clicked to later add them to the object along with the character?
  :It can be called within this function,so just parametize the function to store the characters

Ideas
- Use Link params to pass the console clicked
https://www.youtube.com/watch?v=QBLbXgeXMU8&list=WL&index=6
- Where I got the images from:
https://pierreroussel.artstation.com/projects/oOVVlJ

Bugs
-Reloading GameView causes it to crash, probably bc I don't have any console name as state?
-Clicking on the left or bottom edge of the image causes the window to expand and show blank
