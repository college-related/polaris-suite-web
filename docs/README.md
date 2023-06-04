
# Quick Start

Polaris suite is an easy to use, light weight collaborative automation testing tool. To get started install the `polaris-suite` package from [npm](https://npmjs.org)

```bash
npm i polaris-suite --save-dev
```

## Creating First Test

Let's create your first test in polaris-suite. Start by creating a function to test. _For example: `multiplication.js`_

```js
// multiplication.js
function multiply(a, b) {
    return a*b;
}

module.exports = multiply;
```

Now create the actual test file. _For now say: `multiplication.test.js` inside test folder_


```text
..
└── test
    └── multiplication.test.js
```

```js
// multiplication.test.js
const { test, expect } = require("polaris-suite");
const { multiply } = require("../path-to-multiplication.js");

test('multiply 3 * 4 equals to 12', () => {
    expect(multiply(3, 4)).equalsTo(12);
});
```

> __Note:__ _As of now polaris-suite only supports CommonJS syntax not ES6 and will be added soon_

Now add the polaris script in `package.json` file.

```json
{
    "scripts": {
        "test": "polaris test"
    }
}
```

Finally run the command `npm test` in the terminal and you will get output something like this:

```bash
PASS ✓ (multiply 3 * 4 equals to 12)
```

That's it, you just installed, created and tested your test using polaris-suite.