---
title: Network UPS Tools (NUT)
description: Instructions on how to set up NUT sensors within Home Assistant.
ha_category:
  - Button
  - Switch
  - System monitor
ha_iot_class: Local Polling
ha_release: 0.34
ha_domain: nut
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@ollo69'
  - '@pestevez'
  - '@tdfountain'
ha_zeroconf: true
ha_platforms:
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: device
related:
  - url: https://www.networkupstools.org
    title: Network UPS Tools
ha_quality_scale: platinum
---

The **Network UPS Tools (NUT)** {% term integration %} allows you to monitor and manage an Uninterruptible Power Supply (UPS) for battery backup, a Power Distribution Unit (PDU), or other similar power device using a [NUT](https://networkupstools.org/) server. It lets you view the status, receive notifications about important events, and execute commands as device actions for one or more such devices.

This integration cannot communicate directly with a UPS or power device.
For this reason, a NUT server is required. The integration talks to the
NUT server using the NUT protocol to retrieve data and status information.

## Supported devices

This integration supports hardware devices compatible with
NUT. NUT's hardware compatibility list is available from the [Network
UPS Tools](https://networkupstools.org/) website.

## Prerequisites

You must have a NUT server configured to monitor one or more supported
power device(s).

It is not possible to automatically detect a NUT server IP address
change. You should therefore configure the NUT server with a static
IP address, assign a fixed IP address reservation with DHCP, or use
DNS as appropriate for your network.

In addition, you will need a username and password for
this integration to log into the NUT server if authentication is
required.

{% include integrations/config_flow.md %}

Setting up the integration requires the following information:

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your NUT server."
Port:
  description: "The network port of your NUT server. The NUT server's default port is '3493'."
Username:
  description: "The username to sign in to your NUT server. The username is optional."
Password:
  description: "The password to sign in to your NUT server. The password is optional."
{% endconfiguration_basic %}

You can update these settings after installation. To do so,
reconfigure the NUT device via
{% my integrations title="**Settings** > **Devices & services**" %},
select {% icon "mdi:dots-vertical" %} for the NUT device you wish to update,
and select **Reconfigure**.

## Supported functionality

{% note %}
This NUT integration uses the NUT protocol to retrieve "variables"
from the NUT server. Only sensors and diagnostic sensors available for
your device are added to Home Assistant.
{% endnote %}

{% important %}
The username and password configured for the device must be granted
`instcmds` permissions on the NUT server to use buttons and
switches. Buttons and switches will not be available if user
credentials are not specified. See the [NUT server
documentation](https://networkupstools.org/documentation.html) for
configuration information.
{% endimportant %}

### Sensors

Sensors provide information about a NUT device.

The following sensors may be available:

- **Alarms**: UPS alarms
- **Battery charge (%)**: Battery charge
- **Charging status**: Status of the battery charger, with the available states: `charging`, `discharging`, `floating`, `resting`, `unknown`, `disabled`, and `off`
- **Input current (A)**: Input current
- **Input load (%)**: Load on (ePDU) input
- **Input voltage (V)**: Input voltage
- **Load (%)**: Load on UPS
- **Outlet apparent power (VA)**: Apparent power for all outlets
- **Outlet current (A)**: Current for all outlets
- **Outlet real power (W)**: Real power for all outlets
- **Outlet voltage (V)**: Voltage for all outlets
- **Output phases**: Output phases
- **Output voltage (V)**: Output voltage
- **Status**: Human-readable version of "Status data" (see below)
- **Status data**: UPS status

The **Status data** sensor is translated into a human-readable virtual
sensor named **Status**.

Some power devices provide monitoring information about individual
outlets. The following sensors may be available for each such outlet:

- **Outlet NAME current (A)**: Current of named outlet
- **Outlet NAME description**: Description of named outlet
- **Outlet NAME power (VA)**: Apparent power of named outlet
- **Outlet NAME real power (W)**: Real power of named outlet

Additional information about the values reported for these sensors can
be found in the Network UPS Tools repository documentation on
[variable names](https://github.com/networkupstools/nut/blob/master/docs/nut-names.txt).

### Diagnostic sensors

Diagnostic sensors provide additional information about a NUT device.

{% important %}
Most of this integration's diagnostic sensors are disabled by default
to reduce storage overhead for Home Assistant. The diagnostic sensors
marked with an asterisk \* are enabled by default. To use a disabled
sensor, you need to enable them first. See the [enabling or disabling
entities](/common-tasks/general/#enabling-or-disabling-entities)
documentation for information on how to do this.
{% endimportant %}

{% note %}
Certain diagnostic sensor values are described as "opaque by mfg" in
the table below and NUT's documentation. This means the value returned
for the sensor may vary by manufacturer.
{% endnote %}

The following diagnostic sensors may be available:

- **Ambient humidity (%)**\*: Ambient relative humidity
- **Ambient humidity status**\*: Ambient humidity status relative to the thresholds, with the available states: `good`, `warning-low`, `critical-low`, `warning-high`, and `critical-high`
- **Ambient temperature (°C)**\*: Ambient temperature
- **Ambient temperature status**\*: Ambient temperature status relative to the thresholds, with the available states: `good`, `warning-low`, `critical-low`, `warning-high`, and `critical-high`
- **Apparent power (VA)**: Current value of apparent power
- **Battery alarm threshold**: Battery alarm threshold
- **Battery capacity (Ah)**: Battery capacity
- **Battery chemistry**: Battery chemistry (opaque by mfg)
- **Battery current (A)**: Battery current
- **Battery date**: Battery installation or last change date (opaque by mfg)
- **Battery manuf date**: Battery manufacturing date (opaque by mfg)
- **Battery runtime (secs)**: Remaining battery runtime as estimated by the device
- **Battery temperature (°C)**: Battery temperature
- **Battery voltage (V)**: Battery voltage
- **Beeper status**: UPS beeper status, with the available states: `enabled`, `disabled`, and `muted`
- **Efficiency (%)**: Efficiency of the UPS (ratio of output to input current)
- **External contacts**: UPS external contact sensors (opaque by mfg)
- **High battery voltage (V)**: Maximum battery voltage (100% charge)
- **High voltage transfer (V)**: High voltage transfer point
- **Input L1 current (A)**: Input L1 current
- **Input L1 line frequency (Hz)**: Input L1 line frequency
- **Input L1 real power (W)**: Input L1 current sum value of all (ePDU) phases real power
- **Input L1-N voltage (V)**: Input L1-N voltage
- **Input L2 current (A)**: Input L2 current
- **Input L2 line frequency (Hz)**: Input L2 line frequency
- **Input L2 real power (W)**: Input L2 current sum value of all (ePDU) phases real power
- **Input L2-N voltage (V)**: Input L2-N voltage
- **Input L3 current (A)**: Input L3 current
- **Input L3 line frequency (Hz)**: Input L3 line frequency
- **Input L3-N voltage (V)**: Input L3-N voltage
- **Input L3 real power (W)**: Input L3 current sum value of all (ePDU) phases real power
- **Input bypass L1 current (A)**: Input bypass L1 current
- **Input bypass L1 real power (W)**: Input bypass L1 value of real power
- **Input bypass L1-N voltage (V)**: Input bypass L1-N voltage
- **Input bypass L2 current (A)**: Input bypass L2 current
- **Input bypass L2 real power (W)**: Input bypass L2 value of real power
- **Input bypass L2-N voltage (V)**: Input bypass L2-N voltage
- **Input bypass L3 current (A)**: Input bypass L3 current
- **Input bypass L3 real power (W)**: Input bypass L3 value of real power
- **Input bypass L3-N voltage (V)**: Input bypass L3-N voltage
- **Input bypass current (A)**: Input bypass current
- **Input bypass frequency (Hz)**: Input bypass line frequency
- **Input bypass phases**: Input bypass line phases
- **Input bypass real power (W)**: Input bypass value of real power
- **Input bypass voltage (V)**: Input bypass voltage
- **Input current status**: Current status relative to the thresholds, with the available states: `good`, `warning-low`, `critical-low`, `warning-high`, and `critical-high`
- **Input frequency (Hz)**: Input line frequency
- **Input frequency status**: Frequency status, with the available states: `good` and `out-of-range`
- **Input nominal frequency (Hz)**: Nominal input line frequency
- **Input phases**: Input line phases
- **Input power (VA)**: Current sum value of all (ePDU) phases apparent power
- **Input power sensitivity**: Input power sensitivity
- **Input real power (W)**: Current sum value of all (ePDU) phases real power
- **Input voltage status**: Status relative to the thresholds
- **Language**: Language to use on front panel (opaque by mfg)
- **Load reboot timer (secs)**: Time before the load will be rebooted
- **Load restart delay (secs)**: Interval to wait before restarting the load
- **Load shutdown timer (secs)**: Time before the load will be shutdown
- **Load start timer (secs)**: Time before the load will be started
- **Low battery runtime (secs)**: Remaining battery runtime when UPS switches to low battery (LB)
- **Low battery setpoint (%)**: Remaining battery level when UPS switches to low battery (LB)
- **Low battery voltage (V)**: Minimum battery voltage that triggers FSD status
- **Low voltage transfer (V)**: Low voltage transfer point
- **Minimum battery runtime to start (secs)**: Minimum battery runtime for UPS restart after power-off
- **Minimum battery to start (%)**: Minimum battery level for UPS restart after power-off
- **Nominal battery voltage (V)**: Nominal battery voltage
- **Nominal input voltage (V)**: Nominal input voltage
- **Nominal output current (A)**: Nominal output current
- **Nominal output frequency (Hz)**: Nominal output frequency
- **Nominal output power (VA)**: Nominal output apparent power
- **Nominal output real power (W)**: Nominal output real power
- **Nominal output voltage (V)**: Nominal output voltage
- **Nominal power (VA)**: Nominal value of apparent power
- **Nominal real power (W)**: Nominal value of real power
- **Number of bad batteries**: Number of bad battery packs
- **Number of batteries**: Number of internal battery packs
- **Output L1 current (A)**: Output L1 current
- **Output L1 power percent (%)**: Output L1 percentage of apparent power relative to maximum load
- **Output L1 real power (W)**: Output L1 real power
- **Output L1-N voltage (V)**: Output L1-N voltage
- **Output L2 current (A)**: Output L2 current
- **Output L2 power percent (%)**: Output L2 percentage of apparent power relative to maximum load
- **Output L2 real power (W)**: Output L2 real power
- **Output L2-N voltage (V)**: Output L2-N voltage
- **Output L3 current (A)**: Output L3 current
- **Output L3 power percent (%)**: Output L3 percentage of apparent power relative to maximum load
- **Output L3 real power (W)**: Output L3 real power
- **Output L3-N voltage (V)**: Output L3-N voltage
- **Output apparent power (VA)**: Output apparent power
- **Output current (A)**: Output current
- **Output frequency (Hz)**: Output frequency
- **Output phases**: Output phases
- **Output real power (W)**: Output real power
- **Overload setting (%)**: Load when UPS switches to overload condition
- **Real power (W)**: Current value of real power
- **Reboot on battery**: UPS coldstarts from battery
- **Self test date**: Date of last self test (opaque by mfg)
- **Self test interval (secs)**: Interval between self tests
- **Self test result**: Results of last self test (opaque by mfg)
- **Shutdown ability**: Enable or disable UPS shutdown ability
- **Start on ac**: UPS starts when power is applied or re-applied
- **Start on battery**: Allow to start UPS from battery
- **System identifier**: UPS system identifier (opaque by mfg)
- **Total battery current (A)**: Total battery current
- **UPS reboot delay (secs)**: Interval to wait before rebooting the UPS
- **UPS shutdown delay (secs)**: Interval to wait after shutdown with delay command
- **UPS temperature (°C)**: UPS temperature
- **UPS type**: UPS type (opaque by mfg)
- **Voltage transfer reason**: Reason for last transfer to battery (opaque by mfg)
- **Warning battery setpoint (%)**: Battery level when UPS switches to "Warning" state
- **Watchdog status**: UPS watchdog status

The following diagnostic sensors may be available for each
individually monitored outlet:

- **Outlet NAME current status**: Current status relative to the thresholds for the named outlet

### Buttons

This NUT integration will add buttons for NUT server commands
available for your device.

The following buttons are available for each switchable outlet:

- **Power cycle outlet NAME**: Power cycle the named outlet

### Switches

This NUT integration will add switches for NUT server commands
available for your device.

The following switches are available for each switchable outlet:

- **Power outlet NAME**: Turn power on/off for named outlet

## Data updates

The integration uses {% term polling %} to retrieve data from the NUT
server. The default polling interval is once every 60 seconds. You can
also [define a custom polling
interval](/common-tasks/general/#defining-a-custom-polling-interval)
if needed.

## Actions

{% important %}
The username and password configured for the device must be granted
`instcmds` permissions on the NUT server to use buttons and
switches. Device {% term actions %} will not be available if user
credentials are not specified. See the [NUT server
documentation](https://networkupstools.org/documentation.html) for
configuration information.
{% endimportant %}

An action is available for each parameterless NUT
[command](https://networkupstools.org/docs/user-manual.chunked/apcs03.html)
supported.

## Automation example

Home Assistant {% term automations %} can be created to monitor and
take actions on one or more power devices using NUT.

The following example illustrates how to use this integration in a
Home Assistant automation. This example is just a starting point, and
you can use it as inspiration to create your own automations.

### UPS Power Failure Notification

The following example sends a notification to your mobile device when
a monitored UPS loses power and begins using the battery.

#### Prerequisites

- The NUT integration must be installed and
configured.
- Your mobile device must be configured for
notification.
- In the example below, the NUT server device is `ups` with the status
sensor named `ups_status`. You must change the YAML sensor name to
match your system.

#### Example in YAML

```yaml
# Send notification on UPS power failure
automation:
  alias: "NUT Power failure notification"
  triggers:
    - trigger: state
      entity_id:
        - sensor.ups_status
      to: "On Battery, Battery Discharging"
  actions:
    - action: notify.notify
      data:
        title: "UPS power failure"
        message: "The UPS lost power and is now on battery"
```

## Known limitations

Not all NUT functionality is available through this integration. The
following are known limitations:

- This NUT integration only supports a subset of NUT "variables" and
"commands".
- This NUT integration only supports retrieving, but not setting, NUT
"variables".
- This NUT integration does not support NUT "commands" that require
parameters.

## Troubleshooting

### Using NUT to list all variables

The NUT server provides "variables" about your power device. If you
have command line access to the system running your NUT server, you
can query NUT directly using the `upsc` command.

Below is an example where the NUT server is configured with a device
named `my_ups`:

```shell
$ upsc my_ups
ups.timer.reboot: 0
battery.voltage: 27.0
ups.firmware.aux: L3 -P
ups.mfr: American Power Conversion
battery.runtime.low: 120
ups.delay.shutdown: 20
ups.load: 19
ups.realpower.nominal: 600
battery.charge.warning: 50
battery.charge.low: 10
ups.vendorid: 051d
ups.timer.shutdown: -1
ups.test.result: No test initiated
ups.firmware: 868.L3 -P.D
battery.mfr.ups.serial: 3B1519X19994
ups.productid: 0002
battery.runtime: 2552
battery.voltage.nominal: 24.0
battery.type: PbAc
ups.mfr.ups.status: OL
ups.model: Back-UPS RS1000G
ups.beeper.status: disabled
battery.charge: 100
input.sensitivity: medium
input.transfer.low: 88
input.transfer.high: 147
input.voltage: 121.0
input.voltage.nominal: 120
input.transfer.reason: input voltage out of range
output.current: 1.10
output.frequency: 60.20
output.voltage: 121.50
output.voltage.nominal: 120
```

### Using NUT to list all commands

The NUT server provides commands for controlling your power device. If
you have command line access to the system running your NUT server,
you can query NUT directly for the available remote commands using
`upscmd -l`.

Below is an example where the NUT server is configured with a device
named `my_ups`:

```bash
$ upscmd -l my_ups
Instant commands supported on UPS [my_ups]:
beeper.disable - Disable the UPS beeper
beeper.enable - Enable the UPS beeper
test.battery.start.quick - Start a quick battery test
test.battery.stop - Stop the battery test
```

### User credentials and permissions

To execute device actions through the NUT integration, you must specify user credentials in the configuration. These credentials are stored in the `upsd.users` file, part of the NUT server configuration. This file defines the usernames, passwords, and permissions for users accessing the UPS devices.

No actions will be available if no user credentials are specified for a given device.

Ensure the user you specify has the required permissions to execute the desired commands. Here's an example of a user with command permissions in the `upsd.users` file:

```text
[my_user]
    password = my_password
    actions = SET
    instcmds = ALL
```

In this example, the user `my_user` has permission to execute all commands (`instcmds = ALL`).

Please note that Home Assistant cannot determine whether a user can access a specific action without executing it. If you attempt to perform an action for which the user does not have permission, an exception will be thrown at runtime.

## Removing the integration

This integration follows standard integration removal. No extra steps
are required.

{% include integrations/remove_device_service.md %}
