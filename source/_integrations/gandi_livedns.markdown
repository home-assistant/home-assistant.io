---
title: Gandi.net
description: Keep your computer registered with the gandi live dns dynamic updater.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_codeowners:
  - '@flexy2dd'
ha_domain: gandi_livedns
---

With the `gandi_livedns` integration you can keep your current IP address in sync with your [Gandi.net](https://www.gandi.net) registered hostname or domain.  

<div class='note'>
Note that it does not create the initial dns record but only updates it; you will still have to do this manually.
</div>

## Configuration
To use the integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
gandi_livedns:
  domain: domain.com
  name: hass
  api_key: YOUR_API_KEY
  ttl: 3600
```

{% configuration %}
  domain:
    description: Your fully qualified domain name (FQDN).
    required: true
    type: string
  name:
    description: The name of record (ex: hass).
    required: true
    type: string
  api_key:
    description: The generated api key for API V5 [Gandi account](https://account.gandi.net/en).
    required: true
    type: string
  type:
    description: Type of DNS record entry.
    required: false
    type: integer
    default: A
  ttl:
    description: TTL of DNS record entry (in seconds).
    required: false
    type: integer
    default: 3600
  timeout:
    description: Timeout (in seconds) for the API calls.
    required: false
    type: integer
    default: 10
{% endconfiguration %}
