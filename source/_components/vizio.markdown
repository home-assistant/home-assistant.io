---
title: "Vizio SmartCast Device"
description: "Instructions on how to integrate Vizio SmartCast TVs and Sound Bars into Home Assistant."
logo: vizio-smartcast.png
ha_category:
  - Media Player
ha_release: 0.49
ha_iot_class: Local Polling
redirect_from:
 - /components/media_player.vizio/
---

The `vizio` integration will allow you to control [SmartCast](https://www.vizio.com/smartcast-app) compatible TVs and Sound Bars (2016+ models).

## Find your device

Install the command-line tool using `pip` (or you can choose to download it manually):

```bash
$ pip3 install pyvizio
```

or

```bash
$ pip3 install git+https://github.com/vkorn/pyvizio.git@master
```

or

```bash
$ pip3 install -I .
```

Find your device using the following command:
```
pyvizio --ip=0 discover
```

and note it's IP address. If using your IP address by itself does not lead to success, you may need to append `:9000` or `:7345` to it when using it as a parameter in future commands.

## Pairing

Before adding your device to Home Assistant you may need to pair it manually. For a Sound Bar, it is unclear how the device would notify you of a valid auth token, so it's best to first skip the pairing process entirely, specify a `device_class` of `soundbar` in your configuration, and try interacting with the entity to see if you have any success. If the media player controls aren't working, and if specifying different ports as mentioned above doesn't work, you will need to find a way to get the auth token during this process.

To obtain an auth token, follow these steps:

Make sure that your device is on before continuing.

| Parameter       | Description          |
|:----------------|:---------------------|
| `ip`            | IP address (possibly including port) obtained from the previous section |
| `device_type`   | The type of device you are connecting to. Options are `tv` or `soundbar` |

Enter the following command to initiate pairing:

```bash
$ pyvizio --ip={ip} --device_type={device_type} pair
```

Initiation will show you two different values:

| Value           | Description          |
|:----------------|:---------------------|
| Challenge type  | Usually it should be `"1"`. If not, use the additional parameter `--ch_type=your_type` in the next step |
| Challenge token | Token required to finalize pairing in the next step |

Finally, at this point a PIN code should be displayed at the top of your TV. With all these values, you can now finish pairing:

```bash
$ pyvizio --ip={ip} --device_type={device_type} pair-finish --token={challenge_token} --pin={pin}
```

You will need the authentication token returned by this command to configure Home Assistant.

## Configuration

To add your Vizio TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: vizio
    host: IP_ADDRESS
    access_token: AUTH_TOKEN
```

{% configuration %}
host:
  description: IP address of your device.
  required: true
  type: string
access_token:
  description: Authentication token you received in the last step of the pairing process (if applicable).
  required: false
  type: string
device_class:
  description: The class of your device. Your choices are `tv` or `soundbar`
  required: false
  type: string
  default: tv
suppress_warning:
  description: Set to `true` to disable self-signed certificate warnings.
  required: false
  default: false
  type: string
{% endconfiguration %}

## Notes and limitations

### Turning device on

If the `Power Mode` of your device is set to `Eco Mode`, turning the device ON won't work.

### Changing tracks

Changing tracks works like channels switching. If you have source other than regular TV it might end do nothing.

### Sources

Source list shows all external devices connected to the device through HDMI plus list of internal devices (TV mode, Chrome Cast, etc.).
