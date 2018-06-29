---
layout: page
title: "Vizio SmartCast TV"
description: "Instructions on how to integrate Vizio SmartCast TV into Home Assistant."
date: 2017-07-10 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: vizio-smartcast.png
ha_category: Media Player
featured: false
ha_release: 0.49
ha_iot_class: "Local Polling"
---

The `vizio` component will allow you to control [SmartCast](https://www.vizio.com/smartcast-app) compatible TVs (2016+ models).

## Pairing

Before adding your TV to Home Assistant you'll need to pair it manually. To do so follow these steps:

Install the command-line tool using `pip` (or you can choose to download it manually):

```bash
$ pip3 install git+https://github.com/vkorn/pyvizio.git@master
```

or

```bash
$ pip3 install -I .
```

Make sure that your TV is on before continuing.

If you don't know IP address of your TV run following command:

```bash
$ pyvizio --ip=0 --auth=0 discover
```

Enter the following command to initiate pairing:

```bash
$ pyvizio --ip={ip} pair
```

Initiation will show you two different values:

| Value           | Description          |
|:----------------|:---------------------|
| Challenge type  | Usually it should be `"1"`. If not, use the additional parameter `--ch_type=your_type` in the next step |
| Challenge token | Token required to finalize pairing in the next step |

Finally, at this point a PIN code should be displayed at the top of your TV. With all these values, you can now finish pairing:

```bash
$ pyvizio --ip={ip} pair_finish --token={challenge_token} --pin={tv_pin}
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

Configuration variables:

- **host** (*Required*): IP address of your TV.
- **access_token** (*Required*): Authentication token you received in the last step of the pairing process.

## Notes and limitations

### Turning TV on

If the `Power Mode` of your TV is set to `Eco Mode`, turning the device ON won't work.

### Changing tracks

Changing tracks works like channels switching. If you have source other than regular TV it might end do nothing.

### Sources

Source list shows all external devices connected to the TV through HDMI plus list of internal devices (TV mode, Chrome Cast, etc.).

<p class='note'>
Vizio SmartCast service is accessible through HTTPS with self-signed certificate. If you have low LOGLEVEL in your Home Assistant configuration, you'll see a lot of warnings like this:
`InsecureRequestWarning: Unverified HTTPS request is being made. Adding certificate verification is strongly advised.`

You can adjust the log level for `media_player` components with the [logger](/components/logger/) component, or if you need to keep a low log level for `media_player` you could proxy calls to your TV through an NGINX reverse proxy.

If you want to only ignore only this specific [python urllib3 SSL warning](https://urllib3.readthedocs.io/en/latest/advanced-usage.html#ssl-warnings), you will need to run Home Assistant with the python flag `-W` or the environment variable `PYTHONWARNINGS` set to:
`ignore:Unverified HTTPS request is being made`
</p>
