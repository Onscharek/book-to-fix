document.addEventListener('DOMContentLoaded', () => {
    const booksContainer = document.getElementById('books');
    const apiKey = 'AIzaSyDUviEVDY5i8QPeBcJMerHc9MJWcJZx-OY'; // Replace with your Google Books API key
    const query = ' romance'; // Example search query

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function displayBooks(books) {
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';

            const title = book.volumeInfo.title || 'No title available';
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors available';
            
            const description = book.volumeInfo.description || 'No descriptiontitle available';
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
            
            bookElement.innerHTML = `
                <h2>${title}</h2>
                <p><strong>Authors:</strong> ${authors}</p>
                <p><strong>Description:</strong> ${description}</p>
                ${thumbnail ? `<img src="${thumbnail}" alt="Book cover">` : ''}
            `;

            booksContainer.appendChild(bookElement);
        });
    }
});
