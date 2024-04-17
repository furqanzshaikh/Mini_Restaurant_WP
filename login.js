document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Returns a promise with JSON data
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        // Extract token from response data
        var token = data.token;
        // Store the token in localStorage
        localStorage.setItem("authToken", token);
        // Redirect the user to the dashboard page
        window.location.href = "menuform.html";
      })
      .catch((error) => {
        // Handle errors, such as incorrect email/password or server errors
        document.getElementById("message").textContent = error.message;
      });
  });
