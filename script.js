

const bookContainer = document.getElementById("bookContainer");

window.onload = () => {};

// Effettua una richiesta GET all'API dei libri
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
    
        .then(data => {
                 const books = data; //elabora i dati ottenuti dall API
        
        // Crea le cards per ogni libro
    books.forEach(book => {
        // Crea un elemento div per la card
        const card = document.createElement("div");
        card.classList.add("card");
  
        // Crea il contenuto della card
        const image = document.createElement("img");
        image.src = book.img;
        card.appendChild(image);
        card.classList.add("object-fit-scale")

        const title = document.createElement("h4");
        title.textContent = book.title;
        card.appendChild(title);
        //card.classList.add("fit-content"); 

        const category = document.createElement("p");
        category.textContent = "Category: " + book.category;
        card.appendChild(category);
  
        const price = document.createElement("p");
        price.textContent = "Prezzo: €" + book.price;
        card.appendChild(price);
        price.classList.add("fw-bold"); //aggiungo la classe per il neretto
        
        const btnAdd = document.createElement("button");
        btnAdd.textContent = "Aggiungi al carrello";
        card.appendChild(btnAdd);
        btnAdd.classList.add("btn", "btn-primary"); //aggiungo la classe per il button blu

        const btnSkip = document.createElement("button");
        btnSkip.textContent = "Salta";
        card.appendChild(btnSkip);
        btnSkip.classList.add("btn", "btn-secondary"); //aggiungo la classe per il button grigio
        btnSkip.setAttribute("onclick", "hideCard()"); // nasconde la card
  
        // Aggiungi la card al contenitore delle cards con le classi per i breakpoint
        bookContainer.appendChild(card);
        bookContainer.classList.add("py-5", "row-cols-xxl-5", "row-cols-xl-4", "row-cols-lg-3", "row-cols-md-3", "row-cols-sm-2", "d-flex", "flex-wrap");

       
      });
    })
    
    .catch(error => {
      console.log("Hai un errore con codice: ", error);
    });
    
    

//funzione per nascondere la card premendo il tasto 'salta'
function hideCard() {
  let card = document.querySelector('.card');
  card.style.display = 'none';
}