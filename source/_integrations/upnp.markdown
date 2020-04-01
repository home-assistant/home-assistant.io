---
title: UPnP
description: Internet Gateway Device (IGD) Protocol for Home Assistant.
ha_category:
  - Network
  - Sensor
ha_release: 0.18
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@StevenLooman'
ha_domain: upnp
---

The `upnp` integration enables you to collect network statistics from your router such as bytes in/out and packets in/out. This information is provided by the [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play)/[Internet Gateway Device (IGD) Protocol](https://en.wikipedia.org/wiki/Internet_Gateway_Device_Protocol) if enabled on your router.

The IGD can automatically create port forwarding mappings on your router for Home Assistant, exposing your installation to the internet. The mapping will never automatically expire. Upon stopping Home Assistant, the mapping will be removed from your router.

There is currently support for the following device types within Home Assistant:

- **Sensor** - Allows to get the network statistics from your router such as bytes in/out and packets in/out.

Please note that UPnP or NAT-PMP needs to be enabled on your router for this integration to work.

## Configuration

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry with custom external portal
upnp:
  port_mapping: true
  ports:
    hass: 8000
    8080: 8080
```

With the default settings only the sensors are added for statistics. If you wish to have port mapping done through IGD, add the option **port_mapping** and **ports**.

{% configuration %}
port_mapping:
  description: If the integration should try to map ports.
  required: false
  type: boolean
  default: false
sensors:
  description: If the integration should enable the UPnP sensors.
  required: false
  type: boolean
  default: true
local_ip:
  description: The local IP address of the computer running Home Assistant.
  required: false
  type: string
  default: Try to auto-detect IP of host.
ports:
  description: Map of ports to map from internal to external. Pass 'hass' as internal port to use the port Home Assistant runs on. Note that you have to enable port_mapping if you wish to map ports.
  required: false
  type: map
  default: Open same port on external router as that Home Assistant runs locally and forwards it.
{% endconfiguration %}

## Troubleshooting

If Home Assistant is not able to discover UPnP sensors, it may be because the local IP address was not auto-detected correctly. To prevent this, you may add the `local_ip` option to your UPnP configuration:

```yaml
# Example configuration.yaml with UPnP sensors enabled and local_ip set
upnp:
  sensors: true
  local_ip: 192.168.1.2
```
