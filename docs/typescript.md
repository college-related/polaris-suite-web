
# Using Typescript

Polaris Suite will support typescript out of the box. There will be no need for any extra configuration to get started with typescript with polaris suite.

> __Note:__ _It is not supported yet and will be added very soon_

## Types

There are some custom types that can be useful when determining what arguments to pass to certain functions in polaris-suite.

We will be discussing them here.

### DataTable

```js
type DataTable = Array<{ 
        arg: Array<any>, 
        result: any, 
        isNotEqual?: boolean 
    }>
```

__Description:__

used in parameter typing of `call()` function to take in the array of parameters to be passed in `iterateWithData()` function.


### WithDataOptions

```js
type WithDataOptions = {
    async?: boolean;
}
```

__Description:__

used in parameter typing of `call()` function as the optional parameters to specify the function has other properties like asynchronous, etc

### Expectation Object

```js
type ExpectationResult = {
    equalsTo: (actual: any) => void,
    toBeString: () => void,
    toBeBoolean: () => void,
    toBeNumber: () => void,
    toBeObject: () => void,
    toBeArray: () => void,
    toBeUndefined: () => void,
    not: {
        equalsTo: (actual: any) => void,
        toBeString: () => void,
        toBeBoolean: () => void,
        toBeNumber: () => void,
        toBeObject: () => void,
        toBeArray: () => void,
        toBeUndefined: () => void,
    }
}
```

__Description:__

type of the return object of the [`expect() function`](/functions/unit-function.md?id=expect)


### Call Object

```js
type CallResult = {
    returns: (actual: any) => void,
    iterateWithData: (datas: DataTable) => void,
    not: {
        returns: (actual: any) => void,
    }
}
```

__Description:__

type of the return object of the [`call() function`](/functions/unit-function.md?id=call)

### API Object

```js
type APIResult = {
    statusCode: (status: number) => void,
    hasResponse: (payload: object) => void,
    throwsError: () => void,
    not: {
        statusCode: (status: number) => void,
        hasResponse: (payload: object) => void,
        throwsError: () => void,
    }
}
```

__Description:__

type of the return object of the [`api() function`](/functions/unit-function.md?id=api)


### Page Object

```js
type PageResult = {
    find: (ele: HTMLElement) => HTMLElement | null,
    find: (ele: HTMLElement) => HTMLElement | null,
    click: (ele: HTMLElement) => HTMLElement | null,
    dblClick: (ele: HTMLElement) => HTMLElement | null,
    rightClick: (ele: HTMLElement) => HTMLElement | null,
    scroll: (c: number, direction?: 'vertical' | 'horizontal' = 'vertical') => void,
    hover: (x: number, y: number) => void,
    isUrl: (url: string) => boolean
}
```

__Description:__

type of return object of [`goto() function`](/functions/automation-function.md?id=goto)