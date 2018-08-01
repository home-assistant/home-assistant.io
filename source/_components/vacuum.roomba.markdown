---
layout: page
title: "iRobot Roomba"
description: "Instructions on how to integrate your Wi-Fi enabled Roomba within Home Assistant."
date: 2017-08-04 20:43
sidebar: true
comments: false
sharing: true
footer: true
logo: irobot_roomba.png
ha_category: Vacuum
ha_release: 0.51
---

The `roomba` component allows you to control your [iRobot Roomba](http://www.irobot.com/For-the-Home/Vacuuming/Roomba.aspx) vacuum.

Currently supported features are:
- `start`
- `pause`
- `stop`    - `stop`
- `return_to_home`  - `return_to_home`
- `turn_off` (stop all activity and return to dock) 
- `locate`  - `locate`
- `clean_spot`  - `clean_spot`
- `set_fan_speed`   - `set_fan_speed`

 Please follow [Retrieving your credentials](/components/vacuum.roomba/#retrieving-your-credentials) to retrieve the API token used in
 `configuration.yaml`.


## {% linkable_title Configuring the Platform %}

To add a Roomba vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: roomba
    host: IP_ADDRESS_OR_HOSTNAME
    username: BLID
    password: PASSWORD
```

Configuration variables:

- **host** (*Required*): Hostname or IP address of the Roomba.
- **username** (*Required*): The username (BLID) for your device.
- **password** (*Required*): The password for your device.
- **name** (*Optional*): The name of the vacuum.
- **certificate** (*Optional*): Path to your certificate store. Defaults to `/etc/ssl/certs/ca-certificates.crt`.
- **continuous** (*Optional*): Whether to operate in continuous mode. Defaults to `True`.

<p class='note'>
The Roomba's MQTT server only allows a single connection. Enabling continuous mode will force the App to connect via the cloud to your Roomba. [More info here](https://github.com/NickWaterton/Roomba980-Python#firmware-2xx-notes)
</p>

## {% linkable_title Attributes %}
In addition to [all of the attributes provided by the `vacuum` component](/components/vacuum/#attributes),
(`battery_icon`, `cleaned_area`, `fan_speed`, `fan_speed_list`, `status`, and `params`), the `roomba` platform introduces specific attributes. These are:
- `bin_full`
- `bin_present`
- `cleaned_area`
- `cleaning_time`
- `error`
- `position`
- `software_version`

The following table shows the units of measurement for each attribute:

| Attribute                 | Unit of measurement | Description                                           |
|---------------------------|---------------------|-------------------------------------------------------|
| `bin_full`                | boolean             | Debris bin full or not                                |
| `bin_present`             | boolean             | Debris bin attached to the Roomba or not              |
| `cleaned_area`            | square meter        | Last / actual cleaned area in square meters           |
| `cleaning_time`           | minutes             | Last / actual cleaning time in minutes                |
| `error`                   | string              | Detailed error message                                |
| `position`                | (int,int)           | (x,y) position of the Roomba's location               |
| `software_version`        | string              | Firmware version of the Roomba                        |

### {% linkable_title Retrieving your credentials %}

Please refer to [here](https://github.com/NickWaterton/Roomba980-Python#how-to-get-your-usernameblid-and-password) or [here](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) to retrieve both the BLID (username) and the password.
