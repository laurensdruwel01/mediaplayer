getFiles = async (setlist = "") => {
  libaryURL = "http://localhost:3000/library";
  if (setlist !== "") {
    libaryURL = libaryURL + "/" + setlist;
  }
  res = await fetch(libaryURL);
  return await res.json();
};

loadFiles = async (setlist) => {
  document.getElementById("setlist").innerHTML = setlist;
  getFiles(setlist).then(
    function (data) {
      let songs = "<ul>";
      for (i = 0; i < data.length; i++) {
        songs +=
          "<li><button onclick=startStreaming('" +
          data[i] +
          "')>" +
          data[i] +
          "</button></li>";
      }
      songs += "</ul>";
      document.getElementById("fileBrowser").innerHTML = songs;
    },
    function (error) {
      console.err(error);
    }
  );
};

startStreaming = async (song) => {
  console.log("START STREAM " + song);

  result = await fetch("http://localhost:3000/stream/"
     + document.getElementById("setlist").innerHTML + "/" + song);
  document.getElementById("player").src = result.url;
};

loadLibrary = async () => {
  getFiles().then(
    function (data) {
      let setlist = "<ul>";

      for (i = 0; i < data.length; i++) {
        files = data[i];
        setlist +=
          "<li><button onclick=loadFiles('" + data[i] + "')>" + data[i] + "</button></li>";
      }
      setlist += "</ul>";
      document.getElementById("fileBrowser").innerHTML = setlist;
    },
    function (error) {
      console.err(error);
    }
  );
};
