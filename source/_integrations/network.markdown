---
title: Network configuration
description: Network configuration for Home Assistant
ha_category:
  - Other
ha_release: 2021.6
ha_domain: network
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

The **Network configuration** {% term integration %} provides network configuration for integrations such as [Zeroconf](/integrations/zeroconf/). It is managed by going to **{% my network title="Settings > System > Network" %}** and is only available to users that have "Advanced Mode" enabled on their {% my profile title="user profile" %}.

**{% my general badge %}**

## Auto detection

Auto detection is based on the system routing next hop for the mDNS broadcast address (`224.0.0.251`).

If the next-hop has non-loopback, non-link-local, non-multicast addresses, auto detection will use the interface that corresponds to the next-hop (commonly referred to as the default interface).

If the next-hop cannot be detected or is a loopback address, auto detection will use all interfaces with non-loopback, non-link-local, non-multicast addresses. 

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

Add the following section to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
network:
```
