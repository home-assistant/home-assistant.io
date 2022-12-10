---
title: iRobot Roomba and Braava
description: Instructions on how to integrate your Wi-Fi enabled Roomba and Braava within Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Local Push
ha_release: 0.51
ha_conflig_flow: true
ha_codeowners:
  - '@pschmitt'
  - '@cyr-ius'
  - '@shenxn'
ha_domain: roomba
ha_config_flow: true
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
  - vacuum
ha_integration_type: integration
---

The `roomba` integration allows you to control your [iRobot Roomba](https://www.irobot.com/roomba) vacuum or [iRobot Braava](https://www.irobot.com/braava) m-series mop.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-roomba.png' />
</p>

<div class='note'>
  
This integration has been tested and confirmed to be working with the iRobot Roomba s9+, Roomba 980, Roomba 960, Roomba 890, and Braava jet m6 models, but should also work fine with any Wi-Fi enabled Roomba or Braava like the 690. For auto-discovery, you will need to initiate a Roomba reboot. For example, by holding the clean button for up to 20 seconds on an i7 or 980. [More information about rebooting your robot](https://homesupport.irobot.com/s/article/9087).

</div>

{% include integrations/config_flow.md %}

<div class='note'>

The Roomba's MQTT server only allows a single connection. Enabling continuous mode will force the App to connect via the cloud to your Roomba. [More info here](https://github.com/NickWaterton/Roomba980-Python#firmware-2xx-notes)

</div>

## Integration Entities

The Roomba Integration will add the following sensors.

Sensors:
- roomba_battery_level : The status of your battery
- roomba_bin_full (if Roomba has the capacity to do) : Bin Full status

### Manually retrieving your credentials

Please refer to [here](https://github.com/NickWaterton/Roomba980-Python#how-to-get-your-usernameblid-and-password) or [here](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) to retrieve both the BLID (username) and the password.

For Home Assistant Container, the following command retrieves the BLID (username) and password:

```shell
docker exec -it CONTAINER_NAME_OR_ID python -c 'import roombapy.entry_points; roombapy.entry_points.password()' ROOMBA_IP
```

<div class='note'>
  
The command to retrieve the credentials does not need any additional software to be installed because it uses the built-in [roombapy](https://github.com/pschmitt/roombapy) package and [password](https://github.com/pschmitt/roombapy/blob/1.6.1/roomba/entry_points.py#L20) function deployed with Home Assistant.

</div>

#### Retrieving credentials from the cloud with dorita980

The underlying Python library is currently unable to retrieve the credentials from some newer models (e.g. J7). See [this issue](https://github.com/pschmitt/roombapy/issues/97) for details. Luckily, the password can be retrieved from the cloud using a tool provided by the [dorita980](https://github.com/koalazak/dorita980) library. Follow [these instructions](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) to do this, you should receive output of the form:

```shell
Found 1 robot(s)!
Robot "RoombaJ7" (sku: j715800 SoftwareVer: sapphire+22.21.1+2022-06-02-570490a425b+Firmware-Production+70):
BLID=> XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Password=> XXXXXXXXXXXXXXXXXXXXXXXXXXXXX <= Yes, all this string.

Use this credentials in dorita980 lib :)
```

Copy the password (everything between `=>` and `<=`, not including leading and trailing whitespace) into the Home Assistant password dialog.
