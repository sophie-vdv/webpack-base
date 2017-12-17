let $body = $('body');

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
        
        module.exports.containerFadeOut('js-second-nav-wrapper');
        module.exports.containerFadeOut('js-content-area');
      
        if($(this).attr('id') === 'second_nome_reload') {
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
    }
}