---
title: Cisco IOS
description: Instructions on how to integrate Cisco IOS routers into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.33
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@fbradyirl'
ha_domain: cisco_ios
ha_platforms:
  - device_tracker
ha_integration_type: hub
related:
  - docs: /integrations/device_tracker/
    title: Device tracker
ha_quality_scale: legacy
---

This is a presence detection scanner for [Cisco IOS](https://www.cisco.com/) devices.

## Prerequisites

To set up the integration, you need the following:

- SSH enabled on the router.
- The IP address of your router.
- The username of a user with administrative privileges, and the password if one is set for that user.

Before using this scanner it is recommended that you lower the ARP cache timeout on your router, as Cisco IOS normally comes with a 4 hour default ARP cache timeout.

For example, the following commands will lower the timeout to 2 minutes on Vlan1:

```bash
# 1. use this command to see what Vlan your devices are on
show ip arp

# 2. Go into configure mode
conf t

# 3. Use the Vlan name as you see it from step 1 above
interface Vlan1

# 4. Set a new arp cache timeout
arp timeout 120

# 5. Exit
# Press <ctrl+c> to exit configure mode

# 6. Don't forget to save the new config, so that it will survive a reboot
copy running-config startup-config
```

{% note %}

If you have a very large number of devices on your VLan (+1000), then you may want to adjust the ARP cache timeout to suit your needs. See [this discussion](https://community.cisco.com/t5/switching/arp-timeout/td-p/839027) to learn more.

{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your router, for example, `192.168.1.1`."
Username:
  description: "The username of a user with administrative privileges."
Password:
  description: "The password for your given admin account. Leave empty if no password is required."
Port:
  description: "The SSH port of your router (default: 22)."
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration option:

{% configuration_basic %}
Consider home:
  description: "The number of seconds to wait before marking a device as away after it was last seen in the ARP table of the router (default: 180)."
{% endconfiguration_basic %}

## Migrating from YAML configuration

If you previously configured the integration through `configuration.yaml`, your configuration is imported automatically when Home Assistant starts, and a repair issue reminds you to clean up:

1. Remove the `cisco_ios` entry under `device_tracker:` from your `configuration.yaml` file.
2. Restart Home Assistant.

## Supported functionality

The integration creates a {% term "device tracker" %} entity for each device found in the ARP table of your router.
You can use these entities to track the presence of people in your home. For more information on how to assign tracked devices to people, see the [device tracker integration page](/integrations/device_tracker/).

## Data updates

Home Assistant {% term polling polls %} your router every 30 seconds to read the ARP table and update the connection status of the tracked devices.

If the default polling interval does not fit your setup, for example to reduce the SSH load on the router, you can define a custom polling interval. This replaces the `interval_seconds` setting of the YAML configuration.

{% include common-tasks/define_custom_polling.md %}

## Troubleshooting

If the setup fails or the integration stops working, check the following:

- Make sure the IP address of your router is correct and reachable from Home Assistant.
- Make sure SSH is enabled on the router.
- Make sure the username and password are correct and the user has administrative privileges. The integration signs in to your router over SSH to read the ARP table, so it needs valid credentials.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
