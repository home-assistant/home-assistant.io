---
layout: page
title: "SolarEdge Sensor"
description: "Instructions on how to integrate SolarEdge sensor within Home Assistant."
date: 2018-12-04 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: solaredge.png
ha_category: Sensor
ha_release: 0.85
ha_iot_class: Cloud Polling
---

The `solaredge` platform uses the [SolarEdge Monitoring API](https://www.solaredge.com/sites/default/files/se_monitoring_api.pdf) to allow you to get details from your SolarEdge solar power setup and integrate these in your Home Assistant installation.

<p class='note'>
The SolarEdge Monitoring API has a daily rate limit of 300 requests. In order to stay under this limit, and alow for some additional requests, the `solaredge` platform will update the site overview every 10 minutes.
</p>

## {% linkable_title Configuration %}

To use the SolarEdge sensors in your installation, add the following to your configuration.yaml file:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: solaredge
    api_key: API_KEY
    site_id: SITE_ID
```
{% endraw %}

{% configuration %}
api_key:
  description: Your SolarEdge Site API key.
  required: true
  type: string
site_id:
  description: The id of your SolarEdge Site.
  required: true
  type: string
name:
  description: Let you overwrite the name of the device in the frontend.
  required: false
  default: SolarEdge
  type: string
monitored_conditions:
  description: SolarEdge Site information to be monitored. The following conditions can be monitored.
  required: false
  type: list
  default: current_power
  keys:
    lifetime_energy:
      description: Lifetime energy generated at your SolarEdge Site in Wh
    energy_this_year:
      description: Energy generated this year at your SolarEdge Site in Wh
    energy_this_month:
      description: Energy generated this month at your SolarEdge Site in Wh
    energy_today:
      description: Energy generated today at your SolarEdge Site in Wh
    current_power:
      description: Current generated power in W
    site_details:
      description: Site details such as name, location, status, etc.
    meters:
      description: Site equipment details of connected meters. The sensor value shows the number of meters. Each meter is available as an attribute
    sensors:
      description: Site equipment details of connected sensors. The sensor value shows the number of sensors. Each sensor is available as an attribute
    gateways:
      description: Site equipment details of connected gateways. The sensor value shows the number of gateways. Each gateway is available as an attribute
    batteries:
      description: Site equipment details of connected batteries. The sensor value shows the number of batteries. Each battery is available as an attribute
    inverters:
      description: Site equiment details of connected inverters. The sensor values shows the number of inverters. Each inverter is available as an attribute
    power_consumption:
      description: Show the current power consumption of your SolarEdge Site (additional hardware required)  
    solar_power:
      description: Show the current power production of your SolarEdge Site (additional hardware required)
    grid_power:
      description: Show the current power flow from/to the power grid. State will be either positive of negative indicating importing or exporting electricity (additional hardware required)
    storage_power:
      description: Show the current power flow from/to your site storage. State will be either positive of negative indicating discharging or charging (additional hardware required)

{% endconfiguration %}

If no **monitored_conditions** are specified, only **current_power** will be enabled.

### {% linkable_title Full configuration sample %}

A full configuration entry would look like the sample below.

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: solaredge
    api_key: API_KEY
    site_id: SITE_ID
    name: SolarEdge
    monitored_conditions:
      - current_power
      - energy_today
      - energy_this_month
      - energy_this_year
      - lifetime_energy
      - site_details
      - meters
      - sensors
      - gateways
      - batteries
      - inverters
      - power_consumption
      - solar_power
      - grid_power
      - storage_power
```
{% endraw %}

In case you would like to convert the values for example to kWh instead of the default Wh, you can use the [template platform](/components/sensor.template/).

{% raw %}
```yaml
# Example configuration.yaml entry for template platform
sensors:
  platform: template
  sensors:
    solaredge_energy_this_year_template:
      value_template: '{{(states.sensor.solaredge_energy_this_year.state | float / 1000) | round(2)}}'
```
{% endraw %}
