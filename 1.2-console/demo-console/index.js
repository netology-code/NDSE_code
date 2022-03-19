const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
    .option('params1', {
        alias: "p1",
        type: "boolean",
        description: "params 1 desc"
    })
    .option('params2', {
        alias: "p2",
        type: "string",
        description: "params 2 desc",
        default: "def params 2"
    })
    .argv


console.log(argv)

