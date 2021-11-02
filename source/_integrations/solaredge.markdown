---
title: SolarEdge
description: Instructions on how to integrate SolarEdge sensor within Home Assistant.
ha_category:
  - Sensor
  - Energy
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: solaredge
ha_dhcp: true
ha_platforms:
  - sensor
ha_codeowners:
  - '@frenck'
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
template:
  - sensor:
    - name: solaredge_energy_this_year_template:
      state: "{{ (states('sensor.solaredge_energy_this_year') | float / 1000) | round(2) }}"
```

{% endraw %}


## Energy Dashboard Configuration

As of Home Assistant 2021.11 the SolarEdge intergration can natively populate the [Energy Dashboard](https://www.home-assistant.io/docs/energy/) without additional setup.

To monitor your solar system you can utilise `sensor.solaredge_lifetime_energy` for solar production:

If you have a [consumption meter](https://www.solaredge.com/products/metering-and-sensors) in your SolarEdge system you can utilise `sensor.solaredge_imported_energy` and `sensor.solaredge_exported_energy` for energy to and from the grid:

![Screenshot 2021-11-02 21 25 31](https://user-images.githubusercontent.com/79175134/139829667-cfe116f1-c3a7-4c53-8278-6c1d5e7f42d0.png)

