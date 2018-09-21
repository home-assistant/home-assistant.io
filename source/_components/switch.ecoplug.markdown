

This allows you to control and monitor EcoPlugs on your network. Devices are auto-discovered and added. Names are pulled from their setup names in the EcoPlugs app.

To enable this switch, you first have to set up your devices in the EcoPlug App, and add the following lines to your `configuration.yaml` file:

{% configuration %}
switch:
  - platform: ecoplug
 {% endconfiguration %}


Configuration variables:
- **scan_interval** (*Optional*): Amount of time (in seconds) before checking device's state on the network. Default is 5.




---
layout: page
title: EcoPlug/Wion Switch
description: "Instructions on how to set up an EcoPlug-Compatible switch within Home Assistant."
date: 2018-06-25 14:04
sidebar: true
comments: false
sharing: true
footer: true
logo: ecoplug.png
ha_category: Switch
ha_release: 0.73
featured: false
ha_iot_class: "Local Polling"
---

The `ecoplug` support is integrated into Home Assistant as a switch platform. Devices that use the EcoPlugs app are typically compatible with this component.

Example of devices:

- [EcoPlugs Wifi Switches](http://www.eco-plugs.net)
- [EcoPlugs Outdoor Outlet](https://www.amazon.com/Plugs-Outdoor-Wi-Fi-Controlled-Outlets/dp/B0752R52GY)
- [Woods/WiOn Wifi Plug](https://www.amazon.com/50050-Indoor-Grounded-Outlet-White/dp/B00ZYLRQNE/ref=pd_sim_60_6?_encoding=UTF8&pd_rd_i=B00ZYLRQNE&pd_rd_r=4XJ4X1016GY1MMHRW6SD&pd_rd_w=bwROv&pd_rd_wg=0HcHA&psc=1&refRID=4XJ4X1016GY1MMHRW6SD)


### {% linkable_title Configuration Details %}


To enable those lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: ecoplug
```

Configuration variables:

- **scan_interval** (*Optional*): Amount of time (in seconds) before checking device's state on the network. Default is 5.

### {% linkable_title Example configuration %}

Will automatically scan for changes in plugs' statuses every 20 seconds:

```yaml
# Example configuration.yaml entry
switch:
  - platform: ecoplug
    scan_interval: 20
```
