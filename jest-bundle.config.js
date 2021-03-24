const path = require('path');

module.exports = {
    moduleNameMapper: {
        '~\/src$': '<rootDir>/dist/index.js',
    },
    transform: {
        '^.+\\.jsx?$': ['babel-jest', {
            configFile: path.resolve(__dirname, './babel-jest.config.js')
        }],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(buffer-es6)/)',
    ],
    setupFilesAfterEnv: ["<rootDir>/jest-bundle-setup.js"],
    testEnvironment: "<rootDir>/jest-environment-bundle.js",
};
