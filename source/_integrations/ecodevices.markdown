---
title: GCE Eco-Devices
description: Instructions on how to integrate GCE Eco-Devices within Home Assistant.
ha_release: 0.89
ha_iot_class: Local Polling
ha_category:
  - Sensor
ha_codeowners:
  - '@Aohzan'
ha_config_flow: true
ha_domain: ecodevices
---

The `ecodevices` integration allows you to get information from [GCE Eco-Devices](http://gce-electronics.com/fr/carte-relais-ethernet-module-rail-din/409-teleinformation-ethernet-ecodevices.html).

## Configuration

To add ecodevices to your installation, go to Configuration >> Integrations in the UI, click the button with + sign and from the list of integrations select GCE Eco-Devices.

Alternatively, you need to add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ecodevices
    host: "192.168.1.239"
    t1_enabled: True
    t1_name: Compteur Linky
    c1_enabled: True
    c1_name: Compteur panneau solaire
    c1_icon: mdi:solar-panel
    c1_unit_of_measurement: Wh
    c1_device_class: power
```

{% configuration %}
host:
  description: Hostname or IP address for the Eco-Devices.
  required: true
  type: string
port:
  description: HTTP port for the Eco-Devices.
  required: false
  default: 80
  type: integer
username:
  description: If authentication enabled on Eco-Devicesn the username set on web interface.
  required: false
  type: string
username:
  description: If authentication enabled on Eco-Devices, the password set on web interface.
  required: false
  type: string
t1_enabled:
  description: Enable entity for teleinfo 1 input
  required: true
  default: False
  type: boolean
t1_name:
  description: Name of the teleinfo 1 input
  required: false
  type: string
t1_unit_of_measurement:
  description: Unit of measurement of the teleinfo 1 input
  required: false
  default: VA
  type: string
t2_enabled:
  description: Enable entity for teleinfo 2 input
  required: true
  default: False
  type: boolean
t2_name:
  description: Name of the teleinfo 2 input
  required: false
  type: string
t2_unit_of_measurement:
  description: Unit of measurement of the teleinfo 2 input
  required: false
  default: VA
  type: string
c1_enabled:
  description: Enable entities for meter 1 input
  required: true
  default: False
  type: boolean
c1_name:
  description: Name of the meter 1 input
  required: false
  type: string
c1_unit_of_measurement:
  description: Unit of measurement of the meter 1 input
  required: false
  type: string
c1_device_class:
  description: Device class of the meter 1 input
  required: false
  type: string
c1_icon:
  description: Icon of the meter 1 input
  required: false
  type: string
c2_enabled:
  description: Enable entities for meter 2 input
  required: true
  default: False
  type: boolean
c2_name:
  description: Name of the meter 2 input
  required: false
  type: string
c2_unit_of_measurement:
  description: Unit of measurement of the meter 2 input
  required: false
  type: string
c2_device_class:
  description: Device class of the meter 2 input
  required: false
  type: string
c2_icon:
  description: Icon of the meter 2 input
  required: false
  type: string
{% endconfiguration %}
