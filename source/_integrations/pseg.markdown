---
title: "PSE&G Gas Meter Sensors"
description: "Instructions on how to integrate the PSE&G gas meter sensors within Home Assistant."
logo: pseg.png
ha_release: 0.101
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
---

[PSE&G](https://pseg.com) is an energy provider in NY and NJ, USA.
The `pseg` sensor platform fetches your last gas consumption and cost from PSE&G.

## Configuration

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pseg
    energize_id: YOUR_ENERGIZE_ID
    session_id: YOUR_SESSION_ID
```

{% configuration %}
energize_id:
  description: The energize id corresponding to your PSE&G customer account. 
  required: true
  type: string
session_id:
  description: The session id corresponding to your PSE&G customer account. 
  required: true
  type: string
{% endconfiguration %}

Both `energize_id` and `session_id` can be found as browser cookies after logging in into your PSE&G customer portal at [myenergy.pseg.com](https://myenergy.pseg.com/energy_use)
Just log in, then put the following command in the browser address and hit enter: `javascript: alert(document.cookie)`.
The `energize_id` parameter is the value of the `_energize_session` cookie.
The `session_id` parameter is the value of the `EMSSESSIONID` cookie.
