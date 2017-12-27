let $body = $('body');
let $container = $body.find('.js-content-area');

const escButton = `
    <div id="escButtonContainer" class="aboutButton buttonHover no-select-text cursor-pointer js-close-about-area">
        ESC
    </div>
`;

const arrowsContainer = `
    <div id="arrowsButtonsContainer">
        <div id="leftButtonArrow" class="aboutButton buttonHover no-select-text cursor-pointer js-about-left-arrow">&#9665;</div>
        <div id="rightButtonArrow" class="aboutButton buttonHover no-select-text cursor-pointer js-about-right-arrow">&#9655;</div>
    </div>
`;

function getProgrammerQuote() {
    let quote;
    let $quoteContainer = $body.find('.js-quote-container');

    $.ajax({
        url: 'http://cors-proxy.htmldriven.com/?url=http://thoughtsoncoding.com/api/1.0/random.json',
        error: function () {
            quote = 'Insert cheeky quote here.';
            $quoteContainer.html(quote);
        },
        success: function (data) {
            quote = JSON.parse(data.body).quote;
            $quoteContainer.html(quote);
        }
    });
}

module.exports = {
    addAboutButton: function (buttonContent = '', classPositioning = '') {
        $container.append(escButton);
    },
    addArrowsContainer: function (buttonContent = '', classPositioning = '') {
        $container.append(arrowsContainer);
    },
    loadContactsContent: function () {
        return new Promise((resolve, reject) => {
            const html = `
                <div id="contactContainer">
                    <ul id="contactsListContainer">
                        <li class="contactsListItem">
                            For more information you can contact me using:
                        </li>
                        <li class="contactsListItem">
                            <a href="mailto:miguel.rib.20@gmail.com" class="contactsListItem--myEmail" target="_top">My Email</a>
                        </li>
                        <li class="contactsListItem">
                            <a href="https://www.linkedin.com/in/miguel-ribeiro-7bb32a110/" target="_blank">
                                <i class="Icon Icon--linkedin"></i>
                            </a>
                        </li>
                        <li class="contactsListItem">
                            <a href="https://github.com/Comum/" target="_blank">
                                <i class="Icon Icon--github"></i>
                            </a>
                        </li>
                        <li class="contactsListItem">
                            <p class="text-italic js-quote-container"></p>
                        </li>
                    </ul>
                </div>
            `;

            $body.find('.js-content-section').html(html);
            resolve();
        })
        .then(() => {
            getProgrammerQuote();
        });
    }
}

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