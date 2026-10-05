# Mettere l'app online con GitHub Pages

Gratis, senza scadenza, senza carta di credito. Servono 15 minuti la prima volta.
Tutto si fa dal browser: non devi installare niente.

---

## 1. Crea l'account GitHub

1. Vai su https://github.com/signup
2. Email, password, nome utente (es. `antoniograsso`). Scrivilo qui: __________
3. Conferma l'email che ti arriva.

## 2. Crea il repository (la "cartella online")

1. In alto a destra clicca **+** → **New repository**
2. **Repository name**: `superetnafood`
3. Lascia **Public** selezionato
4. NON spuntare "Add a README file"
5. Clicca **Create repository**

## 3. Carica i file dell'app

1. Scarica dalla chat lo zip `app-android` e **estrailo** sul computer.
   Dentro devi vedere: `index.html`, `manifest.webmanifest`, `sw.js`,
   `icona-192.png`, `icona-512.png`, `icona-maskable.png`, `favicon.png`, `.nojekyll`
2. Nella pagina del repository appena creato clicca **uploading an existing file**
   (oppure **Add file** → **Upload files**)
3. Apri la cartella estratta, **seleziona tutti i file** (Ctrl+A / Cmd+A) e trascinali nel riquadro.
   ⚠️ Trascina i **file**, non la cartella: `index.html` deve stare alla radice del repository.
4. In basso clicca **Commit changes**.

Se il file `.nojekyll` non si vede sul computer: su Windows attiva
"Visualizza → Elementi nascosti", su Mac premi Cmd+Shift+punto.
Se proprio non lo trovi, puoi crearlo online: **Add file → Create new file**,
nome `.nojekyll`, lascia vuoto, **Commit**.

## 4. Accendi GitHub Pages

1. Nel repository apri la scheda **Settings** (in alto)
2. Nel menu a sinistra clicca **Pages**
3. In **Source** scegli **Deploy from a branch**
4. **Branch**: `main` — cartella `/ (root)` → **Save**
5. Aspetta 1-2 minuti e ricarica la pagina: comparirà il link verde

   `https://TUONOME.github.io/superetnafood/`

Questo è l'indirizzo della tua app. Salvalo.

## 5. Autorizza Google Drive sul nuovo indirizzo

Senza questo passaggio il pulsante "Collega Google Drive" dà errore.

1. Vai su https://console.cloud.google.com/apis/credentials
2. Entra con lo stesso account Google del progetto già creato
3. Clicca sul **Client ID OAuth 2.0** che stai usando
4. In **Origini JavaScript autorizzate** clicca **AGGIUNGI URI** e incolla:

   `https://TUONOME.github.io`

   (solo il dominio, **senza** `/superetnafood/` e senza barra finale)
5. **Salva**. Le modifiche possono richiedere qualche minuto.

## 6. Installa l'app sul telefono

1. Apri il link `https://TUONOME.github.io/superetnafood/` con **Chrome** su Android
2. Menu ⋮ → **Installa app** (o "Aggiungi a schermata Home")
3. L'icona compare fra le app; si apre a schermo intero e funziona anche offline
4. Al primo avvio: **Collega Google Drive** → scegli l'account → consenti.
   Da lì in poi non te lo richiede più.

## 7. Aggiornare l'app in futuro

Quando ti mando una nuova versione:

1. Repository → **Add file** → **Upload files**
2. Trascina i file nuovi (stessi nomi): GitHub sostituisce i vecchi
3. **Commit changes**
4. Sul telefono chiudi e riapri l'app: dopo qualche secondo si aggiorna da sola
   (se non succede: Impostazioni Android → App → Super Etna Food → Cancella cache)

---

## Problemi frequenti

**Pagina bianca / errore 404**
Probabilmente hai caricato la cartella invece dei file. Il repository deve mostrare
`index.html` in cima alla lista, non una cartella `app-android`.

**"Accesso a Google non concesso"**
Manca il passaggio 5, oppure hai scritto l'URI con la barra finale o col percorso.
Deve essere esattamente `https://TUONOME.github.io`.

**L'app non si installa**
Serve Chrome e connessione HTTPS (GitHub Pages la dà). Su iPhone si usa Safari →
Condividi → Aggiungi a Home, ma alcune funzioni (fotocamera in app) sono più limitate.

**Il repository è pubblico: i miei dati sono visibili?**
No. Pubblico è solo il *programma*. I tuoi dati (piante, conferimenti, foto) stanno
sul telefono e sul tuo Google Drive privato, mai su GitHub.
