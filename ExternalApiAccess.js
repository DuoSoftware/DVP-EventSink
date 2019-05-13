var httpReq = require('request');
var config = require('config');
var util = require('util');
var validator = require('validator');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;

var EventTrigger = function(companyId, tenantId, evtType, payload)
{
    try
    {
        logger.debug('[DVP-EventSink.EventTrigger] -  Creating Post Message');

        var eventTriggerIp = config.EventTrigger.ip;
        var eventTriggerPort = config.EventTrigger.port;
        var token = config.Token;


        var httpUrl = util.format('http://%s/DVP/API/1.0.0.0/EventTrigger/Trigger?eventType=%s', eventTriggerIp, evtType);

        if(validator.isIP(eventTriggerIp))
        {
            httpUrl = util.format('http://%s:%d/DVP/API/1.0.0.0/EventTrigger/Trigger', eventTriggerIp, eventTriggerPort, evtType);
        }

        var options = {
            url: httpUrl,
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + token,
                'CompanyInfo': tenantId + ':' + companyId,
                'content-type': 'application/json'
            },
            body: payload
        };

        logger.debug('[DVP-EventSink.EventTrigger] - Creating Api Url : %s', httpUrl);


        httpReq.post(options, function (error, response, body)
        {
            if (!error && response.statusCode >= 200 && response.statusCode <= 299)
            {
                logger.debug('[DVP-EventSink.EventTrigger] - Call Event Trigger Success : %s', body);
            }
            else
            {
                logger.error('[DVP-EventSink.EventTrigger] - Call Event Trigger Fail', error);
            }
        })

    }
    catch(ex)
    {
        logger.error('[DVP-EventSink.EventTrigger] - Exception occurred', ex);
    }
};

module.exports.EventTrigger = EventTrigger;