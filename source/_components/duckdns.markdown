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
ha_category: Network
featured: false
ha_release: 0.55
---

With the DuckDNS component you can keep your DuckDNS record up to date. DuckDNS is a free dynamic DNS service that allows you to point a subdomain under `duckdns.org` at your computer.

## {% linkable_title Configuration %}

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
duckdns:
  domain: YOUR_SUBDOMAIN
  access_token: YOUR_ACCESS_TOKEN
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

<p class='note'>
If you are running the Hass.io [DuckDNS add-on](/addons/duckdns/) this component is not required. The add-on will keep your IP updated with DuckDNS.  
</p>
