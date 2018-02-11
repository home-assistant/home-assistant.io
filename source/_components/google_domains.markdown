---
layout: page
title: "Google Domains"
description: "Keep your computer registered with the Google Domains dynamic DNS."
date: 2017-10-23 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google_domains.png
ha_category: Utility
ha_release: 0.57
---

With the Google Domains component you can keep your Google Domains record up to date.

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google_domains:
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
