module.exports = {
    styleLoader: 'style-loader!css-loader!less-loader',
    scripts: {
        // add every bootstrap script you need
        'transition': true
    },
    styles: {
        // add every bootstrap style you need
        "mixins": true,

        "normalize": true,
        "print": true,

        "scaffolding": true,
        "type": true,
    }
};