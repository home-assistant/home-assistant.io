---
title: SolarEdge
description: Instructions on how to integrate SolarEdge sensor within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: solaredge
---

The `solaredge` platform uses the [SolarEdge Monitoring API](https://www.solaredge.com/sites/default/files/se_monitoring_api.pdf) to allow you to get details from your SolarEdge solar power setup and integrate these in your Home Assistant installation.

<div class='note'>

The SolarEdge Monitoring API has a daily rate limit of 300 requests. In order to stay under this limit, and alow for some additional requests, the `solaredge` platform will update the site overview every 10 minutes.

</div>

## Configuration

There are 2 options in configuring the SolarEdge integration:

- Via the Home Assistant user interface where it will let you enter the port string to connect to the Velbus bus.
- Via the Home Assistant `configuration.yaml` file.

{% raw %}
```yaml
# Example configuration.yaml entry
solaredge:
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
{% endconfiguration %}

## Full configuration example

In case you would like to convert the values for example to kWh instead of the default Wh, you can use the [template platform](/integrations/template).

{% raw %}
```yaml
# Example configuration.yaml entry for template platform
sensors:
  platform: template
  sensors:
    solaredge_energy_this_year_template:
      value_template: "{{ (states('sensor.solaredge_energy_this_year') | float / 1000) | round(2) }}"
```
{% endraw %}
