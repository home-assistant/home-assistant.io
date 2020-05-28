---
title: Philips TV
description: Instructions on how to add Philips TVs to Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 0.34
ha_codeowners:
  - '@elupus'
ha_domain: philips_js
---

The `philips_js` platform allows you to control Philips TVs which expose the [jointSPACE](http://jointspace.sourceforge.net/) JSON-API. Instructions on how to activate the API and if your model is supported can be found [here](http://jointspace.sourceforge.net/download.html). Note that not all listed, jointSPACE-enabled devices won't have JSON-interface running on port 1925. This is true at least for some models before year 2011.

To add your TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: philips_js
    host: 192.168.1.99
```

{% configuration %}
host:
  description: IP address of TV.
  required: true
  default: 127.0.0.1 (localhost).
  type: string
name:
  description: The name you would like to give to the Philips TV.
  required: false
  default: Philips TV
  type: string
turn_on_action:
  description: A script that will be executed to turn on the TV (can be used with wol).
  required: false
  type: list
api_version:
  description: The JointSpace API version of your Philips TV. This is an experimental option and not all the functionalities are guaranteed to work with API versions different from `1` and `5`.
  required: false
  default: 1
  type: integer
{% endconfiguration %}

<div class='note'>
When using api_version: 5 changing sources switches tv channels. Additionally this allows setting the volume level.
</div>

```yaml
# Example configuration.yaml with turn_on_action
media_player:
  - platform: philips_js
    host: 192.168.1.99
    turn_on_action:
      service: wake_on_lan.send_magic_packet
      data:
        mac: aa:bb:cc:dd:ee:ff
```
