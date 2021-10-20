---
title: Google Domains
description: Keep your computer registered with the Google Domains dynamic DNS.
ha_category:
  - Network
ha_release: 0.57
ha_domain: google_domains
ha_iot_class: Cloud Polling
---

With the Google Domains integration you can keep your Google Domains record up to date.

## Configuration

To use the integration in your installation, add the following to your `configuration.yaml` file:

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
    type: integer
    default: 10
{% endconfiguration %}
