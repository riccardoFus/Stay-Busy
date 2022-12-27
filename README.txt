Per far partire il server, entrare nella cartella da vs code o terminale, scrivere "npm start" e viene eseguito il programma.

Per provare le API con postman, creare degli endpoint del tipo "http://localhost:8080/api/...", per vedere tutte le api che ho
attualmente fatto, vedere nella cartella routes il file routes, li sono indicati tutti gli endpoint fatti fino ad ora.

Per la questione frontend, attualmente ho creato 4 file html molto banali, giusto per capire se funzionano le API, se volete
provare a dare un'occhiata e vedere se riuscite a capire il tutto.

Tutto ciò è una bozza, andrà sistemato...

Per aprire la pagina web collegata al server, cercare nella barra di ricerca "http://localhost:8080"

//aggiungere questo pezzo nel .env
DB_HOST = root
DB_PASSWORD = myPassword123
PORT = 8080
MONGODB_URI = mongodb+srv://riccardo:4qGFNOi3YQ93vrM2@cluster0.m5ier3e.mongodb.net/?retryWrites=true&w=majority
SUPER_SECRET='StayBusy_Secret'