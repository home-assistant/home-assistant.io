---
title: iRobot Roomba
description: Instructions on how to integrate your Wi-Fi enabled Roomba within Home Assistant.
ha_category:
  - Vacuum
ha_release: 0.51
ha_conflig_flow: true
ha_codeowners:
  - '@pschmitt'
  - '@cyr-ius'
ha_domain: roomba
---

The `roomba` integration allows you to control your [iRobot Roomba](https://www.irobot.com/For-the-Home/Vacuuming/Roomba.aspx) vacuum.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-roomba.png' />
</p>

<div class='note'>
This platform has been tested and is confirmed to be working with the iRobot Roomba 980 and 890 models, but should also work fine with any Wi-Fi enabled Roomba like the 690 or the 960.
</div>

## Configuration

To add your Roomba to your installation, go to Configuration >> Integrations in the UI, click the button with + sign and from the list of integrations select iRobot Roomba.

To add your Roomba vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
roomba:
  - host: IP_ADDRESS_OR_HOSTNAME
    blid: BLID
    password: PASSWORD
    ...
  - host: IP_ADDRESS_OR_HOSTNAME
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
certificate:
  description: Path to your certificate store.
  required: false
  type: string
  default: /etc/ssl/certs/ca-certificates.crt
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

### Retrieving your credentials

Please refer to [here](https://github.com/NickWaterton/Roomba980-Python#how-to-get-your-usernameblid-and-password) or [here](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) to retrieve both the BLID (username) and the password.
