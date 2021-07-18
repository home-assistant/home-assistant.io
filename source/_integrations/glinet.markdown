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

GL-inet are a Hong-Kong based company who produce highly customizable home routers. They are based on the very common OpenWRT firmware but provide a much more user-friendly user interface than OpenWRT's LUCI.

There is currently support for the following device types within Home Assistant:

- **Presence Detection** - The GL-inet platform offers presence detection by looking at connected devices to a GL-inet based router.

Upder development:
- **Sensor** - The GL-inet sensor platform could allow you to get upload and download data from your router within Home Assistant.
- **Switch** - The GL-inet switch platform could allow you to activate and deactivate your VPN from homeassistant

## Configuration
<div class='note warning'>

You need to know your router's IP address and login password - the defualts for GL-inet routers are `192.168.8.1` and `goodlife`. For security reasons you should change your password to something more secure.

</div>

To add devices to track into your Home Assistant installation, go to:

**Configuration** -> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **GL-inet**. Then complete the pop up with your router address in the format `http://192.168.0.1` and the password.
**Note**: The router password **is** stored by HomeAssistant as the API access tokens will expire


## Usage
Navigate to **Configuration** -> **People**, click a person and then select 'Pick device to track'. You are done! Read more about the [Person intergration](https://www.home-assistant.io/integrations/person/)
<div class='note warning'>
The intergration will attempt to give each device a readable name like `device_tracker.myIphone`. However if it cannot the device will recieve a name like `device_tracker.b8_27_eb_53_a2_4f`, this is based on the device's unique [MAC address](https://kb.netgear.com/1005/How-do-I-find-my-device-s-MAC-address).

</div>


## Integration Options

It is possible to change some behaviors through the integration options. These can be changed at **GL-inet** -> **Configure** on the Integrations page.

- **Consider home**: Number of seconds that must elapse before considering a disconnected device "not at home"

**Note**: The intergration will automatically add every now device that connects to your network. Once you have selected the devices you want to track, disable the integration system option `Enable new added entities`
