import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { getAuthorDetails } from '../api/mergedData';
import { getBooks } from '../api/bookData';

const viewAuthor = (firebaseKey) => {
  clearDom();

  // Retrieve author details and display their books
  getAuthorDetails(firebaseKey)
    .then(({ authorObject }) => {
      let domString = `
        <div id='author-details'>
          <h1 style='color: black'>${authorObject.first_name} ${authorObject.last_name}</h1>
          <p style='color: black'>Email: <a href=#>${authorObject.email}</a></p>
          <p class="card-text bold">${authorObject.favorite ? '<span class="badge badge-info fav-badge"><i class="fa fa-star"  style="color: gold" aria-hidden="true"></i> <span class="fav">Favorite</span></span>' : '<br>'}</p>
          <i class="fas fa-edit btn btn-outline-warning data-tooltip" data-tooltip="Edit Author" id="update-author--${authorObject.firebaseKey}"></i>
          <i class="btn btn-outline-danger fas fa-trash-alt data-tooltip" data-tooltip="Delete Author" id="delete-author-btn--${authorObject.firebaseKey}"></i>
        </div>
        <hr>
        <div id='author-books'>`;

      // get books associated with the author
      getBooks()
        .then((books) => {
          // filter books by author ID
          const authorBooks = books.filter((book) => book.author_id === firebaseKey);

          if (authorBooks.length === 0) {
            domString += '<p>No books found</p>';
          } else {
            // loop thru books and render
            authorBooks.forEach((book) => {
              domString += `
                <div class="author-books-container">
                  <div class="author-books">
                    <img class="card-img-top" src="${book.image}" alt="${book.title}">
                    <div class="card-body">
                      <h5 class="card-title" style="color: black">${book.title}</h5>
                    </div>
                  </div>
                </div>`;
            });
          }

          renderToDOM('#view', domString);
        });
    });
};

export default viewAuthor;
