module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
    },
    ignorePatterns: ["public/**/*.js"],
};