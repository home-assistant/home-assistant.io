---
layout: page
title: "IPP Printer Sensor"
description: "Instructions on how to integrate IPP printers into Home Assistant."
date: 2019-04-28 12:34
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
ha_release: 0.93
ha_iot_class: Local Polling
redirect_from:
  - /components/sensor.ipp_printer/
---

The `IPP printer` platform shows the status and the ink / toner levels of your printer.
This component is based on the [IPP Protocol](https://en.wikipedia.org/wiki/Internet_Printing_Protocol), which is implemented in the majority of internet printers.

To set up the sensor you have to provide the address of your printers, which can be obtained on the web interface of your device at "http://[YOUR PRINTER ADDRESS]/".
If you can't find the address, you can try with "ipp://[YOUR PRINTER ADDRESS]/ipp/print"

To enable the IPP sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ipp_printer
    printers:
      - ipp://192.168.1.50/ipp/print
      - ipp://192.168.1.75:631/ipp/printer
```

{% configuration %}
printers:
  description: "List of printer addresses to add. It should be in this format: ipp://[PRINTER ADDRESS]:[PRINTER PORT]/[PATH]. If the port is not provided, port 631 will be used."
  required: true
  type: list
{% endconfiguration %}

<p class='note'>
As this platform uses the CUPS libraries for making IPP requests, you will need to install the `python3-dev` or `python3-devel` and the development files for CUPS (`libcups2-dev` or`cups-devel`) package on your system manually (eg. `sudo apt-get install python3-dev libcups2-dev` or `sudo dnf -y install python3-devel cups-devel`) along with a compiler (`gcc`).
</p>
 
