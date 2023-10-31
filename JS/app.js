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
        const button = document.createElement("button");

        text.innerHTML = book.title;
        image.src = book.imagePath;
        button.innerHTML  = book.availability;

        if(book.availability !== true){
          button.textContent = "Not available";
          button.style.backgroundColor = "#1f271b"
        }else{
          
          button.textContent = "Borrow book";
          button.addEventListener("click", () =>{
            if (localStorage.getItem("jwt") !== null){
              sessionStorage.setItem('buttonClick', JSON.stringify(book));
              window.location.href=`BorrowingBook.html?bookId=${bookId}`;
            }else{
              alert('You need to login first to borrow the book.');
            }
          })
        }

        el.appendChild(image);
        el.appendChild(text);
        el.appendChild(button);
        el.classList.add("card");
        button.classList.add("hidden-button");
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.addEventListener("mouseenter", () => {
          // Show the button when the card is hovered
          button.classList.remove("hidden-button");
        });

        el.addEventListener("mouseleave", () => {
          // Hide the button when the mouse leaves the card
          button.classList.add("hidden-button");
        });
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
        const button = document.createElement("button");

        text.innerHTML = book.title;
        image.src = book.imagePath;
        button.innerHTML  = book.availabilty;
        

        if(book.availability !== true){
          button.textContent = "Not available";
          button.style.backgroundColor = "#1f271b"
        }else{
          
          button.textContent = "Borrow book";
          button.addEventListener("click", () =>{
            if (localStorage.getItem("jwt") !== null){
              sessionStorage.setItem('buttonClick', JSON.stringify(book));
              window.location.href='BorrowingBook.html';
            }else{
              alert('You need to login first to borrow the book.');
            }
          })
        }

        el.appendChild(image);
        el.appendChild(text);
        el.appendChild(button);
        el.classList.add("card");
        button.classList.add("hidden-button");
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.addEventListener("mouseenter", () => {
          // Show the button when the card is hovered
          button.classList.remove("hidden-button");
        });

        el.addEventListener("mouseleave", () => {
          // Hide the button when the mouse leaves the card
          button.classList.add("hidden-button");
        });
        main.appendChild(el);
      });
    });
}
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
  const profileButton = document.getElementById("profileButton");

  if (isLoggedIn) {
    // User is logged in, show "Logout" button
    loginButton.textContent = "LOGOUT";
    profileButton.style.display = 'block'; // Show the profile button
  } else {
    // User is not logged in, show "Login" button
    loginButton.textContent = "LOGIN";
    profileButton.style.display = 'none'; // Hide the profile button
  }

  // Set the click event handler
  loginButton.onclick = () => {
    if (isLoggedIn) {
      // User is logged in, log them out
      localStorage.removeItem("jwt");
      window.location.reload(); // Refresh the page to reflect the logout
    } else {
      // User is not logged in, redirect to the login page
      window.location.href = "login.html";
    }
  };
});

document.addEventListener('DOMContentLoaded', function() {
  const borrowButton = document.getElementById('borrowButton');

  borrowButton.addEventListener('click', function() {
    const bookId = borrowButton.getAttribute('data-bookid');
    const token = localStorage.getItem("jwt");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.PatronId;
      BorrowBook(userId, bookId, token);
  });
});
const BorrowBook = (userId, bookId) => {
  

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  const url = `https://localhost:7062/api/BorrowingBook/CreateBorrowingTransaction?patronId=${userId}&bookId=${bookId}`;

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Assuming the response is in JSON format
    })
    .then(result => {
      alert ('You have borrow the book.');
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error here
    });
}

const Addbook = () => {
  // Token from localStorage
  const token = localStorage.getItem("jwt");

  const bookTitle = document.getElementById("bTitle").value;
  const author = document.getElementById("author").value;
  const publicationYear = document.getElementById("publicationYear").value;
  const price = document.getElementById("price").value;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    title: bookTitle,
    author: author,
    publicationYear: publicationYear,
    price: price,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://localhost:7062/api/Book/addBook", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error("Error:", error));
};