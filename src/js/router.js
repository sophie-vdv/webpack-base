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
    containerFadeIn
} from './effects.js';

let $body = $('body');

class Router {
    constructor() {
        this.url = this.getCurrentUrl();

        this.init();
        $body.on('click', '.js-menu-option', this.handleNavClick);
    }

    init() {
        console.log('Router initiating');
    }

    getCurrentUrl() {
        return window.location.pathname;
    }

    handleNavClick() {
        let menuState = $body.attr('data-menu-in-view');
        let id = $(this).attr('id');
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
                    if (id === 'contacts') {
                        loadPageContent('contacts');
                    } else if (id === 'projs') {
                        console.log('load projs info')
                    }
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
                    initContentContainer('second', '.js-content-section')
                    .then(() => {
                        console.log('load projs info')
                    });
                    break;
                case 'contacts':
                    containerFadeOut('js-content-section')
                    .then(() => {
                        initContentContainer('second', '.js-content-section');
                    })
                    .then(() => {
                        loadPageContent('contacts');
                    })
                    .then(() => {
                        containerFadeIn('js-content-section');
                    });
                    break;
                default:
                    console.log('Button with unrecognized id.');
            }
        }
    }
}

export default Router;
