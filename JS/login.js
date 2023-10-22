const Login = (event) => {
  event.preventDefault();
  const email = document.getElementById("email_field").value;
  const password = document.getElementById("password_field").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };
  fetch("https://localhost:7062/api/Login/EmployeeLogin", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text().then((result) => {
        if (response.ok) {
          // Successful login, save the token in local storage
          localStorage.setItem("jwt", result.token);
          // Navigate to dashboard.html
          window.location.href = "dashboard.html";
        } else {
          // Login failed, display an error message
          alert("Invalid email or password. Please try again.");
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors, such as displaying an error message to the user
    });
}

const Logout = () => {

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
    "title": bookTitle,
    "author": author,
    "publicationYear": publicationYear,
    "price": price
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://localhost:7062/api/Book/addBook", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      
    })
    .catch(error => console.error('Error:', error));
}


// Addbook


// //Available books
// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiTW9oYW1tZWQiLCJleHAiOjE2OTc4MzQ4MzQsImlzcyI6Ik1vaGFtbWVkIiwiYXVkIjoiVFJBIn0.q_cx8ccQv7mpx22LblErZ_a1pZx6b2UK1PLjLRIzZQY");

// var raw = "";

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://localhost:7062/api/Book/available", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

  