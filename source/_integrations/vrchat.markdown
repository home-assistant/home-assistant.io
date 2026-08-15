---
title: VRChat
description: Instructions on how to integrate VRChat with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.9
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@hi94740'
ha_domain: vrchat
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **VRChat** {% term integration %} connects your VRChat account to Home Assistant. It provides sensors for your account and your VRChat friends, so you can see their availability, status, and location.

## Prerequisites

You need a VRChat account with a username or email address and password. Signing in through a third-party OAuth provider is not supported. Accounts that only use a gaming platform sign-in, such as Steam, Meta, Pico, or Viveport, are also not supported. To use a platform account, [link or upgrade it to a VRChat account](https://help.vrchat.com/hc/en-us/articles/360062659053-I-want-to-turn-my-platform-account-through-Steam-Meta-Pico-or-Viveport-into-a-VRChat-account).

{% include integrations/config_flow.md %}

During setup, enter your VRChat username or email address and password. If your account uses two-factor authentication, enter the code from your authenticator app or email when prompted.

## Supported functionality

The integration provides the following sensors for your account and friends when VRChat provides the required information.

- **State**: The primary sensor for each account or friend. It uses the account or friend's name, summarizes their VRChat presence and status, and can display their user icon or avatar.
- **Status**: A user's selected VRChat status, with a status indicator.
- **Status description**: A user's custom status text, when it is available.
- **Location**: The user's VRChat world or a special location state, when available. It can display a world thumbnail when VRChat provides one.

## Data updates

The integration retrieves your account and friend information when it starts, then receives updates from VRChat through a persistent connection. It does not poll for updates.

## Known limitations

- The integration uses VRChat account credentials. It does not support third-party OAuth sign-in or platform-only accounts.
- Sensor availability and location details depend on the information VRChat makes available for each account or friend.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
