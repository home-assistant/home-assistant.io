---
title: EDL21
description: Instructions on how to integrate SML-based EDL21 smart meters into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_release: 0.107
ha_domain: edl21
ha_platforms:
  - sensor
ha_integration_type: hub
ha_config_flow: true
---

The `edl21` integration lets you read German EDL21 smart meters using [SML](https://de.wikipedia.org/wiki/Smart_Message_Language) from Home Assistant.

In order to connect to the smart meter, an infrared transceiver is required.

Compatible transceivers:

- [DIY](https://wiki.volkszaehler.org/hardware/controllers/ir-schreib-lesekopf-rs232-ausgang)
- [Weidmann Elektronik Schreib-/Lesekopf USB](https://shop.weidmann-elektronik.de/index.php?page=product&info=24)

Tested smart meters:

- APATOR Norax 3D (enable InF Mode as described in manual to retrieve full data)
- DZG DWS76 (enable InF as described in manual to retrieve full data)
- Iskraemeco MT175 (ISKRA MT175-D2A51-V22-K0t)
- EMH metering eHZ Generation K (enable InF as described in manual to retrieve full data)
- efr SGM-C4 (enable InF as described in manual to retrieve full data)
- easymeter Q3 ([Link](https://www.easymeter.com/products/zaehler/q3a))

{% include integrations/config_flow.md %}

## InF Mode

To enable InF mode there are different steps needed based on the meter type but most commonly you have to enter the PIN you received from your grid operator. Once you have it, enter it into the meter and switch to the InF menu where you can switch from InF=Off to InF=On. 
Entering this can be done using a flashlight or (if available) via the physical button on the meter.

For the efr SGM-C4 it is:

- flashing three times to enter pin mode
- entering pin using quicker flashes, wait for 3 seconds for next digit
- pin accepted
- flashing 7 times to get to InF=OFF
- 5-second flash to switch to InF=ON

You will now get more readings like current Power, Voltage, and phase angle. Some meters don´t have this, in that case only an overall reading is provided.

### ser2net

To use this integration with a remote transceiver you could use [ser2net](https://linux.die.net/man/8/ser2net).

Example `ser2net.conf` configuration file:

> 2001:raw:0:/dev/ttyUSB0:9600 8DATABITS NONE 1STOPBIT

Example `ser2net.yaml` (`ser2net` version 4.3.3) configuration entry:

```yaml
connection: &con2001
  enable: on
  accepter: tcp,2001
  options:
    telnet-brk-on-sync: false
    kickolduser: true
  connector: serialdev,/dev/ttyUSB0,9600n81,local
```

Use `socket://<ip-of-host>:2001` when adding the Smart Meter and asked for a "USB device path".
