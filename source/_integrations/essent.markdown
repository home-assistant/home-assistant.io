---
title: Essent
description: Instructions on how to integrate Essent within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.93
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@TheLastProject'
ha_domain: essent
ha_platforms:
  - sensor
---

The `essent` platform uses [PyEssent](https://github.com/TheLastProject/PyEssent/) to communicate with the (undocumented) API of Dutch energy provider Essent. It provides sensors for each of your meters and tariffs, updated daily.

To add Essent to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: essent
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  required: true
  description: Your username for [Mijn Essent](https://www.essent.nl/content/particulier/klantenservice/mijn_essent/).
  type: string
password:
  required: true
  description: Your password for [Mijn Essent](https://www.essent.nl/content/particulier/klantenservice/mijn_essent/).
  type: string
{% endconfiguration %}
