---
title: Pioneer
description: Instructions on how to integrate a Pioneer Network Receivers into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.19
ha_iot_class: Local Polling
ha_domain: pioneer
ha_platforms:
  - media_player
---

The `pioneer` platform allows you to control Pioneer Network Receivers. Please note, however, that the more recent Pioneer models work with [Onkyo](/integrations/onkyo) platform instead.

To add a Pioneer receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: pioneer
    host: 192.168.0.10
```

{% configuration %}
host:
  description: The IP of the Pioneer device, e.g., `192.168.0.10`.
  required: true
  type: string
name:
  description: The name you would like to give to the receiver.
  required: false
  default: Pioneer AVR
  type: string
port:
  description: The port on which the Pioneer device listens, e.g., `23` or `8102`.
  required: false
  default: 23
  type: integer
timeout:
  description: Number of seconds (float) to wait for blocking operations like connect, write and read.
  required: false
  type: float
sources:
  description: A list of mappings from source friendly name to the source code (e.g.,  `TV:'05'`). Valid source codes depend on the receiver (some known codes can be found below). Codes must be defined as strings (between single or double quotation marks) so that `05` is not implicitly transformed to `5`, which wouldn't be valid source code.
  required: false
  default: Empty list (i.e., no source selection will be possible)
  type: list
{% endconfiguration %}

Notes:

- Some Pioneer AVRs use the port 23 default and some are reported to use 8102.
- `timeout` is a socket level option and should only be configured if you know what you are doing.

### Source codes

Under these lines, you can find some sample `sources` lists per receiver model. Here we use the source names as shown on the remote as key for each code. However these are for display purposes only, so you could rename inputs to better match your set-up (e.g.,  `HDMI: '19'` to `Kodi: '19'`.

Codes must be defined as strings (between single or double quotation marks) so that `05` is not implicitly transformed to `5`, which wouldn't be valid source code.

#### VSX-921

```yaml
sources:
  'PHONO': '00'
  'CD': '01'
  'CD-R/TAPE': '03'
  'DVD': '04'
  'TV/SAT': '05'
  'VIDEO 1(VIDEO)': '10'
  'VIDEO 2': '14'
  'DVR/BDR': '15'
  'iPod/USB': '17'
  'HDMI1': '19'
  'HDMI2': '20'
  'HDMI3': '21'
  'HDMI4': '22'
  'HDMI5': '23'
  'HDMI6': '24'
  'BD': '25'
  'HOME MEDIA GALLERY(Internet Radio)': '26'
```

#### VSX-822-K

```yaml
sources:
  'CD': '01'
  'Tuner': '02'
  'DVD': '04'
  'TV': '05'
  'Sat/Cbl': '06'
  'Video': '10'
  'DVR/BDR': '15'
  'iPod/USB': '17'
  'BD': '25'
  'Adapter': '33'
  'Netradio': '38'
  'Pandora': '41'
  'Media Server': '44'
  'Favorites': '45'
  'Game': '49'
```

#### VSX-824

```yaml
sources:
  'CD': '01'
  'Tuner': '02'
  'DVD': '04'
  'TV': '05'
  'Sat/Cbl': '06'
  'Video': '10'
  'DVR/BDR': '15'
  'iPod/USB': '17'
  'HDMI': '19'
  'BD': '25'
  'Adapter': '33'
  'Netradio': '38'
  'Media Server': '44'
  'Favorites': '45'
  'MHL': '48'
  'Game': '49'
```

#### VSX-528

```yaml
port: 8102
sources:
  'CD': '01'
  'Tuner': '02'
  'DVD': '04'
  'TV': '05'
  'Sat/Cbl': '06'
  'DVR/BDR': '15'
  'iPod/USB': '17'
  'HDMI/MHL': '48'
  'BD': '25'
  'Adapter': '33'
  'Netradio': '38'
  'Media Server': '44'
  'Favorites': '45'
  'Game': '49'
```
