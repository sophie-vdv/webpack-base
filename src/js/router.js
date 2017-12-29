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
    loadCompanyProjs
} from './effects.js';

let $body = $('body');

class Router {
    constructor() {
        this.url = this.getCurrentUrl();

        this.init();
        $body
            .on('click', '.js-menu-option', this.handleNavClick)
            .on('click', '.js-company-logo', this.handleProjClick);
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

    handleProjClick() {
        let companyID = $(this).attr('data-company-id');

        containerFadeOut('js-content-section')
        .then(() => {
            loadPageContent('companyProjs', companyID);
        })
        .then(() => {
            containerFadeIn('js-content-section')
        });
    }
}

export default Router;
