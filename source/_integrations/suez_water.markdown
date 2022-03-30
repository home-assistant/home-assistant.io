---
title: Suez Water
description: Instructions on how to integrate Suez Water daily data within Home Assistant.
ha_release: 0.97
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ooii'
ha_domain: suez_water
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `suez_water` sensor platform fetches your last day consumption of water from the French water provider [Tout Sur Mon Eau](https://www.toutsurmoneau.fr) website.

It also gets the following data:

- Daily consumption for the current month
- Daily consumption for the previous month
- Monthly consumption for the last 26 months
- Highest monthly consumption
- Last year total consumption
- Current year total consumption

## Configuration

To add the Suez Water sensor to your installation, add your _Tout Sur Mon Eau_ account credentials and your `counter_id` to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: suez_water
    username: YOUR_SUEZ_USERNAME
    password: YOUR_SUEZ_PASSWORD
    counter_id: YOUR_SUEZ_COUNTER_ID
```

{% configuration %}
username:
  description: The Tout Sur Mon Eau account username.
  required: true
  type: string
password:
  description: The Tout Sur Mon Eau account password.
  required: true
  type: string
counter_id:
  description: The Tout Sur Mon Eau counter id. 
  required: true
  type: integer
{% endconfiguration %}

`counter_id` is the water counter id. It can be found on your _Tout Sur Mon Eau_ [user account](https://www.toutsurmoneau.fr/mon-compte-en-ligne/historique-de-consommation-tr). Look in the source code of the page for something similar to `url: '/mon-compte-en-ligne/statMData' + '/123456789'`. The `counter_id` in this case is `123456789`.
