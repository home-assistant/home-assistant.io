---
title: Samsung Smart TV
description: Instructions on how to integrate a Samsung Smart TV into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.13
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@escoand'
ha_domain: samsungtv
---

The `samsungtv` platform allows you to control a [Samsung Smart TV](https://www.samsung.com/uk/tvs/all-tvs/).

### Setup

Go to the integrations page in your configuration and click on new integration -> Samsung TV.
If your TV is on and you have enabled [SSDP](/integrations/ssdp) discovery, it's likely that you just have to confirm the detected device.

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

### YAML Configuration

YAML configuration is around for people that prefer YAML.
To use this integration, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
samsungtv:
  - host: IP_ADDRESS
```

{% configuration %}
host:
  description: "The hostname or IP of the Samsung Smart TV, e.g., `192.168.0.10`."
  required: true
  type: string
name:
  description: The name you would like to give to the Samsung Smart TV.
  required: false
  type: string
turn_on_action:
  description: "Defines an [action](/docs/automation/action/) to turn the TV on."
  required: false
  type: list
{% endconfiguration %}

After saving the YAML configuration, the TV must be turned on _before_ launching Home Assistant in order for the TV to be registered the first time.

#### Wake up TV

To wake up the TV when switched off you can use the [wake-on-lan](/integrations/wake_on_lan/) integration and call a service. This is not possible with every device.

```yaml
wake_on_lan:

samsungtv:
  - host: IP_ADDRESS
    turn_on_action:
      - service: wake_on_lan.send_magic_packet
        data:
          mac: "11:22:33:44:55:66"
```

### Supported models

If your model is not on the list then give it a test, if everything works correctly then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io/tree/current/source/_integrations/samsungtv.markdown).

#### Naming

The first letter (U, P, L, H & K) represent the screen type, e.g., LED or Plasma. The second letter represents the region, E is Europe, N is North America and A is Asia & Australia. The two numbers following that represent the screen size. If you add your model remember to remove these first 4 characters before adding to the list.

For example: for model `UN55NU7100`, the `UN55` would mean it's an LED, North American, 55 inch TV, and the model number listed below would be the remainder: `NU7100`.

#### Models tested and working

- C7700 (on doesn't work)
- D5500
- D6100
- D6300SF
- D6500
- D6505
- D6900 (WOL did not work)
- D7000
- D8000
- EH5300
- EH5600
- ES5500
- ES5700
- ES6100
- ES6300
- ES6710 (WOL doesn't work, Off works fine)
- ES6800
- F4580
- F6300
- F6400
- F6400AF
- F6500
- F7000
- F8000BF
- K5579
- K5600AK (partially supported, turn on works but state is not updated)
- K6500AF
- KS7005 (no channel change)
- KS7502 (On doesn't work, Off works fine)
- KS8000
- KS8005
- KS8500
- KU6020
- KU6100
- KU6290
- KU6400U
- KU6470
- KU6500 (on working with WOL)
- KU7000
- M5620
- MU6170UXZG
- MU6179
- MU6199
- NU7090 (On/Off)
- NU7400
- NU8000
- NU8070
- U6000
- U6300
- RU7100
- RU7172

#### Models tested but not yet working

- J5200 - Unable to see state and unable to control
- J5500 - State is always "on" and unable to control (but port 8001 *is* open)
- J6200 - State is always "on" and unable to control (but port 8001 *is* open)
- J6300 - State is always "on" and unable to control (but port 8001 *is* open)
- JS8005 - State tracking working but unable to control (but port 8001 *is* open)
- JS9000 - State is always "on" and unable to control (but port 8001 *is* open)
- JS9500 - State is always "on" and unable to control (but port 8001 *is* open)
- JU6445K - State is always "on" and unable to control (but port 8001 *is* open)
- JU6800 - Unable to see state and unable to control
- JU7000 - Unable to see state and unable to control (but port 8001 *is* open)
- JU7500 - Unable to see state and unable to control
- MU6125 - Unable to see state and unable to control (Tested on UE58MU6125 on port 8001 and 8801)
- MU6300 - Port set to 8001, turning on works, status not working reliably, turning off is not permanent (it comes back on)
- MU6400 - Unable to see state and unable to control (using latest 1270 firmware. Had limited functionality on previous firmware)
- Q60 – Turning on works, turning off does not work, State is always "off".
- Q6F – Port set to 8001, turning on works, turning off does not work, status not working reliably.
- Q7F - State is always "off" and unable to control via port 8001.
- Q9F - Turning on works, turning off does not work. State is correct. Nothing else works. Port 8001.
- RU8000 - Turning on works, turning off does not work. State is correct but says on periodically but in reality is not. Nothing else works via port 8001.

None of the 2014 (H) and 2015 (J) model series (e.g., J5200) will work, since Samsung have used a different (encrypted) type of interface for these.

### Usage

#### Changing channels

Changing channels can be done by calling the `media_player.play_media` service
with the following payload:

```yaml
entity_id: media_player.samsung_tv
media_content_id: 590
media_content_type: channel
```

#### Selecting a source

It's possible to switch between the 2 sources `TV` and `HDMI`.

### Home Assistant Core additional requirements

You will need to install the `websocket-client` Python package in your Home Assistant install. This will probably be done with:

```bash
pip3 install websocket-client
```

Remembering to activate your venv if you're using a venv install.
