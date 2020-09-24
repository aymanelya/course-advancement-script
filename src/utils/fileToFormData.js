var fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const attForm = (imageName) => {
  const form = new FormData();
  const imgPath = path.join(__dirname, "../../images/" + imageName);
  const buffer = fs.readFileSync(imgPath);
  form.append("file", buffer, {
    contentType: "text/plain",
    name: "file",
    filename: imageName,
  });
  return form;
};

module.exports = attForm;
