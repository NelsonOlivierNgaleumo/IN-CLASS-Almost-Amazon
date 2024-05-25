// for merged promises
// Get data for viewbook
const getBookDetails = (firebasekey) => new Promise((resolve, reject) => {
  getSingleBook(firebasekey).then((bookObject) => {
    getSingleAuthor(bookObject.author_id)
      .then((authorObject) => resolve({...bookObject, authorObject}));
  }).catch(reject);
});

const deleteAuthorBooksRelationship =(firebasekey) => new Promise((resolve, reject) =.{
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));


    Promise.all(deleteBookPromises).then(( => {
      deleteSingleAuthor(firebasekey).then(resolve);
    });
  }).catch(reject);
});
