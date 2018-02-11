---
layout: page
title: "DuckDNS"
description: "Keep your computer registered with the DuckDNS dynamic DNS."
date: 2017-09-23 07:08
sidebar: true
comments: false
sharing: true
footer: true
logo: duckdns.png
ha_category: Utility
featured: false
ha_release: 0.55
---

With the DuckDNS component you can keep your DuckDNS record up to date. DuckDNS is a free dynamic DNS service that allows you to point a subdomain under `duckdns.org` at your computer.

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
duckdns:
  domain: mysubdomain
  access_token: abcdefgh
```

{% configuration duckdns %}
  domain:
    description: Your duckdns subdomain (without the `.duckdns.org` suffix).
    required: true
    type: string
  access_token:
    description: Your DuckDNS access token. Log in to the site to get one.
    required: true
    type: string
{% endconfiguration %}
