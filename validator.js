let _films = require('./top250.json');
var bodyParser = require('body-parser');

function validateCreate(body) {
    if (body.id !== undefined && body.title !== undefined && body.rating !== undefined && body.year !== undefined && body.budget !== undefined && 
    body.gross !== undefined && body.poster !== undefined && body.position !== undefined) 
    {
        return true;
    }
        return false;
}

function validateBudgetAndGross(body) {
    if (body.budget > 0 || body.gross > 0 ) 
    {
        return true;
    }
        return false;
}


module.exports = {
    validateCreate,
    validateBudgetAndGross
};