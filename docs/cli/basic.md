# CLI Basic

Use the cli to run your test suites and test cases as you like.

### Basic command

```shell
polaris path-to-test-folder
```

Use the `polaris` command to run the test files with in the folder you have specified.


### Example

```
..
└── test
    └── multiplication.test.js
    └── addition.test.js
```

Suppose you have a folder called __`test`__ and inside are two test files _`multiplication.test.js`_ and _`addition.test.js`_

Then your script will be like following in `package.json`:

```json
{
    "scripts": {
        "test": "polaris test"
    }
}
```