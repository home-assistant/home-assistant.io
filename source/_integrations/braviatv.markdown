---
title: Sony Bravia TV
description: Instructions on how to integrate a Sony Bravia TV into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.23
ha_iot_class: Local Polling
ha_codeowners:
  - '@robbiet480'
  - '@bieniu'
ha_domain: braviatv
ha_config_flow: true
---

The `braviatv` platform allows you to control a [Sony Bravia TV](https://www.sony.com/).

Almost all [Sony Bravia TV 2013 and newer](https://info.tvsideview.sony.net/en_ww/home_device.html#bravia) are supported. A more generic method for older TVs connected to a Raspberry Pi with HDMI-CEC is explained further below.

You can setup the Sony Bravia TV via **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select Sony Bravia TV.

<div class="note warning">

If the PIN code is not shown on the TV screen during setup, you need to unregister `Home Assistant` on the TV, go to: **Settings** -> **Network** -> **Remote device settings** -> **Deregister remote device** (names of menu items on different TV models may be slightly different).

</div>

If you have following configuration in your `configuration.yaml` file it will be imported to the Integrations:

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

<div class="note warning">

A new setup via `configuration.yaml` file is not possible.

</div>

## Extra configuration for the integration

The integration allows you to change ignored TV sources from the front end. Enter which Sony Bravia TV integration you want to change options on and press the cog wheel.

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
