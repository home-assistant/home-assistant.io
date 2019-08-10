---
title: "SRP Energy Sensor"
description: "How to integrate SRP Energy within Home Assistant."
ha_category:
  - Energy
ha_release: 0.83
ha_iot_class: Cloud Polling
redirect_from:
 - /components/sensor.srp_energy/
---

<div class="note warning">

 This integration is deprecated and will be removed in Home Assistant 0.100.0.

 For more information see [Architecture Decision Record: 0004](https://github.com/home-assistant/architecture/blob/master/adr/0004-webscraping.md).

 </div>

The `srp_energy` integration shows information from Srp hourly energy usage report for their customers. The srpenergy module fetches the data found on the website.

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
