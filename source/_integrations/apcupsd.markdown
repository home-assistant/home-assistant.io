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
ha_quality_scale: bronze
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

## Supported functionality

### Entities

The APC UPS Daemon integration provides the following entities.

#### Binary sensors

- **Online Status**
  - **Description**: Indicates whether the UPS is online, supplying power to connected devices from utility line, not the battery.
  - **Available for machines**: all

#### Sensors

{% note %}

Some sensors are disabled by default, since they provide information that is only useful for advanced users. You can manually enable them in **{% my entities title="Settings -> Devices & Services -> Entities" %}** -> the sensor entity you want to enable -> Advanced settings -> Enabled.

{% endnote %}

- **Alarm Delay**
  - **Description**: The delay period for the UPS alarm.
  - **Available for machines**: all

- **Battery Replaced**
  - **Description**: The date that batteries were last replaced.
  - **Available for machines**: all

- **Battery Voltage**
  - **Description**: Battery voltage as supplied by the UPS.
  - **Available for machines**: all

- **Battery**
  - **Description**: The percentage charge on the batteries.
  - **Available for machines**: all

- **Total Time on Battery**
  - **Description**: Total (cumulative) time on batteries in seconds since apcupsd startup.
  - **Available for machines**: all

- **Date and Time**
  - **Description**: The time and date that the STATUS record was written.
  - **Available for machines**: all

- **Transfer High**
  - **Description**: The line voltage above which the UPS will switch to batteries.
  - **Available for machines**: all

- **Input Voltage**
  - **Description**: The current line voltage as returned by the UPS.
  - **Available for machines**: all

- **Load**
  - **Description**: The percentage of load capacity as estimated by the UPS.
  - **Available for machines**: all

- **Transfer Low**
  - **Description**: The line voltage below which the UPS will switch to batteries.
  - **Available for machines**: all

- **Battery Timeout**
  - **Description**: apcupsd will shut down your system if the time on batteries exceeds this value. A value of zero disables the feature. Value is set in the configuration file (TIMEOUT).
  - **Available for machines**: all

- **Battery Shutdown**
  - **Description**: If the battery charge percentage (BCHARGE) drops below this value, apcupsd will shut down your system. Value is set in the configuration file (BATTERYLEVEL).
  - **Available for machines**: all

- **Shutdown Time**
  - **Description**: apcupsd will shut down your system if the remaining runtime equals or is below this point. Value is set in the configuration file (MINUTES).
  - **Available for machines**: all

- **Battery Nominal Voltage**
  - **Description**: The nominal battery voltage.
  - **Available for machines**: all

- **Nominal Input Voltage**
  - **Description**: The input voltage that the UPS is configured to expect.
  - **Available for machines**: all

- **Nominal Output Power**
  - **Description**: The maximum power in Watts that the UPS is designed to supply.
  - **Available for machines**: all

- **Transfer Count**
  - **Description**: The number of transfers to batteries since apcupsd startup.
  - **Available for machines**: all

- **Last Self-test**
  - **Description**: The date and time of the last self-test performed by the UPS.
  - **Available for machines**: all
  - **Remarks**: This only becomes available when a self-test (either automatic or manual) is performed.

- **Self Test Result**
  - **Description**: The results of the last self test, and may have the following values:
    - OK: self test indicates good battery
    - BT: self test failed due to insufficient battery capacity
    - NG: self test failed due to overload
    - NO: No results
  - **Available for machines**: all

- **Startup Time**
  - **Description**: The time/date that apcupsd was started.
  - **Available for machines**: all

- **Status**
  - **Description**: The current status of the UPS (ONLINE, CHARGING, ONBATT, etc.)
  - **Available for machines**: all

- **Time Left**
  - **Description**: The remaining runtime left on batteries as estimated by the UPS.
  - **Available for machines**: all

- **Time on Battery**
  - **Description**: Time in seconds currently on batteries, or 0.
  - **Available for machines**: all

- **Mode**
  - **Description**: The mode in which apcupsd is operating as specified in the configuration file (UPSMODE)
  - **Available for machines**: all

- **Transfer from Battery**
  - **Description**: Time and date of last transfer from batteries.
  - **Available for machines**: all

- **Transfer to Battery**
  - **Description**: Time and date of last transfer to batteries.
  - **Available for machines**: all
  - **Remarks**: This entity only becomes available after a tranfer to battery event happens.

- **Battery Status**
  - **Description**: The status of the batteries.
  - **Available for machines**: Back-UPS Pro and Smart-UPS

- **Line Frequency**
  - **Description**: Line frequency in hertz as given by the UPS.
  - **Available for machines**: Back-UPS Pro and Smart-UPS

- **Load Apparent Power**
  - **Description**: An "apparent load" condition, indicating the calculated load on the UPS based on the voltage and current. This is a measure of how much power the UPS is supplying to connected devices, often reported as a percentage of its capacity.
  - **Available for machines**: Back-UPS Pro and Smart-UPS

- **Output Voltage**
  - **Description**: The voltage the UPS is supplying to your equipment
  - **Available for machines**: Back-UPS Pro and Smart-UPS

