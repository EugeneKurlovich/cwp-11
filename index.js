const express = require('express');
const app = express();
let _films = require("./top250.json");
var bodyParser = require('body-parser');
let validatorController =  require('./validator');
const fs = require('fs');
app.use( bodyParser.json() ); 


app.get('/', (req, res) => {
  res.send("Hello World!!!");
});

app.get('/readAll', (req, res) => {

let newFilms = [];

   for (let i = 0; i < _films.length; i++) {
        newFilms.push(Object.assign({}, _films[i]));
    }

  newFilms.sort((a, b) => {

                    if (a.position > b.position) return 1;
                    if (a.position === b.position) return 0;
                    if (a.position < b.position) return-1;          
        });

res.send(newFilms);

});

app.post('/read',(req, res) => {
  let id = req.body.id;
 res.send(_films[id-1]);
});

app.post('/create', (req, res) => {
    if(validatorController.validateCreate(req.body))
     {
       if (validatorController.validateBudgetAndGross(req.body))
       {
        req.body.id = Date.now().toString();

          for (let i = 0 ; i < _films.length ; i ++)
          {
            if(req.body.position === _films[i].position)
            {
                let j = i;
                for (j; j < _films.length-i; j++)
                {
                   ++ _films[j].position;
                }
            }
          }

        _films.push(req.body);
        fs.writeFile("top250.json", JSON.stringify(_films), "utf8", function () { });
        res.send(req.body);
        checkSpaces();
       }
       else
       {
         res.send("(budget or gross) < 0");
       }
     }
    else
     {
        res.send("add all data");
     }
});

app.post('/update', (req, res) => {
for (let i = 0 ; i < _films.length; i ++)
{
    if (_films[i].id === req.body.id)
    {
      _films[i].title = req.body.title;
      _films[i].rating = req.body.rating;
      _films[i].year = req.body.year;
      _films[i].budget = req.body.budget;
      _films[i].gross = req.body.gross;
      _films[i].poster = req.body.poster;
      _films[i].position = req.body.position;

    }

      if (_films[i].position === req.body.position && _films[i].id !== req.body.id)
      {        
        ++ _films[i].position;
        ++i; 
            while (i !== _films.length)
            {
              ++_films[i].position;
              ++i;
            }
      }
}


 fs.writeFile("top250.json", JSON.stringify(_films), "utf8", function () { });
    res.send(req.body);
});

app.post('/delete', (req, res) => {
   _films.splice(_films.findIndex(film => film.id === req.body.id), 1);
  fs.writeFile("top250.json", JSON.stringify(_films), "utf8", function () { });

checkSpaces();
  res.send("DELETED");
});


function checkSpaces()
{
_films.sort((a, b) => {

                    if (a.position > b.position) return 1;
                    if (a.position === b.position) return 0;
                    if (a.position < b.position) return-1;          
        });

let a = 1;
  for (let i = 0 ; i < _films.length; i ++)
  {
    _films[i].position = a;
    ++a;
  }
}

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})