---
title: iRobot Roomba
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
---

The `roomba` integration allows you to control your [iRobot Roomba](https://www.irobot.com/roomba) vacuum or [iRobot Braava](https://www.irobot.com/braava) m-series mop.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-roomba.png' />
</p>

<div class='note'>
This platform has been tested and is confirmed to be working with the iRobot Roomba s9+, Roomba 980, Roomba 960, Roomba 890, and Braava jet m6 models, but should also work fine with any Wi-Fi enabled Roomba or Braava like the 690.
</div>

## Configuration

To add your Roomba to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with + sign and from the list of integrations select iRobot Roomba.

To add your Roomba vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
roomba:
  - host: IP_ADDRESS_OR_HOSTNAME
    blid: BLID
    password: PASSWORD
```

{% configuration %}
host:
  description: The hostname or IP address of the Roomba.
  required: true
  type: string
blid:
  description: The username (BLID) for your device.
  required: true
  type: string
password:
  description: The password for your device.
  required: true
  type: string
continuous:
  description: Whether to operate in continuous mode.
  required: false
  type: boolean
  default: true
delay:
  description: Custom connection delay (in seconds) for periodic mode
  required: false
  type: integer
  default: 1
{% endconfiguration %}

<div class='note'>

The Roomba's MQTT server only allows a single connection. Enabling continuous mode will force the App to connect via the cloud to your Roomba. [More info here](https://github.com/NickWaterton/Roomba980-Python#firmware-2xx-notes)

</div>

## Integration Entities

The Roomba Integration will add the following sensors.

Sensors:
- roomba_battery_level : The status of your battery
- roomba_bin_full (if Roomba has the capacity to do) : Bin Full status

### Multiple Roomba vacuums

```yaml
# Example configuration.yaml entry
roomba:
  - host: IP_ADDRESS_OR_HOSTNAME_1
    blid: BLID_1
    password: PASSWORD_1
  - host: IP_ADDRESS_OR_HOSTNAME_2
    blid: BLID_2
    password: PASSWORD_2
    continuous: false
    delay: 5
```

### Retrieving your credentials

Please refer to [here](https://github.com/NickWaterton/Roomba980-Python#how-to-get-your-usernameblid-and-password) or [here](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) to retrieve both the BLID (username) and the password.

For Home Assistant Container, the following command retrieves the BLID (username) and password:

```shell
docker exec -it CONTAINER_NAME_OR_ID python -c 'import roomba.entry_points; roomba.entry_points.password()' ROOMBA_IP
```

<div class='note'>
  
The command to retrieve the credentials does not need any additional software to be installed because it uses the built-in [roombapy](https://github.com/pschmitt/roombapy) package and [password](https://github.com/pschmitt/roombapy/blob/1.6.1/roomba/entry_points.py#L20) funciton deployed with Home Assistant.

</div>


### Alternative option to retrieve Roomba Password and BLID using a regular Windows PC

1. Downloading files
Create a temporary folder on your desktop for extra convenience (you can name the folder whatever you want) and put these two files inside that folder:

- Python installation package
It's recommend getting the latest “executable installer”. You can find this in the ‘Download’ section of the official Python website https://www.python.org

- Roomba Python Library
This is a zip-package of files used to establish integration with your Roomba. You can find it at https://github.com/NickWaterton/Roomba980-Python. Look for a green button named “Code”, Click it and select “Download zip”.
Now you should have two files (one exe file and one zip file) in a folder on your desktop.

2. Install Python

- a.	Start Python installation by running the exe-file. Select “Customize installation”. Click “Next”. On the “Advanced options” page be sure to check “Add Python to environment variables”, and edit “Customize install location” to `c:\Python`, then click “Install”. (Please keep the Python installation file in your desktop folder for now).

- b.	Open the Roomba zip-file and locate the “roomba” folder inside. Copy this folder into your freshly installed Python folder (c:\Python).

- c.	Use your favourite method of opening a DOS prompt (example: click the magnifying glass besides the Start-menu icon and search for “cmd” or open a PowerShell window). Then use the DOS prompt to navigate to your C:\Python folder using the `cd \python` command.
Once inside the Python folder, type `pip install six` and press ENTER. Wait for the ”six” installation to finish. After a few seconds you should be back in the DOS prompt.

3. Run the script
Type `python .\roomba\getpassword.py`, hit ENTER and wait a few seconds. Now your Roomba should be detected by the script. From here on you should follow on-screen directions (something about making sure your Roomba is turned on and parked in the base, and then holding the “Home” button for a few seconds to hear a bleep. This should cause the wifi indicator on your Romba to flash - then hit ENTER to continue and wait a few seconds more).

- Your Roomba’s BLID and password now appears in the bottom of the DOS window! Copy this info to a txt-file, grab a screenshot or whatever method you like best. In case of no or bad response: Make shure no apps are connected to Roomba. Or try holding down the the standby button on the Roomba until it reboots.

- From here on you can follow the instructions found on the Home Asistant website on how to add your Roomba to your “configuration.yaml” file (https://www.home-assistant.io/components/vacuum.roomba/). Then you’re ready to reboot your Home Assistant and enjoy Roomba integration.

4. Cleanup
Start the Python installation by running the exe-file in your temporary desktop folder, select “Uninstall” and wait for uninstaller to finish. Now you can delete the ”C:\Python” folder, and also delete the temporary folder from your desktop.
