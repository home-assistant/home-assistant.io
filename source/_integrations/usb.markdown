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
---

The USB Discovery integration will watch the host for USB devices. Discovered integrations will show up in the discovered section on the integrations page in the configuration panel.

- On all supported systems, devices are detected at startup.
- On Linux systems that have functional `udev` support, including Home Assistant Operating System, devices are detected as soon as they are plugged in.
- On non-Linux systems or systems without `udev` support, devices are detected when visiting the integrations page and during onboarding.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
usb:
```
