let $body = $('body');

module.exports = {
    containerFadeIn: function (container) {
        return new Promise((resolve, reject) => {
            $body.find('.' + container).fadeTo('slow', 1, () => {
                resolve();
            });
        });
    },
    containerFadeOut: function (container) {
        return new Promise((resolve, reject) => {
            $body.find('.' + container).fadeTo('slow', 0, () => {
                resolve();
            });
        });
    }
};
