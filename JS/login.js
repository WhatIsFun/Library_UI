// Admin Login function
// const AdminLogin = (event) => {
//   event.preventDefault();
//   const email = document.getElementById("email_field").value;
//   const password = document.getElementById("password_field").value;

//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const data = {
//     email: email,
//     password: password,
//   };

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: JSON.stringify(data),
//     redirect: "follow",
//   };
//   fetch("https://localhost:7062/api/Login/EmployeeLogin", requestOptions)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.text().then((result) => {
//         if (response.ok) {
//           // Successful login, save the token in local storage
//           localStorage.setItem("jwt", result);
//           // Navigate to dashboard.html
//           window.location.href = "dashboard.html";
//         } else {
//           // Login failed, display an error message
//           alert("Invalid email or password. Please try again.");
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       // Handle errors, such as displaying an error message to the user
//     });
// }

// registeration function
const RegisterUser = (event) => {
  event.preventDefault();
  const nameIn = document.getElementById("username_field").value;
  const emailIn = document.getElementById("email_field").value;
  const passwordIn = document.getElementById("password_field").value;
  const passwordConfirmIn = document.getElementById(
    "confirmPassword_field"
  ).value;
  const phoneNumIn = document.getElementById("phone_field").value;
  const ageIn = document.getElementById("age_field").value;

  // Regular expressions
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Check if the passwords match
  if (passwordIn !== passwordConfirmIn) {
    alert("Password and confirmation do not match");
    return;
  }

  // Validate email using regex
  if (!emailIn.match(emailPattern)) {
    alert("Invalid email address");
    return;
  }

  // Validate password using regex
  if (!passwordIn.match(passwordPattern)) {
    alert(
      "Password must be at least 8 characters, including one uppercase letter, one lowercase letter, and one digit"
    );
    return;
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: nameIn,
    email: emailIn,
    password: passwordIn,
    phoneNum: phoneNumIn,
    age: ageIn
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://localhost:7062/api/Register", requestOptions)
    .then((response) => {
      if (response.ok) {
        // Registration was successful
        return response.text();
      } else {
        throw new Error("Registration failed");
      }
    })
    .then((result) => {
      console.log(result); // This could be the success message from the server
      // You can display the success message to the user
      alert("Registration successful: " + result);
      window.location.href = "login.html";
      // You may want to redirect the user to a different page
    })
    .catch((error) => {
      console.log("error", error);
      // Handle registration errors, such as displaying an error message to the user
      alert("Registration failed. Please try again.");
    });
};

// const form = document.getElementById("registerForm"); // Change "your-form-id" to the actual ID of your form
// form.addEventListener("submit", RegisterUser);

// Login
// const userLogin = (event) => {
//   event.preventDefault();
//   const email = document.getElementById("email_field").value;
//   const password = document.getElementById("password_field").value;

//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const data = {
//     email: email,
//     password: password
//   };

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: JSON.stringify(data),
//     redirect: "follow",
//   };
//   fetch("https://localhost:7062/api/Login/Login", requestOptions)
//     .then((response) => {
//       if (!response.ok) {
//         alert("Invalid email or password. Please try again.");
//       }
//       return response.text().then((result) => {
//         if (response.ok) {
//           // Successful login, save the token in local storage
//           localStorage.setItem("jwt", result);
//           console.log(localStorage);
//           window.location.href = "index.html";
//           // Navigate to dashboard.html
//         } else {
//           // Login failed, display an error message
//           alert("Invalid email or password. Please try again.");
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       // Handle errors, such as displaying an error message to the user
//     });
// };

//Book Management

// Password visibility
// function togglePasswordVisibility() {
//   const passwordInput = document.getElementById("password");
//   const icon = document.querySelector(".toggle-password i");

//   if (passwordInput.type === "password") {
//     passwordInput.type = "text";
//     icon.classList.remove("fa-eye");
//     icon.classList.add("fa-eye-slash");
//   } else {
//     passwordInput.type = "password";
//     icon.classList.remove("fa-eye-slash");
//     icon.classList.add("fa-eye");
//   }
// }



document.addEventListener('DOMContentLoaded', function() {
  const adminCheckbox = document.getElementById('adminCheckbox');

  const handleLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById("email_field").value;
    const password = document.getElementById("password_field").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = {
      email: email,
      password: password
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow"
    };

    if (adminCheckbox.checked) {
      // Admin login
      fetch("https://localhost:7062/api/Login/AdminLogin", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.text().then((result) => {
          // Successful admin login
          localStorage.setItem("jwt", result);
          window.location.href = "dashboard.html";
        }) 
      } else {
        // Admin login failed
        alert("Invalid email or password. Please try again.");
        throw new Error("Admin login failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });


    } else {
      // User login
      fetch("https://localhost:7062/api/Login/Login", requestOptions)
        .then((response) => {
          if (!response.ok) {
            alert("Invalid email or password. Please try again.");
          }
          return response.text().then((result) => {
            if (response.ok) {
              localStorage.setItem("jwt", result);
              window.location.href = "index.html";
              
            } else {
              alert("Invalid email or password. Please try again.");
            }
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  // Add an event listener to the login button
  const loginButton = document.querySelector('.sign-in_btn');
  loginButton.addEventListener('click', handleLogin);
});
