document.addEventListener("DOMContentLoaded", function () {
  // Retrieve data from local storage
  const menuItems = JSON.parse(localStorage.getItem("menuitems"));

  // Get the menuItemsContainer element
  const menuItemsContainer = document.getElementById("menuItemsContainer");

  // Get the paginationContainer element
  const paginationContainer = document.getElementById("paginationContainer");

  // Get the search input element
  const searchInput = document.querySelector(
    ".navbar-search input[type='text']"
  );

  // Get the search button element
  const searchButton = document.querySelector(
    ".navbar-search button.search-btn"
  );

  // Get the rating sort select element
  const ratingSortSelect = document.querySelector(".rating-sort");

  // Get the login button element
  const loginButton = document.querySelector(".login-button");

  // Check if auth token is present in local storage
  let authToken = localStorage.getItem("authToken");

  // Function to toggle login button visibility based on auth token
  function toggleLoginButtonVisibility() {
    if (authToken) {
      // Change login button text to Logout
      loginButton.textContent = "Logout";
    } else {
      // Change login button text to Login
      loginButton.textContent = "Login";
    }
  }

  // Call the function to toggle login button visibility initially
  toggleLoginButtonVisibility();

  // Constants for pagination
  const cardsPerPage = 3;
  let currentPage = 1;

  // Function to display menu items based on search value and sorting
  function displayMenuItems(searchValue, sortDirection) {
    // Clear existing menu items
    menuItemsContainer.innerHTML = "";

    // Filter menu items based on search value
    let filteredItems = menuItems.filter((item) => {
      // Convert item title and description to lowercase for case-insensitive search
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      return title.includes(searchValue) || description.includes(searchValue);
    });

    // Sort menu items based on rating
    if (sortDirection === "asc") {
      filteredItems.sort((a, b) => a.rating - b.rating);
    } else if (sortDirection === "desc") {
      filteredItems.sort((a, b) => b.rating - a.rating);
    }

    // Calculate start and end index for pagination
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    // Loop through each paginated menu item
    paginatedItems.forEach((item) => {
      // Create HTML elements for the menu item
      const menuItemDiv = document.createElement("div");
      menuItemDiv.classList.add("menu-item");

      const titleElement = document.createElement("h2");
      titleElement.textContent = item.title;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = item.description;

      const priceElement = document.createElement("p");
      priceElement.textContent = "Price: Rs " + item.price;

      const ratingElement = document.createElement("p");
      ratingElement.textContent = "Rating: " + item.rating;

      // Create and configure the image element
      const imageElement = document.createElement("img");
      imageElement.src = item.imgURL; // Set the image URL
      imageElement.alt = item.title; // Set the image alt text
      imageElement.classList.add("menu-item-image"); // Add a class for styling

      // Create Buy Now button
      const buyNowButton = document.createElement("button");
      buyNowButton.textContent = "Buy Now";
      buyNowButton.addEventListener("click", function () {
        // Handle Buy Now action (you can define your logic here)
        alert("You clicked Buy Now for: " + item.title);
      });

      // Append elements to the menuItemDiv
      menuItemDiv.appendChild(imageElement); // Append the image
      menuItemDiv.appendChild(titleElement);
      menuItemDiv.appendChild(descriptionElement);
      menuItemDiv.appendChild(ratingElement);
      menuItemDiv.appendChild(priceElement);
      menuItemDiv.appendChild(buyNowButton);

      // Append the menuItemDiv to the menuItemsContainer
      menuItemsContainer.appendChild(menuItemDiv);
    });

    // If no menu items are found after filtering, display a message
    if (filteredItems.length === 0) {
      // Create a div for the message
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("no-items-message");
      messageDiv.textContent = "No matching items found.";
      // Append message div to the menuItemsContainer
      menuItemsContainer.appendChild(messageDiv);
    }

    // Render pagination controls
    renderPagination(filteredItems.length);
  }

  // Function to render pagination controls
  function renderPagination(totalItems) {
    // Clear existing pagination controls
    paginationContainer.innerHTML = "";

    // Calculate total number of pages
    const totalPages = Math.ceil(totalItems / cardsPerPage);

    // Create previous button
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        displayMenuItems(
          searchInput.value.trim().toLowerCase(),
          ratingSortSelect.value
        );
      }
    });
    paginationContainer.appendChild(prevButton);

    // Create pagination buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.addEventListener("click", function () {
        currentPage = i;
        displayMenuItems(
          searchInput.value.trim().toLowerCase(),
          ratingSortSelect.value
        );
      });
      paginationContainer.appendChild(pageButton);
    }

    // Create next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        displayMenuItems(
          searchInput.value.trim().toLowerCase(),
          ratingSortSelect.value
        );
      }
    });
    paginationContainer.appendChild(nextButton);
  }

  // Call the function to display menu items initially
  displayMenuItems("", "asc");

  // Add event listener to the search button
  searchButton.addEventListener("click", function () {
    // Get the search value
    const searchValue = searchInput.value.trim().toLowerCase();
    // Get the selected sort direction
    const sortDirection = ratingSortSelect.value;
    // Display menu items based on search value and sorting
    displayMenuItems(searchValue, sortDirection);
  });

  // Add event listener to the rating sort select
  ratingSortSelect.addEventListener("change", function () {
    // Get the selected sort direction
    const sortDirection = ratingSortSelect.value;
    // Get the current search value
    const searchValue = searchInput.value.trim().toLowerCase();
    // Display menu items based on search value and sorting
    displayMenuItems(searchValue, sortDirection);
  });

  // Add event listener to the login/logout button
  loginButton.addEventListener("click", function () {
    // Check if user is logged in
    if (authToken) {
      // If logged in, remove the auth token from local storage
      localStorage.removeItem("authToken");
      // Set authToken to null
      authToken = null;
      // Toggle login button visibility
      toggleLoginButtonVisibility();
      // Optionally, redirect user to homepage or perform other actions
    } else {
      // If not logged in, redirect user to login page or perform other actions
      window.location.href = "login.html"; // Change URL as needed
    }
  });
});
