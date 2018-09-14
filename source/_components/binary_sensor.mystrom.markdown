---
layout: page
title: "myStrom Binary Sensor"
description: "Instructions on how to integrate myStrom buttons into Home Assistant."
date: 2017-04-14 08:15
sidebar: true
comments: false
sharing: true
footer: true
logo: mystrom.png
ha_category: Binary Sensor
ha_iot_class: "Local Polling"
ha_release: 0.45
---


The `mystrom` binary sensor platform allows you to use [myStrom Wifi Buttons](https://mystrom.ch/wifi-button/) with Home Assistant. The myStrom Wifi Buttons support three and the myStrom WiFi Button + four different push pattern:

- `single`: Short push (approx. 1/2 seconds)
- `double`: 2x sequential short pushes (within 2 seconds)
- `long`: Long push (approx. 2 seconds)
- `touch`: Touch of the button's surface (only affective for WiFi Button +)

The first usage of the pattern will create the binary sensor for the pattern. If the WiFi Button is pushed one time then a binary sensor for the `single` pattern will be created. The same applies for the other patterns. With the second usage of the pattern the binary sensors become fully functional.

The buttons will give you feedback with its built-in LED:

- white then green: Pattern was submitted successfully
- white then red: There is a problem with the communication

### {% linkable_title Setup of myStrom Buttons %}

You need to configure every button to make it work with Home Assistant. First connect the Wifi Buttons to your wireless network. Once a button is connected you have three minutes to set the actions for the push patterns if the button is not charging. The fastest way is to use `curl`. Check the [documentation](https://mystrom.ch/wp-content/uploads/REST_API_WBP.txt) of the WiFi Button for further details about the implementation (`http://` is replaced by `get://` or `post://`). `action` is the name of the corresponding push pattern (see above).

The endpoint that is receiving the data is `http://[IP address Home Assistant]:8123/api/mystrom`. If you have set an [`api_password`](/components/http/) then this needs to be included in the URL.

With `api_password:`

```
$ curl -d "[action]=get://[IP address Home Assistant]:8123/api/mystrom?api_password%3D[api_password]%26[action]%3D[ID of the button]" \
    http://[IP address of the button]/api/v1/device/[MAC address of the button]
```

Without `api_password`:

```bash
$ curl -d "[action]=get://[IP address Home Assistant]:8123/api/mystrom?[action]%3D[ID of the button]" \
    http://[IP address of the button]/api/v1/device/[MAC address of the button]
{
  "[MAC address of the button]": {
    "type": "button",
    "battery": true,
    "reachable": true,
    "meshroot": false,
    "charge": true,
    "voltage": 4.292,
    "fw_version": "2.56",
    "single": "get://[IP address Home Assistant]:8123/api/mystrom?single=[id of the button]",
    "double": "",
    "long": "",
    "touch": ""
  }
}
```

A complete command to set the URL for a double click could look like the example below:

```bash
$ curl -d "double=get://192.168.1.3:8123/api/mystrom?double%3DButton1" http://192.168.1.12/api/v1/device/4D5F5D5CD553
```

With an `api_password`:

```bash
curl -d "double=get://192.168.1.3:8123/api/mystrom?api_password%3Dapi_password%26double%3DButton1" http://192.168.1.12/api/v1/device/4D5F5D5CD553
```

The command-line tool [`mystrom`](https://github.com/fabaff/python-mystrom) is a helper to configure myStrom buttons.

If you have set [`login_attempts_threshold`](/components/http/) and forget to include the `api_password` for an action and that action is triggered then after the threshold is reached will the button no longer work because it is banned. See [IP filtering and banning](/components/http/#ip-filtering-and-banning) about how to revert the banning.

## {% linkable_title Configuration %}

To use your myStrom WiFi Button in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mystrom
```

<p class='note'>
The firmware version 2.56 doesn't support TLS/SSL. This means that you are only able to use the WiFi Buttons if you are using plain-text communication between Home Assistant and the clients/entities.
</p>
