---
description: Instructions on how to integrate Sky Hub routers into Home Assistant.
ha_release: 0.37
ha_domain: sky_hub
---

The **Sky Hub** {% term integration %} offers presence detection by looking at connected devices to a [Sky Hub router](https://www.sky.com/shop/broadband-talk/sky-hub/).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your router, for example `192.168.1.254`."
{% endconfiguration_basic %}

## Supported functionality

For each device it finds connected to the router, the integration creates a {% term "device tracker" %} entity that shows whether the device is home or away. Each entity also exposes the device's hostname and MAC address.

Device tracker entities are [disabled by default](/docs/configuration/customizing-devices/#disabling-or-enabling-an-entity) unless their MAC address matches a device already known to Home Assistant. Enable the entities you want to use for presence detection.

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.

## Troubleshooting

{% details "Some device trackers are missing or no longer updating" %}

### Symptom: "Remove leftover known devices for Sky Hub"

Home Assistant displays a repair issue titled **Remove leftover known devices for Sky Hub**, and some of the device trackers created by this integration are missing or have stopped updating.

#### Description

Earlier versions of this integration stored tracked devices in the `known_devices.yaml` file. Although the integration now creates its own entities directly, leftover entries in that file retain the same entity IDs. Consequently, Home Assistant drops the new entities upon startup.

#### Resolution

1. Open the `known_devices.yaml` file located in your Home Assistant configuration directory (in the same directory as your {% term "`configuration.yaml`" %} file).
2. Remove the specific entries listed in the repair issue.
3. Restart Home Assistant.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
