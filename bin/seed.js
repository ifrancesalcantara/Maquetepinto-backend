const User = require("../models/User");
const Painting = require("../models/Painting");
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
        username: "user1",
        dateOfCreation: new Date()
    },{
        username: "user2",
        dateOfCreation: new Date()

    },{
        username: "user3",
        dateOfCreation: new Date()
    },{
        username: "user4",
        dateOfCreation: new Date()
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
        "tags": [
            "carnifex",
            "green",
            "whacky"
        ],
        "usersWhoLiked": [],
        "likes": [],
        "timesSeen": 52,
        "title": "Carnifex",
        "description": "A crazy eyed Carnifex",
        "image": "https://res.cloudinary.com/da01q4tx3/image/upload/v1576436513/demo/jne3zmqgmxnzqgqedrd5.jpg",
        "creatorUsername": "user1",
        "game": "Warhammer 40k",
        "created_at": "2019-12-15T19:02:06.342Z",
        "updated_at": "2019-12-17T18:09:20.486Z",
        "__v": 0
    },
    {
        "tags": [
            "rock",
            "marine"
        ],
        "usersWhoLiked": [],
        "likes": [],
        "timesSeen": 48,
        "title": "Rocker marine",
        "description": "Custom rock music modeling and painting.",
        "image": "https://qph.fs.quoracdn.net/main-qimg-85946b90564929fd044f7e87c65276fd",
        "creatorUsername": "user1",
        "game": "Warhammer 40k",
        "created_at": "2019-12-15T19:07:29.003Z",
        "updated_at": "2019-12-17T14:45:19.864Z",
        "__v": 0
    },
    {
        "tags": [
            "3D",
            "Tau",
            "kx139"
        ],
        "usersWhoLiked": [],
        "likes": [],
        "timesSeen": 20,
        "title": "Ta'unar",
        "description": "The T’au Supremacy armour is larger than any other current class of battlesuit. It is intended to meet a threat that the T’au Empire has not yet prepared for; the defence of worlds within their growing domain from the counter-expansion forces of other races. Lacking the manoeuvrability of other battlesuits, the KX139 Ta’unar Supremacy Armour was designed for static defence, carrying massively destructive, long range weapons. Encountering increasing numbers of enemy heavy assault elements, from Imperial Knights to the towering alien monstrosities of the Tyranid Hive Fleets, T’au heavy flyers were often outclassed.\n\nArmed with a pair of Tri-axis Ion Cannon and a Pulse Ordnance Multi-driver, this KX139 Ta’unar Supremacy Armour Battlesuit is ready to engage enemies at range and dominate the battlefield.",
        "image": "https://sketchfab.com/models/77b78a7480b24515af564dd9881c2731/embed",
        "creatorUsername": "user1",
        "game": "Warhammer 40k",
        "created_at": "2019-12-15T19:22:19.920Z",
        "updated_at": "2019-12-17T11:12:06.554Z",
        "__v": 0
    },
    {
        "tags": [
            "cowboy"
        ],
        "usersWhoLiked": [],
        "likes": [],
        "timesSeen": 27,
        "title": "Cowboy Granda",
        "description": "A figure of an old man with a rifle.",
        "image": "https://res.cloudinary.com/da01q4tx3/image/upload/v1576514833/demo/pvkcnn03lekjhzfsgmcy.jpg",
        "creatorUsername": "user2",
        "game": "Legends of the Old West",
        "created_at": "2019-12-16T16:48:02.647Z",
        "updated_at": "2019-12-17T14:46:41.345Z",
        "__v": 0
    },
    {
        "tags": [
            "Relic",
            "Cataphractii",
            "Terminator"
        ],
        "usersWhoLiked": [],
        "likes": [],
        "timesSeen": 7,
        "title": "Cataphractii",
        "description": "Imperial fists terminator from 30k",
        "image": "https://sketchfab.com/models/55f3e1fc7a904979b0f45b0029308124/embed",
        "creatorUsername": "user2",
        "game": "Warhammer 40k",
        "created_at": "2019-12-16T16:59:06.118Z",
        "updated_at": "2019-12-17T11:10:07.239Z",
        "__v": 0
    },
    {
        "tags": [
            "custom",
            "fire",
            "hell",
            "marine",
            "tactical_marine"
        ],
        "usersWhoLiked": [],
        "likes": [],
        "timesSeen": 11,
        "title": "tactical marine",
        "description": "Tactical Marine with multi-melta",
        "image": "https://res.cloudinary.com/da01q4tx3/image/upload/v1576578435/demo/p6uue80wmrpuw5ayrb59.jpg",
        "creatorUsername": "user3",
        "game": "Warhammer 40k",
        "created_at": "2019-12-17T10:29:11.599Z",
        "updated_at": "2019-12-17T14:46:17.709Z",
        "__v": 0
    },
    {
        "tags": [
            "Vanguard"
        ],
        "usersWhoLiked": [],
        "likes": [],
        "timesSeen": 5,
        "title": "VanguardPallador",
        "description": "",
        "image": "https://i.pinimg.com/564x/60/48/b0/6048b097b0477eee0d2a41d609678335.jpg",
        "creatorUsername": "user3",
        "game": "Warhammer Fantasy",
        "created_at": "2019-12-17T11:21:17.027Z",
        "updated_at": "2019-12-17T14:06:59.028Z",
        "__v": 0
    },{
        "tags": [
            "Daemons_of_Chaos"
        ],
        "usersWhoLiked": [],
        "likes": [],
        "timesSeen": 1,
        "title": "Bhirster Khorne",
        "description": "Bloodthirster of Khorne",
        "image": "https://res.cloudinary.com/da01q4tx3/image/upload/v1576594323/demo/o7vvjdjvbfvisbitlw4w.jpg",
        "creatorUsername": "user4",
        "game": "Warhammer Fantasy",
        "created_at": "2019-12-17T14:52:43.854Z",
        "updated_at": "2019-12-17T14:53:23.485Z",
        "__v": 0
    }
]

setTimeout(()=>{
    // User.create(seedUsers)
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
    
    Painting.create(seedPaintings)
        .then(allPaintingsArr=>{
            allPaintingsArr.forEach(painting=>{
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
