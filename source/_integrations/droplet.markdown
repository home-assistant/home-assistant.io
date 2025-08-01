---
title: Droplet
description: Instructions on how to setup Droplet in Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 2025.8
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

The **Droplet** {% term integration %} seamlessly connects your Home Assistant setup to [Droplet](https://shop.hydrificwater.com/pages/buy-droplet) -- an advanced all-in-one smart home water sensor. Leveraging cutting-edge ultrasonic sensing technology, Droplet accurately monitors your home's water usage in real time. It safeguards your property from potential water damage and empowers you to make informed decisions about water conservation and identify anomalies early. Stay in control of your home's water system efficiently and intelligently with Droplet and Home Assistant.

## Prerequisites

Before connecting to Home Assistant, it is necessary to enable the integration on your Droplet.

In the Droplet app, navigate to Settings > API Integration > Home Assistant Core Integration. Enable the integration and copy the token that appears on the screen. You will need to enter this in the configuration step.

## Configuration

Droplet can be auto-discovered by Home Assistant. If an instance was found, it will be shown as Discovered. You can then set it up right away.

The only parameter required for Droplet setup with auto-discovery is the token, generated in the prerequisite step.

{% configuration_basic %}
Token:
  description: "Token to authenticate with Droplet device. You can find it on the Droplet app under settings > API Integration > Home Assistant."
{% endconfiguration_basic %}

## Supported Functionality

### Sensors

The following sensors values are available:

- Flow Rate
- Live Volume
- Daily Volume
- Weekly Volume
- Monthly Volume
- Server Connectivity
- Signal Quality

## Data Updates

Once the integration connects, Droplet will push data points as soon as they are available. During periods of increased activity, this may be as often as every 5 seconds. During periods of inactivity, it may be as seldom as every 30 seconds.

## Use Cases

### Adding Droplet to your Energy Dashboard

Open the edit menu of your energy dashboard. Select the water consumption tile.
<p class='img'>
<img src='/images/integrations/droplet/water_consumption.png' alt='Screenshot of water consumption tile'>
Screenshot of water consumption tile
</p>

Select one of Droplet's volume sensors. Optionally, track your costs.
<p class='img'>
<img src='/images/integrations/droplet/configure_water_consumption.png' alt='Screenshot of water consumption source picker'>
Screenshot of water consumption source picker
</p>

Water usage recorded by Droplet will now be incorporated into your energy dashboard.
<p class='img'>
<img src='/images/integrations/droplet/energy_dashboard.png' alt='Screenshot of a water sensor on the energy dashboard'>
Screenshot of the energy dashboard
</p>

## Removing the integration

This integration follows standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}
