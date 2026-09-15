---
title: Internet Printing Protocol (IPP)
description: Instructions on how to integrate printers that support the Internet Printing Protocol (IPP) into Home Assistant.
ha_category:
  - System monitor
ha_release: 0.108
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ctalkington'
ha_domain: ipp
ha_platforms:
  - diagnostics
  - sensor
ha_zeroconf: true
ha_integration_type: device
---

The **Internet Printing Protocol (IPP)** {% term integration %} allows you to read current data from your networked printer that supports the [Internet Printing Protocol](https://www.pwg.org/ipp/everywhere.html).

It provides information about the printer's state, remaining ink levels, and page counters.

{% include integrations/config_flow.md %}

## Supported functionality

### Sensors

In addition to the printer state and the ink or toner levels, the integration provides the following diagnostic sensors. Each sensor is only created when the printer reports the corresponding IPP page counter, so printers without page counters get no additional entities.

- **Pages completed**: Total number of pages printed.
- **Impressions completed**: Total number of impressions printed. An impression is one side of a sheet.
- **Media sheets completed**: Total number of sheets of media used.
- **Monochrome impressions completed**: Impressions printed in monochrome, on printers that report color-separated counters.
- **Color impressions completed**: Impressions printed in color, on printers that report color-separated counters.

## Data updates

The integration {% term polling polls %} the printer every 60 seconds to update the printer state, the remaining ink or toner levels, and the page counters.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
