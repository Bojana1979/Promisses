const fetch = require("node-fetch");

const getUser = async(userID) => {
    try {
        let user = await fetch(`http://localhost:8080/users/${userID}`);
        return await user.json();
    } catch {
        console.log(err);
    }
};

const getCats = async(user) => {
    try {
        const cats = user.cats.map(async(catID) => {
            let cat = await fetch(`http://localhost:8080/cats/${catID}`);
            return await cat.json();
        });
        return Promise.all(cats);
    } catch {
        console.log(err);
    }
}

const readData = async() => {
    let data = await getCats(await getUser(123));
    console.log(data);
};

readData();

// console.log(getUser(123));