---
title: OpenWrt (luci)
description: Instructions on how to integrate OpenWrt routers into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_codeowners:
  - '@mzdrale'
ha_domain: luci
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: legacy
---

This is a presence detection scanner for OpenWrt using [luci](https://openwrt.org/docs/techref/luci).

Before this scanner can be used you have to install the luci RPC package on OpenWrt:

```bash
# opkg update
# opkg install luci-mod-rpc
```

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: luci
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The hostname or IP address of your router, e.g., `192.168.1.1`.
  required: true
  type: string
username:
  description: The username of a user with administrative privileges, usually `admin`.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
ssl:
  description: If your router enforces SSL connections, set to `true`.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: If SSL/TLS verification for HTTPS resources needs to be turned off (for self-signed certs, etc.)
  required: false
  type: boolean
  default: true
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.

This device tracker provides a number of additional attributes for each tracked device (if it is at home): `flags`, `ip`, `device`, and `host`. The first three attributes are taken from the ARP table returned by the luci RPC. The `host` attribute is taken from the platform configuration and can be used to distinguish in which router a device is logged in, if you are using multiple OpenWrt routers.

{% note %}
Some installations have [a small bug](https://github.com/openwrt/luci/issues/576). The timeout for luci RPC calls is not set and this makes the call fail. 
If you want to locally fix your OpenWrt installation, you can apply the change manually to `/usr/lib/lua/luci/controller/rpc.lua`, or simply set a fixed timeout. The default is 3600.
{% endnote %}
