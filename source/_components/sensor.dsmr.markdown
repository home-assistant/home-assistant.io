---
layout: page
title: "DSMR/Slimme meter"
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

Currently support DSMR V2.2 and V4 through the [dsmr_parser](https://github.com/ndokter/dsmr_parser) module by Nigel Dokter.

For official information about DSMR refer to: [DSMR Document](http://www.netbeheernederland.nl/themas/hotspot/hotspot-documenten/?dossierid=11010056&title=Slimme%20meter&onderdeel=Documenten)

For unofficial hardware connection examples refer to: [Domoticx](http://domoticx.com/p1-poort-slimme-meter-hardware/)

<p class='img'>
<img src='/images/screenshots/dsmr.png' />
</p>

This component is known to work for:

- Iskra ME382 / MT382 (DSMR 2.2)
- Landis+Gyr E350 (DMSR 4)
- Landis+Gyr ZCF110 / ZM F110 (DSMR 4.2)
- Kaifa E0026
- Kamstrup 382JxC (DSMR 2.2)

And USB serial converters:

- Cheap (Banggood/ebay) Generic PL2303
- https://sites.google.com/site/nta8130p1smartmeter/webshop

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dsmr
```

Configuration variables:

- **port** string (*Optional*): Serial port to which Smartmeter is connected (default: /dev/ttyUSB0).
- **dsmr_version_** string (*Optional*): Version of DSMR used by meter, choices: 2.2, 4 (default: 2.2).

A full configuration example can be found below:

```yaml
# Example configuration.yaml entry
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

[HASSbian](/getting-started/installation-raspberry-pi-image/) users have to give dialout permission to the user `homeassistant`:

```
$ sudo usermod -a -G dialout homeassistant
```

and after that you need to reboot!

```
$ sudo reboot
```
