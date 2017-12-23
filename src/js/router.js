/*
 * This file controls the routing.
 * Since, for now, this is only a static website advanced routing (ie. miguelribeiro.me/about) will not work
 * For now it handles the navigation on this web page.
 * 
 */

import {addMarginToMainMenu, removeMarginToMainMenu, initAboutMenuFunctionality, addButtonsFunctionality} from './effects.js';

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
                $contentArea = $body.find('.js-content-area').empty();
                $body.attr('data-menu-in-view', 'about');

                initAboutMenuFunctionality()
                .then(() => {
                    addButtonsFunctionality();
                    addMarginToMainMenu();
                    // add effects to buttons
                });
            } else {
                $body.attr('data-menu-in-view', 'second');
                addMarginToMainMenu();
            }
        } else if (menuState === 'second') {
            if (id === 'name') {
                nameClicked = true;
            }

            $body.attr('data-menu-in-view', 'first');
            removeMarginToMainMenu(nameClicked);
        }
    }
}

export default Router;
