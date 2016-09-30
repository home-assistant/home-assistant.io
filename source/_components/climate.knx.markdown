---
layout: page
title: "KNX Thermostat"
description: "Instructions on how to integrate KXN thermostats with Home Assistant."
date: 2016-06-24 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: DIY
ha_release: 0.25
ha_iot_class: "Local Polling"
---


The `knx` climate platform is used as in interface with KNX thermostats.

KNX thermostats use at least 2 group addresses: one for the current temperature and one for the target temperature (named set-point in KNX terms).

To use your KNX thermostats in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: knx
    address : KNX_ADDRESS
    temperature_address: 0/1/1
    setpoint_address: 0/1/0
```

- **address** (*Required*): The KNX group address that is used to turn on/off this actuator channel.
- **temperature_address** (*Required*): The group address that is used to communicate the current temperature. Data format must be datapoint type 9.001 DPT_Value_Temp (2-Octet float value), check [details](http://www.knx.org/fileadmin/template/documents/downloads_support_menu/KNX_tutor_seminar_page/Advanced_documentation/05_Interworking_E1209.pdf).
- **setpoint_address** (*Required*): The group address that is used to set/read the target temperature. Data format must be datapoint type 9.001 DPT_Value_Temp (2-Octet float value). Make sure, you set the read-flag for the thermostat to allow Home Assistant to read the target temperature.
- **name** (*Optional*): A name for this devices used within Home Assistant.

With the current version of the module, no advanced KNX thermostat functionalities (e.g. HVAC mode) are supported.
