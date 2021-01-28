---
title: ebus
description: The ebusd integration allows the integration between eBUS heating system and Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 2021.2.1
ha_domain: ebus
ha_config_flow: true
ha_codeowners:
  - '@c0fec0de'
ha_quality_scale: gold
---

[EBUS](https://en.wikipedia.org/wiki/EBUS_(serial_buses)) is a 2-wire digital serial data-bus for heating and cooling applications.
You need a EBUS-to-USB (i.e. [ESERA](https://www.esera.de/produkte/ebus/135/1-wire-hub-platine?c=20) or [eBus Adapter 3](https://adapter.ebusd.eu/)) or EBUS-to-LAN converter.
[EBUSD - EBUS daemon](https://github.com/john30/ebusd) manages the EBUS protocol and knows all messages and their interpretation.

This integration serves all EBUS message fields as sensor values to Home Assistant. Writing to the EBUS is supported.
The [EBUSD-Configuration](https://github.com/john30/ebusd-configuration) currently supports these Heating and Cooling Systems:

  * Dungs
  * FH Ostfalia
  * TEM
  * Lamberti
  * CEB
  * Landis-Staefa
  * FERRO
  * MONDIAL
  * Wikon
  * Wolf
  * RAWE
  * Satronic
  * ENCON
  * Kromschröder
  * Eberle
  * EBV
  * Grässlin
  * ebm-papst
  * SIG
  * Theben
  * Thermowatt
  * Vaillant (i.e. vr630)
  * Toby
  * Weishaupt
  * ebusd.eu
  * Heating


## Configuration

1. Setup a EBUS-to-USB converter or EBUS-to-LAN converter
2. [Install EBUSD](https://github.com/john30/ebusd/wiki#installation)
3. Home Assistant Menu: *Configuration* -> *Integrations*. Search for "EBUS", check the configuration form defaults, and then click **Submit**.

{% configuration %}
host:
  description: Hostname or IP of the machine running EBUSD.
  required: true
  type: string
  default: "127.0.0.1"
port:
  description: EBUS daemon port
  required: true
  default: 8888
  type: integer
{% endconfiguration %}

## Services

In order to modify a writeable sensor value:

```txt
Domain: ebus
Service: set_value
Service Data: {"entity_id": "sensor.mixer_operatingmode_mcmode", "value": "auto"}
```

Please see the corresponding sensor attributes if the sensor is writeable.


## Polling

Some sensor values are published on EBUS on change automatically. All other sensor values are polled by EBUSD.
The polling rate of the specific sensors is automatically adapted.
Agile values are prioritized and read more often.
The sensor attributes show the actual priority: `1` has highest priority, `3` lowest.

EBUS may contain duplicates or static values which are not of any interest.
Disable the corresponding sensors.
**Disabled sensors are removed from EBUS polling and will increase update rates of all other EBUS sensors.**


## Trouble-Shooting

EBUS is quite slow. In larger EBUS installations it takes some time to start and collect all values.
The EBUS Status Sensor (`sensor.ebus_status`) states `SCAN` at startup or after re-connect and displays `ok` as soon as EBUS monitoring is working.
Initially all sensors are marked as "Unavailable" and show up as soon as they have been read.

EBUS connection status is checked every minute. A full reconnect takes up to 5 minutes. Please be patient.
