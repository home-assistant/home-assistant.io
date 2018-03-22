---
layout: page
title: "Concord232 Alarm Control Panel"
description: "Instructions on how to integrate Interlogix/GE Concord4 with RS-232 Automation Control Module into Home Assistant."
date: 2016-10-11 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: interlogix.png
ha_category: Alarm
ha_release: 0.31
---

The `concord232` platform provides integration with GE, Interlogix (and other brands) alarm panels that support the RS-232 Automation Control Panel interface module (or have it built in). Supported panels include Concord 4.

To use this platform, you will need to have the external concord232 client and server installed. The server must be running on the device which is connected to the automation module's serial port. The client must be installed on the machine running Home Assistant. These may often be the same machine, but do not have to be. For additional details in setting up and testing the client and server, see <https://github.com/JasonCarter80/concord232>

To enable this platform in Home Assistant, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: concord232
```

Configuration variables:

- **host** (*Optional*): The host where the concord232 server process is running. Defaults to localhost.
- **port** (*Optional*): The port where the Alarm panel is listening. Defaults to 5007.
