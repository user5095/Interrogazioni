// this extension function is used to select a random element from an array
Array.prototype.choose = function () {
    return this[Math.floor(Math.random() * this.length)];
};

const namesTextArea = document.querySelector('#names');
const saveButton = document.querySelector('#save');
const loadButton = document.querySelector('#load');
const form = document.querySelector('form');
const result = document.querySelector('#result');

// initialize the result container with placeholder text
result.textContent = 'Il risultato apparirà qui';

const getNames = () =>
    namesTextArea.value
        .split('\n') // split by new line
        .map((name) => name.trim()) // trim whitespace from each name
        .filter((name) => name.length > 0); // filter out empty names

saveButton.addEventListener('click', () => {
    localStorage.setItem('names', JSON.stringify(getNames()));
});

loadButton.addEventListener('click', () => {
    const names = JSON.parse(localStorage.getItem('names'));

    if (names) namesTextArea.value = names.join('\n');
    else alert('Non ci sono nomi salvati al momento.');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const names = getNames();

    // remove selected class if it exists
    result.classList.remove('selected');

    // pick the final result but don't show it yet
    const selectedName = names.choose();
    let counter = 0;

    // start shuffling animation
    const shuffleInterval = setInterval(() => {
        // display a random name from the list every 100ms
        result.textContent = names.choose();
        counter += 100;

        if (counter < 750) return;

        // after 750ms, stop and show the final result
        clearInterval(shuffleInterval);
        result.textContent = selectedName;
        result.classList.add('selected');
    }, 100);
});
// Variabili globali per gestire i nomi estratti
let extractedNames = [];

// Modifica la funzione getNames per filtrare i nomi già estratti
const filterExtractedNames = () => {
    return getNames().filter((name) => !extractedNames.includes(name));
};

// Aggiorna la funzione di estrazione
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const names = filterExtractedNames();

    if (names.length === 0) {
        alert("Tutti i nomi sono stati estratti! Ricomincio il ciclo.");
        extractedNames = []; // Resetta i nomi estratti
        return;
    }

    // Rimuovi la classe selezionata se esiste
    result.classList.remove('selected');

    // Scegli il nome finale ma non mostrarlo subito
    const selectedName = names.choose();
    extractedNames.push(selectedName); // Aggiungi il nome alla lista dei nomi estratti
    let counter = 0;

    // Avvia l'animazione di mescolamento
    const shuffleInterval = setInterval(() => {
        // Mostra un nome casuale dalla lista ogni 100ms
        result.textContent = names.choose();
        counter += 100;

        if (counter < 750) return;

        // Dopo 750ms, ferma l'animazione e mostra il risultato finale
        clearInterval(shuffleInterval);
        result.textContent = selectedName;
        result.classList.add('selected');
    }, 100);
});
