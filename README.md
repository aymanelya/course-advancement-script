# Course advancement script!

This is a script made in **[NodeJS](https://nodejs.org/)**, that helps organize your course on **[Trello](https://trello.com/)** by adding a new board with the name of the course and fill it with **cards** representing the course **sections** and adding a **checklist** with **checkitems** representing the **videos** for each **card**.

## Installation steps

- Make sure you have **[NodeJS](https://nodejs.org/)** installed, along with **NPM**
- Download the latest version of the script from **[Here](https://github.com/aymanelya/course-advancement-script/archive/master.zip)** and unzip it
- Navigate to the script folder and run the command `npm install`
- Open the file **src/utils/data.js** and modify it with your trello data
  > Informations on how to get the data are commented in the file!

## How to use

Just run the command `npm run start ` and drag the course folder.  
**Ex:** `npm run start /home/ayman/Downloads/nodejsCourse`

> The Course folder structure has to be like this: **courseFolder/sections/videos**  
> **courseFolder/1. section/1. video.mp4**  
> **courseFolder/1. section/2. video.mp4**  
> **courseFolder/2. section/1. video.mp4**  
> ...

## Screenshots

![trelloBoard](https://i.imgur.com/DQzhlpL.png)
![trelloCard](https://i.imgur.com/dx42DeT.png)
