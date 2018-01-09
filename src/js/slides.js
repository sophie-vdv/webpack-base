let $body = $('body');
let $container = $body.find('.js-content-area');

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
            <div class="textLineContent js-text-container"></div>
            <div class="dashBlinker float-left js-dash-blinker"></div>
        </div>
        <div class="textLine js-text-line" data-text-line="1">
            <div class="textLineContent js-text-container"></div>
        </div>
        <div class="textLine js-text-line" data-text-line="2">
            <div class="textLineContent js-text-container"></div>
        </div>
        <div class="textLine js-text-line" data-text-line="3">
            <div class="textLineContent js-text-container"></div>
        </div>
        <div class="textLine js-text-line" data-text-line="4">
            <div class="textLineContent js-text-container"></div>
        </div>
    </div>
`;

function loadSlide(slide) {
    return new Promise((resolve, reject) => {
        $container.append(slide);
        resolve();
    });
}

function moveBlinkerToNextLine() {
    let $blinker = $container.find('.js-dash-blinker');
    let blinkerContainerNumber = parseInt($blinker.parent().attr('data-text-line'), 10);
    let newBlinkerContainerNumber;

    if (blinkerContainerNumber < 4) {
        newBlinkerContainerNumber = blinkerContainerNumber + 1;
    }

    $blinker.appendTo($('.js-text-line[data-text-line=' + newBlinkerContainerNumber + ']'));
}

function insertText(text, $container, delay) {
    return new Promise((resolve, reject) => {
        let chars = text.split('');
        let i = 0;
        let wordsLeft = chars.length;

        setInterval(function () {
            if(i < chars.length) {
                $container.text($container.text() + chars[i++]);
                wordsLeft--;
                if (wordsLeft === 0) {
                    moveBlinkerToNextLine();
                    resolve();
                }
            }
        }, delay);
    });
}

function loadSlideOneText(text) {
    let $lines = $container.find('.js-text-container');
    let i = 0;

    /*$lines.each((index, line) => {
        let $textContainer = $(line).find('.js-text-container');

        insertText(text[index], $textContainer, 100);
    });*/

    return insertText(text[i], $($lines[i]), 100)
    .then(() => {
        i++;
        return insertText(text[i], $($lines[i]), 100)
    })
    .then(() => {
        i++;
        return insertText(text[i], $($lines[i]), 100)
    })
    .then(() => {
        i++;
        return insertText(text[i], $($lines[i]), 100)
    })
    .then(() => {
        i++;
        return insertText(text[i], $($lines[i]), 100)
    });
}

function slideOneSequence() {
    return loadSlide(slideOne)
    .then(() => {
        let year = (new Date()).getFullYear() - 1990;
        let textToLoad = [
            'Hello,',
            'My name is Miguel and my objective in life is to be happy.',
            'I\'m a ' + year + ' year old web developer based in London.',
            'And this is my story.',
            'Spoilers: it will be boring and short.'
        ];

        loadSlideOneText(textToLoad);
    });
}

module.exports = {
    loadSlideZero: function () {
        loadSlide(slideZero);
    },
    loadSlideOne: function () {
        slideOneSequence();
    }
};