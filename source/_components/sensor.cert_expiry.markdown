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
ha_category: System Monitor
ha_release: 0.44
ha_iot_class: "depends"
---

The `cert_expiry` sensor fetches information from a configured URL and displays the certificate expiry in days. 

To add the Certificate Expiry sensor to your installation, add these options to `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: cert_expiry
    host: home-assistant.io
```

Configuration variables:

- **host** (*Required*): The host FQDN (or IP) to retrieve certificate from.
- **port** (*Optional*): The port number where the server is running. Defaults to `443`.
- **name** (*Optional*): The friendly name for the certificate.

<p class='note warning'>
Make sure that the URL exactly matches your endpoint or resource.
</p>

