---
title: Cisco IOS
description: Instructions on how to integrate Cisco IOS routers into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.33
ha_iot_class: Local Polling
ha_codeowners:
  - '@fbradyirl'
ha_domain: cisco_ios
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This is a presence detection scanner for [Cisco IOS](https://www.cisco.com/) devices.

{% important %}
This device tracker needs SSH to be enabled on the router.
{% endimportant %}

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

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: cisco_ios
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g., 192.168.1.1.
  required: true
  type: string
username:
  description: The username of a user with administrative privileges.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
