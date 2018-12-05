---
layout: page
title: "Certificate Expiry"
description: "Instructions on how to set up HTTPS (SSL) certificate expiry sensors within Home Assistant."
date: 2017-04-24 14:14
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Network
ha_release: 0.44
ha_iot_class: "depends"
---

The `cert_expiry` sensor fetches information from a configured URL and displays the certificate expiry in days.

## {% linkable_title Configuration %}

To add the Certificate Expiry sensor to your installation, add these options to `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: cert_expiry
    host: home-assistant.io
```

{% configuration %}
host:
  description: The host FQDN (or IP) to retrieve certificate from.
  required: true
  type: string
port:
  description: The port number where the server is running.
  required: false
  default: 443
  type: integer
name:
  description: The friendly name for the certificate.
  required: false
  default: SSL Certificate Expiry
  type: string
{% endconfiguration %}

<p class='note warning'>
Make sure that the URL exactly matches your endpoint or resource.
</p>
