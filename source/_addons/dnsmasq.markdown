---
title: "Dnsmasq"
description: "A simple DNS server."
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

{% configuration %}
defaults:
  description: A list of DNS servers to forward default requests to.
  required: true
  type: list
forwards:
  description: A list of domains that will forward to a specific server.
  required: false
  type: list
hosts:
  description: A list of hosts to resolve statically.
  required: false
  type: list
{% endconfiguration %}
