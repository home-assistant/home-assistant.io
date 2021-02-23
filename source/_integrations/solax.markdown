---
title: SolaX Power
description: Instructions on how to integrate Solax sensor within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.94
ha_iot_class: Local Polling
ha_codeowners:
  - '@squishykid'
ha_domain: solax
ha_platforms:
  - sensor
---

The `solax` integration connects Home Assistant to Solax solar power inverters. Solax inverters may be connected to a home Wi-Fi network and expose a REST API. This integration retrieves information such as photovoltaic power production, battery levels and power, and how much power is being fed back into the grid.

## Configuration

To use the Solax sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: solax
    ip_address: IP_ADDRESS
```

{% configuration %}
ip_address:
  description: The IP address of your Solax system.
  required: true
  type: string
port:
  required: false
  type: integer
  default: 80
  description: The port number
{% endconfiguration %}

### Optional template sensor

If you would like to convert the values from multiple panels or view the total power the house is using, you can use the [template platform](/integrations/template).

{% raw %}

```yaml
# Example configuration.yaml entry for template platform
sensors:
- platform: template
  sensors:
    total_pv_power:
      friendly_name: "Total PV Power"
      unit_of_measurement: "W"
      value_template: "{{ (states('sensor.pv1_power') | float) + (states('sensor.pv2_power') | float) }}"
    load_power:
      friendly_name: "Load Power"
      unit_of_measurement: "W"
      value_template: "{{ (states('sensor.power_now') | float) - (states('sensor.exported_power') | float) }}"
```

{% endraw %}

### Note

Inverter models with newer firmware (and also those using devices like PocketWifi) no longer expose an API when connected to your wireless network, they do however continue to expose it on their own broadcasted SSID. To use this sensor in this case it is necessary to set up a reverse proxy with something like NGINX and use a Raspberry Pi (or similar) with two network connections (one being Wi-Fi that connects to the inverters SSID).


Example NGINX configuration

```text
location / {
  proxy_pass http://5.8.8.8;
}
```
