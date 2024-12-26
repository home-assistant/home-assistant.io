---
title: APC UPS Daemon
description: Instructions on how to integrate apcupsd status with Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - System monitor
ha_release: 0.13
ha_iot_class: Local Polling
ha_domain: apcupsd
ha_config_flow: true
ha_codeowners:
  - '@yuxincs'
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: integration
---

[apcupsd](http://www.apcupsd.org/) status information can be integrated into Home Assistant when the Network Information Server (NIS) is configured on the APC device.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensors)

## Home Assistant add-on installation

Install this [unofficial add-on](https://github.com/korylprince/hassio-apcupsd/) to use this integration with Home Assistant. Keep in mind that we can't give you support for this add-on.

After installation, follow the instructions on the GitHub page to configure the plugin. Then continue to follow the integration configurations below.

{% include integrations/config_flow.md %}

{% note %}

If you get `ConnectionRefusedError: Connection refused` errors in the Home Assistant logs, ensure the [apcupsd](http://www.apcupsd.org/) configuration directives used by its Network Information Server is set to permit connections from all addresses NISIP 0.0.0.0, else non-local addresses will not connect.

{% endnote %}


## Binary sensor

This integration provides a binary sensor for the following information from apcupsd:

- UPS status

## Sensors

This integration provides sensors for the following information from apcupsd based on their availability. Each sensor is listed here along with their corresponding resource name obtained from `apcaccess`. 

{% note %}

Some sensors are disabled by default, since they provide information that is only useful for advanced users. You can manually enable them in **{% my entities title="Settings -> Devices & Services -> Entities" %}** -> the sensor entity you want to enable -> Advanced settings -> Enabled.

{% endnote %}

- UPS Alarm Delay (ALARMDEL)
- UPS Ambient Temperature (AMBTEMP)
- UPS Status Data (APC)
- UPS Model (APCMODEL)
- UPS Bad Batteries (BADBATTS)
- UPS Battery Replaced (BATTDATE)
- UPS Battery Status (BATTSTAT)
- UPS Battery Voltage (BATTV)
- UPS Battery (BCHARGE)
- UPS Cable Type (CABLE)
- UPS Total Time on Battery (CUMONBATT)
- UPS Status Date (DATE)
- UPS Dip Switch Settings (DIPSW)
- UPS Low Battery Signal (DLOWBATT)
- UPS Driver (DRIVER)
- UPS Shutdown Delay (DSHUTD)
- UPS Wake Delay (DWAKE)
- UPS Date and Time (END APC)
- UPS External Batteries (EXTBATTS)
- UPS Firmware Version (FIRMWARE)
- UPS Transfer High (HITRANS)
- UPS Hostname (HOSTNAME)
- UPS Ambient Humidity (HUMIDITY)
- UPS Internal Temperature (ITEMP)
- UPS Last Transfer (LASTXFER)
- UPS Input Voltage Status (LINEFAIL)
- UPS Line Frequency (LINEFREQ)
- UPS Input Voltage (LINEV)
- UPS Load (LOADPCT)
- UPS Load Apparent Power (LOADAPNT)
- UPS Transfer Low (LOTRANS)
- UPS Manufacture Date (MANDATE)
- UPS Master Update (MASTERUPD)
- UPS Input Voltage High (MAXLINEV)
- UPS Battery Timeout (MAXTIME)
- UPS Battery Shutdown (MBATTCHG)
- UPS Input Voltage Low (MINLINEV)
- UPS Shutdown Time (MINTIMEL)
- UPS Model (MODEL)
- UPS Battery Nominal Voltage (NOMBATTV)
- UPS Nominal Input Voltage (NOMINV)
- UPS Nominal Output Voltage (NOMOUTV)
- UPS Nominal Output Power (NOMPOWER)
- UPS Nominal Apparent Power (NOMAPNT)
- UPS Transfer Count (NUMXFERS)
- UPS Output Current (OUTCURNT)
- UPS Output Voltage (OUTPUTV)
- UPS Register 1 Fault (REG1)
- UPS Register 2 Fault (REG2)
- UPS Register 3 Fault (REG3)
- UPS Restore Requirement (RETPCT)
- UPS Last Self Test (LASTSTEST)
- UPS Self Test Result (SELFTEST)
- UPS Sensitivity (SENSE)
- UPS Serial Number (SERIALNO)
- UPS Startup Time (STARTTIME)
- UPS Status Flag (STATFLAG)
- UPS Status (STATUS)
- UPS Self Test Interval (STESTI)
- UPS Time Left (TIMELEFT)
- UPS Time on Battery (TONBATT)
- UPS Mode (UPSMODE)
- UPS Name (UPSNAME)
- UPS Daemon Info (VERSION)
- UPS Transfer from Battery (XOFFBAT)
- UPS Transfer from Battery (XOFFBATT)
- UPS Transfer to Battery (XONBATT)
