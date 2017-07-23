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
  "token": "sdfj-2131023-dslfjsd-12321",
  "domains": ["my-first-accound.duckdns.org", "my-second-account.duckdns.org"]
}
```

Configuration variables:

- **token** (*Required*): Your Duck DNS API key.
- **domains** (*Required*): A list of domains to update DNS.
- **seconds** (*Optional*): Seconds between updates to Duck DNS.
