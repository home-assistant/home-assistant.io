---
layout: page
title: "NO-IP.com"
description: "Keep your computer registered with the NO-IP.com dynamic DNS."
date: 2017-10-27 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: noip.png
ha_category: Utility
ha_release: 0.57
---

With the `no_ip` component you can keep your [NO-IP.com](https://www.noip.com) record up to date.

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
no_ip:
  domain: subdomain.domain.com
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
  domain:
    description: Your FQDN.
    required: true
    type: string
  username:
    description: The generated username for this DDNS record.
    required: true
    type: string
  password:
    description: The generated password for this DDNS record.
    required: true
    type: string
  timeout:
    description: Timeout (in seconds) for the API calls.
    required: false
    type: number
    default: 10
{% endconfiguration %}
