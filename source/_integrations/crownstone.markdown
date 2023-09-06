---
title: Crownstone
description: Instructions on how to setup the Crownstone integration within Home Assistant.
ha_category:
  - Light
ha_iot_class: Cloud Push
ha_release: '2021.10'
ha_config_flow: true
ha_codeowners:
  - '@Crownstone'
  - '@RicArch97'
ha_domain: crownstone
ha_platforms:
  - light
ha_integration_type: integration
---

The Crownstone integration allows you to control your Crownstones either via the cloud or using a [Crownstone USB](#crownstone-usb) dongle.

The Crownstone integration supports the following Crownstone devices:

- Crownstone Plug (This can be plugged directly into an existing power outlet)
- Crownstone Built-In One (This can be put behind power outlets, lamp fixtures, or switches)

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Use a Crownstone USB dongle to enable local data transmission:
  description: "Enabling this option will launch a flow, which will allow you to configure a Crownstone USB dongle. Disabling this option will remove current configuration."
Crownstone Sphere where the USB is located:
  description: "This option is available when a Crownstone USB dongle is configured, and there are multiple Crownstone Spheres available. You can select in which Sphere the USB dongle is currently located."
{% endconfiguration_basic %}

## Crownstones

Crownstones have the ability to dim, however dimming is disabled by default. To enable dimming for a Crownstone:

1. Go to your Crownstone app
2. Tap on a Crownstone that you want to enable the dimming functionality
3. Tap on **Abilities**
4. Toggle **Dimming** on

When you have changed an ability through the Crownstone app, the change will be automatically updated in Home Assistant. Note that Home Assistant will reload the entry when dimming is changed.

Enabling dimming is at own risk. It is recommended to only use dimming on lights.

## Crownstone USB

The default connection method of the Crownstone integration is Cloud Polling. However, a [Crownstone USB](https://shop.crownstone.rocks/products/crownstone-usb-dongle) is available. Instead of switching and dimming Crownstones using the Cloud, this dongle hooks directly into the Crownstone mesh to switch Crownstones, which means the latencies are really low.

Furthermore, the Crownstone USB dongle allows for independent switching of Crownstones. When using the Cloud, a smartphone must be in
the Sphere to switch the Crownstone.
