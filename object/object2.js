import input from './input.js' 

const timeTable =
{
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
}

let ora = "";
let numberOfHours = 0;

for(let key in timeTable)
{
    numberOfHours = Math.abs(parseInt(await input(`Add ${key}'s class count: `)))
    for(let i = 0; i < numberOfHours; i++)
    {
        ora = await input("Class name: ")
        timeTable[key].push(ora)
    }
}

for(let key in timeTable)
    {
        let hours = timeTable[key]
        console.log(`${key}`)
        for(let i = 1; i <= timeTable[key].length; i++)
        {
           console.log(`\t${i}. ${hours[i-1]} `)
        }
    }