---
layout: page
title: "VLC Telnet"
description: "Instructions on how to integrate VLC media player into Home Assistant using the telnet interface."
date: 2019-06-02 23:58
sidebar: true
comments: false
sharing: true
footer: true
logo: videolan.png
ha_category:
  - Media Player
ha_release: 0.95
ha_iot_class: Local Polling
redirect_from:
 - /components/media_player.vlc/
---

The `vlc-telnet` platform allows you to control a [VLC media player](http://www.videolan.org/vlc/index.html) using the built in telnet interface.

To add a VLC media player to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: vlc-telnet
    host: IP_ADDRESS
    password: PASSWORD
```

{% configuration %}
name:
  description: The name to use in the frontend. The default value is *VLC-TELNET*
  required: false
  type: string
pasword:
  description: The password to control the VLC through the telnet interface.
  required: true
  type: string
host:
  description: The hostname or IP address where the VLC Player is running.
  required: true
  type: string
port:
  description: The port number where the VLC Player is running. The default value is *4212*
  required: false
  type: integer
{% endconfiguration %}

Only the "music" media type is supported for now.

This service will control any instance of VLC player on the network with the telnet interface activated. To activate the telnet interface on your VLC Player please read the [official VLC documentation](https://wiki.videolan.org/Documentation:Modules/telnet/).

## {% linkable_title Full configuration %}

A full configuration for VLC could look like the one below:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: vlc-telnet
    name: speaker_1
    host: "192.168.1.56"
    port: 4321
    password: "secure_password"
```

##### {% linkable_title Additional configuration for Rasperry Pi %}

You can run a VLC Media Player inside your Hassio installation using the [hassio-local-vlc add-on](https://github.com/rodripf/hassio-local-vlc). Using it you can play files on the local network, Internet or files and playlist locally saved to the /share folder of your Hassio installation.
