---
title: Ruckus
description: Instructions on how to integrate your Ruckus Networks device into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.117
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@lanrat'
  - '@ms264556'
  - '@gabe565'
ha_domain: ruckus_unleashed
ha_platforms:
  - device_tracker
ha_integration_type: hub
---

This platform allows you to connect to [Ruckus](https://www.ruckusnetworks.com/) access points.

[Ruckus Unleashed](https://www.ruckusnetworks.com/products/network-control-and-management/controller-less/),
[Ruckus ZoneDirector](https://support.ruckuswireless.com/products/73),
[Ruckus SmartZone](https://www.ruckusnetworks.com/products/network-control-and-management/network-controllers/),
and [Ruckus One](https://www.ruckusnetworks.com/products/network-control-and-management/cloud-managed/)
access points are supported. Access points running Standalone/Solo firmware are not supported.

There is currently support for the following device types within Home Assistant:

- **Presence detection** - The platform will look at devices connected to the access point and will
create a `device_tracker` for each discovered device.

## Prerequisites

- **IP address / hostname**, **Username** and **Password** which you use to connect
    to your Ruckus controller's web dashboard.


### Ruckus Unleashed

You may enter the **IP address / hostname** of any access point as the Host.
If you've configured an Unleashed Management Interface, then use this instead.

### Ruckus One

You'll need to use your Ruckus One dashboard to create an Application Token. Go to the bottom of the
**Administration** > **Settings** screen and select the **Add Token** link. Choose any
**Application Name**, for example `Home Assistant`. The **Token Scope** can be **Read Only**.

When Home Assistant prompts for Ruckus connection details, use the full URL of a Ruckus One
dashboard page as the Host (such as `https://asia.ruckus.cloud/5dd1000334cc2a01fcf28a740a6c95cf/t/dashboard`),
your Token **Client ID** as the Username & your Token **Shared Secret** as the Password.

{% include integrations/config_flow.md %}

## Limitations

This integration is not currently suitable for large multi-venue SmartZone or Ruckus One networks: there
is no way to filter devices by Venue or Zone.

If you've configured your access points with an extended Client Inactivity Timeout, then this is how long
you'll need to wait for devices to be detected as `not_home`.

## Troubleshooting

For this platform to work, the Ruckus controller or Unleashed AP will need to be accessible over HTTPS.
If you are having trouble with Home Assistant not connecting, make sure the user you have specified
can log in to the web dashboard and view AP, WLAN, and Client information.
