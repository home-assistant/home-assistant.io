---
title: Sony Bravia TV
description: Instructions on how to integrate a Sony Bravia TV into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.23
ha_iot_class: Local Polling
ha_codeowners:
  - '@robbiet480'
ha_domain: braviatv
---

The `braviatv` platform allows you to control a [Sony Bravia TV](https://www.sony.com/).

Almost all [Sony Bravia TV 2013 and newer](https://info.tvsideview.sony.net/en_ww/home_device.html#bravia) are supported. A more generic method for older TVs connected to a Raspberry Pi with HDMI-CEC is explained further below.

You will need to configure your TV to allow the Home Assistant for remote usage. To do that, ensure that your TV is turned on. Open the configuration popup on Home Assistant and enter a random PIN (for example 0000). After that, the TV will show you a PIN and Home Assistant will allow you to re-enter that PIN. Enter the PIN shown on your TV and Home Assistant will be able to control your Sony Bravia TV.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: braviatv
    host: 192.168.0.10
```

{% configuration %}
host:
  description: The IP of the Sony Bravia TV, e.g., 192.168.0.10
  required: true
  type: string
name:
  description: The name to use on the frontend.
  required: false
  default: Sony Bravia TV
  type: string
{% endconfiguration %}

You are also able to configure the TV manually by placing a `bravia.conf` file in your [configuration directory](/docs/configuration/) with the following information - please update the details to match your setup:

```json
{"192.168.0.10": {"pin": "7745", "mac": "ac:1e:0a:e1:0c:01"}}
```

## For TVs older than 2013

Users of TVs older than 2013 have another option for controlling their TV via Home Assistant.

### Using HDMI-CEC

If you have a Raspberry Pi connected to your TV:

```yaml
switch:
  - platform: command_line
    switches:
      tv_rpi:
        command_on: ssh root@[IP] "echo 'on 0' | cec-client -s"
        command_off: ssh root@[IP] "echo 'standby 0' | cec-client -s"
        command_state: ssh root@[IP] "echo 'pow 0' | cec-client -s |grep 'power status:'"
        value_template: {% raw %}'{{ value == "power status: on" }}{% endraw %}'
```

Using `cec-client` is a great method to turn your TV off/on, however the trade off is if you're using Kodi, it will no longer be able to control your TV using the TV Remote.

This is because only one process can control the CEC functionality within the Raspberry Pi at a time and running the above commands terminates the functionality inside libCEC within Kodi. Kodi must be restarted for TV remove functionality to work again.

**Workaround:**

If your desire is only to turn on your TV, the following "workaround" may be desirable:

Change the 'on' command to a restart for Kodi. This doesn't reboot the Kodi device.

Restarting Kodi will trigger a HDMI-CEC event to bring the TV out of standby. The following can replace your TV 'on' command.

```yaml
command_on: ssh root@[IP] "systemctl restart kodi"
```
