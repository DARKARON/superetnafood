# Installare il gestionale sul telefono Android

Dentro questa cartella c'è l'app completa: `index.html` contiene tutto (grafica, immagini,
dati), quindi funziona anche senza rete.

Per avere l'**icona sulla schermata Home** come una vera app, Android chiede che l'app stia
su un indirizzo `https`. Metterla online è gratuito e richiede due minuti: sotto la strada
più semplice.

---

## Strada consigliata — Netlify Drop (gratis, senza registrazione per iniziare)

1. Sul **computer**, apri `app-netlify.com/drop` (indirizzo esatto: `https://app.netlify.com/drop`).
2. Trascina dentro la finestra del browser **l'intera cartella `app-android`**.
3. Attendi il caricamento: Netlify ti mostra un indirizzo tipo
   `https://qualcheparola-12345.netlify.app`.
4. Apri quell'indirizzo **su Android con Chrome**.
5. Chrome mostra in basso il banner **"Installa app"** — premilo. Se non compare: menu
   **⋮** in alto a destra → **Installa app** (o **Aggiungi a schermata Home**).
6. L'icona compare tra le tue app. Da quel momento si apre a schermo pieno, senza barra del
   browser, e funziona anche in campo senza rete.

Per registrarti (facoltativo) e mantenere l'indirizzo stabile nel tempo, crea un account
gratuito Netlify: l'indirizzo diventa tuo e puoi rinominarlo, per esempio
`superetnafood.netlify.app`.

**Per aggiornare l'app** in futuro: torna su Netlify Drop e trascina la cartella aggiornata.
Sul telefono l'app si aggiorna da sola alla riapertura.

---

## Strada alternativa — solo il file, senza mettere niente online

Se ti basta **aprire** il gestionale sul telefono, senza icona a schermo pieno:

1. Copia `index.html` sul telefono (WhatsApp a te stesso, Google Drive, cavo USB…).
2. Aprilo con Chrome dall'app **File**.
3. Menu **⋮** → **Aggiungi a schermata Home**: crea una scorciatoia.

Limite di questa strada: è una scorciatoia, non un'app installata — si apre dentro Chrome
con la barra degli indirizzi visibile.

---

## Note

- **I dati restano sul telefono**: registro conferimenti, quaderno, posizione dei pallini e
  schede piante sono salvati nella memoria del browser di quel dispositivo. Non si
  sincronizzano fra telefono e computer.
- **Meteo**: si aggiorna da solo quando c'è rete (Open-Meteo). Senza rete mostra gli ultimi
  dati letti.
- **Bandi e prezzi**: richiedono il servizio della cartella `automazione` (vedi il suo
  `LEGGIMI.md`); una volta pubblicato, collegalo dal Cruscotto → Aggiornamento dati.
