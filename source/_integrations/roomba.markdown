---
description: Instructions on how to integrate your Wi-Fi enabled Roomba and Braava within Home Assistant.
ha_release: 0.51
ha_domain: roomba
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
The Roomba's <abbr title="Message Queuing Telemetry Transport">MQTT</abbr> server only allows a single connection. By default, Home Assistant keeps that connection open, so the iRobot app connects to your Roomba through the cloud instead. With **Continuous connection** turned off (see [Options](#options)), Home Assistant connects only briefly. For more information, refer to the [Roomba 980 repository](https://github.com/NickWaterton/Roomba980-Python#firmware-2xx-notes).
{% endwarning %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Continuous connection:
  description: "Keep a permanent connection to the robot (default). Turn this off if your robot keeps its lights on and does not sleep while docked: Home Assistant then checks the robot every 5 minutes with a short connection and stays connected only while the robot is cleaning or right after you send it a command."
{% endconfiguration_basic %}

### How the periodic mode works

With **Continuous connection** turned off:

- Every 5 minutes, Home Assistant connects to the robot, collects its state and disconnects again, so the robot can go to sleep on the dock.
- Robots answer at very different speeds depending on the model and firmware: some send their full state within a second, while older robots (for example the 900 series on 2.x firmware) can take more than 10 seconds to accept the connection and then send their state in many small messages. Home Assistant therefore does not use a fixed delay: it disconnects once the robot has gone quiet for 2 seconds, and after 30 seconds at the latest. Connecting may take up to 30 seconds.
- While the robot is on a mission (cleaning, returning to the dock, emptying its bin, or recharging in the middle of a cleaning run), the connection stays open and the state is updated live. Home Assistant disconnects within a minute after the robot is back on the dock.
- Any command sent from Home Assistant (start, return to dock, locate, change settings) opens a connection first and keeps it open for 2 minutes.
- The robot accepts only one local connection at a time. If another client holds it (for example the iRobot app on your home network), the check fails and Home Assistant keeps showing the last known state until the next successful check.
- The robot cannot notify Home Assistant while disconnected. A mission started from the robot's button, a schedule or the iRobot app is noticed at the next check, at most 5 minutes later.

### Defining a custom update interval

The 5-minute interval is intentional and is not configurable in the options. If you want the robot checked less often (for example, because the light coming on at every check is distracting) or only at certain times, turn off the built-in polling and refresh the robot from your own automation:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **iRobot Roomba and Braava**.
2. Next to the robot entry, select the three dots {% icon "mdi:dots-vertical" %} menu and then **System options**.
3. Turn off **Enable polling for changes** and select **Update**.
4. Create an automation that calls the `homeassistant.update_entity` action on the robot's vacuum entity, for example every 30 minutes:

```yaml
alias: "Roomba: refresh every 30 minutes"
triggers:
  - trigger: time_pattern
    minutes: "/30"
actions:
  - action: homeassistant.update_entity
    target:
      entity_id: vacuum.YOUR_ROBOT
```

Each call opens a short connection, just like the built-in check, and the action returns once the robot has sent its state. It waits until the robot has accepted the connection, so with slower robots (for example the 900 series on 2.x firmware) it can take up to 30 seconds, and Home Assistant may log that the update is taking over 10 seconds; this is expected. If the robot turns out to be cleaning, the connection stays open until it is back on the dock. Commands still connect on demand even with polling turned off.

This only applies with **Continuous connection** turned off; with a permanent connection, the state is always live and no polling is involved.

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
- **Signal strength**: The Wi-Fi signal strength the robot reports, in dBm. [Disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

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

- **The robot's status light stays on and it does not go to sleep on the dock**: Many robots stay awake for as long as a local connection is open. Turn off **Continuous connection** in the [options](#options) so that Home Assistant only connects briefly.

- **Integration wizard shows "Failed to connect" after submitting the password**: Before attempting a factory reset (which can be a cumbersome process), attempt submitting the password in the integration wizard while the Roomba is actively running (that is, cleaning). Avoid opening the app to start a manual job to help with this. Instead, push the physical clean button on the device directly to start the manual job. This appears to resolve the issue on some models because they answer queries only while actively running.

  If this still does not resolve the issue, factory reset the model.
