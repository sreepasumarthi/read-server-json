const getCrafts = async () => {
  try {
    return (await fetch("https://read-server-json-1.onrender.com/api/crafts")).json();
  } catch (error) {
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

  // Create four columns
  for (let i = 0; i < 4; i++) {
    const column = document.createElement("div");
    column.classList.add("gallery-column");
    craftsDiv.appendChild(column);
  }

  // Select all columns
  const columns = document.querySelectorAll(".gallery-column");

  // Distribute crafts evenly among the columns
  let columnIndex = 0;
  craftsJSON.forEach((craft, index) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    galleryItem.addEventListener("click", () => openModal(craft));

    const img = document.createElement("img");
    img.src = "https://read-server-json-1.onrender.com/" + craft.img;
    img.alt = craft.name;

    galleryItem.appendChild(img);
    columns[columnIndex].appendChild(galleryItem);

    // Move to the next column
    columnIndex = (columnIndex + 1) % 4;
  });
};

const openModal = (craft) => {
  const modal = document.getElementById("myModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalSupplies = document.getElementById("modal-supplies");
  const modalImage = document.getElementById("modal-image");

  modalTitle.innerHTML = `<strong>${craft.name}</strong>`;
  modalDescription.textContent = craft.description;

  modalSupplies.innerHTML = "<strong>Supplies:</strong>";
  craft.supplies.forEach((supply) => {
    const listItem = document.createElement("li");
    listItem.textContent = supply;
    modalSupplies.appendChild(listItem);
  });

  modalImage.src = "https://read-server-json-1.onrender.com/" + craft.img;

  modal.style.display = "block";

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
