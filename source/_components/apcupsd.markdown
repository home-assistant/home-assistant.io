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
ha_category: System Monitor
ha_release: 0.13
---

[APCUPSd](http://www.apcupsd.org/) status information can be integrated into Home Assistant when the Network Information Server (NIS) [is configured](http://www.apcupsd.org/manual/manual.html#nis-server-client-configuration-using-the-net-driver) is enabled on the APC device.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
apcupsd:
```

{% configuration %}
host:
  description: The hostname/IP address on which the APCUPSd NIS is being served.
  required: false
  type: string
  default: localhost
port:
  description: The port on which the APCUPSd NIS is listening.
  required: false
  type: integer
  default: 3551
{% endconfiguration %}

