# Collegare il gestionale al tuo Google Drive

Serve una volta sola. Alla fine mi mandi una riga di testo (il **Client ID**) e io attivo
dentro l'app: accesso con Google, cartella **SuperEtnaFood** su Drive, salvataggio
automatico di mappa, schede piante, rilievi e foto, e ripristino con un tocco.

Tutto gratuito. Tempo: 15–20 minuti la prima volta.

---

## Passo 0 — Pubblica l'app e annota l'indirizzo

Google accetta il collegamento solo da un indirizzo `https`, quindi l'app va prima online
(vedi `LEGGIMI-INSTALLAZIONE.md`: Netlify Drop).

Annota l'indirizzo esatto, per esempio:

    https://superetnafood.netlify.app

Serve nei passi 5 e 6. **Senza la barra finale.**

---

## Passo 1 — Crea il progetto Google

1. Apri `https://console.cloud.google.com` e accedi col tuo account Google (lo stesso del
   Drive dove vuoi i backup).
2. In alto, accanto al logo, clicca il **selettore di progetto** → **NUOVO PROGETTO**.
3. Nome progetto: `SuperEtnaFood`. Lascia il resto come sta → **CREA**.
4. Attendi qualche secondo e assicurati che in alto sia selezionato **SuperEtnaFood**.

---

## Passo 2 — Attiva l'accesso a Drive

1. Nella barra di ricerca in alto scrivi `Google Drive API` e aprila.
2. Premi **ABILITA**.

---

## Passo 3 — Schermata di consenso

1. Menu (☰) → **API e servizi** → **Schermata consenso OAuth**.
2. Tipo di utente: **Esterno** → **CREA**.
3. Compila solo i campi obbligatori:
   - Nome dell'app: `SuperEtnaFood Gestionale`
   - Email di supporto utenti: la tua email
   - Email di contatto sviluppatore (in fondo): la tua email
4. **SALVA E CONTINUA**.

---

## Passo 4 — Ambito (cosa può toccare l'app)

1. Nella pagina **Ambiti** premi **AGGIUNGI O RIMUOVI AMBITI**.
2. Nel filtro cerca `drive.file` e spunta la voce:

       .../auth/drive.file

   Significa: l'app vede **solo i file che crea lei**. Il resto del tuo Drive resta
   invisibile all'app. Non aggiungere altri ambiti.
3. **AGGIORNA** → **SALVA E CONTINUA**.

---

## Passo 5 — Utenti di test

1. Nella pagina **Utenti di test** premi **+ ADD USERS** e inserisci la **tua email**
   (e quella di chi altro userà l'app, fino a 100).
2. **SALVA E CONTINUA** → **TORNA ALLA DASHBOARD**.

L'app resta in stato **Test**: funziona perfettamente per te e per gli utenti che hai
aggiunto, senza nessuna verifica Google. Ogni tanto (circa una settimana) Google chiede di
riautorizzare: è un tocco.

---

## Passo 6 — Crea il Client ID

1. Menu (☰) → **API e servizi** → **Credenziali**.
2. **+ CREA CREDENZIALI** → **ID client OAuth**.
3. Tipo di applicazione: **Applicazione web**.
4. Nome: `Gestionale web`.
5. In **Origini JavaScript autorizzate** premi **+ AGGIUNGI URI** e incolla l'indirizzo del
   Passo 0, esattamente così, senza barra finale:

       https://superetnafood.netlify.app

   Se vuoi provare anche dal computer in locale, aggiungi come seconda origine:

       http://localhost:8000

6. **URI di reindirizzamento**: lascialo **vuoto** (non serve).
7. **CREA**.

Google mostra una finestra con **ID client**, una stringa lunga che finisce con
`.apps.googleusercontent.com`. Copiala (c'è l'icona di copia).

---

## Passo 7 — Mandamela

Scrivimi in chat una riga così:

    Client ID: 1234567890-abcdefghijklmnop.apps.googleusercontent.com
    Indirizzo app: https://superetnafood.netlify.app

Da lì attivo io il resto: pulsante **Collega Google Drive**, cartella **SuperEtnaFood**
creata automaticamente, backup a ogni modifica (mappa, schede, rilievi, foto) e
**Ripristina dal Drive** sull'altro dispositivo.

---

## Note utili

- Il Client ID **non è una password**: si può incollare nell'app senza rischi. Se ti viene
  mostrato anche un *client secret*, **non serve** e non va condiviso.
- Se in futuro cambi indirizzo dell'app (nuovo dominio Netlify), torna al Passo 6 e aggiungi
  la nuova origine, altrimenti Google blocca l'accesso.
- I dati continuano a stare anche sul telefono: Drive è la copia di sicurezza e il ponte fra
  i dispositivi, non l'unico posto dove vivono.
- Nel frattempo funziona già **Salva su Drive** dalla scheda Mappa piante: apre il menu di
  condivisione di Android e salvi il file (foto incluse) nella cartella che vuoi.
