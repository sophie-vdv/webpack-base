/*
 * This file controls the routing.
 * Since, for now, this is only a static website, advanced routing (ie. miguelribeiro.me/about) will not work
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
    loadContentSequence,
    loadCompanyProjs,
    loadNewImage
} from './effects.js';
import { containerFadeOut, containerFadeIn } from './fades'; 

let $body = $('body');

const HOOK_CONTENT_AREA = 'js-content-area';
const HOOK_CONTENT_SECTION = 'js-content-section';
const HOOK_CONTENT_SECTION_CLASS = '.' + HOOK_CONTENT_SECTION;
const HOOK_MENU_OPTION = '.js-menu-option';
const HOOK_COMPANY_LOGO = '.js-company-logo';
const HOOK_COMPANY_PROJECT_BLOCK_AREA = '.js-company-project-block-area';
const HOOK_IMAGE_ARROW = '.js-image-arrow';

const DATA_MENU_IN_VIEW = 'data-menu-in-view';
const DATA_COMPANY_ID = 'data-company-id';
const DATA_PROJECT_ID = 'data-project-id';
const DATA_IMAGE_NAME = 'data-image-name';
const DATA_IMAGE_NUMBER = 'data-image-number';
const DATA_IMAGE_COUNT = 'data-image-count';

class Router {
    constructor() {
        this.url = this.getCurrentUrl();

        this.init();
        $body
            .on('click', HOOK_MENU_OPTION, this.handleNavClick)
            .on('click', HOOK_COMPANY_LOGO, this.handleCompanyClick)
            .on('click', HOOK_COMPANY_PROJECT_BLOCK_AREA, this.handleProjClick)
            .on('click', HOOK_IMAGE_ARROW, this.handleArrowClick);
    }

    init() {
        console.log('Router initiating');
    }

    getCurrentUrl() {
        return window.location.pathname;
    }

    handleNavClick() {
        const id = $(this).attr('id');

        let menuState = $body.attr(DATA_MENU_IN_VIEW);
        let $contentArea;
        let nameClicked = false;

        if (menuState === 'first') {
            if (id === 'about') {
                return initContentContainer('about')
                .then(() => {
                    return initAboutMenuFunctionality();
                })
                .then(() => {
                    addButtonsFunctionality();
                    addMarginToMainMenu();
                });
            } else {
                initContentContainer('second', HOOK_CONTENT_SECTION_CLASS)
                .then(() => {
                    addMarginToMainMenu();
                    return loadPageContent(id);
                });
            }
        } else if (menuState === 'second') {
            switch(id) {
                case 'name':
                    nameClicked = true;
                    $body.attr(DATA_MENU_IN_VIEW, 'first');
                    removeMarginToMainMenu();
                    break;
                case 'about':
                    return containerFadeOut(HOOK_CONTENT_AREA)
                    .then(() => {
                        return initContentContainer('about');
                    })
                    .then(() => {
                        return initAboutMenuFunctionality();
                    })
                    .then(() => {
                        addButtonsFunctionality();
                    })
                    .then(() => {
                        return containerFadeIn(HOOK_CONTENT_AREA);
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
        const companyID = $(this).attr(DATA_COMPANY_ID);

        return containerFadeOut(HOOK_CONTENT_SECTION)
        .then(() => {
            return loadPageContent('companyProjs', companyID);
        })
        .then(() => {
            return containerFadeIn(HOOK_CONTENT_SECTION);
        });
    }

    handleProjClick() {
        const projectID = $(this).attr(DATA_PROJECT_ID);

        return containerFadeOut(HOOK_CONTENT_SECTION)
        .then(() => {
            return loadPageContent('projDetails', projectID);
        })
        .then(() => {
            return containerFadeIn(HOOK_CONTENT_SECTION);
        });
    }

    handleArrowClick() {
        let newImage;
        let newImageNumber;
        
        const imageName = $(this).parent().attr(DATA_IMAGE_NAME);
        const imageNumber = $(this).parent().attr(DATA_IMAGE_NUMBER);
        const imageLength = $(this).parent().attr(DATA_IMAGE_COUNT);
        
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
