/**
 * Created by dinusha on 11/28/2017.
 */

var redisHandler = require('./RedisHandler.js');
var dbBackendHandler = require('./DbBackendHandler.js');
var dbModel = require('dvp-dbmodels');
var config = require('config');
var nodeUuid = require('node-uuid');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var util = require('util');
var amqp = require('amqp');

if(config.evtConsumeType === 'amqp')
{
    var amqpConState = 'CLOSED';

    // var connection = amqp.createConnection({ host: rmqIp, port: rmqPort, login: rmqUser, password: rmqPassword});

    var ips = [];
    if(config.RabbitMQ.ip) {
        ips = config.RabbitMQ.ip.split(",");
    }


    var connection = amqp.createConnection({
        //url: queueHost,
        host: ips,
        port: config.RabbitMQ.port,
        login: config.RabbitMQ.user,
        password: config.RabbitMQ.password,
        vhost: config.RabbitMQ.vhost,
        noDelay: true,
        heartbeat:10
    }, {
        reconnect: true,
        reconnectBackoffStrategy: 'linear',
        reconnectExponentialLimit: 120000,
        reconnectBackoffTime: 1000
    });

    //logger.debug('[DVP-EventMonitor.handler] - [%s] - AMQP Creating connection ' + rmqIp + ' ' + rmqPort + ' ' + rmqUser + ' ' + rmqPassword);

    connection.on('connect', function()
    {
        amqpConState = 'CONNECTED';
        logger.debug('[DVP-EventService.AMQPConnection] - [%s] - AMQP Connection CONNECTED');
    });

    connection.on('ready', function()
    {
        amqpConState = 'READY';

        logger.debug('[DVP-EventService.AMQPConnection] - [%s] - AMQP Connection READY');

        connection.queue('DVPEVENTS', {durable: true, autoDelete: false}, function (q) {
            q.bind('#');

            // Receive messages
            q.subscribe(function (message) {
                // Print messages to stdout
                var reqId = nodeUuid.v1();
                var evtObj = message;

                var evtClass = evtObj['EventClass'];
                var evtType = evtObj['EventType'];
                var evtCategory = evtObj['EventCategory'];
                var evtTime = evtObj['EventTime'];
                var evtName = evtObj['EventName'];
                var evtData = evtObj['EventData'];
                var evtParams = evtObj['EventParams'];
                var companyId = evtObj['CompanyId'];
                var tenantId = evtObj['TenantId'];
                var sessionId = evtObj['SessionId'];
                var bUnit = evtObj['BusinessUnit'];

                if(!companyId)
                {
                    companyId = -1;
                }

                if(!tenantId)
                {
                    tenantId = -1;
                }


                if(evtParams && util.isObject(evtParams)){

                    evtParams = JSON.stringify(evtParams);
                }

                var evt = dbModel.DVPEvent.build({
                    SessionId: sessionId,
                    EventName: evtName,
                    CompanyId: companyId,
                    TenantId: tenantId,
                    EventClass: evtClass,
                    EventType: evtType,
                    EventCategory: evtCategory,
                    EventTime: evtTime,
                    EventData: evtData,
                    EventParams: evtParams,
                    BusinessUnit: bUnit

                });

                dbBackendHandler.AddEventData(evt, function(err, result)
                {
                    if(err)
                    {
                        logger.error('[DVP-EventService.DVPEVENTS] - [%s] - dbBackendHandler.AddEventData threw an exception', reqId, err);
                    }
                })


            });

        });
    });

    connection.on('error', function(e)
    {
        logger.error('[DVP-EventMonitor.handler] - [%s] - AMQP Connection ERROR', e);
        amqpConState = 'CLOSE';
    });

}
else
{
    redisHandler.RedisSubscribe('SYS:MONITORING:DVPEVENTS');

    redisHandler.redisClient.on('message', function(channel, message)
    {
        if(channel && channel === 'SYS:MONITORING:DVPEVENTS')
        {
            var reqId = nodeUuid.v1();

            logger.debug('[DVP-EventService.DVPEVENTS] - [%s] - Event Received - Params - message : %s, appId : %s', reqId, message);

            if(message)
            {
                var evtObj = JSON.parse(message);

                var evtClass = evtObj['EventClass'];
                var evtType = evtObj['EventType'];
                var evtCategory = evtObj['EventCategory'];
                var evtTime = evtObj['EventTime'];
                var evtName = evtObj['EventName'];
                var evtData = evtObj['EventData'];
                var evtParams = evtObj['EventParams'];
                var companyId = evtObj['CompanyId'];
                var tenantId = evtObj['TenantId'];
                var sessionId = evtObj['SessionId'];

                if(!companyId)
                {
                    companyId = -1;
                }

                if(!tenantId)
                {
                    tenantId = -1;
                }


                if(evtParams && util.isObject(evtParams)){

                    evtParams = JSON.stringify(evtParams);
                }

                var evt = dbModel.DVPEvent.build({
                    SessionId: sessionId,
                    EventName: evtName,
                    CompanyId: companyId,
                    TenantId: tenantId,
                    EventClass: evtClass,
                    EventType: evtType,
                    EventCategory: evtCategory,
                    EventTime: evtTime,
                    EventData: evtData,
                    EventParams: evtParams

                });

                dbBackendHandler.AddEventData(evt, function(err, result)
                {
                    if(err)
                    {
                        logger.error('[DVP-EventService.DVPEVENTS] - [%s] - dbBackendHandler.AddEventData threw an exception', reqId, err);
                    }
                })
            }
        }

    });
}

process.stdin.resume();
