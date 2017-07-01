---
layout: page
title: "APCUPSd Sensor"
description: "Instructions on how to set up APCUPSd sensors within Home Assistant."
date: 2016-02-10 18:28
sidebar: true
comments: false
sharing: true
footer: true
logo: apcupsd.png
ha_release: 0.13
ha_category: System Monitor
ha_iot_class: "Local Polling"
---

The `apcupsd` sensor platform allows you to monitor a UPS (battery backup) by using data from the [apcaccess](http://linux.die.net/man/8/apcaccess) command.

To use this sensor platform, you first have to set up [apcupsd](/components/apcupsd/), and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: apcupsd
    resources:
      - bcharge
      - linev
      - loadpct
      - nominv
      - nompower
      - numxfers
      - outputv
      - status
      - timeleft
      - tonbatt
```

Configuration variables:

- **resources** array (*Required*): Contains all entries to display.

### {% linkable_title Example  %}

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
SENSE    : High
DWAKE    : 0 Seconds
DSHUTD   : 180 Seconds
DLOWBATT : 2 Minutes
LOTRANS  : 196.0 Volts
HITRANS  : 253.0 Volts
RETPCT   : 15.0 Percent
ITEMP    : 30.6 C
ALARMDEL : Low Battery
BATTV    : 27.6 Volts
LINEFREQ : 50.0 Hz
LASTXFER : High line voltage
NUMXFERS : 0
TONBATT  : 0 Seconds
CUMONBATT: 0 Seconds
XOFFBATT : N/A
SELFTEST : NO
STESTI   : 336
STATFLAG : 0x0500000A
DIPSW    : 0x00
REG1     : 0x00
REG2     : 0x00
REG3     : 0x00
MANDATE  : 07/13/99
SERIALNO : GS9888761008
BATTDATE : 13/11/15
NOMOUTV  : 230 Volts
NOMBATTV : 24.0 Volts
EXTBATTS : 0
FIRMWARE : 70.11.I
END APC  : 2016-02-09 17:13:46 +0000
```

Use the (case insensitive) values from the left hand column:

```yaml
sensor:
  - platform: apcupsd
    resources:
      - linev
      - loadpct
      - itemp
```
