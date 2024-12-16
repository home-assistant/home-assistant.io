---
title: No-IP.com
description: Keep your computer registered with the NO-IP.com dynamic DNS.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_domain: no_ip
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

With the `no_ip` {% term integration %} you can keep your current IP address in sync with your [NO-IP.com](https://www.noip.com)  hostname or domain.  

Note that it does not confirm your hostname (as is required periodically for free domain names); you will still need to do that manually.

To use the {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
no_ip:
  domain: subdomain.domain.com
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
  domain:
    description: Your fully qualified domain name (FQDN).
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
    type: integer
    default: 10
{% endconfiguration %}
