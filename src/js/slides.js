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
    <div class="slideOneContainer js-slide-container">Placeholder text</div>
`;

module.exports = {
    loadSlideZero: function () {
        $container.append(slideZero);
    },
    loadSlideOne: function () {
        $container.append(slideOne);
    }
};