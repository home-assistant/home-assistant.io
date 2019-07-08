---
layout: page
title: "Lightwave Energy Monitor"
description: "Instructions on how to integrate Lightwave Energy monitor with Home Assistant"
date: 2019-08-04 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lightwave.png
ha_category:
  - Energy
ha_release: "0.95.4"
ha_iot_class: Local Polling
redirect_from:
  - /components/lightwave_energy/
---

[Lightwave Energy](https://lightwaverf.com/products/jsjslw600-lightwaverf-electricity-monitor-and-energy-monitor) integration for Home Assistant allows you to connect Lightwave Energy monitor to Home Assistant

This solution generates two sensors within Home Assistant, one which displays the current usage (in W) and the other is the total amount of electricity used today (in kWh)


```yaml
# Example configuration.yaml entry

sensor lightwave_energy:
  - platform: lightwave_energy
    scan_interval: 30
```

# System Setup
The lightwave energy monitor sqawks its data every 15 seconds to the lightwaveRF link. It is not necessary to link the Home Assistant server to the link, all we need to do is listen to port 9761/udp. 

You will need ensure your firewall allows port 9761/udp in for this integration to work


E.g. In Ubuntu 19.04
```
  sudo ufw allow 9761/udp
```

{% configuration %}
  scan_interval:
    description: The update interval in seconds
    required: false
    type: integer
    default: 60
{% endconfiguration %}
