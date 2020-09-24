const fs = require("fs");
const sortArray = require("sort-array");

const getSections = (folder) => {
  let sections = [];

  fs.readdirSync(folder).forEach((subFolder) => {
    number = Number(subFolder.split(".")[0]);
    sections.push({
      number,
      name: subFolder,
    });
  });

  return sortArray(sections, {
    by: "number",
    order: "asc",
  });
};

module.exports = getSections;
