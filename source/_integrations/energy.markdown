---
title: Energy
description: Support for the Energy Management Dashboard
ha_category:
  - Other
ha_release: 2021.8
ha_domain: energy
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
---

This integration handles the creation of the Home Assistant Energy Dashboard.  

You can read about the Home Assistant Energy initiative in this [blog post](https://www.home-assistant.io/blog/2021/08/04/home-energy-management/) for more information.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

Add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
energy:
```
{% my energy badge %} {% my config_energy badge %}
