const search = document.getElementById("search");
const form = document.getElementById("form");
const main = document.getElementById("main");
const apiURL = "https://localhost:7062/api/Book/getAllBooks";

showBooks(apiURL);
// Show all the books in the library
function showBooks(url) {
  const requestOptions = {
    method: "GET",

    redirect: "follow",
  };

  fetch(url, requestOptions)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);

      data.forEach((book) => {
        const el = document.createElement("div");
        const image = document.createElement("img");
        const text = document.createElement("h2");

        text.innerHTML = book.title;

        image.src = book.imagePath;

        el.appendChild(image);
        el.appendChild(text);
        main.appendChild(el);
      });
    });
}

// NavBar - Search
const searchBook = (searchURL) => {
  const search = document.getElementById("search");
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(searchURL, requestOptions)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);

      data.forEach((book) => {
        const el = document.createElement("div");
        const image = document.createElement("img");
        const text = document.createElement("h2");

        text.innerHTML = book.title;

        image.src = book.imagePath;

        el.appendChild(image);
        el.appendChild(text);
        main.appendChild(el);
      });
    });
};
search.addEventListener("input", () => {
  main.innerHTML = "";

  const searchTerm = search.value.trim();
  const searchURL = `https://localhost:7062/api/Book/byTitle/${searchTerm}`;

  if (searchTerm === "") {
    showBooks(apiURL);
  } else {
    searchBook(searchURL);
  }
});
//NavBar - Login
document.addEventListener("DOMContentLoaded", function () {
  //console.log("Script is running");
  // Check if localStorage has a specific value (e.g., 1)
  const isLoggedIn = localStorage.getItem("jwt");

  // Find the login button element by its ID
  const loginButton = document.getElementById("loginButton");

  loginButton.textContent = isLoggedIn ? "LOGOUT" : "LOGIN";

  // Set the click event handler
  loginButton.onclick = () => {
    if (isLoggedIn) {
      // User is logged in, show "Logout" button
      localStorage.removeItem("jwt"); // Clear the authentication status
      window.location.href = "index.html"; // Redirect to the login page
    } else {
      // User is not logged in, show "Login" button
      window.location.href = "login.html"; // Redirect to the index page
    }
  };
});
