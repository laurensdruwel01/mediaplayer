const express = require("express");
const fs = require("fs");

const app = express();

const port = 3000;

const audioPath = "./audio";

app.use(express.static("public"));

app.get("/library/:subfolder?", (req, res) => {
  if (req.params.subfolder) {
    fullPath = audioPath + "/" + req.params.subfolder;
    fs.readdir(fullPath, (err, mp3s) => {
      res.writeHead(200, { "Content-Type": "audio/mpeg" });
      res.write(JSON.stringify(mp3s));
      return res.send();
    });
  } else {
    fullPath = audioPath + "/" + req.params.subfolder;
    fs.readdir(audioPath, (err, data) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data));
      return res.send();
    });
  }
});

app.get("/stream/:setlistName/:songTitle", function (req, res) {
  songTitle = req.params.songTitle;
  setlistName = req.params.setlistName;
  range = req.headers.range;

  audioFile = "./audio/" + setlistName + "/" + songTitle;
  stat = fs.statSync(audioFile);

  var audioReadStream;

  if (range !== undefined) {
    endBytes = stat.size - 1;
    res.status(206).header({
      "Content-Type": "audio/mpeg",
      "Content-Length": stat.size,
      "Content-Range": "bytes " + 0 + "-" + endBytes + "/" + stat.size,
    });

    audioReadStream = fs.createReadStream(
      (path = audioFile),
      (options = { end: endBytes })
    );
  } else {
    res.header({
      "Content-Type": "audio/mpeg",
      "Content-Length": stat.size,
    });
    audioReadStream = fs.createReadStream((path = audioFile));
  }
  audioReadStream.pipe(res);
});

app.listen(port, () => {
  console.log(" -> http://localhost:"+ port +";")
});
