const express = require('express')
const axios = require('axios');
const router = express.Router()

const FRAUD_API_BASE_URL = "http://localhost:5007"

router.get('/', function (req, res) {
    const formValues = {
        firstName: "",
        surname: "",
        dateOfBirth: "",
        addresses: [
            {
                addressType: "",
                street: "",
                townCity: "",
                houseNameNumber: 0,
                postcode: ""
            }
        ]
    };

    // Make a request for a user with a given ID
    axios.post(FRAUD_API_BASE_URL + '/identity-check', formValues)
        .then(function (response) {
            res.status(200);

            const formattedResponse = {
                headers: response.data.responseHeader,
                orchestrationDecisions: response.data.clientResponsePayload.orchestrationDecisions,
                decisionElements: response.data.clientResponsePayload.decisionElements
            };

            const orchestrationDecisions = orchestrationDecisionsToTable(
                formattedResponse.orchestrationDecisions
            );

            const decisionElements = decisionElementsToTable(
                formattedResponse.decisionElements
            );

            const formattedHeaders = summaryValuesToTable(
                formattedResponse.headers
            );

            const formattedFormValues = summaryValuesToTable(
                formValues
            );

            const outputTemplate = {
                valuesSummaryList : formattedFormValues,
                responseHeaderSummaryList: formattedHeaders,
                responsePayloadOrchestrationDecisionTable: orchestrationDecisions,
                responsePayloadDecisionElementsTable: decisionElements,
                debugDataHtml: JSON.stringify(formattedResponse, undefined, 2)
            }

            res.render('pretty-print', outputTemplate )
        })
        .catch((error) => {
            console.log(error.message)
            res.status(500);
            res.render('error');
        });
});

function orchestrationDecisionsToTable(orchestrationDecisions) {
    const props = Object.keys(orchestrationDecisions[0]);

    const head = props.map((prop) => {
        return { text: prop };
    });

    const rows = orchestrationDecisions.map((row) => {
        return props.map((prop) => {
            return {
                text: row[prop],
            };
        });
    });

    return {
        head,
        rows,
    };
}

function decisionElementsToTable(orchestrationDecisions){
    const props = Object.keys(orchestrationDecisions[0]).filter((value) => {
        return !["rules", "otherData", "matches", "dataCounts", "scores"].includes(
            value
        );
    });

    const head = props.map((prop) => {
        return { text: prop };
    });

    const rows = orchestrationDecisions.map((row) => {
        return props.map((prop) => {
            return {
                text: row[prop],
            };
        });
    });

    return {
        head,
        rows,
    };
}

function summaryValuesToTable(keyValuePairs) {
    const keyValues = [];
    for (const [key, value] of Object.entries(keyValuePairs)) {
        if(Array.isArray(value)) {
            for(const val of value) {
                keyValues.push(...summaryValuesToTable(val))
            }
        } else {
            keyValues.push({key: {text: key}, value: {text: value}});
        }
    }
    return keyValues;
}

module.exports = router