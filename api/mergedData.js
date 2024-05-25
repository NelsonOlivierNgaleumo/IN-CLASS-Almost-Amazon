// for merged promises
// Get data for viewbook
const getBookDetails = (firebasekey) => new Promise((resolve, reject) => {
  getSingleBook(firebasekey).then((bookObject) => {
    getSingleAuthor(bookObject.author_id)
      .then((authorObject) => resolve({...bookObject, authorObject}));
  }).catch(reject);
});
