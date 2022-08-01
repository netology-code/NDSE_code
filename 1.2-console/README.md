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
