---
title: Rollease Acmeda Automate
description: Instructions on setting up Rollease Acmeda Automate within Home Assistant.
ha_category:
  - Hub
  - Cover
ha_iot_class: Local Push
ha_release: '0.109'
ha_config_flow: true
ha_codeowners:
  - '@atmurray'
ha_domain: acmeda
---

The Rollease Acmeda Automate integration allows you to control and monitor covers via your Rolelase Acmeda Automate hub. The integration uses an [API](https://pypi.org/project/aiopulse/) to directly communicate with hubs on the local network rather than connecting via the cloud or via RS-485.

Devices are represented as a cover for monitoring and control as well as a sensor for monitoring battery condition.

To set up this integration, click the + icon in the lower right and find Rolelase Acmeda Automate. This will automatically discover any hubs on the local network and register them with Home Assistant. All devices are automatically discovered on the hub and you will have the opportunity to select the area each device is located.

Once registration is complete you should see a `cover` and a `sensor` entity for each device. The integration automatically manages the addition/update/removal of any devices connected on the hub including device names unless manually specified in home assistant.

If you want to explicitly configure your hub, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
acmeda:
  hubs:
    - host: DEVICE_IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of the hub (e.g., 192.168.1.10).
  required: true
  type: string
{% endconfiguration %}

## Examples

```yaml
# Example configuration.yaml entry specifying optional parameters
acmeda:
  hubs:
    - host: 192.168.1.10
```

### Multiple hubs

Multiple hubs work transparently with discovery, so you don't have to do anything special to set them up.

```yaml
# Example configuration.yaml entry
acmeda:
  hubs:
    - host: HUB1_IP_ADDRESS
    - host: HUB2_IP_ADDRESS
```

### Caveats

If the IP address for the hub changes, you will need to re-register it with Home Assistant again. To avoid this, you may set up a DHCP reservation on your router for your hub so that it always has the same IP address.

The integration currently has the following limitations:
 - only covers with basic open/close/stop/position are supported, other cover types that include blade tilt are not yet support.
 - the integration doesn't currently make use of rooms and scenes configured in the hub.
