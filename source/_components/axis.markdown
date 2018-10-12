---
layout: page
title: "Axis"
description: "Instructions on how to setup devices from Axis Communications within Home Assistant."
date: 2017-04-30 23:04
sidebar: true
comments: false
sharing: true
footer: true
logo: axis.png
ha_category: Camera
ha_release: "0.45"
ha_iot_class: "Local Polling"
---

[Axis Communications](https://www.axis.com/) devices are surveillance cameras and other security-related network connected hardware. Sensor API works with firmware 5.50 and newer.

Home Assistant will automatically discover their presence on your network.

## {% linkable_title Configuration %}

You can also manually configure your devices by adding the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
axis:
  m1065lw:
    host: IP ADDRESS
    include:
      - camera
```

{% configuration %}
device:
  description: A unique name
  required: true
  type: string
host:
  description: The IP address to your Axis device.
  required: true
  type: string
username:
  description: The username to your Axis device.
  required: false
  default: root
  type: string
password:
  description: The password to your Axis device.
  required: false
  default: pass
  type: string
trigger_time:
  description: Minimum time (in seconds) a sensor should keep its positive value.
  required: false
  default: 0
  type: integer
port:
  description: Configure port web server of device is accessible from.
  required: false
  default: 80
  type: integer
location:
  description: Physical location of your Axis device.
  required: false
  default: not set
  type: string
include:
  description: This cannot be empty else there would be no use adding the device at all.
  required: true
  type: map
  keys:
    camera:
      description: Stream MJPEG video to Home Assistant.
    motion:
      description: The built-in motion detection in Axis cameras.
    vmd3:
      description: ACAP Motion Detection app which has better algorithms for motion detection.
    pir:
      description: PIR sensor that can trigger on a motion.
    sound:
      description: Sound detector.
    daynight:
      description: Certain cameras have day/night mode if they have built-in IR lights.
    tampering:
      description: Signals when camera believes that it has been tampered with.
    input:
      description: Trigger on whatever you have connected to device input port.
{% endconfiguration %}

A full configuration example could look like this:

```yaml
# Example configuration.yaml entry
axis:
  m1065lw:
    host: IP ADDRESS
    username: USERNAME
    password: PASSWORD
    include:
      - camera
      - motion
      - pir
      - sound
      - daynight
    trigger_time: 0
    location: köket
```

<p class='note'>
Any specific levels for triggers needs to be configured on the device.
</p>

<p class='note'>
  It is recommended that you create a user on your Axis device specifically for Home Assistant. For all current functionality, it is enough to create a user belonging to user group viewer.
</p>

## {% linkable_title Device services %}
Available services: `vapix_call`.

#### {% linkable_title Service `axis/vapix_call` %}
Send a command using [Vapix](https://www.axis.com/support/developer-support/vapix). For details please read the API specifications.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `name`                    |       no | Name of device to communicate with. |
| `param`                   |       no | What parameter to operate on. |
| `cgi`                     |      yes | Which cgi to call on the device. Default is `param.cgi`. |
| `action`                  |      yes | What type of call. Default is `update`.  |

Response to call can be subscribed to on event `vapix_call_response`

## {% linkable_title Troubleshooting discovery %}

If a `169.x.x.x` address is discovered. On your camera, go to **System Options** -> **Advanced** -> **Plain Config**. Change the drop-down box to `network` and click `Select Group`. If `Network Interface I0 ZeroConf` contains the `169.x.x.x` IP address, unchecked the box next to `Enabled` for this section and click `Save`.
