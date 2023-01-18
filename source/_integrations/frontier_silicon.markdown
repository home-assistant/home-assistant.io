---
title: Frontier Silicon
description: Instructions on how to integrate Frontier Silicon Internet Radios into Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: '0.40'
ha_domain: frontier_silicon
ha_platforms:
  - media_player
ha_integration_type: integration
ha_codeowners:
  - '@wlcrs'
---

This integration provides support for Internet Radios based on the [Frontier Silicon chipset]. Some of the manufacturers which offer products based on these chips include: Hama, Medion, Slivercrest, Auna, Technisat, Revo, Pinnel, etc. These devices will be usually controlled by the [UNDOK] app.

## Supported Models
* Hama: [IR50], [IR110], [DIR3110]
* Medion: [Medion Radios]
* Silvercrest: [SIRD 14 C2 (archived website)]
* Teufel: [Radio 3sixty (2019)]
* Some models from: Auna, Technisat, Revo, Pinell, Como Audio

This integration was developed and tested with a Hama [DIR3110] and a Medion [MD 87466].

## Configuration

Your Frontier Silicon based device should be automatically discovered by Home Assistant. The auto-discovery service assumes that the device uses the default PIN code: *1234*. If you have changed the PIN code, the auto-discovery will fail as Home Assistant will not be able to connect to the device. You can set the PIN code of your device (depending on manufacturer) under:

*MENU button > Main Menu > System setting > Network > NetRemote PIN setup*

If your device was not automatically discovered or you have changed the PIN you can alternatively add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: frontier_silicon
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: The host name or the IP address of the device.
  required: true
  default: 192.168.1.11
  type: string
port:
  description: The port number of the device.
  required: false
  default: 80
  type: integer
password:
  description: PIN code of the Internet Radio.
  required: false
  default: 1234
  type: string
name:
  description: Friendly name of the Internet Radio. If present this will override the friendly name reported by the radio itself.
  required: false
  default: empty
  type: string
{% endconfiguration %}

Some models use a separate port (2244) for API access, this can be verified by visiting http://[host]:[port]/device.

In case your device (friendly name) is called *badezimmer*, an example automation can look something like this:

```yaml
# Example configuration.yaml automation
alias: "Bathroom Motion Detected"
trigger:
  platform: state
  entity_id: binary_sensor.motion_sensor_166d0001171111
  from: "off"
  to: "on"
action:
  service: media_player.turn_on
  target:
    entity_id: "media_player.badezimmer"
```

## Screenshots:
Overview DAB+ (Badezimmer) and Spotify (Küche):
<p class='img'>
<img src='/images/screenshots/frontier_silicon_overview.png' />
</p>

Overview of the info dialog:
<p class='img'>
<img src='/images/screenshots/frontier_silicon_info_dialog.png' />
</p>

## Development

Support is provided through the Python [fsapi] module. The Python module was developed by using the documentation provided by [flammy] and
is based on [tiwillam]'s fsapi project. Special thanks to both developers, this integration would have not been possible without their work.

## Notes and Limitations

<div class='note warning'>

The Frontier Silicon API does not provide a multi-user environment. There is always a single user (session) controlling a device, which means that once Home Assistant connects to a device all other sessions will be invalidated. This renders the usage of [UNDOK] almost impossible, as the Home Assistant integration polls the device state every 30 seconds or issues a command by creating a new session.
*If you want to prevent Home Assistant to auto connect to your device, simply change the PIN code of the device to something else than: 1234*

</div>

[Frontier Silicon chipset]: https://www.frontiersmart.com/solution/solutions-for-digital-radio/
[Medion Radios]: https://www.medion.com/de/shop/internetradios
[IR50]: https://support.hama.com/00054840/hama-internetradio-ir50-wifi
[IR110]: https://www.hama.com/00054823/hama-ir110ms-internet-radio-multiroom-app-control-black
[DIR3110]: https://www.hama.com/00054824/hama-dir3110ms-digital-radio-fm-dab-dab+-internet-radio-app-multiroom-white
[MD 87466]: https://www.conrad.com/p/medion-p83302-md-87466-internet-kitchen-radio-dab-fm-aux-internet-radio-dlna-compatible-white-1434428
[Radio 3sixty (2019)]: https://teufel.de/radio-3sixty-2019-105437000
[SIRD 14 C2 (archived website)]: https://web.archive.org/web/20191011141311/https://www.silvercrest-multiroom.de/produkte/stereo-internet-radio/
[fsapi]: https://github.com/zhelev/python-fsapi
[UNDOK]: https://www.frontiersmart.com/product/undok/
[flammy]: https://github.com/flammy/fsapi/
[tiwillam]: https://github.com/tiwilliam/fsapi
