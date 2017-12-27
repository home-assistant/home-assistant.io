---
layout: page
title: "APCUPSd"
description: "Instructions on how to integrate APCUPSd status with Home Assistant."
date: 2016-02-10 17:11
sidebar: true
comments: false
sharing: true
footer: true
logo: apcupsd.png
ha_category: Hub
ha_release: 0.13
requirement: hardware
---

[APCUPSd](http://www.apcupsd.org/) status information can be integrated into Home Assistant when the Network Information Server (NIS) [is configured](http://www.apcupsd.org/manual/manual.html#nis-server-client-configuration-using-the-net-driver) is enabled on the APC device.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
apcupsd:
```

Configuration variables:

- **host** (*Optional*): The hostname/IP address on which the APCUPSd NIS is being served. Defaults to `localhost`.
- **port** (*Optional*): The port on which the APCUPSd NIS is listening. Defaults to `3551`.

