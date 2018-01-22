import { containerFadeOut, containerFadeIn } from './fades'; 

let $body = $('body');
let $container = $body.find('.js-content-area');
let interval;
let intervalSecond;

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
        <div class="textLine js-text-line" data-text-line="0">
            <span class="textLineContent js-text-container"></span>
            <span class="dashBlinker text-bold js-dash-blinker">|</span>
        </div>
        <div class="textLine js-text-line" data-text-line="1">
            <span class="textLineContent js-text-container"></span>
        </div>
        <div class="textLine js-text-line" data-text-line="2">
            <span class="textLineContent js-text-container"></span>
        </div>
        <div class="textLine js-text-line" data-text-line="3">
            <span class="textLineContent js-text-container"></span>
        </div>
        <div class="textLine js-text-line" data-text-line="4">
            <span class="textLineContent js-text-container"></span>
        </div>
    </div>
`;

const slideTwo = `
    <div class="slideTwoContainer js-slide-container">
        <div class="slideTwoContentContainer opacity-0 logoFeup js-image-container">
            <a href="https://www.fe.up.pt" target="_blank" class="display-block height-200"></a>
        </div>
        <div class="slideTwoContentContainer text-color js-text-container"></div>
    </div>
`;

function moveBlinkerToNextLine() {
    let $blinker = $container.find('.js-dash-blinker');
    let blinkerContainerNumber = parseInt($blinker.parent().attr('data-text-line'), 10);
    let newBlinkerContainerNumber;
    console.log(blinkerContainerNumber);
    if (blinkerContainerNumber < 4) {
        newBlinkerContainerNumber = blinkerContainerNumber + 1;
    }
   
    $blinker.appendTo($('.js-text-line[data-text-line=' + newBlinkerContainerNumber + ']'));
}

function replaceTextWithAnchor($containerToUse, textToReplace, anchorPath) {
    let containerContent = $containerToUse.text().replace(textToReplace, '<a href="' + anchorPath + '" target="_blank" class="anchorDefaultStyle">' + textToReplace + '</a>');

    $containerToUse.empty().html(containerContent);
}

function loadSlide(slide) {
    return new Promise((resolve, reject) => {
        $container.append(slide);
        resolve();
    });
}

// use another variable as interval
function insertText(text, $container, delay, slide) {
    return new Promise((resolve, reject) => {
        let chars = text.split('');
        let i = 0;
        let wordsLeft = chars.length;

        // Work around to deal with race condition created by the promise chain in the first slide
        if (slide === 1) {
            interval = setInterval(function () {
                if(i < chars.length) {
                    $container.text($container.text() + chars[i++]);
                    wordsLeft--;
                    if (wordsLeft === 0) {
                        moveBlinkerToNextLine();
                        resolve();
                    }
                }
            }, delay);
        } else if (slide === 2) {
            intervalSecond = setInterval(function () {
                if(i < chars.length) {
                    $container.text($container.text() + chars[i++]);
                    wordsLeft--;
                    if (wordsLeft === 0) {
                        resolve();
                    }
                }
            }, delay);
        }
    });
}

function loadSlideOneText(text) {
    let $lines = $container.find('.js-text-container');
    let i = 0;

    return insertText(text[i], $($lines[i]), 50, 1)
    .then(() => {
        clearInterval(interval);
        i++;
        return insertText(text[i], $($lines[i]), 50, 1);
    })
    .then(() => {
        clearInterval(interval);
        i++;
        return insertText(text[i], $($lines[i]), 50, 1);
    })
    .then(() => {
        clearInterval(interval);
        i++;
        return insertText(text[i], $($lines[i]), 50, 1);
    })
    .then(() => {
        clearInterval(interval);
        i++;
        return insertText(text[i], $($lines[i]), 50, 1);
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
    let $containerToUse;

    return loadSlide(slideTwo)
    .then(() => {
        return containerFadeIn('js-image-container');
    })
    .then(() => {
        let textToShow = 'In 2014 I finished my Masters in Electrotecnical Engineering at Faculdade de Engenharia da Universidade do Porto. As soon as I finished I started my Web Developer career, as you do.';

        $containerToUse = $body.find('.js-text-container');
        return insertText(textToShow, $containerToUse, 50, 2);
    })
    .then(() => {
        clearInterval(intervalSecond);
        replaceTextWithAnchor($containerToUse, 'Faculdade de Engenharia da Universidade do Porto', 'https://sigarra.up.pt/feup/');
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