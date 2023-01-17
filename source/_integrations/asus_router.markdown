---
title: Asus Router
description: Instructions on how to integrate Asus wireless routers into Home Assistant.
ha_category:
  - Hub
  - Sensor
ha_release: 2022.2
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@Vaskivskyi'
ha_domain: asus_router
ha_platforms:
  - sensor
ha_integration_type: hub
---

Asus Router integration provides a way to monitor any ASUSWRT-powered device (including routers, access points, and AiMesh nodes) from Home Assistant. The integration uses native Asus HTTP(S) API the same way you are accessing the device Web UI for setup or configuration.

The user needs to provide the following information for the setup:

{% include integrations/config_flow.md %}
{% configuration %}
host:
  description: hostname or IP address of the device
username:
  description: login to access the device Web UI (default for Asus devices is `admin`)
password:
  description: password to access the device Web UI
port:
  description: port for the connection (if the device uses non-standard ports for connection). The standard values are `80` for non-SSL and `8443` for SSL connection - they can be handled by the integration automatically and do not need to be provided explicitly
ssl:
  description: whether to use SSL connection (in order to use SSL connection, this feature should be enabled on the device)
{% endconfiguration %}

### Sensors

The following sensors are created:

|Entity|     Description|Units|Attributes|
|------|----------------|-----|----------|
|`cpu` |Device CPU usage|`%`  |<li>`core_{x}`, where `x` - is the number of CPU core, units - `%`</li>|
|`ram` |Device RAM usage|`%`  |<li>`total`, `used`, `free` - the amount of the RAM of the corresponding state, units - `kB`</li>|

### Firmware and hardware limitations

Asus Router supports virtually any model with FW versions `3.0.0.4.380.x` or higher.

The firmware support includes devices with original (stock) firmware (versions starting with 3.0.0.4 - stable and 9.0.0.4 - beta) as well as with AsusWRT-Merlin FW and its derivatives (e.g. Gnuton builds).

{% include integrations/option_flow.md %}

<div class='note'>

Options flow allows changing all the configurations except for the hostname.

</div>
