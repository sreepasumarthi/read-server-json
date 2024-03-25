const getCrafts = async() => {
    try {
        return (await fetch("https://read-server-json-1.onrender.com/api/crafts")).json();
    } catch(error){
        console.log("error retrieving data");
        return "";
    }
};


const showCrafts = async() => {
    const craftsJSON = await getCrafts();
    const craftsDiv = document.getElementById("crafts-div");


    if(craftsJSON == ""){
        craftsDiv.innerHTML = "Sorry, no crafts";
        return;
    }


    //now loop through the json
    craftsJSON.forEach((craft)=>{
        const section = document.createElement("section");
        craftsDiv.append(section);

        const img = document.createElement("img");
        img.src = "https://read-server-json-1.onrender.com/"+ craft.img;
        section.append(img);
    });
};


showCrafts();