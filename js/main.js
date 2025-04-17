// Estensione per selezionare un elemento casuale da un array
Array.prototype.choose = function () {
    return this[Math.floor(Math.random() * this.length)];
};

const namesTextArea = document.querySelector('#names');
const saveButton = document.querySelector('#save');
const loadButton = document.querySelector('#load');
const form = document.querySelector('form');
const result = document.querySelector('#result');

// Inizializza il contenitore del risultato con un testo segnaposto
result.textContent = 'Il risultato apparirà qui';

// Funzione per ottenere i nomi dall'area di testo
const getNames = () =>
    namesTextArea.value
        .split('\n') // Divide per ogni nuova riga
        .map((name) => name.trim()) // Rimuove spazi bianchi
        .filter((name) => name.length > 0); // Filtra nomi vuoti

// Salva i nomi nell'area di testo in localStorage
saveButton.addEventListener('click', () => {
    localStorage.setItem('names', JSON.stringify(getNames()));
});

// Carica i nomi salvati da localStorage nell'area di testo
loadButton.addEventListener('click', () => {
    const names = JSON.parse(localStorage.getItem('names'));

    if (names) namesTextArea.value = names.join('\n');
    else alert('Non ci sono nomi salvati al momento.');
});

// Recupera i nomi già estratti da localStorage
const getExtractedNames = () => {
    const extractedNames = localStorage.getItem('extractedNames');
    return extractedNames ? JSON.parse(extractedNames) : [];
};

// Salva l'elenco dei nomi estratti in localStorage
const saveExtractedNames = (names) => {
    localStorage.setItem('extractedNames', JSON.stringify(names));
};

// Filtra i nomi per escludere quelli già estratti
const filterExtractedNames = (names) => {
    const extractedNames = getExtractedNames();
    return names.filter((name) => !extractedNames.includes(name));
};

// Gestisce l'estrazione dei nomi
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Ottieni i nomi dall'area di testo
    let names = getNames();

    // Filtra i nomi già estratti
    names = filterExtractedNames(names);

    // Controlla se ci sono nomi disponibili
    if (names.length === 0) {
        alert('Tutti i nomi sono già stati estratti!');
        return;
    }

    // Rimuove la classe selezionata se esiste
    result.classList.remove('selected');

    // Seleziona un nome casuale
    const selectedName = names.choose();
    let counter = 0;

    // Avvia l'animazione di mescolamento
    const shuffleInterval = setInterval(() => {
        // Mostra un nome casuale ogni 100ms
        result.textContent = names.choose();
        counter += 100;

        if (counter < 750) return;

        // Dopo 750ms, ferma l'animazione e mostra il risultato finale
        clearInterval(shuffleInterval);
        result.textContent = selectedName;
        result.classList.add('selected');

        // Salva il nome selezionato nell'elenco dei nomi estratti
        const extractedNames = getExtractedNames();
        extractedNames.push(selectedName);
        saveExtractedNames(extractedNames);
    }, 100);
});