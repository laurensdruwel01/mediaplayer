const express = require("express");
const fs = require("fs");

const app = express();

const port = 3000;

const audioPath = "./audio";

app.use(express.static("public"));

const filePath = "./copyrightFree/";



app.get("/library/:subfolder?", (req, res) => {
    if(req.params.subfolder){
        tmp = audioPath +"/" + req.params.subfolder;
        fs.readdir(tmp, (err, mp3s) =>{
            console.log(mp3s)
            res.writeHead(200, {'Content-Type': 'audio/mpeg'});
            res.write(JSON.stringify(mp3s));
            return res.send();
          })
    }
    else{
        tmp = audioPath +"/" + req.params.subfolder;
        fs.readdir(audioPath, (err, dirs) =>{
            console.log(dirs)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(dirs));
            return res.send();
          })
    }
    
    
        
    



    

});



app.listen(port, () => {
    console.log(`Navigate to http://localhost:${port}`)
});