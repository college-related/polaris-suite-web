# Automation Functions

Functions that are available for automating behaviour driven test scenarios.

__Table of Content:__

- [goto](#goto)
    - [find](#find)
    - [click](#click)
    - [scroll](#scroll)
    - [hover](#hover)
    - [dblClick](#dblclick)
    - [rightClick](#rightclick)
    - [isUrl](#isurl)
    - [type](#type)

## goto()

Automation function used to navigate to the `url` provided in the parameter of the function.

```js
goto(url: string): Page
```

__Returns the Page object__

goto() function returns a [`Page object`](/typescript.md?id=page-object) that will contain many utility functions like `find()`, `click()`, etc.

### find()

Used to find the element provided as the parameter of the function.

```js
find(selector: string): Promise<ElementHandle<HTMLElement>>
```

It returns the HTMLElement that is found or null for no such element found in the target page.

### click()

Used to find and click an element in the page.

```js
click(selector: string): Promise<ElementHandle<HTMLElement>>
```

It returns the HTMLElement that was clicked or null if no such element is found.

### scroll()

Used to scroll to the given __coordinate__ either __vertically or horizontally__ specified by the second parameter.

```js
scroll(c: number, direction?: 'horizontal' | 'vertical'): Promise<void>
```

The direction will be `vertical` by default.

### hover()

Used to scroll and mouse hover over the given __x and y__ coordinates.

```js
hover(x: number, y: number): Promise<void>
```

### dblClick()

Used to find and double click the provided element as parameter.

```js
dblClick(selector: string): Promise<ElementHandle<HTMLElement>>
```

It returns the found HTMLElement or null if not found any.

### rightClick()

Used to find and right click the provided element as parameter.

```js
rightClick(selector: string): Promise<ElementHandle<HTMLElement>>
```

It returns the found HTMLElement or null if not found any.

### isUrl()

Used to check the current URL with the provided url.

```js
isUrl(url: string): boolean
```

It returns true or false according to the equality.

### type()

Used to type or input text into input fields.

```js
type(selector: string, text: string) => Promise<ElementHandle<HTMLElement>>
```