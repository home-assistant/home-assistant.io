---
title: Mitsubishi Comfort Cloud
description: Control Mitsubishi Electric minisplit heat pump and air conditioning systems through Mitsubishi Comfort cloud services.
ha_categories:
  - climate.heat_pumps_air_conditioning
ha_release: 2026.10
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@nikolairahimi'
ha_domain: mitsubishi_comfort_cloud
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Mitsubishi Comfort Cloud** {% term integration %} connects Mitsubishi Electric indoor heat pump and air conditioning units to Home Assistant through your Mitsubishi Comfort (Kumo Cloud) account. It provides cloud control even when Mitsubishi no longer supplies the credentials needed for local control.

This integration always uses the cloud. To control devices over your local network, use the separate [Mitsubishi Comfort integration](/integrations/mitsubishi_comfort/). Configuring both integrations creates separate entities. Existing local entities and automations are not moved to the cloud integration automatically.

## Supported devices

Indoor units with a Wi-Fi adapter registered in your Mitsubishi Comfort account are supported. Kumo Station devices are not supported.

## Prerequisites

- A [Mitsubishi Comfort (Kumo Cloud)](https://app.kumocloud.com) account with registered indoor units.
- Internet access for Home Assistant and your units, and access to Mitsubishi's cloud service.
- The username and password for your account.

Local-control credentials, local IP addresses, and DHCP discovery are not required. Home Assistant does not need to be on the same network as the units.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: The email address for your Kumo Cloud account.
Password:
  description: The password for your Kumo Cloud account.
{% endconfiguration_basic %}

## Supported functionality

Each supported indoor unit provides a climate entity. Available controls depend on the capabilities reported by Mitsubishi:

- HVAC mode: Off, Cool, Heat, Dry, Fan only, and Heat/Cool (auto).
- Target temperature: A single setpoint in Cool or Heat mode, and separate high and low setpoints in Heat/Cool mode.
- Fan speed and vane direction, when supported.
- Current temperature and humidity, when reported.

For example, you can use a climate entity in an automation to lower the target temperature before you arrive home.

## Data updates

The integration {% term polling polls %} each unit every 60 seconds. After a command is accepted, Home Assistant displays the requested setting. Acceptance does not confirm that the unit has applied the command; the next successful poll replaces the displayed setting with the state reported by Mitsubishi.

## Known limitations

- Status updates and commands depend on Mitsubishi's service and an internet connection.
- The cloud does not report whether a unit is actively heating or cooling. The current HVAC action is only shown when the unit is off.
- Rate limits can delay updates and commands.
- Local control is never selected automatically, even if local credentials or an IP address become available.

## Troubleshooting

### No supported units found

Check that your indoor units appear in the Mitsubishi Comfort app and that you signed in with the correct account. An account containing only Kumo Station devices cannot be configured with this integration.

### A unit is unavailable

Check that the unit works in the Mitsubishi Comfort app and that Home Assistant and the unit can reach the internet. Updates resume when requests succeed again. If only one unit cannot be reached, other working units remain available.

### Home Assistant asks you to sign in again

Go to {% my integrations title="**Settings** > **Devices & services**" %} and follow the reauthentication prompt for **Mitsubishi Comfort Cloud**. Sign in with the same account used during setup. Reauthentication preserves the existing cloud entities.

### A command failed

Check the unit's reported state before sending the command again. Commands that fail are not automatically retried over a local connection.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration stops cloud polling. Your Mitsubishi Comfort account, device settings, and any separately configured local integration are unaffected.
