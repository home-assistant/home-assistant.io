---
title: "Dobiss Integration"
description: "Home Assistant integration for communication with a Dobiss NXT server."
ha_release: "0.1"
ha_category: Integration
ha_iot_class: "Local Polling"
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@kobedemetser'
ha_domain: dobiss
related:
  - docs: /integrations/dobiss
    title: Dobiss Integration Overview
---

# Dobiss Integration

**Community & Support:**
- [Discord](https://discord.gg/Qa5fW2R)
- [Home Assistant Forum](https://community.home-assistant.io/)

## About

The Dobiss integration enables Home Assistant to communicate with a [Dobiss](https://www.dobiss.com/en) NXT server and supports the following platforms:

| Platform        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `binary_sensor` | Represents Dobiss contacts, which can be open or closed.          |
| `sensor`        | Monitors temperature and light levels.                             |
| `switch`        | Controls relay outputs, flags, and scenarios.                     |
| `light`         | Manages dimmable and non-dimmable lights.                         |
| `climate`       | Manages temperature zones for climate control.                    |
| `cover`         | Controls covers and similar devices.                              |

## Installation

1. In the Home Assistant UI, go to **Settings** > **Devices & Services**.
2. Click the **Add Integration** button.
3. Search for "Dobiss" and follow the on-screen instructions to complete the installation.

## Configuration

Configuration is handled via the Home Assistant UI. No manual YAML configuration is required.

## Dependencies

This integration uses the [`pydobiss`](https://pypi.org/project/pydobiss/) Python library, which communicates with the native [Dobiss NXT API](http://support.dobiss.com/books/nl-dobiss-nxt/page/developer-api).

## Credits

This integration is based on the work of [@kesteraernoudt](https://github.com/kesteraernoudt) and uses templates from [@oncleben31](https://github.com/oncleben31) and [@Ludeeus](https://github.com/ludeeus).
