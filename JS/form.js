const toggleForm = (formId) =>  {
    const form = document.getElementById(formId);
    if (getComputedStyle(form).display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }

    // Close other forms
    const formsToClose = ['addBookForm', 'delBookForm', 'updateBookForm', 'getBookForm'];
    formsToClose.forEach((otherFormId) => {
        if (otherFormId !== formId) {
            const otherForm = document.getElementById(otherFormId);
            otherForm.style.display = 'none';
        }
    });
}


const addBook = document.getElementById("addBookForm");
addBook.addEventListener("submit", (event) =>{
    event.preventDefault();

    const bookTitle = document.getElementById("bTitle");
    const author = document.getElementById("author");
    const publicationYear = document.getElementById("publicationYear");
    const price = document.getElementById("price");

    console.log(`${bookTitle.value} -- ${author.value} -- ${publicationYear.value} -- ${price.value}`);
})