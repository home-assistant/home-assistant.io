---
title: Local IP Address
description: Instructions on how to integrate the Local IP Address sensor into Home Assistant.
logo: home-assistant.png
ha_category:
  - Network
ha_iot_class: Local Polling
ha_release: 0.104
ha_config_flow: true
ha_codeowners:
  - '@issacg'
---

The `local_ip` sensor will expose the local (LAN) IP address of your Home Assistant instance. This can be useful when your instance has a static public hostname (for example, if you use the Nabu Casa service), but have a dynamically allocated local LAN address (for example, configured via DHCP).

The sensor can be added via the user interface or using the `configuration.yaml` file. To enable this sensor, via the `configuration.yaml` file, add the following minimal configuration:

```yaml
# Example configuration.yaml entry
local_ip:
```

To configure via the user interface, select the `Local IP Address` integration.

{% configuration %}
name:
  description: Friendly name of the sensor.
  required: false
  type: string
  default: local_ip
{% endconfiguration %}
