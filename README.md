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
    <VueSprintf text="component say: %c">
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
Any string with placeholders `%c` and named placeholders `%(name)c`
* silence
  * type: `Boolean`  
If silence false, if there are not enough slots for placeholders, there will be an error

## Example
### With args placeholders
```html
<VueSprintf text="component say: %c">
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
<VueSprintf text="component 'a' say: %(a)c and component 'b' say: %(b)c">
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