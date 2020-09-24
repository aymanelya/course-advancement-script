const fetch = require("node-fetch");
const { key, token, usernameID } = require("./data");
const attForm = require("./fileToFormData");
const getSections = require("./sections");
const getVideos = require("./videos");

const sendToTrello = async (path) => {
  // const boardID = await newBoard(path);
  const boardLists = await getBoardLists("5f6cbed01975de2eff37f3c6");
  const cardTodoHeader = await newCard(boardLists.todo, "To Do");
  const cardTodoHeaderAtt = await addAttachment(cardTodoHeader, "To-Do.png");
  const cardDoingHeader = await newCard(boardLists.doing, "Doing");
  const cardDoingHeaderAtt = await addAttachment(cardDoingHeader, "Doing.png");
  const cardDoneHeader = await newCard(boardLists.done, "Done");
  const cardDoneHeaderAtt = await addAttachment(cardDoneHeader, "Done.png");

  for (let section of getSections(path)) {
    const sectionCard = await newCard(boardLists.todo, section.name);
    const checklist = await newChecklist(sectionCard);
    for (let video of getVideos(`${path}/${section.name}`)) {
      const checkItem = await newCheckItem(checklist, video.name);
    }
  }

  return "Everything was added successfully!";
};

const newBoard = (path) => {
  return new Promise((resolve, reject) => {
    // Get only folder name from path
    const pieces = path.split("/");
    const folderName = pieces[pieces.length - 1];
    isDuplicate(folderName)
      .then((res) => {
        if (res) {
          reject("Board with the same name already exists!");
        }
        fetch(
          `https://api.trello.com/1/boards/?key=${key}&token=${token}&name=${folderName}`,
          {
            method: "POST",
          }
        )
          .then((res) => {
            return res.text();
          })
          .then((text) => resolve(JSON.parse(text).id))
          .catch((err) => reject(err));
      })
      .catch((e) => {
        reject(e);
      });
  });
  // REMOVE THIS
  // return callback("5f6bf8e1df47f507382eab8d");
};

const isDuplicate = (foldername) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/members/${usernameID}/boards?key=${key}&token=${token}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((text) =>
        resolve(
          JSON.parse(text).filter((board) => board.name === foldername).length >
            0
        )
      )
      .catch((err) => reject(err));
  });
};
const getBoardLists = (id) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.text();
      })
      .then((text) =>
        resolve({
          todo: JSON.parse(text).filter((list) => list.name === "To Do")[0].id,
          doing: JSON.parse(text).filter((list) => list.name === "Doing")[0].id,
          done: JSON.parse(text).filter((list) => list.name === "Done")[0].id,
        })
      )
      .catch((err) => reject(err));
  });
};

const newCard = (listID, name) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${listID}&name=${name}`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        resolve(JSON.parse(text).id);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addAttachment = (cardID, imgName) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/cards/${cardID}/attachments?key=${key}&token=${token}&url=blob:https://trello-attachments.s3.amazonaws.com/5f5cc3d7a7d87b3ab4091489/5f5cc3d7a7d87b3ab40914a8/x/c7a22a7d05b8e355e05e870436505442/To-Do.png`,
      {
        method: "POST",
        body: attForm(imgName),
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => resolve(JSON.parse(text)))
      .catch((err) => reject(err));
  });
};

const newChecklist = (cardID) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/cards/${cardID}/checklists?key=${key}&token=${token}&name=Videos`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => resolve(JSON.parse(text).id))
      .catch((err) => reject(err));
  });
};

const newCheckItem = (checkListID, name) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/checklists/${checkListID}/checkItems?key=${key}&token=${token}&name=${name}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => resolve(text))
      .catch((err) => reject(err));
  });
};

module.exports = {
  sendToTrello,
};
