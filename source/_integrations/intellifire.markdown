---
title: IntelliFire
description: Instructions on the IntelliFire Fireplace integration for Home Assistant.
ha_category:
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: 2022.2
ha_codeowners:
  - '@jeeftor'
ha_domain: intellifire
ha_config_flow: true
---

IntelliFire Wi-Fi fireplace modules provide app-based and Alexa control to various brands fireplaces. These modules expose an unencrypted HTTP endpoint on the local network that provides status information. Additionally, with a cloud-obtained API token, the modules can receive control commands via the local network, or through a cloud base API.

{% include integrations/config_flow.md %}


### Sensor Types


The following sensors are available as either a **Binary Sensor** when dealing with on/off.


### Binary Sensor

- **Thermostat On** - Whether thermostat mode is enabled
- **Timer On** - Whether Timer mode is enabled.

### Sensor

- **Flame Height**: Numerical indicator of flame height, where `0` is the lowest setting.
- **Temperature**: Current ambient temperature as read by the fireplace remote.
- **Target Temperature**: If the thermostat is engaged this is the target temperature the fireplace will try to reach, as measured by the remote.
- **Fan Speed**: Numerical indicator of fan speed.
- **Timer End Time**: If the sleep timer is enabled, this is time it will finish.

### Switch

- **Flame** - Controls the flame - effectively the On/Off button for the fireplace.
- **Pilot** - Enable/Disable the pilot light

# Known Issues

- **Device Unavailable**: At times it appears the local `/poll` endpoint on the module stalls out. There is not a fix for this at the moment - but you can verify the issue by issuing a web-request to the interface such as `http://<FIREPLACE_IP>/poll`

- **Not responding to commands**: If the fire place is not responding commands you can attempt to issue a web-based reset.  Navigate to the [HHT Web Interface](http://iftapi.net/webaccess/login.html), log in, navigate to your location, then to the fireplace, and click the **Soft Reset** button. If that does not fix the issue then try to power cycle the unit.

- **SSL Connectivity**: If you are operating in a "strange" network environment such as behind a corporate firewall or behind a zero-trust network you may have to explore either of the two SSL options in the configuration.

  - Disable SSL Certificate Verification: If you are in a corporate network that uses SSL Inspection you may have have to disable checking client SSL certificates. Communications between Home Assistant and IFTAPI.net will still be encrypted.
  - Insecure (HTTP) Mode: Entirely disable SSL and operate in HTTP mode. 

# Debug Logging

If you want to debug a potential issue make sure to enable `debug` logging for both the integration `homeassistant.components.intellifire` and the backing module `intellifire4py`. Debug mode will give you some insight into the messages sent back and forth between the fireplace and Home Assistant.

```yaml
logger:
  default: INFO
  logs:
    homeassistant.components.intellifire: debug
    intellifire4py: debug
```
