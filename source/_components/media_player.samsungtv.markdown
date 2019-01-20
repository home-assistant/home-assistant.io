---
layout: page
title: "Samsung Smart TV"
description: "Instructions on how to integrate a Samsung Smart TV into Home Assistant."
date: 2016-02-13 12:02
sidebar: true
comments: false
sharing: true
footer: true
logo: samsung.png
ha_category: Media Player
featured: false
ha_release: 0.13
ha_iot_class: "Local Polling"
---

The `samsungtv` platform allows you to control a
[Samsung Smart TV](http://www.samsung.com/uk/consumer/tv-audio-video/televisions/).

When the TV is first connected,
you will need to accept Home Assistant on the TV to allow communication.

To add a TV to your installation without relying on the [discovery component](/components/discovery/), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: samsungtv
    host: 192.168.0.10
```

{% configuration %}
host:
  description: "The IP of the Samsung Smart TV, eg. `192.168.0.10`."
  required: true
  type: string
port:
  description: The port of the Samsung Smart TV. If set to 8001, the new websocket connection will be used (required for 2016+ TVs).
  required: false
  type: integer
  default: 55000
name:
  description: The name you would like to give to the Samsung Smart TV.
  required: false
  type: string
timeout:
  description: The timeout for communication with the TV in seconds.
  required: false
  type: time
  default: 0 (no timeout)
mac:
  description: "The MAC address of the Samsung Smart TV, eg. `00:11:22:33:44:55:66`. Required for power on support via wake on lan."
  required: false
  type: string
{% endconfiguration %}

Changing channels can be done by calling the `media_player.play_media` service
with the following data:

```json
{
  "entity_id": "media_player.office_tv",
  "media_content_id": "590",
  "media_content_type": "channel"
}
```

### {% linkable_title Supported models %}

Below you will find a list of supported and unsupported models.
Currently the ability to select a source is not implemented.

For some models additional configuration is needed,
indicated by the following footnote markers:
[^port8001]: The port must be set to 8001.
[^pip3]: `pip3 install websocket-client` must be executed, this is not needed on Hass.io.

**Currently known supported models:**

- C7700
- D5500
- D6300SF
- D6500
- D6505
- D7000
- D8000
- EH5300
- EH5600
- ES5500
- ES6300
- ES6800
- F4580
- F6300
- F6400
- F6400AF
- F6500
- F8000BF
- K5579 (On/Off, Forward/Backward, Volume control, but no Play button) [^port8001]
- K5600AK (partially supported, turn on works but state is not updated)
- K6500AF [^port8001]
- KS7005 (MAC address must be provided, On/Off, Volume are OK, no channel change) [^port8001] [^pip3]
- KS7502 (turn on doesn't work, turn off works fine) [^port8001] [^pip3]
- KS8000 [^port8001] [^pip3]
- KS8005 [^port8001] [^pip3]
- KS8500 [^port8001] [^pip3]
- KU6020 [^port8001] [^pip3]
- KU6100 [^port8001] [^pip3]
- KU6290 [^port8001]
- KU6400U [^port8001] [^pip3]
- KU7000 [^port8001]
- M5620 [^port8001] [^pip3]
- MU6170UXZG [^port8001] [^pip3]
- NU7400 [^port8001] [^pip3]
- NU8000
- Q7F (MAC must be specified for Power On) [^port8001]
- U6000 [^port8001]
- U6300 [^port8001] [^pip3]
- D7000
- UE6199UXZG (On/Off, Forward/Backward, Volume control, but no Play button) [^port8001]
- UE65KS8005 (On/Off, Forward/Backward, Volume are OK, but no Play button) [^port8001]

**Currently tested but nonworking models:**

- J5200 - Unable to see state and unable to control
- J5500 - State is always "on" and unable to control (but port 8001 *is* open)
- J6200 - State is always "on" and unable to control (but port 8001 *is* open)
- J6300 - State is always "on" and unable to control (but port 8001 *is* open)
- JS8005 - State tracking working but unable to control (but port 8001 *is* open)
- JS9000 - State is always "on" and unable to control (but port 8001 *is* open)
- JS9500 - State is always "on" and unable to control (but port 8001 *is* open)
- JU7000 - Unable to see state and unable to control (but port 8001 *is* open)
- JU7500 - Unable to see state and unable to control
- MU6300 - turning on works, status not working reliably, turning off is not permanent (it comes back on) [^port8001] [^pip3]

None of the 2014 (H) and 2015 (J) model series (e.g., J5200) will work,
since Samsung have used a different (encrypted) type of interface for these.

**Other models:**

If your model is not on the list then give it a test,
if everything works correctly then add it to the list on
[GitHub](https://github.com/home-assistant/home-assistant.io/blob/current/source/_components/media_player.samsungtv.markdown).
The first letter (U, P, L, H & K) represent the screen type, e.g., LED or
Plasma. The second letter represents the region, E is Europe, N is North America
and A is Asia & Australia.
The two numbers following that represent the screen size.
If you add your model remember to remove these first 4 characters before adding to the list.
