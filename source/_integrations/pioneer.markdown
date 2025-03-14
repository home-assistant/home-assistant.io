---
title: Pioneer
description: Instructions on how to integrate a Pioneer Network Receivers into Home Assistant.
ha_category:
  - Media player
ha_release: 0.19
ha_iot_class: Local Polling
ha_domain: pioneer
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `pioneer` {% term integration %} allows you to control Pioneer Network Receivers. Please note, however, that the more recent Pioneer models work with [Onkyo](/integrations/onkyo) platform instead.

To add a Pioneer receiver to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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

- Some Pioneer AVRs use the port 23 default and some are reported to use 8102. Depending on the model you may be able to configure the port setting through the receiver's HTTP interface, e.g. `http://192.168.0.10/1000/port_number.asp`. On models that can listen to multiple ports you could consider leaving the default port for use by hardcoded tools, and open another port for configurable tools such as Home Assistant.
- `timeout` is a socket level option and should only be configured if you know what you are doing.

### Source codes

Under these lines, you can find some sample `sources` lists per receiver model. Here we use the source names as shown on the remote as key for each code. However these are for display purposes only, so you could rename inputs to better match your set-up (e.g.,  `HDMI: '19'` to `Kodi: '19'`.

Codes must be defined as strings (between single or double quotation marks) so that `05` is not implicitly transformed to `5`, which wouldn't be valid source code.

#### VSX-930

```yaml
sources:
  'BD': '25'
  'DVD': '04'
  'SAT': '06'
  'HDMI3': '21'
  'HDMI4': '22'
  'HDMI5': '23'
  'HDMI6 - MHL': '24'
  'Ipod/USB': '17'
  'BT': '33'
  'Tuner': '02'
  'TV': '05'
  'CD': '01'
  'Internet Radio': '38'
  'Media Server': '44'
  'Favourites': '45'
  'Spotify': '53'
```

Note that some other functionalities are available, but may not be relevant to use from this integration. A non exhaustive list of them are:
```yaml
sources:
#  Correspond to the HDMI button on the remote, which loops over `HDMI3`, `HDMI4`, `HDMI5` and `HDMI6 - MHL`
  'HDMI': '31' 
# Correspond to the NET button the remote, which loops over `Internet Radio`, `Media Server`, `Favourites` and `Spotify`
  'NET': '26'
```

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
port: 8102
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

#### VSX-1021

```yaml
port: 8102
sources:
  'Phono': '00'
  'CD': '01'
  'Tuner': '02'
  'CD-R/Tape': '03'
  'DVD': '04'
  'TV/Sat': '05'
  'Video 1': '10'
  'Multi Channel In': '12'
  'Video 2': '14'
  'DVR/BDR': '15'
  'iPod/USB': '17'
  'XM Radio': '18'
  'HDMI 1': '19'
  'HDMI 2': '20'
  'HDMI 3': '21'
  'HDMI 4': '22'
  'HDMI 5': '23'
  'Blu-Ray': '25'
  'Home Media Gallery (Internet Radio)': '26'
  'Sirius': '27'
  'Adapter Port': '33'
```
