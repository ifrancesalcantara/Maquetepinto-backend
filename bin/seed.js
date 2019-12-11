const User = require("../models/user");
const Painting = require("../models/painting");
const mongoose = require("mongoose");
const axios = require ("axios")

mongoose
  .connect("mongodb://localhost:27017/project3", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}`)
  )
  .catch(err => console.log(err));

const seedUsers = [
    {
        username: "menganiter",
        dateOfCreation: new Date(),
        delivers: true
    },{
        username: "menganito",
        dateOfCreation: new Date(),
        delivers: false

    },{
        username: "Jonny Doe",
        dateOfCreation: new Date(),
        delivers: true
    },{
        username: "fulanito",
        dateOfCreation: new Date(),
        delivers: false
    }
];

seedUsers.forEach((user, i)=>{
    axios.get('https://randomuser.me/api/')
    .then(res=> {
        user["profilePic"] = res.data.results[0].picture.medium
        console.log(user)
    })
    .catch(err=>console.log(err))
})

const seedPaintings = [
    {
        date: new Date(),
        title: "Seed Painting 1",
        creatorUsername: "menganito",
        description: "This is a painting",
        tags: ["enano", "cyberpunk"],
        image: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/38097036_285506162248823_5559187436359122944_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=111&oh=84321a50ff2188186f45bccc11e480cb&oe=5E797445"
    },
    {
        date: new Date(),
        title: "Seed Painting 2",
        creatorUsername: "fulanito",
        description: "This is a painting",
        tags: ["enano", "cyberpunk"],
        image: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/38097036_285506162248823_5559187436359122944_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=111&oh=84321a50ff2188186f45bccc11e480cb&oe=5E797445"
    },
    {
        date: new Date(),
        title: "Seed Painting 3",
        creatorUsername: "pepito",
        description: "This is a painting",
        tags: ["enano", "cyberpunk"],
        image: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/38097036_285506162248823_5559187436359122944_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=111&oh=84321a50ff2188186f45bccc11e480cb&oe=5E797445"
    },
    {
        date: new Date(),
        title: "Seed Painting 4",
        creatorUsername: "Jonny Doe",
        description: "This is a painting",
        tags: ["enano", "cyberpunk"],
        image: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/38097036_285506162248823_5559187436359122944_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=111&oh=84321a50ff2188186f45bccc11e480cb&oe=5E797445"
    },
    {
        date: new Date(),
        title: "Seed Painting 5",
        creatorUsername: "menganiter",
        description: "This is a painting",
        tags: ["enano", "cyberpunk"],
        image: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/38097036_285506162248823_5559187436359122944_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=111&oh=84321a50ff2188186f45bccc11e480cb&oe=5E797445"
    }
]

setTimeout(()=>{
    // User.create(seedUsers)
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
    
    Painting.create(seedPaintings)
        .then(allPaintingsArr=>{
            allPaintingsArr.forEach(painting=>{
                console.log(painting)
                User.findOneAndUpdate(
                    {username: painting.creatorUsername},
                    {$push: {paintings: painting._id}, new: true})
                    .then(user=>{
                        Painting.findByIdAndUpdate(painting._id, 
                            {creator: user._id}, {new: true})
                            .then(data=>console.log(data))
                        
                    })
                    .catch(err=>console.log(err))
            })
        })
        .catch(err=>console.log(err))
}, 3000)
