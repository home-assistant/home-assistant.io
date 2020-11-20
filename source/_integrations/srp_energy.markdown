---
title: "SRP Energy"
description: "How to integrate SRP Energy within Home Assistant."
ha_category:
  - Energy
ha_release: 0.119
ha_iot_class: Cloud Polling
---

The `srp_energy` component shows information from Srp hourly energy usage report for their customers.

You need a Username, Password, and AccountId which you can create at [Srp](https://www.srpnet.com).

## Configuration

Add Srp Energy to your installation from the configuraiton integration.

Navigate to `configuration`, then `integrations` and click `add`. Click `Srp Energy` to start the configuration. 
After completing the configuration flow, the `srp_energy` integration will be available.

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
is_tou:
  description: Your account is time of use planP.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

Details about the API are available in the [SRP Energy Developers API documentation](https://srpenergy-api-client-python.readthedocs.io/en/latest/?badge=latest).
