---
layout: page
title: "Epson Workforce Printer"
description: "Instructions on how to integrate Epson Workforce Printer into Home Assistant."
date: 2019-04-09 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: epson.png
---

The `epson workforce printer` platform allows you to monitor the ink levels of a Epson Workforce printer from Home
Assistant.

To add Epson Workforce Printer to your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
   - platform: epsonworkforceprinter
     host: IP_ADDRESS
     monitored_conditions:
     - black
     - yellow
     - magenta
     - cyan
     - clean   
```

{% configuration %}
host:
  description: The host name or address of the Epson printer
  required: true
  type: string
monitored_conditions:
  description: The cartridge colours to monitor. Valid values are: black,yellow,magenta,cyan and clean. Clean is the cleaning cartridge
  required: true
  type: list 
{% endconfiguration %}

Supported devices:
- Epson Workforce printers who publish a HTTP page containing the ink cardridge levels

Tested devices:
- Epson WF3540

To make this module work you need to connect your printer to your LAN.
The best is to navigate to the IP of the printer to check.
