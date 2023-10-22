const setNavbar = () => {
    // Use JavaScript to load the navigation bar content into the placeholder
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    fetch('Navbar.html')
      .then(response => response.text())
      .then(content => {
        navbarPlaceholder.innerHTML = content;
      })
      .catch(error => {
        console.error('Failed to load navigation bar:', error);
      });
}

const setNavbarIndex = () => {
    // Use JavaScript to load the navigation bar content into the placeholder
    const navbarPlaceholder = document.getElementById('navbarIndex-placeholder');
    fetch('NavbarIndex.html')
      .then(response => response.text())
      .then(content => {
        navbarPlaceholder.innerHTML = content;
      })
      .catch(error => {
        console.error('Failed to load navigation bar:', error);
      });
}