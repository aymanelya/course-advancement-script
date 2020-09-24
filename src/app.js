const { sendToTrello } = require("./utils/trelloRequests");

if (process.argv.length < 3) {
  console.log(
    "You have to specify the course folder!\nEx: npm run start /home/ayman/Downloads/nodejsCourse"
  );
} else {
  sendToTrello(process.argv[2])
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}
