---
title: Network Configuration
description: Network Configuration for Home Assistant
ha_category:
  - Other
ha_release: 2021.6
ha_domain: network
ha_iot_class:
ha_codeowners:
  - '@home-assistant/core'
---

This integration provides network configuration for Home Assistant, and is managed by going to **{% my general title="Configuration >> General" %}** .

**{% my general badge %}**

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

Add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
network:
```
