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

## {% linkable_title Configuration %}

To use this sensor platform, you first have to set up [apcupsd](/components/apcupsd/), and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: apcupsd
    resources:
      - bcharge
      - linev
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
[...]
```

Use the (case insensitive) values from the left hand column:

```yaml
sensor:
  - platform: apcupsd
    resources:
      - linev
      - loadpct
      - timeleft
```
