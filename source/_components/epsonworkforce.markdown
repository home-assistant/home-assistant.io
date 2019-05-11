---
layout: page
title: "Epson Workforce"
description: "Instructions on how to integrate Epson Workforce Printer into Home Assistant."
date: 2019-04-09 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: epson.png
ha_category:
  - Sensor
ha_release: 0.92
ha_iot_class: Local Polling
---

The `epson workforce` platform allows you to monitor the ink levels of a Epson Workforce printer from Home
Assistant.

To add Epson Workforce to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
   - platform: epsonworkforce
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
  description: The host name or address of the Epson workforce printer
  required: true
  type: string
monitored_conditions:
  description: The cartridge colours to monitor. 
  required: true
  type: map
  keys:
    black:
      description: The black ink cartridge
    yellow:
      description: The yellow ink cartridge.
    magenta:
      description: The magenta (=red) ink cartridge.
    cyan:
      description: The cyan (=blue) ink cartridge.      
    clean:
      description: The cleaning cartridge.      
{% endconfiguration %}

Supported devices:

- Epson Workforce printers who publish a HTTP page containing the ink cardridge levels

Tested devices:

- Epson WF3540

To make this module work you need to connect your printer to your LAN.
The best is to navigate to the IP of the printer to check if it shows a status page.
