---
title: No-IP.com
description: Keep your computer registered with the NO-IP.com dynamic DNS.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_codeowners:
  - '@fabaff'
ha_domain: no_ip
---

With the `no_ip` integration you can keep your current IP address in sync with your [NO-IP.com](https://www.noip.com)  hostname or domain.  

Note that it does not confirm your hostname (as is required periodically for free domain names); you will still need to do that manually.

To use the integration in your installation, add the following to your `configuration.yaml` file:

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
