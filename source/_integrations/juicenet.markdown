---
title: JuiceNet
description: Instructions on how to setup WiFi-equipped JuiceNet/JuiceBox charging stations with Home Assistant.
ha_category:
  - Car
  - Energy
  - Sensor
  - Switch
ha_iot_class: Cloud Polling
ha_release: 0.47
ha_codeowners:
  - '@jesserockz'
ha_domain: juicenet
ha_config_flow: true
---

The `juicenet` platform pulls data from a [JuiceNet](https://evcharging.enelx.com/products/juicebox) charging station equipped with a Wi-Fi connection. It will access and make available all of the devices attached to your account. It also exposes a switch allowing you to charge your car now instead of waiting for the pre-set schedule.

## Configuration

To add `JuiceNet` go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **JuiceNet**.

Alternatively, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
juicenet:
    access_token: ACCESS_TOKEN
```

{% configuration %}
access_token:
  description: "Your JuiceNet API Token can be found in the [dashboard](https://home.juice.net/Manage)."
  required: true
  type: string
{% endconfiguration %}

## Sensor

The `juicenet` sensor platform allows you to get data from your [JuiceNet](https://evcharging.enelx.com/products/juicebox) charger.

### Added sensors

These sensors will be added for each JuiceNet device in your account:

- Status
- Temperature (inside the device)
- Voltage
- Amps
- Watts
- Charge time of session
- Energy added this session
