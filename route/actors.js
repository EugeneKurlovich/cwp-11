const express = require('express');
const fs = require('fs');
let _actors = require("./actors.json");
let validatorController =  require('./validator');
const router = express.Router();

router.get('/readAll', (req, res) => {
  _actors.sort((a, b) => {

                    if (a.liked > b.liked) return 1;
                    if (a.liked === b.liked) return 0;
                    if (a.liked < b.liked) return-1;          
        });

_actors.reverse();
res.send(_actors);
});

router.post('/read',(req, res) => {
  let id = req.body.id;

for (let i = 0 ; i < _actors.length; i ++)
{
    if(id === _actors[i].id)
    {
      res.send(_actors[i]);
      return;
    }
}
    res.send("EMPTY");
});

router.post('/create', (req, res) => {  
    if (validatorController.checkLikedAndFilms(req.body) !== false)
    {
        req.body.id = Date.now().toString();
        _actors.push(req.body);
        fs.writeFile("actors.json", JSON.stringify(_actors), "utf8", function () { });
        res.send(req.body);   
    }
    else
    {
      res.send("films or liked < 0");
    }
});

router.post('/update', (req, res) => {
for (let i = 0 ; i < _actors.length; i ++)
{
    if (_actors[i].id === req.body.id)
    {
      if(req.body.name !== undefined)
      _actors[i].name = req.body.name;
      if(req.body.birth !== undefined)
      _actors[i].birth = req.body.birth;
      if(req.body.films !== undefined)
      _actors[i].films = req.body.films;
      if(req.body.liked !== undefined)
      _actors[i].liked = req.body.liked;
    }
}

 fs.writeFile("actors.json", JSON.stringify(_actors), "utf8", function () { });
    res.send(req.body);
});

router.post('/delete', (req, res) => {
   _actors.splice(_actors.findIndex(actor => actor.id === req.body.id), 1);
  fs.writeFile("actors.json", JSON.stringify(_actors), "utf8", function () { });

  res.send("DELETED");
});

module.exports = router;