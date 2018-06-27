---
layout: page
title: "Apple Airport"
description: "Instructions on how to integrate Apple Airport routers into Home Assistant."
date: 2018-03-09 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: apple.png
ha_category: Presence Detection
ha_release: pre 0.7
---

Apple Airport routers could be configured (by the Windows version of Airport Utility) to send syslog messages to a syslog server. This is why this intergration can be archieved.

This is a passive/event-driven device tracker, similar to [openwrt_hass_devicetracker](https://github.com/mueslo/openwrt_hass_devicetracker). Besides a device_tracker components, there alse has a binary_sensor for monitoring the connection status of Internet (WAN).

[Details on github repo](https://github.com/xcray/Apple_Airport_hass_devicetracker_and_Internet_Connection_Sensor)

### {% linkable_title Active vs Passive: %}

* __active scanning__  
  Scan for devices regularly.
  * Advantages:
    * robust on an unreliable set-up where the the router may not be reachable occasionally
  * Disadvantages:
    * average six-second delay between connecting and being registered as `home`
    * lots of unnecessary network requests
  * Examples: 
    * [ubus](/components/device_tracker.ubus/)
    * [luci](/components/device_tracker.luci/)
* __passive/event-based__  
  External services which notify Home Assistant of devices via the [REST API endpoint](/developers/rest_api.markdown). 
  * Advantages: 
    * devices typically registered in under one second when they connect
    * very few network requests
  * Disadvantages:
    * prone to missed events when connectivity between Home Assistant and the router is not guaranteed
  * Examples:
    * [openwrt_hass_devicetracker](https://github.com/mueslo/openwrt_hass_devicetracker)
    * [this one](https://github.com/xcray/Apple_Airport_hass_devicetracker_and_Internet_Connection_Sensor)

### {% linkable_title Event-based device tracker %}

This can be achieved on the base of rsyslog service (pre-installed on most Linux platforms) with a simple python script on any host, the same one running hass is the best choice for most cases. After recieving a syslog message come from the Airport router, rsyslog will transfer the message to the python script via it's "omprog" interface, and then the python script calls the appropriate Home Assistant service.

As this method directly calls the [service API](/developers/rest_api.markdown#post-apiservicesltdomainltservice), no special configuration is necessary on the Home Assistant side, except for ensuring the device_tracker API is running, which is achieved by adding the following to your `configuration.yaml` file:

```yaml
device_tracker:
```

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
