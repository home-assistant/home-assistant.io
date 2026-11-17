---
description: Instructions on how to integrate LeaOne devices into Home Assistant.
ha_release: 2024.2
ha_domain: leaone
---

Integrates LeaOne health devices into Home Assistant.

LeoOne produces Bluetooth scales and other health devices under the Xiaogui and BAGAIL brands.

## Supported devices

- Bluetooth scale TZC4 (metric)
- Bluetooth scale TZC4 (imperial)
- Bluetooth scale QJ-J (metric)

The LeaOne integration cannot automatically discover devices because the LeaOne Bluetooth design uses non-standard discovery.

{% include integrations/config_flow.md %}
