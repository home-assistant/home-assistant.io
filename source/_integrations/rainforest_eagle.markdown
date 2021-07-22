---
title: Rainforest Eagle-200
description: Instructions on how to setup the Rainforest Eagle with Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.97
ha_iot_class: Local Polling
ha_codeowners:
  - '@gtdiehl'
  - '@jcalbert'
ha_domain: rainforest_eagle
ha_platforms:
  - sensor
---

A `sensor` platform for the Rainforest Automation's [Eagle-200](https://rainforestautomation.com/rfa-z114-eagle-200/)
and [Legacy Eagle](https://rainforestautomation.com/support/rfa-z109-eagle-support/) energy gateways.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rainforest_eagle
    ip_address: IP_FOR_EAGLE
    cloud_id: CLOUD_ID_FROM_EAGLE
    install_code: INSTALL_CODE_FROM_EAGLE
```

{% configuration %}
ip_address:
  description: The local IP address of your Eagle device.
  required: true
  type: string
cloud_id:
  description: The Cloud ID that is printed on the bottom of the Eagle
  required: true
  type: string
install_code:
  description: "The Install Code that is printed on the bottom of the Eagle. Use the full Install Code with no spaces (e.g., `1a2b3c4d5a6b7c8d`)"
  required: true
  type: string
{% endconfiguration %}
