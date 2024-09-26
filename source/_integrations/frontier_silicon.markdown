---
title: Frontier Silicon
description: Instructions on how to integrate Frontier Silicon Internet Radios into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: '0.40'
ha_domain: frontier_silicon
ha_platforms:
  - media_player
ha_integration_type: integration
ha_codeowners:
  - '@wlcrs'
ha_ssdp: true
ha_config_flow: true
---

This {% term integration %} provides support for Internet Radios based on the [Frontier Silicon chipset]. Some of the manufacturers which offer products based on these chips include: Hama, Medion, Slivercrest, Auna, Technisat, Revo, Pinnel, etc. These devices will be usually controlled by the OKTIV or UNDOK apps.

## Supported models

Frontier Silicon is used by many different brands of radio manufacturers.

Supported devices include, but are not limited to:

- Hama: [IR50], [IR110], [DIR3110], [DIR355BT]
- Medion: [Medion Radios]
- Silvercrest: [SIRD 14 C2 (archived website)]
- Teufel: [Radio 3sixty (2019)]
- Roberts: [Roberts Stream 94i]
- TechniSat: [DIGITRADIO 10 IR], and some other models
- Some models from: Auna, Revo, Pinell, Como Audio

This {% term integration %} was developed and tested with a [Roberts Stream 94i].

If your device is supported by the OKTIV or UNDOK apps, then it is also supported by this integration.

## Prerequisites

The {% term integration %} supports automatic discovery of your Internet Radio. If you need to set up the device manually, please provide the device IP-address. Some models use a separate port (2244) for API access, this can be verified by visiting `http://[host]:[port]/device`.

The default PIN for Frontier Silicon-based devices is 1234. You can set the PIN code of your device (depending on manufacturer) under:
*MENU button > Main Menu > System setting > Network > NetRemote PIN setup*

{% include integrations/config_flow.md %}

In case your device (friendly name) is called *badezimmer*, an example automation can look something like this:

```yaml
# Example configuration.yaml automation
alias: "Bathroom Motion Detected"
triggers:
  - trigger: state
    entity_id: binary_sensor.motion_sensor_166d0001171111
    from: "off"
    to: "on"
actions:
  - action: media_player.turn_on
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

## Notes and Limitations

{% warning %}

Some older devices may require setting up a session to process requests. This is automatically detected by the underlying library. There is always a single user (session) controlling a device, which means that once Home Assistant connects to a device all other sessions will be invalidated.

This renders the usage of [UNDOK] almost impossible for these older devices, as the Home Assistant integration polls the device state every 30 seconds or issues a command by creating a new session. In that case, you have to disable the integration if you want to use UNDOK.

{% endwarning %}

[Frontier Silicon chipset]: https://www.frontiersmart.com/solution/solutions-for-digital-radio/
[Medion Radios]: https://www.medion.com/de/shop/internetradios
[IR50]: https://support.hama.com/00054840/hama-internetradio-ir50-wifi
[IR110]: https://www.hama.com/00054823/hama-ir110ms-internet-radio-multiroom-app-control-black
[DIR3110]: https://www.hama.com/00054824/hama-dir3110ms-digital-radio-fm-dab-dab+-internet-radio-app-multiroom-white
[MD 87466]: https://www.conrad.com/p/medion-p83302-md-87466-internet-kitchen-radio-dab-fm-aux-internet-radio-dlna-compatible-white-1434428
[Radio 3sixty (2019)]: https://teufel.de/radio-3sixty-2019-105437000
[SIRD 14 C2 (archived website)]: https://web.archive.org/web/20191011141311/https://www.silvercrest-multiroom.de/produkte/stereo-internet-radio/
[Roberts Stream 94i]: https://www.robertsradio.com/en-gb/stream-94i
[DIGITRADIO 10 IR]: https://www.technisat.com/en_XX/DIGITRADIO-10-IR/352-10774-22920/
