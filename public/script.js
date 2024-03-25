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

    if (craftsJSON == "") {
        craftsDiv.innerHTML = "Sorry, no crafts";
        return;
    }

    // Create a container for the gallery
    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("gallery-container");
    craftsDiv.appendChild(galleryContainer);

    // Loop through the JSON and create gallery items
    craftsJSON.forEach((craft) => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");
        galleryContainer.appendChild(galleryItem);

        const img = document.createElement("img");
        img.src = "https://read-server-json-1.onrender.com/" + craft.img;
        img.alt = craft.name; // Optional: Use craft name as alt text
        galleryItem.appendChild(img);

        /* Optional: Add captions or overlays */
        // const caption = document.createElement("div");
        // caption.classList.add("gallery-caption");
        // caption.innerText = craft.name;
        // galleryItem.appendChild(caption);
    });
};

showCrafts();
