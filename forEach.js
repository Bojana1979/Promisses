const fetch = require("node-fetch");

const getDataFromApi = async (url) => await fetch(url)

const getUser = async(userId) => {
    try {
        let user = await getDataFromApi(`http://localhost:8080/users/${userId}`)
        return await user.json()
    }catch(err) {
        console.log(err)
    }
};

const getCats = async(user) => {
    try {
        let promises = []

        await user.cats.forEach(async (catId) => {
           

            promises.push(getDataFromApi(`http://localhost:8080/cats/${catId}`)
            .then(cat => cat.json()
            .then(cat => cat.imageUrl))
            )
           
            
        })

        return  Promise.all(promises)
    }catch(err) {
        console.log(err)
    }
}

// const readData = async() => {
//     let data = await getUser(123);
//     console.log(data);
// };

const readData = async() => {
    let data = await getCats(await getUser(123));
    console.log(data);
};
readData();

