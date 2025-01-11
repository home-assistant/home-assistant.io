---
title: UniFi Access
description: Instructions on how to configure UniFi Access integration for lock management.
ha_category:
  - Lock
ha_release: 2025.2
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@hagen93'
ha_domain: unifi_access
ha_platforms:
  - lock
ha_integration_type: entity
---

UniFi Access by [Ubiquiti Networks, Inc.](https://www.ui.com/) is a software and hardware platform for managing door access control. This integration supports managing lock entities through Home Assistant.

## Prerequisites

### Hardware support

This integration supports UniFi Access devices connected to a UniFi controller system.

### Software support

Ensure you are using the latest stable version of UniFi Access software. Early Access and Release Candidate versions are **not supported**.

{% important %}
**Early Access versions are not supported by Home Assistant.**

Using Early Access or Release Candidate versions of UniFi Access can introduce unexpected changes. If something breaks in Home Assistant while using these versions, support will only be available once that version becomes a stable release.
{% endimportant %}

### API key

You need an API key in your UniFi Access system with permissions to control locks.

1. Log in to your UniFi Access system.
2. Navigate to **Access setting page** and select the **Advanced** tab.
3. Create a new API key with access to editing locations.

## Features

This integration provides support for controlling and monitoring lock entities managed by UniFi Access.

### Lock control

You can unlock supported doors through the Home Assistant interface or automations. These entities will automatically update when there are changes.

## Configuration

This integration uses a config flow, so all setup is done via the Home Assistant user interface.

1. Go to **Settings** > **Devices & Services** in Home Assistant.
2. Click **Add Integration** and search for **UniFi Access**.
3. Enter the required information:
   - Host (IP address or hostname of the UniFi Access controller) and port (defaults to 12445).
   - API key
4. Follow the prompts to complete the setup.

## Troubleshooting

### Debugging integration

If you encounter issues, you can enable debug logging for this integration to gather more details.

```yaml
logger:
  default: info
  logs:
    aiohttp: debug
    homeassistant.components.unifi_access: debug
```
