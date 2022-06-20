

getLibrary= async() =>{
        let res = await fetch("http://localhost:3000/library")
        return await res.json()
    }


  loadLibrary = async()=>{    
    getLibrary().then(
        function(data){
            let setlist = "<ul>";

            for(i=0; i< data.length;i++){
                setlist+= "<li><button>"+data[i]+"</button></li>"
        
            }
            setlist += "</ul>"
            document.getElementById("setlist").innerHTML = setlist;
        },
        function(error){
            console.log(error)
        }
    );  
}



loadLibrary();




