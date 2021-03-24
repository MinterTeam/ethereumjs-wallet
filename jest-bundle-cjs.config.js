const path = require('path');

module.exports = {
    moduleNameMapper: {
        '~\/src$': '<rootDir>/dist/cjs/index.js',
    },
    transform: {
        '^.+\\.jsx?$': ['babel-jest', {
            configFile: path.resolve(__dirname, './babel-jest.config.js')
        }],
    },
    testEnvironment: 'node',
};
