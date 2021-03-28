---
title: EDL21
description: Instructions on how to integrate SML-based EDL21 smart meters into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_release: 0.107
ha_domain: edl21
ha_codeowners:
  - '@mtdcr'
ha_platforms:
  - sensor
---

The `edl21` integration lets you read German EDL21 smart meters using [SML](https://de.wikipedia.org/wiki/Smart_Message_Language) from Home Assistant.

In order to connect to the smart meter, an infrared transceiver is required.

Compatible transceivers:

- [DIY](https://wiki.volkszaehler.org/hardware/controllers/ir-schreib-lesekopf-rs232-ausgang)
- [Weidmann Elektronik Schreib-/Lesekopf USB](https://shop.weidmann-elektronik.de/index.php?page=product&info=24)

Tested smart meters:

- APATOR Norax 3D (enable InF Mode as described in manual to retrieve full data)
- Iskraemeco MT175 (ISKRA MT175-D2A51-V22-K0t)

## Configuration

To set it up, add the following information to your `configuration.yaml` file:

```yaml
sensor:
  - platform: edl21
    serial_port: /dev/ttyUSB0
    min_time_between_updates: 60
```

{% configuration %}
name:
  description: The friendly name of the smart meter.
  required: false
  type: string
serial_port:
  description: The device to communicate with. When using ser2net, use socket://host:port.
  required: true
  type: string
min_time_between_updates:
  description: Minimum waiting time between two consecutive updates form the meter in seconds.
  required: false
  type: integer
  default: 60
{% endconfiguration %}

### ser2net

To use this integration with a remote transceiver you could use [ser2net](https://linux.die.net/man/8/ser2net).

Example `ser2net.conf` configuration file:

> 2001:raw:0:/dev/ttyUSB0:9600 8DATABITS NONE 1STOPBIT
