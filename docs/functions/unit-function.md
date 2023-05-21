# Unit Functions

The smallest function that are available and can be used in polaris suite.

__Table of Content:__

- [expect](#expect)
- [call](#call)
- [api](#api)

## expect()

Unit function used to check equality of two values `expectation` and `actual`.

The expectation and actual values can be of any type from `string` to `functions`

It takes in an expectation value and returns an `Expectation Object`

```js
expect(expectation: any): Expectation
```

__Return Object Properties:__
- equalsTo(actual: any): _checks the equality of expectation and actual values_
- toBeString(): _checks if the expecation value is of type string_
- toBeNumber(): _checks if the expecation value is of type number_
- toBeBoolean(): _checks if the expecation value is of type boolean_
- toBeArray(): _checks if the expecation value is of type array_
- toBeNull(): _checks if the expecation value is of type null_
- toBeObject(): _checks if the expecation value is of type object_
- not
    - equalsTo(actual: any): _checks the equality of expecation and actual value and passes if not equal_
    - toBeString(): _checks if the expecation value is not of type string_
    - toBeNumber(): _checks if the expecation value is not of type number_
    - toBeBoolean(): _checks if the expecation value is not of type boolean_
    - toBeArray(): _checks if the expecation value is not of type array_
    - toBeNull(): _checks if the expecation value is not of type null_
    - toBeObject(): _checks if the expecation value is not of type object_

## call()

Unit function used to check return of `function`'s equality with `actual` value.

It takes in a function and parameter optionally and returns an `Call Object`

```js
call(fn: Funciton, params?: any[]): Call
```

__Return Object Properties:__
- returns(actual: any): _check the return value of the function_
- iterateWithData(datas: WithDataOptions): _iterate over the data provided_
- not
    - returns(actual: any): _check the return value of the function and passes if different_


## api()

Unit function used to check status code, response, throws, etc from an API call.

It takes url, method, payload, header and returns an `API Object`

```js
api(
    url: string, 
    method: "POST" | "PUT" | "GET" | "PATCH" | "DELETE", 
    payload?: null | BodyInit, 
    header?: AxiosHeaders 
): API
```

__Return Object Properties:__
- statusCode(status: number): _check the status code sent back by the api with the given status for similarity_
- hasResponse(payload: object): _check if the returned response contains or has the given payload_
- throwsError(): _check if the api throws error_
- not
    - statusCode(status: number): _check the status code sent back by the api with the given status for not similar_
    - hasResponse(payload: object): _check if the returned response doesnot contains or has the given payload_
    - throwsError(): _check if the api doesnot throws error_

