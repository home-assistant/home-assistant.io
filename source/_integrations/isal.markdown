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
ha_iot_class: Local Polling
---

[`zlib`](https://github.com/madler/zlib) is a bottleneck for [`aiohttp`](https://github.com/aio-libs/aiohttp), especially for WebSocket connections. [Intelligent Storage Acceleration](https://github.com/intel/isa-l), is used for accelerating [`aiohttp`](https://github.com/aio-libs/aiohttp) since it can [speed up](https://github.com/pycompression/python-isal/tree/develop/benchmark_scripts) compression as much as 5x.

## Configuration

{% term "Home Assistant Operating System" %} and {% term "Home Assistant Container" %} installations already have `isal` pre-installed, and no action is required.

If for some reason you have removed it, and your system supports [`isal`](https://github.com/pycompression/python-isal), it can be enabled with the following configuration:

```yaml
# Example configuration.yaml entry
isal:
```
