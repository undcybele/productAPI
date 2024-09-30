module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/*.test.ts'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};
