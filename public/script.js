const uploadForm  = document.getElementById('uploadForm');
const fileUpload = document.getElementById('fileUpload');

getFiles = async () => {
    setlist = getNameOfSetlist();
  libaryURL = "/library";
  if (setlist !== "") {
    libaryURL = libaryURL + "/" + setlist;
  }
  res = await fetch(libaryURL);
  return await res.json();
};

loadFiles = async (setlist) => {
  document.getElementById("setlist").innerHTML = setlist;
  getFiles().then(
     (data) => {
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
    (error) => {
      console.log(error);
    }
  );
};

startStreaming = async (song) => {
  result = await fetch("/stream/"
     + getNameOfSetlist() + "/" + song);
  document.getElementById("player").src = result.url;
};

loadLibrary = async () => {
    setNameOfSetlist("");
  getFiles().then(
    (data) => {
        data = data.sort();
      let setlist = "<ul>";

      for (i = 0; i < data.length; i++) {
        files = data[i];
        setlist +=
          "<li><button onclick=loadFiles('" + data[i] + "')>" + data[i] + "</button></li>";
      }

      setlist += "</ul>";
      document.getElementById("fileBrowser").innerHTML = setlist;
    },
    (error) => {
      console.log(error);
    }
  );
};

getNameOfSetlist = () => {
    return document.getElementById("setlist").innerHTML;
}

setNameOfSetlist = (name) => {
    document.getElementById("setlist").innerHTML = name;
}



uploadAudioFiles = async(files) => {
    data = new FormData();
    data.append("audioFile", files[0]);
    fetch("/upload", {
        method: "POST",
        body: data
    })
    .then(res => res.json())
    .catch((e) => {
        console.log(e);
    });
}
    




addEventListeners = () => {
    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        files = document.getElementById("fileUpload").files;
        uploadAudioFiles(files);
    });
  
}

window.onload = () => {
    addEventListeners();
    loadLibrary();
  };