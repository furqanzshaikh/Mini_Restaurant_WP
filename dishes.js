let menuItems = [];
let currentPage = 1;
const cardsPerPage = 6;

const token = localStorage.getItem("authToken");
if (!token) {
  // Redirect user to the login page if token is not present
  window.location.href = "index.html";
}

function renderMenuCards() {
  const existingData = localStorage.getItem("menuitems");
  menuItems = existingData ? JSON.parse(existingData) : [];

  const menuContainer = document.getElementById("menuContainer");
  menuContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedItems = menuItems.slice(startIndex, endIndex);

  displayedItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = item.imgURL;
    image.alt = item.title;

    const title = document.createElement("h2");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const price = document.createElement("p");
    price.textContent = "Price: Rs " + item.price;

    const rating = document.createElement("p");
    rating.textContent = "Rating: " + item.rating;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      openEditModal(item);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      console.log("Delete clicked for item:", item);
      menuItems.splice(index + startIndex, 1);
      localStorage.setItem("menuitems", JSON.stringify(menuItems));
      renderMenuCards(); // Re-render the menu cards after deleting
    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(rating);
    card.appendChild(editButton);
    card.appendChild(deleteButton);

    menuContainer.appendChild(card);
  });

  // Render pagination controls
  renderPagination();
}

function openEditModal(item) {
  const modal = document.getElementById("editModal");
  const editTitleInput = document.getElementById("editTitle");
  const editDescriptionInput = document.getElementById("editDescription");
  const editPriceInput = document.getElementById("editPrice");
  const editRatingInput = document.getElementById("editRating");

  // Populate modal inputs with item's data
  editTitleInput.value = item.title;
  editDescriptionInput.value = item.description;
  editPriceInput.value = item.price;
  editRatingInput.value = item.rating;

  // Display modal
  modal.style.display = "block";

  // Close modal when close button is clicked
  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", closeModal);

  // Handle form submission
  const editForm = document.getElementById("editForm");
  editForm.addEventListener("submit", handleSubmit);

  function closeModal() {
    modal.style.display = "none";
    // Remove event listeners
    closeButton.removeEventListener("click", closeModal);
    editForm.removeEventListener("submit", handleSubmit);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Update item's data with new values
    item.title = editTitleInput.value;
    item.description = editDescriptionInput.value;
    item.price = editPriceInput.value;
    item.rating = editRatingInput.value;

    // Update local storage
    localStorage.setItem("menuitems", JSON.stringify(menuItems));

    // Close modal
    modal.style.display = "none";

    // Re-render menu cards
    renderMenuCards();

    // Clean up event listeners
    closeModal();
  }
}

function renderPagination() {
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  const numPages = Math.ceil(menuItems.length / cardsPerPage);

  // Previous button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderMenuCards();
    }
  });
  paginationContainer.appendChild(prevButton);

  // Page buttons
  for (let i = 1; i <= numPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderMenuCards();
    });
    paginationContainer.appendChild(pageButton);
  }

  // Next button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", () => {
    if (currentPage < numPages) {
      currentPage++;
      renderMenuCards();
    }
  });
  paginationContainer.appendChild(nextButton);
}

// Call renderMenuCards to render initial cards and pagination
renderMenuCards();
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", function () {
  // Remove token from local storage
  localStorage.removeItem("authToken");
  // Redirect user to the login page
  window.location.href = "index.html";
});