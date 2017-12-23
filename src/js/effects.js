import {addAboutButton, addArrowsContainer} from './hbsInjector.js';

let $body = $('body');
let $secondMenuContainer = $body.find('.js-content-area');

function resetWebPage() {
    location.reload();
}

module.exports = {
    addMarginToMainMenu: function () {
        let $mainContainer = $body.find('.js-main-menu');

        $mainContainer.animate({
            'margin-top': '-' + $mainContainer.height() + 'px'
        }, 1250, function () {
            module.exports.containerFadeIn('js-content-area');
        });
    },
    removeMarginToMainMenu: function (nameClicked = false) {
        let $mainContainer = $body.find('.js-main-menu');
        
        module.exports.containerFadeOut('js-content-area');

        if(nameClicked) {
          $mainContainer.animate({
            'margin-top': '0px'
          }, 1250);
        }
    },
    containerFadeIn: function (container) {
        $body.find('.' + container).fadeTo('slow', 1);
    },
    containerFadeOut: function (container) {
        $body.find('.' + container).fadeTo('slow', 0);
    },
    initAboutMenuFunctionality: function () {
        return new Promise((resolve, reject) => {
            addAboutButton();
            addArrowsContainer();

            resolve();
        });
    },
    addButtonsFunctionality: function () {
        $secondMenuContainer.on('click', '.js-close-about-area', resetWebPage);
    }
}