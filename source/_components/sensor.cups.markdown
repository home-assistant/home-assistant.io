---
layout: page
title: "CUPS Sensor"
description: "Instructions how to integrate CUPS sensors into Home Assistant."
date: 2016-10-30 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: cups.png
ha_category: System Monitor
ha_iot_class: "Local Polling"
ha_release: 0.32
---


The `cups` sensor platform is using the open source printing system [CUPS](https://www.cups.org/) to show details about your printers.

To set up the sensor the "Queue Name" of the printer is needed. The fastest way to get it, is to visit the CUPS web interface at "http://[IP ADDRESS PRINT SERVER]:631" and go to "Printers".

<p class='img'>
  <img src='{{site_root}}/images/screenshots/cups-sensor.png' />
</p>

To enable the CUPS sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: cups
    printers:
      - C410
      - C430
```

{% configuration %}
printers:
  description: List of printers to add.
  required: true
  type: list
host:
  description: IP address of the CUPS print server.
  required: false
  type: string
  default: 127.0.0.1
port:
  description: Port of the CUPS print server.
  required: false
  type: int
  default: 631
{% endconfiguration %}

<p class='note'>
You will need to install the `python3-dev` or `python3-devel` and the development files for CUPS (`libcups2-dev` or`cups-devel`) package on your system manually (eg. `sudo apt-get install python3-dev libcups2-dev` or `sudo dnf -y install python3-devel cups-devel`) along with a compiler (`gcc`).
</p>
