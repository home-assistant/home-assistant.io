---
title: DSMR Smart Meter
description: Instructions on how to integrate DSMR smart meter within Home Assistant.
ha_category:
  - Energy
ha_release: 0.34
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: dsmr
ha_codeowners:
  - '@Robbie1221'
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
---

A sensor platform for Belgian, Dutch, Luxembourg and Swedish Smart Meters which comply to DSMR (Dutch Smart Meter Requirements), also known as 'Slimme meter' or 'P1 poort'. Swedish meters with a 'HAN port' are not supported by this integration.

- Currently support DSMR V2.2, V3, V4, V5, Belgian V5 variant, Luxembourg V5 variant (Smarty), Swedish V5 variant and the EasyMeter Q3D (Germany) through the [dsmr_parser](https://github.com/ndokter/dsmr_parser) module by Nigel Dokter.
- For official information about DSMR refer to: [DSMR Document](https://www.netbeheernederland.nl/dossiers/slimme-meter-15)
- For official information about the P1 port refer to: [P1 Companion Standard](https://www.netbeheernederland.nl/sites/default/files/2024-02/dsmr_5.0.2_p1_companion_standard.pdf)
- For unofficial hardware connection examples refer to: [Domoticx](http://domoticx.com/p1-poort-slimme-meter-hardware/)
- For official information about the Swedish variant refer to: [Swedish specification](https://www.energiforetagen.se/globalassets/energiforetagen/det-erbjuder-vi/kurser-och-konferenser/elnat/branschrekommendation-lokalt-granssnitt-v2_0-201912.pdf).
- For official information about the E.ON Hungary variant refer to: [E.ON Hungary P1 port specification](https://www.eon.hu/content/dam/eon/eon-hungary/documents/Lakossagi/aram/muszaki-ugyek/P1_port_felhasznaloi_interfesz_felhasznaloi_tajekoztato_%2020240702.pdf)
- Supports [P1 cables](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Products/19602) integrated in a [RFXtrx device](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Products/18103).

<p class='img'>
<img src='/images/screenshots/dsmr.png' />
</p>

### Configuration

- For Belgian meters, choose DSMR version `5B`
- For Dutch meters, choose DSMR version `2.2`, `4`, or `5`
- For Luxembourg meters, choose DSMR version `5L`
- For Swedish meters, choose DSMR version `5S`
- For EasyMeter Q3D, choose DSMR version `Q3D`
- For E-ON Hungary meters (and for most of other Hungarian meters), choose DSMR version `5EONHU`

### Options

To configure options for DSMR integration go to **Settings** -> **Devices & services** and press **Options** on the DSMR card.

#### Time between updates

Typically the smart meter sends new data every 5-10 seconds. This value defines the minimum time between entity updates in seconds. Setting this value to 0 will update entities each time data is received from the smart meter.

{% important %}
Reducing the default time between updates will increase the amount of events generated and can potentially flood the system with events.
{% endimportant %}

### Supported meters

This integration is known to work for:

- Iskra ME382 / MT382 (DSMR 2.2)
- ISKRA AM550 (DSMR 5.0)
- Landis+Gyr E350 (DSMR 4)
- Landis+Gyr E360 (DSMR 5)*
- Landis+Gyr ZCF110 / ZM F110 (DSMR 4.2)
- Kaifa E0026
- Kaifa MA304C (DSMR 4.2)
- Kamstrup 382JxC (DSMR 2.2)
- Sagemcom XS210 ESMR5
- Sagemcom T211
- Sagemcom MA304
- Ziv E0058 ESMR5
- EasyMeter Q3D

Remarks:  
\* The E360 requires a special P1 cable, various webstores sell these specific to the E360.
### M-Bus support

A smart meter can have multiple subdevices, also known as [M-Bus](https://m-bus.com/) devices.
For the <abbr title="Dutch smart meter requirement">DSMR</abbr> version 5B, support was added for water and gas M-Bus devices. This means you can have up to 4 subdevices on your <abbr title="Dutch smart meter requirement">DSMR</abbr> meter.
While previously only 1 gas meter was supported, there is now support for multiple gas and water meters.

### Connecting to the meter

Connection can be done directly to the meter via a USB to serial connector, or through a serial to network proxy.
It is also possible to connect to a [RFXtrx device](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Products/18103) with an integrated [P1 cables](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Products/19602).

#### USB serial converters:

- Cheap (Banggood/ebay) Generic PL2303
- [SOS Solutions](https://www.sossolutions.nl/slimme-meter-kabel)
- [AliExpress](https://nl.aliexpress.com/item/32945187155.html)

Docker users have to allow Docker access to the USB to serial converter by adding `--device /dev/ttyUSB21:/dev/ttyUSB21` to the run command:

```hass
$ docker run --device /dev/ttyUSB0:/dev/ttyUSB0 -d --name="home-assistant" -v /home/USERNAME/hass:/config -v /etc/localtime:/etc/localtime:ro --net=host {{ site.installation.container }}
```

#### Serial to network proxies:

- [ser2net](https://ser2net.sourceforge.net)
- [Smart Meter bridge](https://github.com/legolasbo/smartmeterBridge)
- [WIZnet WIZ110SR](https://www.wiznet.io/product-item/wiz110sr/)
- [esp8266 SmartMeter (Poluket)](https://www.domohab.be/categorie-produit/passerelle/) (create for DSMR5 / ESMR5 Meter)
- [Smart Gateways NL](https://smartgateways.nl/)

DIY solutions (ESP8266 based):

- [esp8266_p1meter (daniel-jong)](https://github.com/daniel-jong/esp8266_p1meter) (parse on ESP8266 publish to MQTT)
- [DSMR reader for ESPHome (mmakaay)](https://github.com/mmakaay/dsmr-reader-for-esphome)
- [p1-esp8266 (DavyLandman)](https://github.com/DavyLandman/p1-esp8266) (turn ESP8266 into a serial forwarder)


{% include integrations/config_flow.md %}

Optional configuration example for ser2net 3.x.x:

```sh
# Example /etc/ser2net.conf for proxying USB/serial connections to DSMRv4 smart meters
2001:raw:600:/dev/ttyUSB0:115200 NONE 1STOPBIT 8DATABITS XONXOFF LOCAL -RTSCTS
```
or
```sh
# Example /etc/ser2net.conf for proxying USB/serial connections to DSMRv2.2 smart meters
2001:raw:600:/dev/ttyUSB0:9600 EVEN 1STOPBIT 7DATABITS XONXOFF LOCAL -RTSCTS
```

Optional configuration example for ser2net 4.x.x:

```sh
# Example /etc/ser2net.yaml for proxying USB/serial connections to DSMRv4 smart meters
connection: &con0096
    accepter: tcp,2001
    enable: on
    options:
      banner: *banner
      kickolduser: true
      telnet-brk-on-sync: true
    connector: serialdev,
              /dev/ttyUSB0,
              115200n81,local
```

Optional configuration example for Smart Meter Bridge:
```yml
serial_port: "/dev/ttyUSB0"
dsmr_version: "4"
server:
  port: 9988
```

### Technical overview

DSMR is a standard to which Dutch smartmeters must comply. It specifies that the smartmeter must send out a 'telegram' every 10 seconds (every second for DSMR 5.0 devices) over a serial port.

The contents of this telegram differ between version but they generally consist of lines with 'obis' (Object Identification System, a numerical ID for a value) followed with the value and unit.

Smart meters in Belgium, Luxembourg and Sweden provided telegrams with largely the same contents.

This module sets up an asynchronous reading loop using the `dsmr_parser` module which waits for a complete telegram, parser it and puts it on an async queue as a dictionary of `obis`/object mapping. The numeric value and unit of each value can be read from the objects attributes. Because the `obis` are know for each DSMR version the Entities for this integration are create during bootstrap.

Another loop (DSMR class) is setup which reads the telegram queue, stores/caches the latest telegram and notifies the Entities that the telegram has been updated.
