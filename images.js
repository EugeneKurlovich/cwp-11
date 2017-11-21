const express = require('express');
const router = express.Router();

router.get('*', function (req, res, next) {
    let options = {
        root: './public',
    };

    res.sendFile('nophoto.jpg', options, function (err) {
        if (err) {
            next(err);
        }
    });
});

module.exports = router;