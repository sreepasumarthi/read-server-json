const getCrafts = async() => {
    try {
        return (await fetch("https://read-server-json-1.onrender.com/api/crafts")).json();
    } catch(error){
        console.log("error retrieving data");
        return "";
    }
};

const showCrafts = async () => {
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
      img.alt = craft.name;
      img.addEventListener("click", () => openModal(craft));
      galleryItem.appendChild(img);
    });
  };
  
  // Function to open the modal with craft information
  const openModal = (craft) => {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalSupplies = document.getElementById("modal-supplies");
  
    modalTitle.textContent = craft.name;
    modalDescription.textContent = craft.description;
  
    // Clear previous supplies
    modalSupplies.innerHTML = "";
  
    // Populate supplies as list items
    craft.supplies.forEach((supply) => {
      const listItem = document.createElement("li");
      listItem.textContent = supply;
      modalSupplies.appendChild(listItem);
    });
  
    modal.style.display = "block";
  
    // Close the modal when the close button or outside modal area is clicked
    const closeModal = () => {
      modal.style.display = "none";
    };
  
    const closeButton = document.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", closeModal);
  
    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        closeModal();
      }
    });
  };
  
  showCrafts();
  