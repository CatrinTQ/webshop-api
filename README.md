# Produktkatalog API 🚀

Detta API är en del av ett e-shop system där användare kan hantera produkter och kategorier. API:et tillåter CRUD-operationer (Create, Read, Update, Delete) för både produkter och kategorier, samt möjligheten att söka och sortera produkter.

Databasen innehåller produkter för rullskridskor och komponenter så som plates, toe stops och hjul.

## Teknologier 🛠️

- Node.js med Express

- MySQL som databas

- MySQL2 för att interagera med databasen

## ER-diagram
(src/images/er-diagram.png)

## Funktioner ✨

API:et erbjuder följande funktioner:
### Kategorier 📂

- [x] GET /categories – Hämta alla kategorier

- [x] GET /categories/:id – Hämta en specifik kategori

- [x] GET /categories/:id/products – Hämta alla produkter i en viss kategori

- [x] POST /categories – Skapa en ny kategori

- [x] PATCH /categories/:id – Uppdatera en kategori

- [x] DELETE /categories/:id – Radera en kategori

### Produkter 📦

- [x] GET /products – Hämta alla produkter

- [x] GET /products/:id – Hämta en specifik produkt

- [x] POST /products – Skapa en ny produkt

- [x] PATCH /products/:id – Uppdatera en produkt

- [x] DELETE /products/:id – Radera en produkt


## Felhantering ⚠️

API:et använder lämpliga HTTP-statuskoder för felhantering. Vanliga fel inkluderar:

    400 Bad Request – När en obligatorisk parameter saknas eller är felaktig.

    404 Not Found – När en resurs inte hittas.

    500 Internal Server Error – När något oväntat inträffar på servern.