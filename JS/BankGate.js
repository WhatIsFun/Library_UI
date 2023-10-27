// Login to bank
const userLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById("logemail").value;
    const password = document.getElementById("logpass").value;
  
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
      redirect: "follow",
    };
    fetch("https://localhost:7114/api/Login/Login", requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert("Invalid email or password. Please try again.");
        }
        return response.text().then((result) => {
          if (response.ok) {
            // Successful login, save the token in local storage
            localStorage.setItem("token", result);
            console.log(localStorage);
            window.location.href = "index.html";
            // Navigate to dashboard.html
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
  };