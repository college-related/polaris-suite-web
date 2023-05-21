
# Using Typescript

Polaris Suite will support typescript out of the box. There will be no need for any extra configuration to get started with typescript with polaris suite.

> __Note:__ _It is not supported yet and will be added very soon_

## Types

There are some custom types that can be useful when determining what arguments to pass to certain functions in polaris-suite.

We will be discussing them here.

### DataTable

```type
type DataTable = Array<{ 
        arg: Array<any>, 
        result: any, 
        isNotEqual?: boolean 
    }>
```

__Description:__

used in parameter typing of `call()` function to take in the array of parameters to be passed in `iterateWithData()` function.


### WithDataOptions

```type
type WithDataOptions = {
    async?: boolean;
}
```

__Description:__

used in parameter typing of `call()` function as the optional parameters to specify the function has other properties like asynchronous, etc