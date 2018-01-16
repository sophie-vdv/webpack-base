import {
    containerFadeIn
} from './effects.js';

let $body = $('body');
let $container = $body.find('.js-content-area');
let interval;

const slideZero = `
    <div class="slideZeroContainer js-slide-container">
        <ul class="instructionsArea cursor-default no-select-text">
            <li>Press the arrow keys to move through the slides.</li>
            <li>Or press the buttons on the right bottom corner to move through the slides.</li>
            <li>Press the ESC key to reset the page.</li>
            <li>Or press the button on the left top corner to reset the page.</li>
        </ul>
    </div>
`;

const slideOne = `
    <div class="slideOneContainer js-slide-container">
        <div class="textLine js-text-line">
            <div class="textLineContent js-text-container" data-text-line="0"></div>
        </div>
        <div class="textLine js-text-line">
            <div class="textLineContent js-text-container" data-text-line="1"></div>
        </div>
        <div class="textLine js-text-line">
            <div class="textLineContent js-text-container" data-text-line="2"></div>
        </div>
        <div class="textLine js-text-line">
            <div class="textLineContent js-text-container" data-text-line="3"></div>
        </div>
        <div class="textLine js-text-line">
            <div class="textLineContent js-text-container" data-text-line="4"></div>
        </div>
    </div>
`;

const slideTwo = `
    <div class="slideTwoContainer js-slide-container">
        <div class="slideTwoContentContainer opacity-0 logoFeup js-image-container">
            <a href="https://www.fe.up.pt" target="_blank" class="display-block height-200"></a>
        </div>
        <div class="slideTwoContentContainer js-text-container"></div>
    </div>
`;

function loadSlide(slide) {
    return new Promise((resolve, reject) => {
        $container.append(slide);
        resolve();
    });
}

function insertText(text, $container, delay) {
    return new Promise((resolve, reject) => {
        let chars = text.split('');
        let i = 0;
        let wordsLeft = chars.length;

        interval = setInterval(function () {
            if(i < chars.length) {
                $container.text($container.text() + chars[i++]);
                wordsLeft--;
                if (wordsLeft === 0) {
                    resolve();
                }
            }
        }, delay);
    });
}

function loadSlideOneText(text) {
    let $lines = $container.find('.js-text-container');
    let i = 0;

    return insertText(text[i], $($lines[i]), 50)
    .then(() => {
        clearInterval(interval);
        i++;
        return insertText(text[i], $($lines[i]), 50)
    })
    .then(() => {
        clearInterval(interval);
        i++;
        return insertText(text[i], $($lines[i]), 50)
    })
    .then(() => {
        clearInterval(interval);
        i++;
        return insertText(text[i], $($lines[i]), 50)
    })
    .then(() => {
        clearInterval(interval);
        i++;
        return insertText(text[i], $($lines[i]), 50)
    });
}

function getMyAge() {
    let date = new Date();
    let age;

    if (date.getMonth() >= 4 && date.getDate() >= 23) {
        age = date.getFullYear() - 1990;
    } else {
        age = date.getFullYear() - 1990 - 1;
    }

    return age;
}

function slideOneSequence() {
    return loadSlide(slideOne)
    .then(() => {
        let age = getMyAge();
        let textToLoad;

        textToLoad = [
            'Hello,',
            'My name is Miguel and my objective in life is to be happy.',
            'I\'m a ' + age + ' year old web developer based in London.',
            'And this is my story.',
            'Spoilers: it will be boring and short.'
        ];

        loadSlideOneText(textToLoad);
    });
}

function slideTwoSequence() {
    return loadSlide(slideTwo)
    .then(() => {
        $('.js-image-container').fadeTo('slow', 1);
        // return containerFadeIn('js-image-container');
    });
}

module.exports = {
    loadSlideZero: function () {
        loadSlide(slideZero);
    },
    loadSlideOne: function () {
        slideOneSequence();
    },
    loadSlideTwo: function () {
        slideTwoSequence();
    }
};