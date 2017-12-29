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

const projsContainer = `<div class="projsContainer js-projs-container"></div>`;

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

function addProjsContainer() {
    let $container = $body.find('.js-content-section');

    return new Promise((resolve, reject) => {
        $container.html(projsContainer);
        resolve();
    });
}

function cleanSection(section) {
    let $container = $body.find('.' + section);

    return new Promise((resolve, reject) => {
        $container.empty();
        resolve();
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
                            <p class="text-italic m-lr-12 js-quote-container"></p>
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
    },
    loadProjsContent: function () {
        let $container = $body.find('.js-content-section');

        addProjsContainer()
        .then(() => {
            $.getJSON('../json/projects.json', function (data) {
                let $projsContainer = $container.find('.js-projs-container');
                let html = ``;
                let companyWrapper = ``;
                let companyID;

                $.each(data, function( key, val ) {
                    companyID = $(this)[0].companyID;

                    if ($(this)[0].companyID === 'comp_personal') {
                        companyWrapper = `
                            <div class="companyLogo companyOnlyText cursor-pointer no-select-text js-company-logo"
                                 data-company-id="${companyID}">
                                <span class="text-center">Personal Projects</span>
                            </div>
                        `;
                    } else {
                        companyWrapper = `
                            <div class="companyLogo companyLogoImage companyLogo--${companyID} cursor-pointer no-select-text js-company-logo"
                                 data-company-id="${companyID}">
                            </div>
                        `;
                    }

                    html = html + companyWrapper;
                });

                $projsContainer.html(html);
            });
        });
    },
    loadCompanyContent: function(companyID) {
        console.log(companyID);
        cleanSection('js-content-section');
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