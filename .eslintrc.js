module.exports = {
  "env": {
    "browser": true,
    "jest": true,
    "node": true
  },
  "extends": [
    "airbnb",
    "prettier",
  ],
  "globals": {
    "shallow": true,
    "mount": true,
    "React": true
  },
  "plugins": [
    "prettier",
  ],
  "rules": {
    "prettier/prettier": ["error", {
      "printWidth": 100,
      "singleQuote": true,
      "trailingComma": "none"
    }],
    "max-len": [ 1, { "code": 100 } ],
    "no-return-assign": 0,
    "react/destructuring-assignment": "never",
    "react/jsx-one-expression-per-line": 0,
    "react/prop-types": 0,
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    }
  }
};
