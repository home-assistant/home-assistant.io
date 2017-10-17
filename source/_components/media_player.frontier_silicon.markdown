---
layout: page
title: "Frontier Silicon Internet Radios"
description: "Instructions how to integrate Frontier Silicon Internet Radios into Home Assistant."
date: 2017-02-04 00:01
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Media Player
ha_iot_class: "Local Push"
ha_release: "0.40"
---

This component provides support for Internet Radios based on the [Frontier Silicon chipset]. Some of the manufacturers which offer products based on these chips include: Hama, Medion, Slivercrest, Auna, Technisat, Revo, Pinnel, etc. These devices will be usually controlled by the [UNDOK] app.

## {% linkable_title Supported Models %}
* Hama: [IR110], [DIR3110]
* Medion: [Medion Radios]
* Silvercrest: [SIRD 14 C2]
* Some models from: Auna, Technisat, Revo, Pinell

This component was developed and tested with a Hama [DIR3110] and a Medion [MD 87466].

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

Configuration variables:

- **host** (*Required*): The host name or the IP address of the device. Defaults to 192.168.1.11.
- **port** (*Optional*): The port number. Defaults to 80.
- **password** (*Optional*): PIN code of the Internet Radio. Defaults to 1234.

Some models use a separate port (2244) for API access, this can be verified by visiting http://[host]:[port]/device.

In case your device (friendly name) is called *badezimmer*, an example automation can look something like this:

```yaml
# Example configuration.yaml automation
alias: "Bathroom Motion Detected"
trigger:
  platform: state
  entity_id: binary_sensor.motion_sensor_166d0001171111
  from: 'off'
  to: 'on'
action:
  service: media_player.turn_on
  data:
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
is based on [tiwillam]'s fsapi project. Special thanks to both developers, this component would have not been possible without their work.

## Notes and Limitations

<p class='note warning'>
The Frontier Silicon API does not provide a multi-user environment. There is always a single user (session) controlling a device, which means that once Home Assistant connects to a device all other sessions will be invalidated. This renders the usage of [UNDOK] almost impossible, as the Home Assistant component polls the device state every 30 seconds or issues a command by creating a new session. 
*If you want to prevent Home Assistant to auto connect to your device, simply change the PIN code of the device to something else than: 1234*
</p>

[Frontier Silicon chipset]: http://www.frontier-silicon.com/digital-radio-solutions
[Medion Radios]: http://internetradio.medion.com/
[IR110]: https://www.hama.com/00054823/hama-ir110-internet-radio-internet-radio-multi-room-app-control
[DIR3110]: https://www.hama.com/00054824/hama-digitalradio-dir3110-internetradio-dab+-fm-multiroom-app-steuerung
[MD 87466]: https://www.medion.com/de/shop/internet-dab-radios-medion-kuechen-internetradio-medion-p83302-md-87466-50051273a1.html
[SIRD 14 C2]: https://www.lidl.de/de/silvercrest-stereo-internetradio-sird-14-c2/p233545
[fsapi]: https://github.com/zhelev/python-fsapi
[UNDOK]: http://www.frontier-silicon.com/undok
[flammy]: https://github.com/flammy/fsapi/
[tiwillam]: https://github.com/tiwilliam/fsapi

