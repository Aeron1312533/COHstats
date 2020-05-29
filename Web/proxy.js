var proxy = require('redbird')({port: 80});

proxy.register("agilegateway.com", "http://34.65.141.148:1312");
proxy.register("agilegateway.com/api", "http://34.65.141.148:1234");
proxy.register("www.agilegateway.com", "http://34.65.141.148:1312");
proxy.register("http://34.65.141.148/api", "http://34.65.141.148:1234");
proxy.register("http://834.65.141.148", "http://34.65.141.148:1312");
proxy.register("https://agilegateway.com", "http://34.65.141.148:1312");