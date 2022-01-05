const express = require('express')
const axios = require('axios');
const router = express.Router()

const KBV_API_BASE_URL = process.env.KBV_API_BASE_URL
const KBV_API_PATH = process.env.KBV_API_PATH

router.post('/questions', function (req, res) {

    const formValues = {
        firstName: "albert",
        surname: "arkil",
        title: "mr",
        dateOfBirth: "16/07/1948",
        addresses: [
            {
                houseNameNumber: 3,
                postcode: "CA14 5PH"
            }
        ]
    };

    // Make a request for a user with a given ID
    axios.post(process.env.KBV_API_BASE_URL + '/saa', formValues)
        .then(function (response) {
            if (response.data && response.data.questions && response.data.questions.question) {

                const response_data = {
                    questions: response.data.questions.question,
                    authRefNo: response.data.control.authRefNo,
                    urn: response.data.control.urn,
                };

                res.render('questions', response_data);
            } else {
                res.status(500);
                res.render('error');
            }

        })
        .catch(function (error) {
            res.status(500);
            res.render('error');
        });


});



router.post('/answers', function (req, res) {


    console.log("/answers req body")
    console.log(JSON.stringify(req.body, null, 2))
    console.log("..................................");

    res.render('done');

});


module.exports = router
