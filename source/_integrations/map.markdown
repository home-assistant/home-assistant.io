---
title: Map
description: Offers a map to show tracked devices.
logo: home-assistant.png
ha_category:
  - Other
ha_release: 0.56
ha_quality_scale: internal
---

This offers a map on the frontend to display the location of tracked devices. To set up tracked devices, look at the [device tracker](/integrations/device_tracker/) documentation. This integration is by default enabled, unless you've disabled or removed the [`default_config:`](https://www.home-assistant.io/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
map:
```

<div class='note'>
Devices that are currently at home won't show on the map.
</div>
