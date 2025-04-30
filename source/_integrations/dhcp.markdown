---
title: DHCP discovery
description: Discover integrations on the network using DHCP protocol.
ha_category:
  - Network
ha_iot_class: Local Push
ha_release: 2021.2
ha_domain: dhcp
ha_quality_scale: internal
ha_codeowners:
  - '@bdraco'
ha_integration_type: system
---

The **DHCP discovery** {% term integration %} will watch the network for DHCP requests for supported devices and services. Discovered integrations will show up in the discovered section on the integrations page in the configuration panel.

## Configuration

This {% term integration %} is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually in the {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
dhcp:
```
