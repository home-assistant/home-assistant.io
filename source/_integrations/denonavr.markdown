---
title: Denon AVR Network Receivers
description: Instructions on how to integrate Denon AVR Network Receivers into Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 0.7.2
ha_domain: denonavr
ha_codeowners:
  - '@scarface-4711'
  - '@starkillerOG'
ha_config_flow: true
ha_ssdp: true
---

The `denonavr` platform allows you to control [Denon Network Receivers](https://www.denon.com/en-gb/shop/networkmusicsystem/ceolpiccolon4) from Home Assistant. It might be that your device is supported by the [Denon] platform.

Known supported devices:

- Denon AVR-X1000
- Denon AVR-X1100W
- Denon AVR-X1200W
- Denon AVR-X1300W
- Denon AVR-X1400H
- Denon AVR-X1500H
- Denon AVR-X1600H
- Denon AVR-X2000
- Denon AVR-X2100W
- Denon AVR-X2200W
- Denon AVR-X2300W
- Denon AVR-X2400H
- Denon AVR-X2500H
- Denon AVR-X2700H
- Denon AVR-X3000
- Denon AVR-X3200W
- Denon AVR-X3300W
- Denon AVR-X3400H
- Denon AVR-X3600H
- Denon AVR-X3700H
- Denon AVR-X4100W
- Denon AVR-X4300H
- Denon AVR-X4400H
- Denon AVR-X4500H
- Denon AVR-X6500H
- Denon AVR-1912
- Denon AVR-2312CI
- Denon AVR-3311CI
- Denon AVR-3312
- Denon AVR-3313CI
- Denon AVR-4810
- Denon AVR-S710W
- Denon AVR-S720W
- Denon AVR-S750H
- Denon DN-500AV
- Marantz M-CR510
- Marantz M-CR511
- Marantz M-CR603
- Marantz M-CR610
- Marantz M-CR611
- Marantz SR5006
- Marantz SR5008
- Marantz SR5011
- Marantz SR6007 - SR6012
- Marantz SR8015
- Marantz NR1504
- Marantz NR1506
- Marantz NR1602
- Marantz NR1604
- Marantz NR1607
- Marantz NR1710
- Other Denon AVR receivers (untested)
- Marantz receivers (experimental)

If your model is not on the list then give it a test, if everything works correctly then add it to the list by clicking on the **Edit this page on GitHub** link above.

<div class='note warning'>
If you have something else using the IP controller for your Denon AVR 3808CI, such as your URC controller, it will not work! There is either a bug or security issue with some models where only one device could be controlling the IP functionality.
</div>

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: IP address of the device, e.g., 192.168.1.32. If not set, auto-discovery is used.
show_all_sources:
  description: If True all sources are displayed in sources list even if they are marked as deleted in the receiver. If False deleted sources are not displayed. Some receivers have a bug that marks all sources as deleted in the interface. In this case, this option could help.
zone1:
  description: Specifies if zone 1 should be activated. Zones are displayed as additional media players with the same functionality as the Main Zone of the device supports.
zone2:
  description: Specifies if zone 2 should be activated. Zones are displayed as additional media players with the same functionality as the Main Zone of the device supports.
{% endconfiguration_basic %}

A few notes:

- An additional option for the control of Denon AVR receivers with a built-in web server is using the HTTP interface with `denonavr` platform.
- The `denonavr` platform supports some additional functionalities like album covers, custom input source names and auto discovery.
- Marantz receivers seem to a have quite a similar interface. Thus if you own one, give it a try.
- To remotely power on Marantz receivers with Home Assistant, the Auto-Standby feature must be enabled in the receiver's settings.
- Sound mode: The command to set a specific sound mode is different from the value of the current sound mode reported by the receiver (sound_mode_raw). There is a key-value structure (sound_mode_dict) that matches the raw sound mode to one of the possible commands to set a sound mode (for instance {'MUSIC':['PLII MUSIC']}. If you get a "Not able to match sound mode" warning, please open an issue on the [denonavr library](https://github.com/scarface-4711/denonavr), stating which raw sound mode could not be matched so it can be added to the matching dictionary. You can find the current raw sound mode under **Developer Tools** -> **States**.


#### Service `denonavr.get_command`

Generic commands are supported, in particular, any command supported by the telnet protocol can be sent to `/goform/formiPhoneAppDirect.xml`, e.g., `/goform/formiPhoneAppDirect.xml?VSMONI2` to switch HDMI outputs on supported receivers. IR remote codes can also be sent to this endpoint, e.g.,  "/goform/formiPhoneAppDirect.xml?RCKSK0410370" as a mute toggle.  
A comprehensive list of telnet protocol commands is [also available](http://assets.denon.com/_layouts/15/xlviewer.aspx?id=/DocumentMaster/us/AVR-X6400H_X4400H_X3400H_X2400H_X1400H_S930H_S730H_PROTOCOL_V01.xlsx) and so is a [full list of IR codes](http://assets.denon.com/DocumentMaster/UK/AVR3313_IR_CODE_V01.pdf)

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Name of entity to send command to. For example `media_player.marantz`|
| `command`              |       no | Command to send to device, e.g.,  `/goform/formiPhoneAppDirect.xml?VSMONI2`|

[Denon]: /integrations/denon
