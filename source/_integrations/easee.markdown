---
title: Easee Charging Station
description: Instructions on setting up Easee charging stations with Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.115
ha_config_flow: true
ha_codeowners:
  - '@fondberg'
ha_domain: easee
---

The easee integrattion allows you to monitor your Easee charging station (wallbox). 

This component provides the following platforms:

- Sensors: current set by the user, target energy set by the user, charging power, charged energy of the current session and total energy charged.

To set up this integration, click Configuration in the sidebar and then click Integrations. Click the + icon in the lower right and find easee. Click configure and you will be presented with the intergration dialog where you enter your easee.cloud login username and password. The username is your phone number prepended with the country code, e.g. +46xxxxxxxx.

## Configuration

To enable this component in your installation, add at least the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
easee:
```

{% configuration %}
easee:
  description: configuration
  required: true
  type: map
  keys:
    host:
      description: Easee host.
      required: true
      type: string
    rfid:
      description: RFID tag used for authorization.
      required: false
      type: string
      default: "00845500"
    failsafe:
      description: Enable failsafe mode at Home Assistant startup.
      required: false
      type: boolean
      default: false
    failsafe_timeout:
      description: Timeout of the failsafe mode in seconds. Allowed values are between 10 seconds and 600 seconds (this parameter is only used if failsafe mode is enabled). Make sure to call the `easee.set_curr` service regularly within this timeout period!
      required: false
      type: integer
      default: 30
    failsafe_fallback:
      description: Fallback current of the failsafe mode in A. Allowed values are between 6 Ampere and 63 Ampere. 0 Ampere disables the running charging process completely (this parameter is only used if failsafe mode is enabled).
      required: false
      type: integer
      default: 6
    failsafe_persist:
      description: Saving the failsafe configuration to internal EEPROM of the Easee charging station. 1 means save it, 0 means do only keep this configuration until the next restart of the charging station (this parameter is only used if failsafe mode is enabled).
      required: false
      type: integer
      default: 0
    refresh_interval:
      description: Refresh interval to fetch new data from the charging station. 5 seconds (same as in the official app) is recommended.
      required: false
      type: integer
      default: 5
{% endconfiguration %}

## Disclaimer

This software is not affiliated with or endorsed by Easee.
