---
title: Google Domains
description: Keep your computer registered with the Google Domains dynamic DNS.
ha_category:
  - Network
ha_release: 0.57
ha_domain: google_domains
ha_iot_class: Cloud Polling
ha_integration_type: integration
---

With the Google Domains integration you can keep your Google Domains **dynamic** DNS record up to date. To setup a dynamic domain name using Goole Domains, refer to the [_Use Dynamic DNS_ section in the Google support documentation](https://support.google.com/domains/answer/6147083).

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
    description: Your fully qualified domain name (FQDN) that you have chosen for your Home Assistant server.
    required: true
    type: string
  username:
    description: The generated username for this Dynamic DNS record. See your [Google Domains record](https://support.google.com/domains/answer/6147083) for details.
    required: true
    type: string
  password:
    description: The generated password for this Dynamic DNS record. See your [Google Domains record](https://support.google.com/domains/answer/6147083) for details.
    required: true
    type: string
  timeout:
    description: Timeout (in seconds) for the API calls.
    required: false
    type: integer
    default: 10
{% endconfiguration %}
