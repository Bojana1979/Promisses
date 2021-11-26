const fetch = require("node-fetch")

const getCats=async (userID)=>{
    return fetch(`http://localhost:8080/users/${userID}`).then((response)=>{
        return response.json()
    }).then((user) => {
        const cats = user.cats.map((catId) => {
            // 
            return fetch(`http://localhost:8080/cats/${catId}`).then((response) => {
                return response.json();
            })
        });
        return Promise.all(cats);
    })
}
getCats(123)

const readData = async() => {
    let data = await getCats(123);
    console.log(data);
};

readData()


