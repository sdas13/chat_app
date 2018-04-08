const dependable = require('dependable');
const path = require('path');

const container = dependable.container();

const simpleDependencies = [
    ['_', 'lodash'],
    ['async','async']
];

simpleDependencies.forEach(function (elem) {
    container.register(elem[0], function () {
        return require(elem[1])
    })
});

container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, '/helpers'));

container.register('container', function () {
    return container
});

module.exports = container;

