---
title: UniFi Discovery
description: Discover UniFi devices on the network using the UniFi Discovery protocol.
ha_category:
  - Network
ha_iot_class: Local Polling
ha_release: '2026.5'
ha_domain: unifi_discovery
ha_quality_scale: internal
ha_codeowners:
  - '@RaHehl'
ha_integration_type: system
ha_config_flow: true
ha_ssdp: true
ha_dhcp: true
---

The **UniFi Discovery** {% term integration %} scans the local network for UniFi devices using the UniFi Discovery protocol. Discovered devices are automatically forwarded to their respective integrations, such as [UniFi Access](/integrations/unifi_access/), [UniFi Network](/integrations/unifi/), and [UniFi Protect](/integrations/unifiprotect/), for setup. Discovered integrations will show up in the discovered section on the integrations page in the configuration panel.

This is a system integration that runs in the background. It does not create any entities itself, but acts as a central discovery provider for UniFi-based integrations.

## How discovery works

When Home Assistant starts, this integration begins scanning the local network for UniFi devices using the UniFi discovery protocol, similar to how the UniFi Network app finds devices. This scan repeats every 60 minutes. Additionally, the integration listens for devices joining the network through DHCP (using known Ubiquiti MAC address prefixes) and SSDP (UPnP announcements from UniFi consoles).

When a device is found, the integration checks the device's advertised services and creates a discovery flow for the matching Home Assistant integration. For example, a device running UniFi Protect triggers a discovery flow for the [UniFi Protect](/integrations/unifiprotect/) integration.

## Configuration

This {% term integration %} is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
unifi_discovery:
```

## Discovered integrations

The following integrations are automatically discovered by the UniFi Discovery integration:

- [UniFi Access](/integrations/unifi_access/)
- [UniFi Network](/integrations/unifi/)
- [UniFi Protect](/integrations/unifiprotect/)
