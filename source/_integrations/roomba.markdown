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
  - '@Xitee1'
  - '@Orhideous'
ha_domain: roomba
ha_config_flow: true
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
  - vacuum
ha_integration_type: integration
ha_zeroconf: true
---

The **Roomba** {% term integrations %} allows you to control your [iRobot Roomba](https://www.irobot.com/roomba) vacuum or [iRobot Braava](https://www.irobot.com/braava) m-series mop.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-roomba.png' />
</p>

<div class='note'>
  
This {% term integrations %}  has been tested and confirmed to be working with the iRobot Roomba s9+, Roomba 980, Roomba 960, Roomba 890, and Braava jet m6 models, but should also work fine with any Wi-Fi enabled Roomba or Braava like the 690. For auto-discovery, you will need to initiate a Roomba reboot. For example, by holding the clean button for up to 20 seconds on an i7 or 980. [More information about rebooting your robot](https://homesupport.irobot.com/s/article/9087).

</div>

{% include integrations/config_flow.md %}

<div class='note'>

The Roomba's MQTT server only allows a single connection. Enabling continuous mode will force the App to connect via the cloud to your Roomba. For more information, refer to the [Roomba 980 repository](https://github.com/NickWaterton/Roomba980-Python#firmware-2xx-notes).

</div>

## Integration entities

The **Roomba** {% term integrations %} will add the following sensors.

Sensors:

- **Battery**: The status of your battery
- **Bin full** (if Roomba has the capacity to do): If the bin is full
- **Canceled missions**: Total number of missions that have been canceled
- **Failed missions**: Total number of missions that have failed
- **Successful missions**: Total number of successful missions
- **Average mission time**: The amount of time a mission took on average
- **Total missions**: The total number of all missions
- **Scrubs**: Total number of times the robot has executed a "scrub"
- **Total cleaning time**: How many hours the robot has spent cleaning in total
- **Total cleaned area**: The total area in m² the robot has cleaned

### Retrieving your credentials

Check if the credentials can be retrieved directly from your device:

1. Make sure the Roomba app is closed on all of your devices.
2. Follow the instructions in Home Assistant to retrieve the credentials.

If automatic retrieval does not work, you can retrieve the credentials manually. To manually retrieve both the BLID (username) and the password, refer to the instructions in the [Roomba 980](https://github.com/NickWaterton/Roomba980-Python#how-to-get-your-usernameblid-and-password) or [dority 980](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) repository.

For Home Assistant Container, the following command retrieves the BLID (username) and password:

```shell
docker exec -it CONTAINER_NAME_OR_ID python -c 'import roombapy.entry_points; roombapy.entry_points.password()' ROOMBA_IP
```

<div class='note'>
  
The command to retrieve the credentials does not need any additional software to be installed because it uses the built-in [roombapy](https://github.com/pschmitt/roombapy) package and [password](https://github.com/pschmitt/roombapy/blob/1.6.1/roomba/entry_points.py#L20) function deployed with Home Assistant.

</div>

#### Retrieving credentials from the cloud with dorita980

The underlying Python library is currently unable to retrieve the credentials from some newer models (for example, the J7). See [this issue](https://github.com/pschmitt/roombapy/issues/97) for details. Luckily, the password can be retrieved from the cloud using a tool provided by the [dorita980](https://github.com/koalazak/dorita980) library. Follow [these instructions](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) to do this, you should receive output of the form:

```shell
Found 1 robot(s)!
Robot "RoombaJ7" (sku: j715800 SoftwareVer: sapphire+22.21.1+2022-06-02-570490a425b+Firmware-Production+70):
BLID=> XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Password=> XXXXXXXXXXXXXXXXXXXXXXXXXXXXX <= Yes, all this string.

Use this credentials in dorita980 lib :)
```

Copy the password (everything between `=>` and `<=`, not including leading and trailing whitespace) into the Home Assistant password dialog.