- **Bad Batteries**
  - **Description**: The number of bad battery packs.
  - **Available for machines**: Smart-UPS

- **Dip Switch Settings**
  - **Description**: The current dip switch settings on UPSes that have them.
  - **Available for machines**: Smart-UPS

- **Low Battery Signal**
  - **Description**: The remaining runtime below which the UPS sends the low battery signal. At this point apcupsd will force an immediate emergency shutdown.
  - **Available for machines**: Smart-UPS

- **Shutdown Delay**
  - **Description**: The grace delay that the UPS gives after receiving a power down command from apcupsd before it powers off your equipment.
  - **Available for machines**: Smart-UPS

- **Wake Delay**
  - **Description**: The amount of time the UPS will wait before restoring power to your equipment after a power off condition when the power is restored.
  - **Available for machines**: Smart-UPS

- **External Batteries**
  - **Description**: The number of external batteries as defined by the user. A correct number here helps the UPS compute the remaining runtime more accurately.
  - **Available for machines**: Smart-UPS

- **Internal Temperature**
  - **Description**: Internal UPS temperature as supplied by the UPS.
  - **Available for machines**: Smart-UPS

- **Input Voltage Status**
  - **Description**: The input line voltage status. "OK" indicates normal operation.
  - **Available for machines**: Smart-UPS

- **Master Update**
  - **Description**: The last time the master sent an update to the device.
  - **Available for machines**: Smart-UPS

- **Input Voltage High**
  - **Description**: The maximum line voltage since the UPS was started, as reported by the UPS.
  - **Available for machines**: Smart-UPS

- **Input Voltage Low**
  - **Description**: The minimum line voltage since the UPS was started, as returned by the UPS.
  - **Available for machines**: Smart-UPS

- **Nominal Output Voltage**
  - **Description**: The output voltage that the UPS will attempt to supply when on battery power.
  - **Available for machines**: Smart-UPS

- **Nominal Apparent Power**
  - **Description**: The rated apparent power capacity.
  - **Available for machines**: Smart-UPS

- **Output Current**
  - **Description**: The output current being supplied by the UPS to the connected devices
  - **Available for machines**: Smart-UPS

- **Restore Requirement**
  - **Description**: The percentage charge that the batteries must have after a power off condition before the UPS will restore power to your equipment.
  - **Available for machines**: Smart-UPS

- **Self Test Interval**
  - **Description**: The interval in hours between automatic self tests.
  - **Available for machines**: Smart-UPS

- **Transfer from Battery**
  - **Description**: The date and time of last transfer off battery since apcupsd startup.
  - **Available for machines**: Smart-UPS

- **Ambient Humidity**
  - **Description**: The humidity as measured by the UPS.
  - **Available for machines**: Smart-UPS with optional accessories (e.g., temperature/humidity sensors or SNMP network cards).

- **Ambient Temperature**
  - **Description**: The ambient temperature as measured by the UPS.
  - **Available for machines**: Smart-UPS with optional accessories (e.g., temperature/humidity sensors or SNMP network cards).

- **Status Data**
  - **Description**: Header record indicating the STATUS format revision level, the number of records that follow the APC statement, and the number of bytes that follow the record.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Model**
  - **Description**: The old APC model identification code.
  - **Available for machines**: Smart-UPS
  - **Remarks**: Disabled by default for advanced uses.

- **Cable Type**
  - **Description**: The cable as specified in the configuration file (UPSCABLE).
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Status Date**
  - **Description**: The date and time that the information was last obtained from the UPS.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Driver**
  - **Description**: The driver used to communicate with the UPS.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Firmware Version**
  - **Description**: The firmware revision number as reported by the UPS.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Hostname**
  - **Description**: The name of the machine that collected the UPS data.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Last Transfer**
  - **Description**: The reason for the last transfer to batteries.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Manufacture Date**
  - **Description**: The date the UPS was manufactured.
  - **Available for machines**: Smart-UPS
  - **Remarks**: Disabled by default for advanced uses.

- **Model**
  - **Description**: The UPS model as derived from information from the UPS.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Register 1 Fault**
  - **Description**: The value from the UPS fault register 1.
  - **Available for machines**: Smart-UPS
  - **Remarks**: Disabled by default for advanced uses.

- **Register 2 Fault**
  - **Description**: The value from the UPS fault register 2.
  - **Available for machines**: Smart-UPS
  - **Remarks**: Disabled by default for advanced uses.

- **Register 3 Fault**
  - **Description**: The value from the UPS fault register 3.
  - **Available for machines**: Smart-UPS
  - **Remarks**: Disabled by default for advanced uses.

- **Sensitivity**
  - **Description**: The sensitivity level of the UPS to line voltage fluctuations.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Serial Number**
  - **Description**: The UPS serial number.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Status Flag**
  - **Description**: Status flag. English version is given by STATUS.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Name**
  - **Description**: The name of the UPS as stored in the EEPROM or in the UPSNAME directive in the configuration file.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

- **Daemon Info**
  - **Description**: The apcupsd release number, build date, and platform.
  - **Available for machines**: all
  - **Remarks**: Disabled by default for advanced uses.

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
      - sensor.apc_ups_load
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
