var proxy = require('redbird')({port: 80});

proxy.register("coh2stats.online", "localhost:82");
proxy.register("www.coh2stats.online", "http://81.2.251.32:82");
proxy.register("http://coh2stats.online", "http://81.2.251.32:82");
proxy.register("http://81.2.251.32", "http://81.2.251.32:82");
proxy.register("coh2stats.online/api", "localhost:81");
proxy.register("www.coh2stats.online/api", "http://81.2.251.32:81");
proxy.register("http://coh2stats.online/api", "http://81.2.251.32:81");
proxy.register("http://81.2.251.32/api", "http://81.2.251.32:81");