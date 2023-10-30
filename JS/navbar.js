const setNavbar = () => {
  // Use JavaScript to load the navigation bar content into the placeholder
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  fetch("Navbar.html")
    .then((response) => response.text())
    .then((content) => {
      navbarPlaceholder.innerHTML = content;
    })
    .catch((error) => {
      console.error("Failed to load navigation bar:", error);
    });
};

const setNavbarIndex = () => {
  // Use JavaScript to load the navigation bar content into the placeholder
  const navbarPlaceholder = document.getElementById("navbarIndex-placeholder");
  fetch("NavbarIndex.html")
    .then((response) => response.text())
    .then((content) => {
      navbarPlaceholder.innerHTML = content;
    })
    .catch((error) => {
      console.error("Failed to load navigation bar:", error);
    });
};
// document.addEventListener("DOMContentLoaded", function () {

// //console.log("Script is running");
//   // Check if localStorage has a specific value (e.g., 1)
//   const isLoggedIn = localStorage.getItem("jwt");

//   // Find the login button element by its ID
//   const loginButton = document.getElementById("loginButton");

//   loginButton.textContent = isLoggedIn ? "LOGOUT" : "LOGIN";

//   // Set the click event handler
//   loginButton.onclick = () => {
//     if (isLoggedIn) {
//       // User is logged in, show "Logout" button
//       localStorage.removeItem("jwt"); // Clear the authentication status
//       // Navigate to the login page using JavaScript
//       navigateTo("index.html");
//     } else {
//       // User is not logged in, show "Login" button
//       // Navigate to the index page using JavaScript
//       navigateTo("login.html");
//     }
//   };

//   // Function to navigate to a different page
//   function navigateTo(page) {
//     // Check if the current page is different from the target page
//     if (window.location.href.endsWith(page)) {
//       return; // Do nothing if already on the target page
//     }

//     // Use JavaScript to navigate to the target page
//     window.location.href = page;
//   }
// });
