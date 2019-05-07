module.exports = {
  "DB": {
    "Type":"postgres",
    "User":"",
    "Password":"",
    "Port":5432,
    "Host":"",
    "Database":""
  },
   "Redis":
  {
    "mode":"sentinel",//instance, cluster, sentinel
    "ip": "",
    "port": 6389,
    "user": "",
    "password": "",
    "sentinels":{
      "hosts": "",
      "port":16389,
      "name":"redis-cluster"
    }

  },

  "Security":
  {

    "ip" : "",
    "port": 6389,
    "user": "",
    "password": "",
    "mode":"sentinel",//instance, cluster, sentinel
    "sentinels":{
      "hosts": "",
      "port":16389,
      "name":"redis-cluster"
    }
  },


  "RabbitMQ": {
    "ip":"",
    "port":"5672",
    "user": "",
    "password": "",
    "vhost":'/'
  },

  "Host":{
    "Ip":"0.0.0.0",
    "Port":"8823",
    "Version":"1.0.0.0"
  },

  "EventTrigger": {
        "ip": 'eventtriggerservice.app.veery.cloud',
        "port": 3645,
        "version": '1.0.0.0'
  },

  "evtConsumeType": 'amqp',
  "triggerToIntegrations": true,
  "Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo"
};
