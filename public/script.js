const getCrafts = async() => {
    try {
        return (await fetch("http://localhost:3030/api/crafts")).json();
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


        const h2 = document.createElement("h3");
        h2.innerHTML = craft.name;
        section.append(h2);


        const h3 = document.createElement("h3");
        h3.innerHTML = craft.description;
        section.append(h3);


        const img = document.createElement("img");
        img.src = "/"+ craft.img;
        section.append(img);
    });
};


showCrafts();