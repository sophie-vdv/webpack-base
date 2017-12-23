let $body = $('body');
let $container = $body.find('.js-content-area');

const escButton = `
    <div id="escButtonContainer" class="aboutButton buttonHover no-select-text cursor-pointer js-close-about-area">
        ESC
    </div>
`;

const arrowsContainer = `
    <div id="arrowsButtonsContainer">
        <div id="leftButtonArrow" class="aboutButton js-about-left-arrow buttonHover no-select-text cursor-pointer">&#9665;</div>
        <div id="rightButtonArrow" class="aboutButton js-about-right-arrow buttonHover no-select-text cursor-pointer">&#9655;</div>
    </div>
`;

/*
 * Template example
 * const beer = {
    name: 'Belgian Wit',
    brewery: `Steam Whistle Brewery`,
    keywords: ['pale', 'cloudy', 'spiced', 'crisp']
};

function renderKeywords(keywords) {
    return `
    <ul>
        ${keywords.map(keyword => `<li>${keyword}</li>`)}
    </ul>
    `;
}

const markup = `
<div class="beer">
    <h2>${beer.name}</h2>
    <p class="brewery">${beer.brewery}</p>
    ${renderKeywords(beer.keywords).join('')}
</div>
`;

document.body.innerHTML = markup;
 *
 */


module.exports = {
    addAboutButton: function (buttonContent = '', classPositioning = '') {
        $container.append(escButton);
    },
    addArrowsContainer: function (buttonContent = '', classPositioning = '') {
        $container.append(arrowsContainer);
    }
}