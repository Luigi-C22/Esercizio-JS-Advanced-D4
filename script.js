

const bookContainer = document.getElementById("bookContainer");
const searchInput = document.getElementById("searchInput");
const cart = document.getElementById("listaCarrello");
const spanTotale = document.querySelector("span.totCarrello");
const apiUrl = "https://striveschool-api.herokuapp.com/books";

let cartItems = [];
let total = 0;



// Effettua una richiesta GET all'API dei libri
    fetch(apiUrl)
        .then(response => response.json())
    
        .then(data => {
                 const books = data; //elabora i dati ottenuti dall API
        
        // Crea le cards per ogni libro
    books.forEach(book => {
        // Crea un elemento div per la card
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add(`${book.asin}`)
  
        // Crea il contenuto della card
        const image = document.createElement("img");
        image.src = book.img;
        card.appendChild(image);
        card.classList.add("object-fit-scale")

        const title = document.createElement("h4");
        title.textContent = book.title;
        card.appendChild(title);
        

        const category = document.createElement("p");
        category.textContent = "Category: " + book.category;
        card.appendChild(category);
  
        const price = document.createElement("p");
        price.textContent = "Prezzo: € " + book.price;
        card.appendChild(price);
        price.classList.add("fw-bold"); //aggiungo la classe per il neretto
        
        const btnAdd = document.createElement("button");
        btnAdd.textContent = "Aggiungi al carrello";
        card.appendChild(btnAdd);
        btnAdd.classList.add("btn", "btn-primary"); //aggiungo la classe per il button blu
        btnAdd.addEventListener("click", () => addToCart(book));
        card.appendChild(btnAdd);
        
        const btnSkip = document.createElement("button");
        btnSkip.textContent = "Salta";
        card.appendChild(btnSkip);
        btnSkip.classList.add("btn", "btn-secondary"); //aggiungo la classe per il button grigio
        btnSkip.addEventListener('click', () => {
          card.style.display = 'none'; // nasconde la card
        } )

        // Aggiungi la card al contenitore delle cards con le classi per i breakpoint
        bookContainer.appendChild(card);
        bookContainer.classList.add("row-cols-xxl-5", "row-cols-xl-6", "row-cols-lg-5", "row-cols-md-4", "row-cols-sm-4", "d-flex", "flex-wrap");

       
      });
    })
    
    .catch(error => {
      console.log("Hai un errore con codice: ", error);
    });
    

//funzione per aggiungere i libri al carrello
const addToCart = (book) => {
  const {title, price} = book;
  const item = {title, price};
  
  cartItems.push(item);
  total += parseFloat(price);

  const listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
      listItem.innerHTML = `
        ${title}
        <span class="span-price px-2 mx-2">€ ${price}</span>
        <button class="btn btn-danger me-2 mt-1" onclick="removeFromCart(this)">X</button>
      `;

      cart.appendChild(listItem);
      spanTotale.innerText = total.toFixed(2);

      const selectedCard = document.querySelector(`div[data-title="${title}"]`);
      selectedCard.classList.add("selected");
    };

    // Funzione per rimuovere un libro dal carrello
    const removeFromCart = (button) => {
      const listItem = button.parentNode;
      const index = Array.from(listItem.parentNode.children).indexOf(listItem);

      const removedItem = cartItems.splice(index, 1)[0];
      total -= parseFloat(removedItem.price);

      listItem.remove();
      spanTotale.innerText = total.toFixed(2);

      const selectedCard = document.querySelector(`div[data-title="${removedItem.title}"]`);
      selectedCard.classList.remove("selected");
    };

// Funzione per filtrare i libri in base alla ricerca
const filterBooks = (searchTerm) => {
  const filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderBooks(filteredBooks);
};

// Gestore dell'input di ricerca
searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.trim();
  if (searchTerm.length >= 3) {
    filterBooks(searchTerm);
  } else {
    renderBooks(allBooks);
  }
});

let allBooks = [];

// Effettua una richiesta GET all'API dei libri
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    allBooks = data;
    renderBooks(allBooks);
  })
  .catch((error) => {
    console.log("Hai un errore con codice:", error);
  });