---
layout: page
title: "Certificate Expiry"
description: "Track HTTPS (SSL) certificate expiry as HomeAssistant sensor."
date: 2017-04-24 14:14
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: 0.43
---

This sensor fetches information from a configured URL and displays the certificate expiry (in days). The `host` and `port` must lead to a working SSL website.

To add the Certificate Expiry sensor to your installation, add these options to `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: cert_expiry
    host: home-assistant.io
```

Configuration variables:

- **host** (*Required*): The host FQDN (or IP) to retrieve certificate from
- **port** array (*Optional*): Port number (default **443**).

<p class='note warning'>
Make sure that the URL exactly matches your endpoint or resource.
</p>
