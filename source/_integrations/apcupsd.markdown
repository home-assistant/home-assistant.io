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

The **APC UPS Daemon** {% term integration %} is used to integrate with UPS devices from [APC](www.apc.com) when the Network Information Server ([apcupsd](http://www.apcupsd.org/)) is configured on the APC devices. Use case: When the Notify integration is set up in Home Assistant, you can send notifications. For example, when the UPS switches to battery power, or when the battery level drops low. You can also use it to track the UPS load.

## Supported devices

Generally any device supported by [apcupsd](http://www.apcupsd.org/) is also supported by this integration. This includes most APC UPS models, such as Smart-UPS models and simple signaling models like Back-UPS models.

## Prerequisites

1. Install apcupsd.

    First, install [apcupsd](http://www.apcupsd.org/) on the machine connected to your UPS. It works on Linux, macOS, Windows, BSD, Solaris, and more.  
    You can usually install it through your operating system’s package manager.


2. Configure apcupsd for network access.

    - Open the `apcupsd.conf` file (usually found in `/etc/apcupsd/`) and make sure it’s set to listen for network connections.  
    - Look for the lines: `NISIP 0.0.0.0` and `NISPORT 3551`.
    - This setting allows it to accept connections on all network interfaces on port 3551.  
    - If you prefer, you can set this to a specific IP address and port that Home Assistant can reach.

3. Start the apcupsd service.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address of the APC UPS Daemon configured above."
Port:
    description: "The port of the APC UPS Daemon configured above."
{% endconfiguration_basic %}

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

## Examples

### Send me a push notification when UPS load is high

{% raw %}

```yaml
alias: "APC UPS Load High Notification"
description: "Notify when APC UPS load is too high"
mode: single
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.gogoups_load
    above: 80
conditions: []
actions:
  - action: notify.notify
    data:
      message: "APC UPS load is high: {{ states('sensor.apc_ups_load') }}%"
```

{% endraw %}

## Data updates

The integration {% term polling polls %} data from your APC UPS Daemon every 60 seconds by default.

## Known limitations

This integration does not allow you to control the UPS. For example, you cannot run a self-test. To run a self-test, use the `apctest` command provided by [apcupsd](http://www.apcupsd.org/).

## Troubleshooting

### Failed to connect

If you get a **Failed to connect** error when setting up the integration (and/or `ConnectionRefusedError: Connection refused` errors in the Home Assistant logs), it means that Home Assistant is not able to connect to the APC UPS daemon. Please check if the `NISIP`/`NISPORT` in the apcupsd configuration file is properly configured. Additionally, try running `apcaccess` on the host machine to see if the daemon is working properly.

### Some entities are no longer provided

If certain entities are missing after a Home Assistant restart, it's likely because they represent event-based data that only appears after specific UPS events (for example, transfer to battery). These entities are cleared when the APC UPS Daemon restarts and won’t reappear until the corresponding event occurs again.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
