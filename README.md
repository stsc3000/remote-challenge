# Remote Coding Challenge

This is my solution to a remote coding challenge, showing a small e-mail client
interface and its interaction.

Using a SPA framework would not have been much of a challenge, given the task. My solution is based on lodash, jquery and handlebars. It is extensively tested with jasmine tests (in browser). The build is created using gulp and webpack.

## Installing

First, clone the repository:
```bash
git clone git@github.com:stsc3000/remote-challenge.git
```

Then install the needed packages:
```bash
npm install # might need sudo
```

Lastly, start the included server
```bash
gulp # localhost:8080
```

or check the tests
```bash
gulp jasmine # localhost:8888
```
