
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
.option('param1', {
  alias: 'p1',
  type: 'boolean',
  description: 'описание param1'
})
.option('param2', {
    alias: 'p2',
    type: 'string',
    description: 'описание param2',
    default: 'default param2'
})
.argv

console.log(argv)