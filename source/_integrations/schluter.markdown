---
title: Schluter
description: Instructions on how to integrate your Schluter DITRA-HEAT-E-WiFi thermostat into Home Assistant.
ha_category:
  - Climate
ha_release: 0.108
ha_iot_class: Cloud Polling
ha_domain: schluter
ha_codeowners:
  - '@prairieapps'
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `schluter` {% term integration %} allows you to integrate your [Schluter-DITRA-HEAT-E-WiFi](https://www.schluter.com/schluter-us/en_US/ditra-heat-wifi) electric floor heating thermostat in Home Assistant.

{% important %}
You will need to create a Schluter DITRA-HEAT account and register your thermostat with it. This can be done via the thermostat touchscreen, where an email will be sent to you to confirm your account.
{% endimportant %}

## Configuration

You will need your Schluter login information (email and password) to use this module.

To set it up, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
schluter:
  username: YOUR_SCHLUTER_EMAIL
  password: YOUR_SCHLUTER_PASSWORD
```

{% configuration %}
username:
  description: The email for accessing your Schluter account.
  required: true
  type: string
password:
  description: The password for accessing your Schluter account.
  required: true
  type: string
{% endconfiguration %}

Once Home Assistant is started, you will have access to any thermostats registered with your account.

### Supported features

Currently, this integration supports the following features:

- Retrieving current temperature & target temperature
- Setting target temperature

When adjusting the temperature via Home Assistant, it will place the thermostat in "permanent mode", meaning schedules programmed within the thermostat will be ignored. You can return to scheduled mode by pressing the "Return to Schedule" button on the thermostat.
