# PROJECT NAME

# 👉 [LIVE PREVIEW](vikms95.github.io/react-wheres-waldo/) 👈

![alt text](src/assets/Waldo-showcase.gif "screenshot of memory card gameplay")

## Description
Classic Where's Waldo game where a picture is shown to the user to find the characters proposed.

The user can click anywhere within the picture bounds if one of the characters is found, a dropdown will appear and
the user will be able to select which character was found from a list of characters.

The locations of the characters are registered and then checked on a Firebase database to see if the location clicked is
correct.

The application has a timer to set how long did the user take to find all the characters.

Once the game ends, the user will be asked to insert an alias within a modal to registers its score to a leaderboard, where
all the scores registered are stored in a Firebase database.

## Functionalities

1. Select between different 4 consoles to play the game with 
2. Select any point on the image and choose a character from the dropdown
3. Upload your score to a global database
4. Use a custom username, Google username or update the score as anonymous
5. Sign in with your Google username


## Getting started

```
git clone https://github.com/Vikms95/react-wheres-waldo.git
cd react-wheres-waldo
npm install
npm start
```

## Technologies used

1. React
2. react-router
3. Typescript
4. SASS
5. ESLint
6. Jest/TL
7. Firebase

## Project Objectives

1. Learn how to integrate an app with a Firebase backend database
2. Learn how to use semantic HTML, landmark elements, roles and aria-roles
3. Learn how to integrate responsive design and media-queries
4. Use a CSS preprocessor
5. Use typescript's strict mode upfront
6. Keep using different git tools to solidify what I've learnt on previous lessons
7. Establishing a good testing architecture combining unit and UI tests
8. Learn how to check roles within the Devtools to know which elements to getByRole on my UI tests


## What I've learnt with this project / Challenges I faced 

1. Integrate Firebase backend with an application
2. Usage of semantic HTML, landmark elements and roles
3. How to check a11y roles on the dev tools console so I can use them for getByRole on RTL
4. Basic usage of SASS variables, nested selectors and mixins
5. How to retrieve and add data to a database
6. Usage of Google Sign-in and Sign-out to get personal information of the user
7. Usage of nested routes with react-router
8. Proper responsive design using units relative to the viewport size
9. Create a responsive Navbar which will hide elements from the navbar and add them to a floating dropdown on the side accordign to the window size
10. Create only one database when the Firebase SDK get triggered
11. Get the coordinates of the button click event relative to the window width, so no matter what the width is, the posisitions of the character would not get distorted.
12. Usage of setInterval to hide an element after a certain time of being rendered (setting a setInterval on its useEffect)
13. Take some inspiration for design before hoping in to code.

## Room for improvement
1. Add all the character on each map and choose 3 of them randomly when the game starts
2. Use custom hooks to abstract the React logic on each component
3. Mock Firebase on the unit tests
4. Tests the application further
5. Improve the Homepage text sizes and weights (it's hard to discern what's a title and what's not)
