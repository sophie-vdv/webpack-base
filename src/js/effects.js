import {addAboutButton, addArrowsContainer} from './hbsInjector.js';

let $body = $('body');
let $secondMenuContainer = $body.find('.js-content-area');

function resetWebPage() {
    location.reload();
}

function getBodyViewMode() {
    return $body.attr('data-menu-in-view');
}

function incrementPageNumber() {
    let pageNumber = parseInt($secondMenuContainer.attr('data-page-number'), 10) + 1;
    
    $secondMenuContainer.attr('data-page-number', pageNumber);
}

function decrementPageNumber() {
    let pageNumber = $secondMenuContainer.attr('data-page-number');

    if (pageNumber > 0) {
        pageNumber--;
        $secondMenuContainer.attr('data-page-number', pageNumber);
    }
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
    removeMarginToMainMenu: function () {
        let $mainContainer = $body.find('.js-main-menu');
        
        module.exports.containerFadeOut('js-content-area')
        .then(() => {
            $mainContainer.animate({
                'margin-top': '0px'
            }, 1250);
        })
    },
    containerFadeIn: function (container) {
        return new Promise((resolve, reject) => {
            $body.find('.' + container).fadeTo('slow', 1);
        });
    },
    containerFadeOut: function (container) {
        return new Promise((resolve, reject) => {
            $body.find('.' + container).fadeTo('slow', 0);
            resolve();
        });
    },
    initAboutMenuFunctionality: function () {
        return new Promise((resolve, reject) => {
            addAboutButton();
            addArrowsContainer();

            resolve();
        });
    },
    addButtonsFunctionality: function () {
        $secondMenuContainer
            .on('click', '.js-close-about-area', resetWebPage)
            .on('click', '.js-about-left-arrow', decrementPageNumber)
            .on('click', '.js-about-right-arrow', incrementPageNumber);

        $(document).keydown(function(e) {
            if (getBodyViewMode() === 'about') {
                if(e.keyCode === 27) {
                    $secondMenuContainer.find('.js-close-about-area').addClass('buttonBeingPressed');
                } else if (e.keyCode === 37) {
                    $secondMenuContainer.find('.js-about-left-arrow').addClass('buttonBeingPressed');
                    decrementPageNumber();
                } else if (e.keyCode === 39) {
                    $secondMenuContainer.find('.js-about-right-arrow').addClass('buttonBeingPressed');
                    incrementPageNumber();
                }
            }
        });

        $(document).keyup(function(e) {
            if (getBodyViewMode() === 'about') {
                if(e.keyCode === 27) {
                    $secondMenuContainer.find('.js-close-about-area').removeClass('buttonBeingPressed');
                    resetWebPage();
                } else if (e.keyCode === 37) {
                    $secondMenuContainer.find('.js-about-left-arrow').removeClass('buttonBeingPressed');
                } else if (e.keyCode === 39) {
                    $secondMenuContainer.find('.js-about-right-arrow').removeClass('buttonBeingPressed');
                }
            }
        });
    },
    initContentContainer(menuView, areaToEmpty = '.js-content-area') {
        return new Promise((resolve, reject) => {
            $secondMenuContainer = $body.find(areaToEmpty).empty();
            $body.attr('data-menu-in-view', menuView);

            resolve();
        });
    }
}