---
title: "OpenWRT"
description: "Instructions on how to integrate OpenWRT routers into Home Assistant."
logo: openwrt.png
ha_category:
  - Presence Detection
ha_release: pre 0.7
---

There are _multiple_ ways of integrating an OpenWRT router for presence detection. A broad distinction can be made between presence detection methods which actively scan for devices (by default every 12 seconds) and those that are notified by some external service on changes. It is essentially a problem of synchronizing states between two remote machines.

* __active scanning__  
  Scan for devices regularly.
  * Advantages:
    * robust on an unreliable set-up where the the router may not be reachable occasionally
  * Disadvantages:
    * average six-second delay between connecting and being registered as `home`
    * lots of unnecessary network requests
  * Examples: 
    * [ubus](/integrations/ubus)
    * [luci](/integrations/luci)
* __passive/event-based__  
  External services which notify Home Assistant of devices via the [REST API endpoint](https://developers.home-assistant.io/docs/en/external_api_rest.html). 
  * Advantages: 
    * devices typically registered in under one second when they connect
    * very few network requests
  * Disadvantages:
    * prone to missed events when connectivity between Home Assistant and the router is not guaranteed
  * Examples:
    * [openwrt_hass_devicetracker](https://github.com/mueslo/openwrt_hass_devicetracker)
    * your own custom script

### Event-based device tracker

This can be achieved by running a simple shell script on the OpenWRT router which calls the appropriate Home Assistant service. An OpenWRT package which does this is listed above. As this method directly calls the [service API](https://developers.home-assistant.io/docs/en/external_api_rest.html#post-api-services-lt-domain-lt-service), no special configuration is necessary on the Home Assistant side, except for ensuring the device_tracker API is running, which is achieved by adding the following to your `configuration.yaml` file:

```yaml
device_tracker:
```

To get the best of both worlds, you can combine the two approaches, running both a periodic device scanner and an event-based device tracker.

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
