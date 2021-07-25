---
title: GL-inet
description: Instructions on how to integrate a GL-inet router into Home Assistant.
ha_category:
  - Hub
  - Presence Detection
ha_release: 2021.8
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@HarvsG'
ha_domain: glinet
ha_platforms:
  - device_tracker
---

[GL-inet](https://www.gl-inet.com/) are a Hong-Kong based company that produce highly customizable home routers. They are based on the very common [OpenWrt](https://openwrt.org/) firmware but provide a much more user-friendly user interface than OpenWrt's LUCI.

There is currently support for the following device types within Home Assistant:

- **Presence Detection** - Presence detection by looking at connected devices to a GL-inet based router.

{% include integrations/config_flow.md %}

## Usage
Navigate to **Configuration** -> **People**, click a person and then select 'Pick device to track'. You are done! Read more about the [Person integration](https://www.home-assistant.io/integrations/person/)
<div class='note warning'>

The integration will attempt to give each device a readable name like `device_tracker.myIphone`. However if it cannot, the device will receive a name like `device_tracker.b8_27_eb_53_a2_4f`, this is based on the device's unique [MAC address](https://kb.netgear.com/1005/How-do-I-find-my-device-s-MAC-address). You can rename the device to something more readable.

</div>


{% include integrations/option_flow.md %}
{% configuration_basic %}
Consider home: Number of seconds that must elapse before considering a disconnected device "not at home".
{% endconfiguration_basic %}

<div class='note warning'>
  
**Note**: The integration will automatically add every nee device that connects to your network. Once you have selected the devices you want to track, disable the integration system option `Enable new added entities`

</div>
