---
title: Denon AVR Network Receivers
description: Instructions on how to integrate Denon AVR Network Receivers into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: 0.7.2
ha_domain: denonavr
ha_codeowners:
  - '@ol-iver'
  - '@starkillerOG'
ha_config_flow: true
ha_ssdp: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `denonavr` platform allows you to control [Denon Network Receivers](https://www.denon.com/category/heos) from Home Assistant. It might be that your device is supported by the [Denon] platform.

Known supported devices:

- Denon AVR-X1000
- Denon AVR-X1100W
- Denon AVR-X1200W
- Denon AVR-X1300W
- Denon AVR-X1400H
- Denon AVR-X1500H
- Denon AVR-X1600H
- Denon AVR-X1700H
- Denon AVR-X1800H
- Denon AVR-X2000
- Denon AVR-X2100W
- Denon AVR-X2200W
- Denon AVR-X2300W
- Denon AVR-X2400H
- Denon AVR-X2500H
- Denon AVR-X2600H
- Denon AVR-X2700H
- Denon AVR-X2800H
- Denon AVR-X3000
- Denon AVR-X3200W
- Denon AVR-X3300W
- Denon AVR-X3400H
- Denon AVR-X3500H
- Denon AVR-X3600H
- Denon AVR-X3700H
- Denon AVC-X3800H
- Denon AVR-X4100W
- Denon AVR-X4300H
- Denon AVR-X4400H
- Denon AVR-X4500H
- Denon AVR-X4700H
- Denon AVC-X4800H
- Denon AVR-X6500H
- Denon AVR-X6700H
- Denon AVR-X7200W
- Denon AVR-X8500H
- Denon AVR-1713
- Denon AVR-1912
- Denon AVR-2112CI
- Denon AVR-2312CI
- Denon AVR-3311CI
- Denon AVR-3312
- Denon AVR-3313CI
- Denon AVR-4810
- Denon AVR-S650H
- Denon AVC-S660H
- Denon AVR-S710W
- Denon AVR-S720W
- Denon AVR-S740H
- Denon AVR-S750H
- Denon AVR-S760H
- Denon AVR-S770H
- Denon AVR-S940H
- Denon AVR-S950H
- Denon AVR-S960H
- Denon AVR-S970H
- Denon DN-500AV
- Denon DRA-800H
- Marantz AV7702
- Marantz AV7703
- Marantz AV7704
- Marantz AV8802A
- Marantz CINEMA 50
- Marantz CINEMA 60
- Marantz CINEMA 70s
- Marantz M-CR510
- Marantz M-CR511
- Marantz M-CR603
- Marantz M-CR610
- Marantz M-CR611
- Marantz SR5006
- Marantz SR5008
- Marantz SR5010
- Marantz SR5011
- Marantz SR5015
- Marantz SR6007 - SR6012
- Marantz SR7007
- Marantz SR7010
- Marantz SR7012
- Marantz SR8015
- Marantz NR1504
- Marantz NR1506
- Marantz NR1509
- Marantz NR1510
- Marantz NR1602
- Marantz NR1603
- Marantz NR1604
- Marantz NR1606
- Marantz NR1607
- Marantz NR1710
- Marantz NR1711
- Other Denon AVR receivers (untested)
- Marantz receivers (experimental)

If your model is not on the list then give it a test, if everything works correctly then add it to the list by clicking on the **Edit** link at the bottom of this page.

If you are using VLANs, Home Assistant needs access to the following ports on the AVR: 23, 8080, and 60006 (all TCP).

{% warning %}
If you have something else using the IP controller for your Denon AVR 3808CI, such as your URC controller, it will not work! There is either a bug or security issue with some models where only one device could be controlling the IP functionality.
{% endwarning %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: IP address of the device, e.g., 192.168.1.32. If not set, auto-discovery is used.
show_all_sources:
  description: If True all sources are displayed in sources list even if they are marked as deleted in the receiver. If False deleted sources are not displayed. Some receivers have a bug that marks all sources as deleted in the interface. In this case, this option could help.
zone2:
  description: Specifies if zone 2 should be activated. Zones are displayed as additional media players with the same functionality as the Main Zone of the device supports.
zone3:
  description: Specifies if zone 3 should be activated. Zones are displayed as additional media players with the same functionality as the Main Zone of the device supports. Some receivers do not support a second zone.
update_audyssey:
  description: Specifies if Audyssey settings should be updated. This can take up to 10 seconds for some receivers.
use_telnet:
  description: Specifies if a telnet connection should be used to receive device status updates. Using telnet provides realtime updates (local push) for many values but each receiver is limited to a single connection. If you enable this setting, no other connection to your device can be made via telnet. This will be set to true for new installations of the integration but false for existing installs to prevent compatibility issues.
{% endconfiguration_basic %}

A few notes:

- An additional option for the control of Denon AVR receivers with a built-in web server is using the HTTP interface with `denonavr` platform.
- The `denonavr` platform supports some additional functionalities like album covers, custom input source names and auto discovery.
- Marantz receivers seem to a have quite a similar interface. Thus if you own one, give it a try.
- To remotely power on Marantz receivers with Home Assistant, the Auto-Standby feature must be enabled in the receiver's settings.
- Sound mode: The command to set a specific sound mode is different from the value of the current sound mode reported by the receiver (sound_mode_raw). There is a key-value structure (sound_mode_dict) that matches the raw sound mode to one of the possible commands to set a sound mode (for instance {'MUSIC':['PLII MUSIC']}. If you get a "Not able to match sound mode" warning, please open an issue on the [denonavr library](https://github.com/ol-iver/denonavr), stating which raw sound mode could not be matched so it can be added to the matching dictionary. You can find the current raw sound mode under **Developer Tools** -> **States**.

#### Action `denonavr.get_command`

Denon AVR receivers support a simple text-based network interface for sending commands to the receiver over the network. You can access this interface via the `denonavr.get_command` action. In addition, IR remote codes can also be sent to this interface.

A list of network commands supported by the various Denon AVR receivers can be [found here](https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf). A list of IR codes can be [found here](https://assets.denon.com/DocumentMaster/UK/AVR3313_IR_CODE_V01.pdf).

To use these commands, call the `denonavr.get_command` action and append the specific command to the path `/goform/formiPhoneAppDirect.xml?`:

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Name of entity to send command to. For example `media_player.marantz`|
| `command`              |       no | Command to send to device, e.g.,  `/goform/formiPhoneAppDirect.xml?VSMONI2`|

So for example, the above command `/goform/formiPhoneAppDirect.xml?VSMONI2` will switch the HDMI to output 2 (if your receiver supports it). Sending an IR code works the same, so the command `/goform/formiPhoneAppDirect.xml?RCKSK0410370` will toggle muting.

{% tip %}

The denonavr platform supports the standard media player controls such as `turn_on` and `volume_up`. Thus calling the `media_player.turn_on` action is equivalent to calling `denonavr.get_command` with the command `/goform/formiPhoneAppDirect.xml?PWON`. See [media_player](/integrations/media_player/) for more details.

{% endtip %}

#### Action `denonavr.set_dynamic_eq`

Enable or disable DynamicEQ setting.

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Name of entity to send command to. For example `media_player.marantz`|
| `dynamic_eq`           |       no | True/false for enable/disable.|

#### Action `denonavr.update_audyssey`

Update Audyssey settings. This can take up to 10 Seconds for some receivers.

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Name of entity to send command to. For example `media_player.marantz`|

[Denon]: /integrations/denon
