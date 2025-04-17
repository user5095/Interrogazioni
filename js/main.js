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
const getExtractedNames = () => {
    const extractedNames = localStorage.getItem('extractedNames');
    return extractedNames ? JSON.parse(extractedNames) : [];
}
const saveExtractedNames = (names) => {
    localStorage.setItem('extractedNames', JSON.stringify(names));  
}

const filterExtractedNames = (names) => {
    const extractedNames = getExtractedNames();
    return names.filter(name => !extractedNames.includes(name));
}
