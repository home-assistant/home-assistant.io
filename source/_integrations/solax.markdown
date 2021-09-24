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

To configure the connection with your inverter simply configure it via the UI with the Solax integration. You will be asked for the IP Address, the port and password (optional).

<p class='note warning'>
Configuration of the Solax integration via YAML is now deprecated and it will be removed in a future version. Please use the UI configuration to setup it up in a more convinient way. If your inverter requires a password to connect, this is also the only way to do it, as it is not supported by YAML.
</p>

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
template:
- sensor
  - name: Total PV power
    unit_of_measurement: "W"
    state: "{{ (states('sensor.pv1_power') | float(default=0)) + (states('sensor.pv2_power') | float(default=0)) }}"
  - name: Load power
    unit_of_measurement: "W"
    state: "{{ (states('sensor.power_now') | float(default=0)) - (states('sensor.exported_power') | float(default=0)) }}"
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
