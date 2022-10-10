/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	verbose: true,
	collectCoverage: true,
	coveragePathIgnorePatterns: [
		"node_modules",
		"test-config",
		"interfaces",
		"src/repositories",
		"jestGlobalMocks.ts",
		"src/server.ts",
		"src/utils",
		"src/databases",
		"tests/factories"
	]
};