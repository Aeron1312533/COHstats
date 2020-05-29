var proxy = require('redbird')({port: 80});

proxy.register("agilegateway.com", "http://80.211.202.8:1235");
proxy.register("agilegateway.com/api", "http://80.211.202.8:1234");
proxy.register("www.agilegateway.com", "http://80.211.202.8:1235");
proxy.register("http://80.211.202.8/api", "http://80.211.202.8:1234");
proxy.register("http://80.211.202.8", "http://80.211.202.8:1235");
proxy.register("https://agilegateway.com", "http://80.211.202.8:1235");