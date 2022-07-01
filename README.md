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

## Project Objectives

1. Learn how to integrate an app with a Firebase backend database
2. Learn how to use semantic HTML, landmark elements, roles and aria-roles
3. Learn how to integrate responsive design and media-queries
4. Use a css preprocessor
5. Use typescript's strict mode upfront
6. Keep using different git tools to solidify what I've learnt on previous lessons
7. Establishing a good testing architecture combining unit and UI tests
8. Learn how to check roles within the Devtools to know which elements to getByRole on my UI tests


## What I've learnt with this project

1. 
2. 
3. 
4. 


## Challenges I faced 

1. Create only one database when the Firebase SDK get triggered
2. 
3. 
4.
5.
6.

## Technologies used

1. React
2. react-router
3. Typescript
4. Sass
5. ESLint
6. Jest/TL
7. Firebase


## Room for improvement
1. Add all the character on each map and choose 3 of them randomly when the game starts
2. Use custom hooks to abstract the React logic on each component
3. Mock Firebase on the unit tests
4. Tests the application further
