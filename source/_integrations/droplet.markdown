---
title: Droplet
description: Instructions on how to setup Droplet in Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: "2025.10"
ha_iot_class: Local Push
ha_codeowners:
  - '@sarahseidman'
ha_domain: droplet 
ha_platforms:
  - sensor
ha_integration_type: device
ha_zeroconf: true
ha_quality_scale: bronze
---

The **Droplet** {% term integration %} seamlessly connects your Home Assistant setup to [Droplet](https://shop.hydrificwater.com/pages/buy-droplet) -- an advanced all-in-one smart home water sensor.

Leveraging cutting-edge ultrasonic sensing technology, Droplet accurately monitors your home's water usage in real time. It safeguards your property from potential water damage and empowers you to make informed decisions about water conservation and identify anomalies early.

Stay in control of your home's water system efficiently and intelligently with Droplet and Home Assistant.

## Prerequisites

Before connecting to Home Assistant, it is necessary to enable the integration on your Droplet.

In the Droplet app, navigate to **Settings** > **Smart Home Integrations** > **Home Assistant**. Enable the integration and copy the token that appears on the screen. You will need to enter this in the configuration step.

{% include integrations/config_flow.md %}

{% configuration_basic %}
IP address:
  description: "If your Droplet has a fixed IP address, you can use it for manual configuration. This field is not required for auto discovery."
Pairing code:
  description: "Pairing code to authenticate with Droplet device. You can find it on the Droplet app under **Settings** > **Smart Home Integrations** > **Home Assistant**."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The following sensors values are available:

- Flow rate
- Volume
- Server connectivity
- Signal quality

## Data updates

Once the integration connects, Droplet will push data points as soon as they are available. During periods of increased activity, this may be as often as every 5 seconds. During periods of inactivity, it may be as seldom as every 30 seconds.

## Use cases

### Adding Droplet to your Energy Dashboard

1. Open the edit menu of your energy dashboard.
2. Select the water consumption tile.
![Screenshot of water consumption tile](/images/integrations/droplet/water_consumption.png)
3. Select one of Droplet's volume sensors. Optionally, track your costs.
![Screenshot of water consumption source picker](/images/integrations/droplet/configure_water_consumption.png)
4. Water usage recorded by Droplet will now be incorporated into your energy dashboard.
![Screenshot of a water sensor on the energy dashboard](/images/integrations/droplet/energy_dashboard.png)

## Removing the integration

This integration follows standard integration removal process.

{% include integrations/remove_device_service.md %}
4. To prevent Droplet from showing up as a discovered device after its removal, disable the local API in the Droplet app under **Settings** > **Smart Home Integrations** > **Home Assistant**.
