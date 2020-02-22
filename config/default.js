module.exports = {
  DB: {
    Type: "postgres",
    User: "duo",
    Password: "DuoS123",
    Port: 5432,
    Host: "ec2-3-15-222-85.us-east-2.compute.amazonaws.com",
    Database: "duo"
  },
  Redis: {
    mode: "instance", //instance, cluster, sentinel
    ip: "ec2-18-189-192-150.us-east-2.compute.amazonaws.com",
    port: 6379,
    user: "duo",
    password: "DuoS123",
    sentinels: {
      hosts: "138.197.90.92,45.55.205.92,138.197.90.92",
      port: 16389,
      name: "redis-cluster"
    }
  },

  Security: {
    ip: "ec2-18-189-192-150.us-east-2.compute.amazonaws.com",
    port: 6379,
    user: "duo",
    password: "DuoS123",
    mode: "instance", //instance, cluster, sentinel
    sentinels: {
      hosts: "138.197.90.92,45.55.205.92,138.197.90.92",
      port: 16389,
      name: "redis-cluster"
    }
  },

  RabbitMQ: {
    ip: "ec2-18-189-192-150.us-east-2.compute.amazonaws.com",
    port: "5672",
    user: "duo",
    password: "DuoS123",
    vhost: "/"
  },

  Host: {
    Ip: "0.0.0.0",
    Port: "8823",
    Version: "1.0.0.0"
  },

  evtConsumeType: "amqp"
};
