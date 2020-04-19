module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "extends": ["react-app", "plugin:react/recommended", "prettier"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
    "typescript": true
  },
  "rules": {
    "comma-dangle": ["warn", "only-multiline"],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "react/jsx-uses-vars": 1,
    "react/prop-types": 0,
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
