**date.js**
```js
console.log(new Date())
```

**sum.js**
```js
const nums = process.argv.slice(2).map((n) => Number(n))

const sum = nums.reduce((acc, cur) => acc + cur, 0)

console.log(sum)
```

**args.js**
```js
const nums = process.argv.slice(2).map((n) => Number(n))

const sum = nums.reduce((acc, cur) => acc + cur, 0)

console.log(sum)
```

**events.js**
```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('message', () => {
    console.log('on Message')
});

myEmitter.on('message', message => {
    console.log(`Message: ${message}`)
});

myEmitter.on('error', error => console.log(`Error: ${error}`));


myEmitter.emit('message', 'Node.js EventEmitter in action’);
```

**readline.js**
```js
const readline = require('readline')

const input = readline.createInterface(process.stdin)

input.on('line', (data) => console.log(data))
input.on('close', () => console.log('This is the end'))
```