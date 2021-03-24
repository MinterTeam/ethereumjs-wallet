const path = require('path');

module.exports = {
    moduleNameMapper: {
        '~(.*)$': '<rootDir>/$1',
    },
    transform: {
        '^.+\\.jsx?$': ['babel-jest', {
            configFile: path.resolve(__dirname, './babel-jest.config.js')
        }],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(minterjs-util|other-module)/)',
    ],
};
