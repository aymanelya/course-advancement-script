const fs = require("fs");
const sortArray = require("sort-array");

const getVideos = (folder) => {
  let videos = [];

  fs.readdirSync(folder).forEach((file) => {
    pieces = file.split(".");
    ext = pieces[pieces.length - 1];
    file = file.replace(`.${ext}`, "");

    videxts = ["mp4"];
    if (videxts.indexOf(ext) > -1) {
      number = Number(file.split(".")[0]);
      file;
      videos.push({
        number,
        name: file,
      });
    }
  });

  return sortArray(videos, {
    by: "number",
    order: "asc",
  });
};

module.exports = getVideos;
