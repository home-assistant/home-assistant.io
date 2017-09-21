---
layout: page
title: NUT Sensor
description: "Instructions on how to set up NUT sensors within Home Assistant."
date: 2016-11-23
sidebar: true
comments: false
sharing: true
footer: true
logo: nut.png
ha_category: System Monitor
ha_version: 0.34
ha_iot_class: "Local Polling"
---

The `nut` sensor platform allows you to monitor a UPS (battery backup) by using data from a [NUT](http://networkupstools.org/) (Network UPS Tools) server.

To use this sensor platform, you need to add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nut
    resources:
      - ups.load
      - ups.realpower.nominal
      - input.voltage
      - battery.runtime
```

Configuration variables:

- **name** (*Optional*): Name prefix for defined sensors. Defaults to 'NUT UPS'.
- **host** (*Optional*): The host name or address of the device that is running NUT. Defaults to localhost.
- **port** (*Optional*): The port number. Defaults to 3493.
- **alias** (*Optional*): Name of the ups on the NUT server. Will default to the first UPS name listed.
- **username** (*Optional*): Username to login to the NUT server. Default is none.
- **password** (*Optional*): Password to login to the NUT server. Default is none.
- **resources** array (*Required*): Contains all entries to display.

### {% linkable_title Example  %}

Given the following example output from NUT (Your variables may differ):

```yaml
'ups.timer.reboot': '0', 
'battery.voltage': '27.0', 
'ups.firmware.aux': 'L3 -P ', 
'ups.mfr': 'American Power Conversion', 
'battery.runtime.low': '120', 
'ups.delay.shutdown': '20', 
'ups.load': '19', 
'ups.realpower.nominal': '600', 
'battery.charge.warning': '50', 
'battery.charge.low': '10', 
'ups.vendorid': '051d', 
'ups.timer.shutdown': '-1', 
'ups.test.result': 'No test initiated', 
'ups.firmware': '868.L3 -P.D', 
'battery.mfr.date': '2015/05/08', 
'ups.serial': '3B1519X19994  ', 
'ups.productid': '0002', 
'battery.runtime': '2552', 
'battery.date': '2001/09/25', 
'battery.voltage.nominal': '24.0', 
'battery.type': 'PbAc', 
'ups.mfr.date': '2015/05/08', 
'ups.status': 'OL', 
'ups.model': 'Back-UPS RS1000G', 
'ups.beeper.status': 'disabled', 
'battery.charge': '100', 
'input.sensitivity': 'medium', 
'input.transfer.low': '88'
'input.transfer.high': '147', 
'input.voltage': '121.0', 
'input.voltage.nominal': '120', 
'input.transfer.reason': 'input voltage out of range', 
```

Use the values from the left hand column.  Support is included for most values with 'ups', 'battery', and 'input' prefixes.

```yaml
sensor:
  - platform: nut
    name: UPS Name
    host: 192.168.11.5
    port: 3493
    alias: ups_name
    username: user
    password: pass
    resources:
      - ups.load
      - ups.realpower.nominal
      - input.voltage
      - battery.runtime
```
