const showCrafts = async () => {
  const craftsJSON = await getCrafts();
  const columns = document.querySelectorAll(".column");

  if (craftsJSON == "") {
    columns.forEach(column => {
      column.innerHTML = "Sorry, no crafts";
    });
    return;
  }

  let columnIndex = 0;
  let columnCount = columns.length;
  let columnHeights = Array.from(columns).map(() => 0); // Array to store column heights

  craftsJSON.forEach((craft, index) => {
    // Find the shortest column
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    const img = document.createElement("img");
    img.src = "https://read-server-json-1.onrender.com/" + craft.img;
    img.alt = craft.name;
    img.addEventListener("click", () => openModal(craft));
    galleryItem.appendChild(img);
    columns[shortestColumnIndex].appendChild(galleryItem);

    // Update the height of the column
    columnHeights[shortestColumnIndex] += galleryItem.offsetHeight;

    // If the column's height exceeds the container's height, switch to the next column
    if (columnHeights[shortestColumnIndex] >= columns[shortestColumnIndex].offsetHeight) {
      columnIndex++;
      if (columnIndex === columnCount) columnIndex = 0;
      columnHeights[shortestColumnIndex] = 0; // Reset the height of the column
    }
  });
};
