# vue-sprintf-components
Sprintf with vue components

## Demo
[![Edit Vue Template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1492m3ypq3)

## Install
Via Yarn:
```
yarn add vue-sprintf-components
```

Via NPM:
```
npm i vue-sprintf-components
```

## Quick start
```html
<template>
  <div>
    <VueSprintf text="component say: {0}">
      <ButtonUi>
        Hello!
      </ButtonUi>
    </VueSprintf>
    <!-- render: component say: <button>hello!</button> -->
  </div>
</template>

<script>
import VueSprintf from "vue-sprintf-components";

export default {
  components: {
    VueSprintf,
    ButtonUi: {
      template: '<button><slot></slot></button>'
    }
  }
};
</script>
```

## Usage
The component takes 2 props: `text` and `silence`
* text
  * type: `String`
  * required: `true`  
Any string with placeholders `{0}` and named placeholders `{name}`
* silence
  * type: `Boolean`  
If silence false, if there are not enough slots for placeholders, there will be an error
* placeholders
  * type: `Array|Object`  
Fallback placeholders if slots not enoght
## Example
### With args placeholders
```html
<VueSprintf text="component say: {0}">
  <ButtonUi>
    Hello!
  </ButtonUi>
</VueSprintf>
```
To render
```html
component say: <button>Hello!</button>
```


### With named placeholders
```html
<VueSprintf text="component 'a' say: {a} and component 'b' say: {b}">
  <ButtonUi slot="a">
    Hello!
  </ButtonUi>
  <ButtonUi slot="b">
    Bye-Bye!
  </ButtonUi>
</VueSprintf>
```
To render
```html
component 'a' say: <button>Hello!</button> and component 'b' say: <button>Bye-Bye!</button>
```

### With named placeholders + fallback placeholders
```html
<VueSprintf text="component 'a' say: {a} and component 'b' say: {b}"
  :placeholders="{ b: 'Bye-bye' }">
  <ButtonUi slot="a">
    Hello!
  </ButtonUi>
</VueSprintf>
```
To render
```html
component 'a' say: <button>Hello!</button> and component 'b' say: Bye-Bye!
```

### With list placeholders + fallback placeholders
```html
<VueSprintf text="component '0' say: {0} and component '1' say: {1}"
  :placeholders="['Bye-bye']">
  <ButtonUi>
    Hello!
  </ButtonUi>
</VueSprintf>
```
To render
```html
component 'a' say: <button>Hello!</button> and component 'b' say: Bye-Bye!
```