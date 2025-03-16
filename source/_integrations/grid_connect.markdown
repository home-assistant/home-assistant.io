---
title: "Grid-Connect Integration"
description: "Instructions on how to set up the Grid-Connect integration within Home Assistant."
ha_category: "Integration"
ha_iot_class: "Local Polling"
ha_release: "2025.3.3"
ha_config_flow: true
ha_domain: "grid_connect"
ha_codeowners:
  - "@Dangerdangerau"
ha_platforms:
  - binary_sensor

ha_dhcp: true
ha_integration_type: "hub"
---

The Grid-Connect integration allows you to control and monitor devices that are part of the Grid-Connect ecosystem within Home Assistant.

## Prerequisites

- A Grid-Connect device compadible with this intergation.
- A working home assistant instance.
- Devices must be connected to the same local network as Home Assistant.

## Configuration

To set up the Grid-Connect integration:

1. Go to HACS and search for grid connect
2. click install, use the latest version
3. go to devices & servies -> add intergation -> grid connect

## Supported Platforms

The Grid-Connect integration supports the following platforms:

- **binary_sensor** (Motion)

## Device Status

The integration polls devices periodically to update their status. Ensure that your devices are online and connected to the network for accurate status reporting.

## Troubleshooting

If you encounter issues:

- Go to [Discord url](https://discord.gg/nmDwHeSpNX)

## Resources

- [Grid-Connect Integration Documentation](https://github.com/Dangerdangerau/Grid-Connect)

