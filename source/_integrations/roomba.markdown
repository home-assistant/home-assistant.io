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
---

The `roomba` integration allows you to control your [iRobot Roomba](https://www.irobot.com/roomba) vacuum or [iRobot Braava](https://www.irobot.com/braava) m-series mop.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-roomba.png' />
</p>

<div class='note'>
This platform has been tested and is confirmed to be working with the iRobot Roomba s9+, Roomba 980, Roomba 960, Roomba 890, and Braava jet m6 models, but should also work fine with any Wi-Fi enabled Roomba or Braava like the 690.
</div>

{% include integrations/config_flow.md %}

<div class='note'>

The Roomba's MQTT server only allows a single connection. If another smart home platform uses continues mode, Home Assistant will not be able to connect to your Roomba. Enabling continuous mode in Home Assistant will force the App to connect via the cloud to your Roomba. [More info here](https://github.com/NickWaterton/Roomba980-Python#firmware-2xx-notes)

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

<div class='note'>
  
If the password cannot be retrieved, another smart home system may be using continuous mode. Ensure no other systems use your Roomba and try again. 

</div>
