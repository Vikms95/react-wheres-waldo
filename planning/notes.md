- Functionalities
  Be able to select a map (start with only one)
  Timer started on app load and stopped when all three characters are found
  Click the photo to make a dropdown appear with all three characters to find
- https://firebase.google.com/codelabs/firebase-web#7 


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
<!-- - Make dropdown dissapear if neither the dropdown or the console image are clicked within the window
:add a button within the dropdown to close it?? since maybe the user does not want to close the modal -->
<!-- :store coordinates range on each character object? -->

<!-- - Setup coordinates to not be dependent on page shrinking -->
  <!-- :use percentages? -->
  <!-- :use viewport units? -->

<!-- - Setup event listener to check with coordinates were clicked -->

<!-- - Setup event listener on dropdown buttons that will take the value from the current console + button(char name),
  lookup the charname within the database and see if the lastCoordninates clicked are within the range of
  the character -->

  <!-- :if any character from the dropdown is validated, set some state validating on the front-end   -->
<!-- - Give coordinates range to each character to the database -->

<!-- - If click is valid, change dropdown to show (V correct) and fade dropdown after some interval -->
<!-- Fade character image opacity on the absolute positioned div -->
<!-- @check within the gameView useEffect
If validatedCharacters.length === 3
  <!-- Stop timer -->
  <!-- Congratulate and show modal (fading from top part) asking for alias to upload the score to the database

Take name introduced from modal, if no name is introduced use anonymous + a random id
Take timer score from gameView --> -->

<!-- - Setup character positions in the database -->
  <!-- :object with character name as key and coordinates as value? -->
  <!-- :from this link onwards seems like it might be the info I need -->
  <!-- https://firebase.google.com/codelabs/firebase-web#7  -->
  <!-- :Store coordinates clicked to later compare them to the object within the database tied to the console name > character name?
  :It can be called within this function,so just parametize the function to store the characters -->

<!-- - Make chars div vertical so it does not overlap with the photo and the alignment looks better? -->

<!-- - Implement animations to modal -->
<!-- - Add one leaderboard per map -->

<!-- - Refactor Component children into more components
  :check if some functions can be passed down to those components
   -->

<!-- - Give keys to each mapped element/component -->
<!-- - CSS format and make responsive Leaderboards -->
<!-- - Fix weird error when submitting a score (score is still updated tho) -->
<!-- - Filter leaderboards by today's date -->
<!-- - Use context for consoleName ? -->
<!-- - Implement google sign in and use Google name for the leaderboards -->
<!-- - Fix modal button styling -->
<!-- - Use table for the leaderboards and make it look like a grid -->
<!-- - Create a base module to import from -->
<!-- - Fix min padding on character images and dropdown -->
<!-- -Fix tabindex on modal to be able to move to the "Post score" after the input -->
<!-- - Media query for header to delete 2 items and create a dropdown on the right? 550px -->
  <!-- :already created, but sign-in/out buttons are not being switched, trying to use ref but it is initally being passed as null -->
  <!-- :when its being closed, the signin/signout elements get detected, but not when it gets opened
  :since the ones on the dropdown are not being mounted by the conditional render, they are not being located un
  like the ones on the header. 
    :do not use coniditional rendering? -->
<!-- - Header dropdown not closing -->
<!-- - Fix dropdown padding and not appearing on the right place on mobile view -->
<!-- 
- Hide dropdown if clicked outside of it when rendered
  :dropdown is -->

- Give accessible attributes to elements
- Write tests
    https://daveceddia.com/what-to-test-in-react-app/
    https://daveceddia.com/testing-for-proptypes-errors/
    https://reactjs.org/docs/testing-recipes.html
    https://reactjs.org/docs/testing-environments.html
    
- Refactor CSS into mixins and reusable variables
- Make database adding and fetching reusable

Ideas
- Use Link params to pass the console clicked
https://www.youtube.com/watch?v=QBLbXgeXMU8&list=WL&index=6

- Where I got the images from:
https://pierreroussel.artstation.com/projects/oOVVlJ

Bugs
<!-- - Character images constant rerender
  :not giving them a key makes them not rerender -->
<!-- - Make modal bigger on mobile,(higher min sizes on max() and clamp()) -->
<!-- -Google pic does not show? -->
<!-- -Reloading GameView causes it to crash, probably bc I don't have any console name as state? -->
<!-- -Clicking on the left or bottom edge of the image causes the window to expand and show blank -->
