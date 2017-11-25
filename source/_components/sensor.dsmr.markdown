---
layout: page
title: "DSMR or Slimme meter"
description: "Instructions how to integrate DSMR Smartmeter within Home Assistant."
date: 2016-11-12 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: netbeheernederland.jpg
ha_category: Energy
ha_release: 0.34
ha_iot_class: "Local Push"
---

A sensor platform for Dutch Smart Meters which comply to DSMR (Dutch Smart Meter Requirements), also known as 'Slimme meter' or 'P1 poort'.

- Currently support DSMR V2.2 and V4 through the [dsmr_parser](https://github.com/ndokter/dsmr_parser) module by Nigel Dokter.
- For official information about DSMR refer to: [DSMR Document](http://www.netbeheernederland.nl/themas/hotspot/hotspot-documenten/?dossierid=11010056&title=Slimme%20meter&onderdeel=Documenten)
- For unofficial hardware connection examples refer to: [Domoticx](http://domoticx.com/p1-poort-slimme-meter-hardware/)

<p class='img'>
<img src='/images/screenshots/dsmr.png' />
</p>

This component is known to work for:

- Iskra ME382 / MT382 (DSMR 2.2)
- Landis+Gyr E350 (DMSR 4)
- Landis+Gyr ZCF110 / ZM F110 (DSMR 4.2)
- Kaifa E0026
- Kamstrup 382JxC (DSMR 2.2)

USB serial converters:

- Cheap (Banggood/ebay) Generic PL2303
- https://sites.google.com/site/nta8130p1smartmeter/webshop
- https://www.sossolutions.nl/slimme-meter-kabel

Serial to network proxies:

- ser2net - http://ser2net.sourceforge.net/

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dsmr
```

{% configuration %}
  port:
    description: "Serial port to which Smartmeter is connected (default: /dev/ttyUSB0 (connected to USB port)). For remote (i.e. ser2net) connections, use TCP port number to connect to (i.e. 2001)."
    required: false
    type: string
  host:
    description: "Host to which Smartmeter is connected (default: '' (connected via serial or USB, see **port**)). For remote connections, use IP address of host to connect to (i.e. 192.168.1.13)."
    required: false
    type: string
  name:
    description: "Version of DSMR used by meter. Choices: 2.2, 4, 5. Defaults to 2.2."
    required: false
    type: string
{% endconfiguration %}

Full configuration examples can be found below:

```yaml
# Example configuration.yaml entry for USB/serial connected Smartmeter
sensor:
  - platform: dsmr
    port: /dev/ttyUSB1
    dsmr_version: 4

group:
  meter_readings:
    name: Meter readings
    entities:
      - sensor.power_consumption_low
      - sensor.power_consumption_normal
      - sensor.power_production_low
      - sensor.power_production_normal
      - sensor.gas_consumption
```

```yaml
# Example configuration.yaml entry for remote (TCP/IP, i.e. via ser2net) connection to host which is connected to Smartmeter
sensor:
  - platform: dsmr
    host: 192.168.1.13
    port: 2001
    dsmr_version: 4

group:
  meter_readings:
    name: Meter readings
    entities:
      - sensor.power_consumption_low
      - sensor.power_consumption_normal
      - sensor.power_production_low
      - sensor.power_production_normal
      - sensor.gas_consumption
```

Optional configuration example for ser2net:

```sh
# Example /etc/ser2net.conf for proxying USB/serial connections to DSMRv4 smart meters
2001:raw:600:/dev/ttyUSB0:115200 NONE 1STOPBIT 8DATABITS XONXOFF LOCAL -RTSCTS
```
or
```sh
# Example /etc/ser2net.conf for proxying USB/serial connections to DSMRv2.2 smart meters
2001:raw:600:/dev/ttyUSB0:9600 EVEN 1STOPBIT 7DATABITS XONXOFF LOCAL -RTSCTS
```

[HASSbian](/getting-started/installation-raspberry-pi-image/) users have to give dialout permission to the user `homeassistant`:

```
$ sudo usermod -a -G dialout homeassistant
```

and after that you need to reboot!

```
$ sudo reboot
```

### {% linkable_title Technical overview %}

DSMR is a standard to which Dutch smartmeters must comply. It specifies that the smartmeter must send out a 'telegram' every 10 seconds over a serial port.

The contents of this telegram differ between version but they generally consist of lines with 'obis' (Object Identification System, a numerical ID for a value) followed with the value and unit.

This module sets up a asynchronous reading loop using the `dsmr_parser` module which waits for a complete telegram, parser it and puts it on an async queue as a dictionary of `obis`/object mapping. The numeric value and unit of each value can be read from the objects attributes. Because the `obis` are know for each DSMR version the Entities for this component are create during bootstrap.

Another loop (DSMR class) is setup which reads the telegram queue, stores/caches the latest telegram and notifies the Entities that the telegram has been updated.

