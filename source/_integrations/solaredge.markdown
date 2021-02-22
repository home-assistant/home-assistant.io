---
title: SolarEdge
description: Instructions on how to integrate SolarEdge sensor within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: solaredge
ha_dhcp: true
ha_platforms:
  - sensor
---

The `solaredge` platform uses the [SolarEdge Monitoring API](https://www.solaredge.com/sites/default/files/se_monitoring_api.pdf) to allow you to get details from your SolarEdge solar power setup and integrate these in your Home Assistant installation.

<div class='note'>

The SolarEdge Monitoring API has a daily rate limit of 300 requests. In order to stay under this limit, and allow for some additional requests, the `solaredge` platform will update the site overview every 15 minutes.

</div>

{% include integrations/config_flow.md %}

## Additional template sensor

In case you would like to convert the values for example to kWh instead of the default Wh, you can use the [template platform](/integrations/template).

{% raw %}

```yaml
# Example configuration.yaml entry for template platform
sensor:
  platform: template
  sensors:
    solaredge_energy_this_year_template:
      value_template: "{{ (states('sensor.solaredge_energy_this_year') | float / 1000) | round(2) }}"
```

{% endraw %}
