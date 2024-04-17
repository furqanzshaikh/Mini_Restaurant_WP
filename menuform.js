document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("authToken");
  if (!token) {
    // Redirect user to the login page if token is not present
    window.location.href = "index.html";
  }

  var form = document.getElementById("menuForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var rating = document.getElementById("rating").value;
    var imgURL = document.getElementById("img").value;

    // Retrieve existing data from localStorage
    var existingData = localStorage.getItem("menuitems");

    // Initialize an empty array if no data is present
    var menuItems = existingData ? JSON.parse(existingData) : [];

    // Check if the retrieved data is an array
    if (!Array.isArray(menuItems)) {
      // If not an array, convert it into an array
      menuItems = [menuItems];
    }

    // Construct new menu item object
    var newItem = {
      title,
      description,
      price,
      rating,
      imgURL,
    };

    // Add the new item to the existing data array
    menuItems.push(newItem);

    // Store the updated data back into localStorage
    localStorage.setItem("menuitems", JSON.stringify(menuItems));

    // Redirect to dishes.html
    window.location.href = "dishes.html";

    // Reset the form
    form.reset();
  });

  // Adding event listener for logout button
  var logoutButton = document.querySelector(".logout");
  logoutButton.addEventListener("click", function () {
    // Remove token from local storage
    localStorage.removeItem("authToken");
    // Redirect user to the login page
    window.location.href = "index.html";
  });
});
