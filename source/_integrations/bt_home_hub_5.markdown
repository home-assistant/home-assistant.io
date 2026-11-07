---
description: Instructions on how to integrate BT Home Hub 5 router into Home Assistant.
ha_release: 0.22
ha_domain: bt_home_hub_5
---

The **BT Home Hub 5** {% term integration %} offers presence detection by looking at connected devices to a [BT Home Hub 5](https://en.wikipedia.org/wiki/BT_Home_Hub) router.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your router, for example `192.168.1.254`."
{% endconfiguration_basic %}

## Supported functionality

For each device the router reports as connected, the integration creates a {% term "device tracker" %} entity that shows whether the device is home or away. Each entity also shows the device's hostname and MAC address.

Device tracker entities are [disabled by default](/docs/configuration/customizing-devices/#disabling-or-enabling-an-entity). Enable the entities you want to use for presence detection.

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.

## Data updates

The **BT Home Hub 5** integration {% term polling polls %} the router for its list of connected devices every 10 seconds.

## Troubleshooting

{% details "Some device trackers are missing or no longer updating" %}

### Symptom: "Remove leftover known devices for BT Home Hub 5"

Home Assistant displays a repair issue titled **Remove leftover known devices for BT Home Hub 5**, and some of the device trackers created by this integration are missing or have stopped updating.

#### Description

Earlier versions of this integration stored tracked devices in the `known_devices.yaml` file. The integration now creates its own entities, but leftover entries in that file for the same devices can conflict with the new entities and stop them from updating.

#### Resolution

1. Open the `known_devices.yaml` file located in your Home Assistant configuration directory (in the same directory as your {% term "`configuration.yaml`" %} file).
2. Remove the entries listed in the repair issue.
3. Restart Home Assistant.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
