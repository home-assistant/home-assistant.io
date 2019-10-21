---
title: "SRP Energy Sensor"
description: "How to integrate SRP Energy within Home Assistant."
ha_category:
 - Energy
ha_release: 0.101
ha_iot_class: Cloud Polling
---

The `srp_energy` component shows information from Srp hourly energy usage report for their customers. The srpenergy module fetches the data found on the website.

You need a Username, Password, and AccountId which you can create at [Srp](https://www.srpnet.com).

## Configuration

To add Srp Energy to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: srp_energy
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    id: YOUR_ACCOUNT_ID
```

{% configuration %}
username:
  description: Your username for SRP.
  required: true
  type: string
password:
  description: Your password for SRP.
  required: true
  type: string
id:
  description: Your account id for SRP.
  required: true
  type: string
{% endconfiguration %}

Details about the API are available in the [SRP Energy Developers API documentation](https://srpenergy-api-client-python.readthedocs.io/en/latest/?badge=latest).