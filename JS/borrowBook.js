document.addEventListener('DOMContentLoaded', function() {
    // Simulate getting book details from sessionStorage
    const book = JSON.parse(sessionStorage.getItem('buttonClick'));
    if (book) {
      const bookModel = document.getElementById('bookModel');
      const modelContent = bookModel.querySelector('.modal-content');
      modelContent.innerHTML = `
        <div class="book-info">
          <img src="${book.imagePath}" alt="${book.title}" class="book-image">
          <div class="book-details">
            <h2><span>Title: </span>${book.title}</h2>
            <p class="book-author"><span>Author: </span>${book.author}</p>
            <p class="publication-year"><span>Publication year: </span>${book.publicationYear}</p>
            <p class="desc">${book.description}</p>
            
          </div>
          <button class="borrowingButton">Borrow</button>
        </div>`;
  
      bookModel.style.display = 'block';
      const closeButton = bookModel.querySelector('.borrowingButton');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          bookModel.style.display = 'none';
        });
      } else {
        console.error(".closeButton element not found within bookModel!");
      }
    }
  });
  