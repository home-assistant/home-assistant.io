---
title: DSMR Slimme Meter
description: Instructions on how to integrate DSMR Smartmeter within Home Assistant.
logo: netbeheernederland.jpg
ha_category:
  - Energy
ha_release: 0.34
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: dsmr
ha_codeowners:
  - '@Robbie1221'
ha_platforms:
  - sensor
---

A sensor platform for Dutch Smart Meters which comply to DSMR (Dutch Smart Meter Requirements), also known as 'Slimme meter' or 'P1 poort'.

- Currently support DSMR V2.2, V3, V4, V5, V5 Belgian and V5 Smarty through the [dsmr_parser](https://github.com/ndokter/dsmr_parser) module by Nigel Dokter.
- For official information about DSMR refer to: [DSMR Document](https://www.netbeheernederland.nl/dossiers/slimme-meter-15)
- For official information about the P1 port refer to: [P1 Companion Standard](https://www.netbeheernederland.nl/_upload/Files/Slimme_meter_15_a727fce1f1.pdf)
- For unofficial hardware connection examples refer to: [Domoticx](http://domoticx.com/p1-poort-slimme-meter-hardware/)

<p class='img'>
<img src='/images/screenshots/dsmr.png' />
</p>

This integration is known to work for:

- Iskra ME382 / MT382 (DSMR 2.2)
- ISKRA AM550 (DSMR 5.0)
- Landis+Gyr E350 (DMSR 4)
- Landis+Gyr ZCF110 / ZM F110 (DSMR 4.2)
- Kaifa E0026
- Kamstrup 382JxC (DSMR 2.2)
- Sagemcom XS210 ESMR5

USB serial converters:

- Cheap (Banggood/ebay) Generic PL2303
- [Smartmeter Webshop](https://sites.google.com/site/nta8130p1smartmeter/webshop)
- [SOS Solutions](https://www.sossolutions.nl/slimme-meter-kabel)
- [AliExpress](https://nl.aliexpress.com/item/32945187155.html)

Serial to network proxies:

- [ser2net](http://ser2net.sourceforge.net)

DIY solutions (ESP8266 based):

- [esp8266_p1meter (fliphess)](https://github.com/fliphess/esp8266_p1meter)

{% include integrations/config_flow.md %}

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

Docker users have to allow Docker access to the device by adding `--device /dev/ttyUSB21:/dev/ttyUSB21` to the run command:

```hass
$ docker run --device /dev/ttyUSB0:/dev/ttyUSB0 -d --name="home-assistant" -v /home/USERNAME/hass:/config -v /etc/localtime:/etc/localtime:ro --net=host homeassistant/home-assistant
```

### Options

To configure options for DSMR integration go to **Configuration** >> **Integrations** and press **Options** on the DSMR card.

#### Time between updates

Typically the smart meter sends new data every 5-10 seconds. This value defines the minimum time between entity updates in seconds. Setting this value to 0 will update entities each time data is received from the smart meter.

<div class='note warning'>
Reducing the default time between updates will increase the amount of events generated and can potentially flood the system with events.
</div>

### Technical overview

DSMR is a standard to which Dutch smartmeters must comply. It specifies that the smartmeter must send out a 'telegram' every 10 seconds (every second for DSMR 5.0 devices) over a serial port.

The contents of this telegram differ between version but they generally consist of lines with 'obis' (Object Identification System, a numerical ID for a value) followed with the value and unit.

This module sets up an asynchronous reading loop using the `dsmr_parser` module which waits for a complete telegram, parser it and puts it on an async queue as a dictionary of `obis`/object mapping. The numeric value and unit of each value can be read from the objects attributes. Because the `obis` are know for each DSMR version the Entities for this integration are create during bootstrap.

Another loop (DSMR class) is setup which reads the telegram queue, stores/caches the latest telegram and notifies the Entities that the telegram has been updated.
