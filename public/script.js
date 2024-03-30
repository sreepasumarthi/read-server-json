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

  const columns = Array.from({ length: 4 }, () => []);

  craftsJSON.forEach((craft, index) => {
    const columnIndex = index % 4;
    columns[columnIndex].push(craft);
  });

  columns.forEach((column, columnIndex) => {
    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("gallery-container");
    craftsDiv.appendChild(galleryContainer);

    column.forEach((craft) => {
      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");
      galleryContainer.appendChild(galleryItem);

      const img = document.createElement("img");
      img.src = "https://read-server-json-1.onrender.com/" + craft.img;
      img.alt = craft.name;
      img.addEventListener("click", () => openModal(craft));
      galleryItem.appendChild(img);
    });
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
