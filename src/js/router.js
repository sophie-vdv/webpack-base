/*
 * This file controls the routing.
 * Since, for now, this is only a static website advanced routing (ie. miguelribeiro.me/about) will not work
 * For now it handles the navigation on this web page.
 * 
 */

import {
    addMarginToMainMenu,
    removeMarginToMainMenu,
    initAboutMenuFunctionality,
    addButtonsFunctionality,
    initContentContainer,
    loadPageContent,
    containerFadeOut,
    containerFadeIn,
    loadContentSequence,
    loadCompanyProjs,
    loadNewImage
} from './effects.js';

let $body = $('body');

class Router {
    constructor() {
        this.url = this.getCurrentUrl();

        this.init();
        $body
            .on('click', '.js-menu-option', this.handleNavClick)
            .on('click', '.js-company-logo', this.handleCompanyClick)
            .on('click', '.js-company-project-block-area', this.handleProjClick)
            .on('click', '.js-image-arrow', this.handleArrowClick);
    }

    init() {
        console.log('Router initiating');
    }

    getCurrentUrl() {
        return window.location.pathname;
    }

    handleNavClick() {
        const id = $(this).attr('id');

        let menuState = $body.attr('data-menu-in-view');
        let $contentArea;
        let nameClicked = false;

        if (menuState === 'first') {
            if (id === 'about') {
                initContentContainer('about')
                .then(() => {
                    initAboutMenuFunctionality();
                })
                .then(() => {
                    addButtonsFunctionality();
                    addMarginToMainMenu();
                });
            } else {
                initContentContainer('second', '.js-content-section')
                .then(() => {
                    addMarginToMainMenu();
                    loadPageContent(id);
                });
            }
        } else if (menuState === 'second') {
            switch(id) {
                case 'name':
                    nameClicked = true;
                    $body.attr('data-menu-in-view', 'first');
                    removeMarginToMainMenu();
                    break;
                case 'about':
                    initContentContainer('about')
                    .then(() => {
                        initAboutMenuFunctionality();
                    })
                    .then(() => {
                        addButtonsFunctionality();
                    });
                    break;
                case 'projs':
                    loadContentSequence('projs');
                    break;
                case 'contacts':
                    loadContentSequence('contacts');
                    break;
                default:
                    console.log('Button with unrecognized id.');
            }
        }
    }

    handleCompanyClick() {
        const companyID = $(this).attr('data-company-id');

        containerFadeOut('js-content-section')
        .then(() => {
            loadPageContent('companyProjs', companyID);
        })
        .then(() => {
            containerFadeIn('js-content-section')
        });
    }

    handleProjClick() {
        const projectID = $(this).attr('data-project-id');

        containerFadeOut('js-content-section')
        .then(() => {
            loadPageContent('projDetails', projectID);
        })
        .then(() => {
            containerFadeIn('js-content-section')
        });
    }

    handleArrowClick() {
        let newImage;
        let newImageNumber;
        
        const imageName = $(this).parent().attr('data-image-name');
        const imageNumber = $(this).parent().attr('data-image-number');
        const imageLength = $(this).parent().attr('data-image-count');
        
        if (imageName !== 'no-results') {
            if ($(this).hasClass('leftArrow')) {
                if (parseInt(imageNumber, 10) === 0 ) {
                    newImageNumber = parseInt(imageLength, 10) - 1;
                } else {
                    newImageNumber = parseInt(imageNumber, 10) - 1;
                }
            } else if ($(this).hasClass('rightArrow')) {
                if (parseInt(imageNumber, 10) === (parseInt(imageLength, 10) - 1) ) {
                    newImageNumber = 0;
                } else {
                    newImageNumber = parseInt(imageNumber, 10) + 1;
                }
            }
    
            newImage = '/src/img/' + imageName + newImageNumber + '.png';
            loadNewImage(newImageNumber, newImage, $(this).parent());
        }
    }
}

export default Router;
