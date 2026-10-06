---
title: iRobot Roomba and Braava
description: Instructions on how to integrate your Wi-Fi enabled Roomba and Braava within Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Local Push
ha_release: 0.51
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
ha_integration_type: device
ha_zeroconf: true
---

The **Roomba** {% term integrations %} allows you to control your [iRobot Roomba](https://www.irobot.com/roomba) vacuum or [iRobot Braava](https://www.irobot.com/braava) m-series mop.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-roomba.png' />
</p>

{% note %}
This {% term integrations %}  has been tested and confirmed to be working with the iRobot Roomba s9+, Roomba 980, Roomba 960, Roomba 890, Roomba Combo Essential, and Braava jet m6 models, but should also work fine with any of the older Wi-Fi enabled Roomba or Braava like the 690. It currently does NOT work with the newer x05 Wi-Fi models, such as Roomba 105, 405, and 505. For auto-discovery, you will need to initiate a Roomba reboot. For example, by holding the clean button for up to 20 seconds on an i7 or 980. [More information about rebooting your robot](https://homesupport.irobot.com/s/article/9087).
{% endnote %}

{% include integrations/config_flow.md %}

{% warning %}
The Roomba's MQTT server only allows a single connection. Continuous mode is enabled by default, which will force the App to connect via the cloud to your Roomba. Continuous mode can be disabled in the configuration options for the integration after it is added. For more information, refer to the [Roomba 980 repository](https://github.com/NickWaterton/Roomba980-Python#firmware-2xx-notes).
{% endwarning %}

## Integration entities

The **Roomba** {% term integrations %} will add the following sensors.

Sensors:

- **Battery**: The status of your battery
- **Bin full** (if Roomba has the capacity to do): If the bin is full
- **Canceled missions**: Total number of missions that have been canceled
- **Charging**: Whether the robot is currently charging
- **Failed missions**: Total number of missions that have failed
- **Successful missions**: Total number of successful missions
- **Average mission time**: The amount of time a mission took on average
- **Total missions**: The total number of all missions
- **Scrubs**: Total number of times the robot has executed a "scrub"
- **Total cleaning time**: How many hours the robot has spent cleaning in total
- **Total cleaned area**: The total area in m² the robot has cleaned

### Retrieving your credentials

Home Assistant discovers the robot's BLID (its device identifier) and tries to retrieve its password during setup. Your iRobot account password is not the password requested by the integration.

To retrieve the password during setup:

1. Close the iRobot app on your phone and any other devices.
2. Follow the instructions in the integration setup to put your robot in the mode needed to retrieve its password. The buttons vary by model: the setup screen asks you to hold **Home**, or **Home** and **Spot**, until the robot makes a sound.
3. Submit the form within 30 seconds. Home Assistant then tries to retrieve the password from the robot.

If Home Assistant asks you to enter a password, it could not retrieve it from the robot.
Some models, including the Roomba j7, do not provide their password through this local method.

#### Using a third-party tool to retrieve the robot password

The third-party `dorita980` tool offers a [cloud method for retrieving robot credentials](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password).
Home Assistant does not maintain, review, or support this tool.
Its instructions require you to provide your iRobot account credentials to it.
If you choose to use it, review the instructions and security implications in its repository before proceeding.
You do not need to install the tool on your Home Assistant device.

If you retrieve the robot password using an external method, enter that password in the Home Assistant setup form, not your iRobot account password.
Home Assistant already found the BLID during discovery.

## Troubleshooting

- **Integration wizard shows "Failed to connect" after submitting the password**: Before attempting a factory reset (which can be a cumbersome process), attempt submitting the password in the integration wizard while the Roomba is actively running (that is, cleaning). Avoid opening the app to start a manual job to help with this. Instead, push the physical clean button on the device directly to start the manual job. This appears to resolve the issue on some models because they answer queries only while actively running.

  If this still does not resolve the issue, factory reset the model.
