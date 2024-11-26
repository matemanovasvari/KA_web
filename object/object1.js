import input from "./input.js";

class Person{
    constructor(name, email){
        this.name = name;
        this.email = email
    }
}

let numberOfPeople = parseInt(await input("How many people do you wanna add?: "));
let people = [];
let name;
let email;

for (let i = 0; i < numberOfPeople; i++) {
    name = await input(`${i+1}. person's name: `)
    email = await input(`${i+1}. person's email address: `)
    people.push(new Person(name, email))
}

for (let i = 0; i < people.length; i++) {
    console.log(`\n${i+1}. person's name: ${people[i].name}, email is: ${people[i].email}`)
}