---
title: apcupsd
description: Instructions on how to integrate apcupsd status with Home Assistant.
logo: apcupsd.png
ha_category:
  - System Monitor
  - Binary Sensor
  - Sensor
ha_release: 0.13
ha_iot_class: Local Polling
ha_domain: apcupsd
ha_platforms:
  - binary_sensor
  - sensor
---

[Apcupsd](http://www.apcupsd.org/) status information can be integrated into Home Assistant when the Network Information Server (NIS) [is configured](http://www.apcupsd.org/manual/manual.html#nis-server-client-configuration-using-the-net-driver) on the APC device.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Sensor](#sensor)

## Home Assistant add-on installation

Install this [unofficial add-on](https://github.com/korylprince/hassio-apcupsd/) to use this integration with Home Assistant. Keep in mind that we can't give you support for this add-on.

After installation, follow the instructions on the GitHub page to configure the plugin. Then continue to follow the integration configurations below.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
apcupsd:
```

{% configuration %}
host:
  description: The hostname/IP address on which the apcupsd NIS is being served.
  required: false
  type: string
  default: localhost
port:
  description: The port on which the apcupsd NIS is listening.
  required: false
  type: integer
  default: 3551
{% endconfiguration %}

<div class='note'>

If you get `ConnectionRefusedError: Connection refused` errors in the Home Assistant logs, ensure the [Apcupsd](http://www.apcupsd.org/) configuration directives used by its Network Information Server is set to permit connections from all addresses [NISIP 0.0.0.0](http://www.apcupsd.org/manual/manual.html#configuration-directives-used-by-the-network-information-server), else non-local addresses will not connect.

 </div>

## Binary sensor

In addition to the [Apcupsd Sensor](#sensor) devices, you may also create a device which is simply "on" when the UPS status is online and "off" at all other times.

### Configuration

To enable this sensor, you first have to set up apcupsd integration (above), and add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: apcupsd
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: UPS Online Status
{% endconfiguration %}

## Sensor

 The `apcupsd` sensor platform allows you to monitor a UPS (battery backup) by using data from the [apcaccess](https://linux.die.net/man/8/apcaccess) command.

### Configuration

To use this sensor platform, you first have to set up apcupsd integration (above), and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: apcupsd
    resources:
      - bcharge
      - linev
```

{% configuration %}
resources:
  description: Contains all entries to display.
  required: true
  type: list
{% endconfiguration %}

### Example

Given the following output from `apcaccess`:

```yaml
APC      : 001,051,1149
DATE     : 2016-02-09 17:13:31 +0000
HOSTNAME : localhost
VERSION  : 3.14.12 (29 March 2014) redhat
UPSNAME  : netrack
CABLE    : Custom Cable Smart
DRIVER   : APC Smart UPS (any)
UPSMODE  : Stand Alone
STARTTIME: 2016-02-09 16:06:47 +0000
MODEL    : SMART-UPS 1400
STATUS   : TRIM ONLINE
LINEV    : 247.0 Volts
LOADPCT  : 13.0 Percent
BCHARGE  : 100.0 Percent
TIMELEFT : 104.0 Minutes
MBATTCHG : 5 Percent
MINTIMEL : 3 Minutes
MAXTIME  : 0 Seconds
MAXLINEV : 249.6 Volts
MINLINEV : 244.4 Volts
OUTPUTV  : 218.4 Volts
[...]
```

Use the values from the left hand column (lower case required).

Full Example Configuration:

```yaml
sensor:
  - platform: apcupsd
    resources:
      - apc
      - date
      - hostname
      - version
      - upsname
      - cable
      - driver
      - upsmode
      - starttime
      - model
      - status
      - linev
      - loadpct
      - bcharge
      - timeleft
      - mbattchg
      - mintimel
      - maxtime
      - maxlinev
      - minlinev
      - outputv
```
