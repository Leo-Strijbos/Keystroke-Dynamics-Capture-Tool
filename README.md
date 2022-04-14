# Keystroke Dynamics Capture Tool

A live demo can be found [here.](https://leos-ee.netlify.app/)

## What is keystroke dynamics?

Keystroke dynamics centers around the use of typing patterns as a biometric tool. Unlike passwords or biological biometrics, keystroke patterns cannot be emulated under duress, and thus may be a viable approach for authentication, instead of or on top of password-based authentication. 

## What is this website, and how can I use it?

This website is an interface for collecting keystroke patterns, design with simplicity and ease-of-use in mind. In order to use it, there are several steps that need to take place:

* Fork this repository and all of its contents
* Create an airtable account, and set up an empty table for use
* Inside main.js and typing.js, edit the airtable initialization lines
```javascript
var base = new Airtable({apiKey: API_KEY}).base('TABLE_ID');
```
* Find the API key and base ID inside Airtable, by clicking Help > API Documentation
* In order to select a text, change the following inside typing.js:
* Choose the text inside the state, and NUM is 2 * number of chars in text
```javascript
this.state = {
  text: YOUR_TEXT,
  keystroke: Array(NUM).fill(0),
}
```
* And also change NUM on line 34
```javascript
this.setState({ keystroke: Array(NUM).fill(0) })
```

## Customizing the aesthetics

This website was built with Tailwind CSS and React JS, so to change the UI, simply edit the class names of widgets on the page. 

## Credit

This code is free to use, and the copyright symbol may be removed from the landing page, but please appropriately credit the author in any academic work.

## Contacting the author

Feel free to get in touch with me, by emailing [me](mailto:leostersmail@gmail.com) or getting in touch on [discord.](https://www.discord.com/channels/@me/431452148425818122/)
