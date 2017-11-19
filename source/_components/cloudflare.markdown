---
layout: page
title: "Cloudflare"
description: "Keep your computer registered with the Cloudflare dynamic DNS."
date: 2017-11-05 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: cloudflare.png
ha_category: Utility
featured: false
ha_release: 0.58
---

With the Cloudflare component, you can keep your Cloudflare record up to date.

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cloudflare:
  api_key: 1234567890
  domain: https://home.example.com
  email: me@example.com
  record_type: A
  zone: 2345678901
  proxied: false
  scan_interval: 300
  timeout: 10
  ttl: 1
```

{% configuration binary_sensor.template %}
  api_key:
    description: API Key provided by Cloudflare.
    required:
  domain:
    description: DNS record name.
    required: true
    type: string
  email:
    description: The email registered with Cloudflare.
    required: true
    type: string
  record_type:
    description: DNS record type. Acceptable options are: `A`, `AAAA`, or `CNAME`.
    required: true
    type: string
  zone:
    description: The Zone ID provided by Cloudflare. (Can be found on the overview page for your domain)
    required: true
    type: string
  proxied:
    description: Whether the record is receiving the performance and security benefits of Cloudflare.
    required: false
    type: boolean
    default: `False`
  scan_interval:
    description: How often to update the DNS record (in seconds).
    required: false
    type: number
    default: 300
  timeout:
    description: Timeout (in seconds) of the API calls.
    required: false
    type: number
    default: 10
  ttl:
    description: DNS record's time to live (in seconds). Can be set automatically by Cloudflare (`1`) or any value between `120` and `2147483647` seconds.
    required: false
    type: number
    default: 1
{% endconfiguration %}
