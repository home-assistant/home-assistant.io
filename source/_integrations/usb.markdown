---
title: USB Discovery
description: Discover usb devices on the host.
ha_category:
  - Utility
ha_iot_class: Local Push
ha_release: 2021.9
ha_domain: usb
ha_quality_scale: internal
ha_codeowners:
  - '@bdraco'
ha_integration_type: system
---

The **USB Discovery** {% term integration %} will detect newly connected USB devices. Discovered devices will show up in the discovered section on the integrations page in the configuration panel.

- On all supported systems, devices are detected during startup.
- On Linux systems that have functional `udev` support, including Home Assistant Operating System, devices are detected as soon as they are plugged in.
- On non-Linux systems or systems without `udev` support, devices are detected when visiting the integrations page and during onboarding.

## Configuration

This {% term integration %} is part of [`default_config:`](/integrations/default_config/) if you have opted to not use [`default_config:`](/integrations/default_config/)you can add this {% term integration %} by adding the following lines to your {% term "`configuration.yaml`" %}

```yaml
# Example configuration.yaml entry
usb:
```
