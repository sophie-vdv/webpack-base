/*
 * This file controls the routing.
 * Since, for now, this is only a static website advanced routing (ie. miguelribeiro.me/about) will not work
 * For now it handles the navigation on this web page.
 * 
 */

import {addMarginToMainMenu} from './effects.js';

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

        if (menuState) {
            addMarginToMainMenu();
        }
    }
}

export default Router;
