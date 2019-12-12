const express = require("express");
const router = express.Router();
const Chat = require("../models/chatroom");

/* GET users listing. */

router.get("/admin", async function(req, res, next) {
  Chat.find()
    .then(allChats => {
      res.status(202).json(allChats);
      return;
    })

    .catch(err => console.log(err));
});

router.get("/:creatorId/:userId", async function(req, res, next) {
  const { creatorId, userId } = req.params;
  const chat1 = await Chat.findOne({ roomId: creatorId + userId })
    .populate("comments")
    .then(chat => {
        if(chat){
            return chat
        }
    })
    .catch(err => console.log(err));

  const chat2 = await Chat.findOne({ roomId: userId + creatorId })
    .populate("comments")
    .then(chat => {
        if(chat){
            
            return chat
        }
    })
    .catch(err => console.log(err));

  if (!chat1 && !chat2) {
    Chat.create({ roomId: userId + creatorId })
      .then(newChat => {
        res.status(202).json({a:newChat, b:"newChat"});
        return;
      })

      .catch(err => console.log(err));
  } else if(chat1){
    res.status(202).json({a:chat1, b:"chat1"});
    return;
  }  else if(chat2){
    res.status(202).json({a:chat2, b:"chat2"});
    return;
  }
});

module.exports = router;
