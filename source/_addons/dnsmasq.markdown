---
layout: page
title: "Dnsmasq"
description: "A simple DNS server."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Setup and manage a [Dnsmasq](http://thekelleys.org.uk/dnsmasq/doc.html) DNS server. This allows you to manipulate DNS requests. For example, you can have your Home Assistant domain resolve with an internal address inside your network.

```json
{
  "defaults": ["8.8.8.8", "8.8.4.4"],
  "forwards": [
    {"domain": "mystuff.local", "server": "192.168.1.40"}
  ],
  "hosts": [
    {"host": "home.mydomain.io", "ip": "192.168.1.10"}
  ]
}
```

Configuration variables:

- **defaults** (*Required*): A list of DNS servers to forward default requests to.
- **forwards** (*Optional*): A list of domains that will forward to a specific server.
- **hosts** (*Optional*): A list of hosts to resolve statically.
