const synth = window.speechSynthesis;
console.log(synth)
console.log(this)

// DOM Elements
const form = document.querySelector('form');
const text = document.getElementById('text');
const accent = document.getElementById('accent');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const rateValue = document.getElementById('rate-value');
const pitchValue = document.getElementById('pitch-value');

const body = document.querySelector('body');


// Init voices array
let voices = [];


const getVoices = () => {
    voices = synth.getVoices();

    voices.forEach( voice => {
        accent.innerHTML += `<option data-lang="${voice.lang}" data-name="${voice.name}">${voice.name} (${voice.lang})</option>`;
    } );
}

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

const speak = () => {
    if (synth.speaking) {
        console.error('Already speaking...')
        return;
    }
    if (text.value !== '') {
        // Add background animation
        body.style.background = 'url("img/wave.gif") #141414';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        // create new speakText
        const speakText = new SpeechSynthesisUtterance(text.value);

        // Logging
        speakText.onend = e => { 
            console.log('Done speaking...');

            body.style.background = '#141414';
         }
        speakText.onerror = e => console.log('Something went wrong');

        // Get selected voice name
        const selectedVoice = accent.selectedOptions[0].getAttribute('data-name');

        // Set voice
        voices.forEach( voice => {
            if (voice.name === selectedVoice)
                speakText.voice = voice;
        } );

        // Set rate & pitch
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    speak();
})

rate.addEventListener('change', e => rateValue.innerText = e.target.value);
pitch.addEventListener('change', e => pitchValue.innerText = e.target.value);
accent.addEventListener('change', speak);