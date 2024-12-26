---
title: EPH Controls
description: Instructions on how to integrate EPH Controls EMBER thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: 0.57
ha_iot_class: Local Polling
ha_codeowners:
  - '@ttroy50'
ha_domain: ephember
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `ephember` {% term integration %} lets you control [EPH Controls](https://emberapp.ephcontrols.com/) thermostats. The module only works if you have a Wi-Fi gateway to control your EPH system and an account on the EMBER app.

To set it up, add the following information to your {% term "`configuration.yaml`" %} file:
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
climate:
  - platform: ephember
    username: YOUR_EMAIL
    password: YOUR_PASSWORD
```

A single interface can handle up to 32 connected devices.

{% configuration %}
username:
  description: The email address you used to sign up to the EMBER app.
  required: true
  type: string
password:
  description: The password you used to sign up to the EMBER app.
  required: true
  type: string
{% endconfiguration %}

The supported operation modes map to the ON/OFF period selection of your timeswitch / EMBER app. These include:

- **Auto** The timeswitch operates 3 on / off periods per day.
- **On** The timeswitch is permanently on.
- **Off** The timeswitch is permanently off.

If **All Day** is selected in the EMBER app it will show as **Auto** in Home Assistant.
To **Boost** your heating, you should use the `climate.set_aux_heater` action on your zone entity. This will then **Boost** that zone for 1 hour.
