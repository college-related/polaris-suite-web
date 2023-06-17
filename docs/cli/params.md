# CLI Params

Use this parameters to further control your test command in more detailed way.

## Isolation

Use these parameters to isolate the test and run them seperately without running all the files within the test folder path you have provided.

### start

Specify the starting index of the file you want to start your test files to run from.

```json
{
    "scripts": {
        "test": "polaris test --start 2"
    }
}
```

It will start the testing from the 3rd test file.

> __Note:__ index of the files start from 0

### end

Specify the ending index of the file you want to stop your test files to run till.

```json
{
    "scripts": {
        "test": "polaris test --end 4"
    }
}
```

It will start the testing from first test file till 5th test file.

> __Note:__ index of the files start from 0

### only

Specify either index or the name of the test file which you want to run.

```json
{
    "scripts": {
        "test": "polaris test --only 3"
    }
}
```

It will test only the 4th test file.

> __Note:__ index of the files start from 0

__OR__


```json
{
    "scripts": {
        "test": "polaris test --only multiplication.test.js"
    }
}
```

It will test only the multiplication.test.js file.

> __Note:__ Don't use same name for multiple files

### automation

Specify the test cases to be `end-2-end` testing, which will start the headless chrome to automate the test.

```json
{
    "scripts": {
        "test:e2e": "polaris test --automation"
    }
}
```

It will test the test cases in end-2-end mode.

> __Note:__ this parameter will start the chrome headless mode before each test suite so use it wisely. See the [examples]()