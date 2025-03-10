---
title: Enigma2 (OpenWebif)
description: Instructions on how to integrate an Enigma2 based box running OpenWebif into Home Assistant.
ha_category:
  - Media player
ha_release: '0.90'
ha_iot_class: Local Polling
ha_codeowners:
  - '@autinerd'
ha_domain: enigma2
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: device
---

The **Enigma2** {% term integration %} allows you to control a Linux based set-top box which is running [Enigma2](https://github.com/oe-alliance/oe-alliance-enigma2) with the OpenWebif plugin installed.

[OpenWebif](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif) is an open-source web interface for Enigma2 based set-top boxes.

### Prerequisites

Your device needs to have the OpenWebif plugin installed. On most devices it is installed by default, if not, it is available via the Plugins menu within your Enigma2 distribution.

Please beware that the OpenWebif setting "Require client cert for HTTPS" is not supported.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address or hostname of your device."
Port:
    description: "The port number of the OpenWebif service running. (default: 80)."
Username:
    description: "The username, if HTTP(S) authentication is enabled."
Password:
    description: "The password, if HTTP(S) authentication is enabled."
Uses an SSL certificate:
    description: "Whether HTTPS is enabled."
Verify SSL certificate:
    description: "Whether the SSL certificate should be verified."
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Turn off to deep standby:
    description: "Shuts the device down (called Deep Standby) on turning off the device. **Important**: When the device is in *Deep Standby*, it can no longer be reached! Turning on the device is only possible via one of the following methods: Wake on LAN, Power button on the device, or the Remote control."
Bouquet to use as media source:
    description: "Sets the bouquet to use for the source list."
{% endconfiguration_basic %}

## Entities

Currently, the following entity is exposed:

### Media player

The following actions are supported:

- Play/Pause
- Channel up and down (using the previous/next track buttons in the media player controls)
- Volume control
- Channel switching via source list

The bouquet for the source list can be configured via the Configuration options.

## Data updates

This integration fetches data from the device every 15 seconds by default.

## Troubleshooting

### Getting a 403.6 IP address rejected error on setup

#### Description

OpenWebif has a protection by default, so that only devices in the same subnet can connect to the device.

#### Resolution

There are two possible solutions to resolve this problem:

- Enable HTTP(S) authentication (recommended for security)
- Enable the OpenWebif setting "Enable access from VPNs"

{% note %}
If you choose to enable VPN access without authentication, ensure your network is properly secured as OpenWebif is not designed for publicly facing the internet.
{% endnote %}

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
