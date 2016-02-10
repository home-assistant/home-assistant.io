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
---

[APCUPSd](http://www.apcupsd.org/) status information can be integrated into Home Assistant when the Network Information Server (NIS) [is configured](http://www.apcupsd.org/manual/manual.html#nis-server-client-configuration-using-the-net-driver).

Create an `apcupsd` section in your configuration, optionally containing the following parameters:

- **host**: The hostname/IP address on which the APCUPSd NIS is being served. Default: `localhost`
- **port**: The port on which the APCUPSd NIS is listening. Default: `3551`

#### Example

Use defaults:

```yaml
apcupsd:
```

Set parameters:

```yaml
apcupsd:
  host: 192.168.1.10
  port: 1234
```
