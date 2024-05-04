---
title: Intelligent Storage Acceleration
description: Intelligent Storage Acceleration
ha_release: 2024.6
ha_category:
  - Other
ha_codeowners:
  - '@bdraco'
ha_domain: isal
ha_integration_type: system
ha_quality_scale: internal
ha_iot_class: Local Push
---

Intelligent Storage Acceleration (`isal`) is used for accelerating `aiohttp`. `zlib` is be a bottleneck for `aiohttp`, especially for websocket connections.

## Configuration

Configuration of this integration only applies to core install types. Container based installs already have `isal` pre-installed and no action is required.

If your system supports [`isal`](https://github.com/pycompression/python-isal), it can be enabled with the following configuration:

```yaml
# Example configuration.yaml entry
isal:
```