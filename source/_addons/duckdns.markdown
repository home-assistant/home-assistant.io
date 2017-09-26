---
layout: page
title: "Duck DNS"
description: "Automatically update your Duck DNS IP address."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
featured: true
---

[Duck DNS](https://duckdns.org/) is a free service which will point a DNS (sub domains of duckdns.org) to an IP of your choice.

```json
{
  "lets_encrypt": {
    "accept_terms": true
  },
  "token": "sdfj-2131023-dslfjsd-12321",
  "domains": ["my-domain.duckdns.org"]
}
```

Configuration variables:

- **token** (*Required*): Your Duck DNS API key.
- **domains** (*Required*): A list of domains to update DNS.
- **seconds** (*Optional*): Seconds between updates to Duck DNS.
- **lets_encrypt.accept_terms** (*Optional*): If you accept the [Let's Encrypt Subscriber Agreement][le], it will generate & update Let's Enrypt certificates for your DuckDNS domain.

[le]: https://letsencrypt.org/repository/
