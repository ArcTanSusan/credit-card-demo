var express = require('express');
var router = express.Router();

router.post('/validate', function(req, res, next) {
    const card = req.body;
    console.log('card: ', card.cardNumber);

    const luhnCheck = (value) => {
        if (/[^0-9-\s]+/.test(value)) return false;

        var nCheck = 0, nDigit = 0, bEven = false;
        console.log('value: ', value);
        value = value.replace(/\D/g, "");
    
        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);
    
            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }
    
            nCheck += nDigit;
            bEven = !bEven;
        }
    
        return (nCheck % 10) == 0;
    }
    const result = luhnCheck(card.cardNumber);
    res.send({result});

});

module.exports = router;
