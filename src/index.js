const { names, surnames } = require('./consts');
function randomPhone() {
    const number = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
    return `8699${number}`
}
function randomFullName() {
    const name = names[Math.floor(Math.random() * (names.length - 0)) + 0];
    const surname = surnames[Math.floor(Math.random() * (surnames.length - 0)) + 0];

    return name + " " + surname;
}

function randomEmail(fullname) {
    const randomString = Math.random().toString(36).substring(8);
    return (fullname + randomString + "@gmail.com").toLowerCase().replace(/\s/g, '');
}

function createPerson() {
    const fullname = randomFullName();
    const email = randomEmail(fullname);
    const phone = randomPhone();

    return { fullname, email, phone };
}

module.exports = createPerson;