---
title: OpenWrt (luci)
description: Instructions on how to integrate OpenWrt routers into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_config_flow: true
ha_codeowners:
  - '@mzdrale'
ha_domain: luci
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: legacy
---

The **OpenWrt (luci)** {% term integration %} tracks the devices connected to a router that runs [OpenWrt](https://openwrt.org/) with the [LuCI](https://openwrt.org/docs/techref/luci) web interface. Home Assistant polls the router locally, so you can use the presence of a phone or another device to tell who is home and trigger automations based on that.

## Supported devices

This integration works with routers running OpenWrt that have the LuCI web interface and its RPC package installed. It has been used with a wide range of OpenWrt-supported hardware.

## Prerequisites

Before you add the integration, prepare your router:

- Install the LuCI RPC package on your OpenWrt router. Connect to the router over SSH and run:

  ```bash
  apk update
  apk add luci-mod-rpc
  ```

  On OpenWrt versions that use the older package manager, use `opkg update` and `opkg install luci-mod-rpc` instead.

- Have the credentials of a user with administrative privileges ready. This is usually the `admin` account.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your router, for example `192.168.1.1`."
Username:
    description: "The username of a user with administrative privileges on the router, usually `admin`."
Password:
    description: "The password for that account."
SSL:
    description: "Connect to the router over HTTPS. Enabled by default. Turn this off if your router only serves the LuCI interface over HTTP."
Verify SSL certificate:
    description: "Verify the router's SSL certificate. Disabled by default, because most routers use a self-signed certificate. Only enable this if your router presents a certificate that Home Assistant can validate."
{% endconfiguration_basic %}

If the credentials for your router change later, Home Assistant asks you to enter the new username and password so it can reconnect. You don't need to remove and add the integration again.

## Supported functionality

For each device it finds on the router, the integration creates a {% term "device tracker" %} entity that shows whether the device is home or away. Each entity also exposes the device's IP address, hostname, and MAC address.

To choose which devices to track and how they are shown, see the [device tracker integration page](/integrations/device_tracker/).

## Known limitations

Some OpenWrt installations are affected by [a small bug](https://github.com/openwrt/luci/issues/576) where the timeout for LuCI RPC calls is not set, which makes the calls fail. To fix this on your router, you can apply the change manually to the `/usr/lib/lua/luci/controller/rpc.lua` file, or set a fixed timeout. The default is 3600.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
