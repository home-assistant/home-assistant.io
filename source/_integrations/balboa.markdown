---
title: Balboa Spa Client
description: Instructions on how to integrate Balboa Spa WiFi within Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Fan
  - Light
  - Select
ha_release: 2021.12
ha_iot_class: Local Push
ha_domain: balboa
ha_platforms:
  - binary_sensor
  - climate
  - fan
  - light
  - select
  - switch
  - time
ha_codeowners:
  - '@garbled1'
  - '@natekspencer'
ha_config_flow: true
ha_integration_type: integration
ha_dhcp: true
---

The **Balboa Spa Client** {% term integration %} adds support for [Balboa](https://www.balboawatergroup.com/) Spa WiFi Modules to be used within Home Assistant.

There is currently support for the following device types within Home Assistant:

- Binary sensor (Filter cycles and circulation pumps)
- Climate
- Fan (Pumps/Jets)
- Light
- Select (Low/high temperature range)
- Switch (Enable/disable filter cycle 2)
- Time (Set filter cycle start/end times)

## Compatible hardware

Balboa Spa Client integration support local control of hot tub spas equipped with a Balboa BP system and a bwa™ Wi-Fi Module (50350).

Balboa Spa Client integration is not compatible with ControlMySpa™ cloud API used by Balboa ControlMySpa Gateway Ultra (59303).

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: "Hostname or IP address of your Balboa Spa Wifi Device, e.g., `192.168.1.58`."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
sync_time:
  description: Sync the Spa's internal clock with Home Assistant daily
{% endconfiguration_basic %}

## Known limitations

- The WiFi Module is a direct connection to the control panel of the spa. Certain combinations of settings are not possible due to limitations of the spa.
- Turning on certain pumps, depending on the spa configuration, may cause other pumps to come online as well.
- The spa WiFi Module will need to be configured initially by the phone app to authenticate and get an IP on your network.
- The WiFi Module will automatically disconnect from Home Assistant periodically, and then be automatically reconnected. The disconnect is built-in to the hardware.

## Debugging integration

If you have problems with Balboa or the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    pybalboa: debug
    homeassistant.components.balboa: debug
```
