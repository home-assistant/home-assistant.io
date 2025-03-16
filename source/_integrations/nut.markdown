---
title: Network UPS Tools (NUT)
description: Instructions on how to set up NUT sensors within Home Assistant.
ha_category:
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
  - diagnostics
  - sensor
ha_integration_type: device
---

The **Network UPS Tools (NUT)** {% term integration %} allows you to monitor and manage an Uninterruptible Power Supply (UPS) for battery backup, a Power Distribution Unit (PDU), or other similar electrical power source using a [NUT](https://networkupstools.org/) server. It lets you view the status, receive notifications about important events, and execute commands as device actions for one or more such devices.

## Prerequisites

You must have a NUT server configured to monitor one or more
supported power source devices. You will need at least one configured
`username` and `password` configured on the NUT server.

## Supported devices

This integration supports hardware devices compatible with
NUT. NUT's hardware compatibility list is available from the [Network
UPS Tools](https://networkupstools.org/) website.

## Setting up a NUT Server

There are many options for running a NUT server. Please see
[NUT](https://networkupstools.org/) for general information on
installing and configuring NUT.

You will need to configure at least one NUT username and password for
this integration to connect to the NUT server. You will also need to
grant `instcmds` permissions in the NUT server to use device
actions. Please see [NUT
upsd.users](https://networkupstools.org/docs/man/upsd.users.html) for
more information.

{% include integrations/config_flow.md %}

Setting up the integration requires the following information:

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your NUT server."
Port:
  description: "The network port of your NUT server. The NUT server's default port is '3493'."
Username:
  description: "The username to log into the NUT server. This is configured in NUT."
Password:
  description: "The password associated with the username to log into the NUT server. This is configured in NUT."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Scan Interval (seconds):
  description: "Frequency of requesting updates from NUT server. The default frequency is to poll for data every 60 seconds."
{% endconfiguration_basic %}

## Data updates

The integration uses {% term polling %} to retrieve data from the NUT
server. The frequency of updates is a configurable option with a
default of polling once every 60 seconds.

## Supported functionality

### Sensors

This NUT integration will only add sensors for variables returned by
the NUT server as available for your device.

The possible sensors are:

| name                      | Unit | Description                              |
|---------------------------|------|:-----------------------------------------|
| alarms                    |      | UPS alarms                               |
| battery_charge            | %    | Battery charge                           |
| charging_status           |      | Status of the battery charger            |
| input_current             | A    | Input current                            |
| input_load                | %    | Load on (ePDU) input                     |
| input_voltage             | V    | Input voltage                            |
| load                      | %    | Load on UPS                              |
| outlet_voltage            | V    | Total output voltage                     |
| output_phases             |      | Output phases                            |
| output_voltage            | V    | Output voltage                           |
| status                    |      | Human-readable version of ups_status (see below) |
| status_data               |      | UPS status                               |
| watts                     | W    |                                          |

{% note %}
The NUT integration uses the NUT protocol to retrieve "variables" from
the NUT server. The NUT integration only adds sensors for variables
returned by the NUT server.
{% endnote %}

{% note %}
Some sensor values are described as "opaque by mfg," meaning the
returned results may vary by manufacturer.
{% endnote %}

An additional virtual sensor `ups_status_display` is available to
translate the UPS status value retrieved from `ups_status` into a
human-readable format.

Additional information about these sensors can be found in the Network
UPS Tools repository documentation on [variable
names](https://github.com/networkupstools/nut/blob/master/docs/nut-names.txt).

### Diagnostic Sensors

Diagnostic sensors are available to provide additional information
about the NUT device. Diagnostics are added only for variables
returned by the NUT server as available for your device.

This integration's diagnostic sensors are generally disabled by
default to reduce storage overhead. If an entity listed below has an
asterisk (*) next to its name, it means it is enabled by default. To
use a disabled entity, you must [enable the
entity](/common-tasks/general/#enabling-entities) first.

The possible diagnostic sensors are:

| name                      | Unit | Description                              |
|---------------------------|------|:-----------------------------------------|
| ambient_humidity *        | %    | Ambient relative humidity                |
| ambient_humidity_status * |      | Ambient humidity status relative to the thresholds |
| ambient_temperature *     | °C   | Ambient temperature                      |
| ambient_temperature_status|      | Ambient temperature status relative to the thresholds |
| apparent_power            | VA   | Current value of apparent power          |
| battery_alarm_threshold * |      | Battery alarm threshold                  |
| battery_capacity          | Ah   | Battery capacity                         |
| battery_chemistry         |      | Battery chemistry (opaque by mfg)        |
| battery_current           | A    | Battery current                          |
| battery_date              |      | Battery installation or last change date (opaque by mfg) |
| battery_manuf_date        |      | Battery manufacturing date (opaque by mfg) |
| battery_runtime           | secs | Battery runtime                          |
| battery_temperature       | °C   | Battery temperature                      |
| battery_voltage           | V    | Battery voltage                          |
| beeper_status             |      | UPS beeper status                        |
| efficiency                | %    | Efficiency of the UPS (ratio of output to input current) |
| external_contacts         |      | UPS external contact sensors (opaque by mfg) |
| high_battery_voltage      | V    | Maximum battery voltage (100% charge)    |
| high_voltage_transfer     | V    | High voltage transfer point              |
| input_bypass_current      | A    | Input bypass current                     |
| input_bypass_frequency    | Hz   | Input bypass line frequency              |
| input_bypass_l1_current   | A    | Input bypass L1 current                  |
| input_bypass_l1_n_voltage | V    | Input bypass L1-N voltage                |
| input_bypass_l1_real_power| W    | Input bypass L1 value of real power      |
| input_bypass_l2_current   | A    | Input bypass L2 current                  |
| input_bypass_l2_n_voltage | V    | Input bypass L2-N voltage                |
| input_bypass_l2_real_power| W    | Input bypass L2 value of real power      |
| input_bypass_l3_current   | A    | Input bypass L3 current                  |
| input_bypass_l3_n_voltage | V    | Input bypass L3-N voltage                |
| input_bypass_l3_real_power| W    | Input bypass L3 value of real power      |
| input_bypass_phases       |      | Input bypass line phases                 |
| input_bypass_real_power   | W    | Input bypass value of real power         |
| input_bypass_voltage      | V    | Input bypass voltage                     |
| input_current_status      |      | Current status relative to the thresholds |
| input_frequency           | Hz   | Input line frequency                     |
| input_frequency_status    | Hz   | Frequency status                         |
| input_l1_current          | A    | Input L1 current                         |
| input_l1_line_frequency   | Hz   | Input L1 line frequency                  |
| input_l1_n_voltage        | V    | Input L1-N voltage                       |
| input_l1_real_power       | W    | Input L1 current sum value of all (ePDU) phases real power |
| input_l2_current          | A    | Input L2 current                         |
| input_l2_line_frequency   | Hz   | Input L2 line frequency                  |
| input_l2_n_voltage        | V    | Input L2-N voltage                       |
| input_l2_real_power       | W    | Input L2 current sum value of all (ePDU) phases real power |
| input_l3_current          | A    | Input L3 current                         |
| input_l3_line_frequency   | Hz   | Input L3 line frequency                  |
| input_l3_n_voltage        | V    | Input L3-N voltage                       |
| input_l3_real_power       | W    | Input L3 current sum value of all (ePDU) phases real power |
| input_nominal_frequency   | Hz   | Nominal input line frequency             |
| input_phases              |      | Input line phases                        |
| input_power               |      | Current sum value of all (ePDU) phases apparent power |
| input_power_sensitivity   |      | Input power sensitivity                  |
| input_real_power          | W    | Current sum value of all (ePDU) phases real power |
| input_voltage_status      |      | Status relative to the thresholds        |
| load_reboot_timer         | secs | Time before the load will be rebooted    |
| load_restart_delay        | secs | Interval to wait before restarting the load |
| load_shutdown_timer       | secs | Time before the load will be shutdown    |
| load_start_timer          | secs | Time before the load will be started     |
| low_battery_runtime       | secs | Remaining battery runtime when UPS switches to LB |
| low_battery_setpoint      | %    | Remaining battery level when UPS switches to LB |
| low_battery_voltage       | V    | Minimum battery voltage, that triggers FSD status |
| low_voltage_transfer      | V    | Low voltage transfer point               |
| minimum_battery_runtime_to_start | secs | Minimum battery runtime for UPS restart after power-off |
| minimum_battery_to_start  | %    | Minimum battery level for UPS restart after power-off |
| nominal_battery_voltage   | V    | Nominal battery voltage                  |
| nominal_input_voltage     | V    | Nominal input voltage                    |
| nominal_output_current    | A    | Nominal output current                   |
| nominal_output_frequency  | Hz   | Nominal output frequency                 |
| nominal_output_power      | VA   |                                          |
| nominal_output_real_power | W    |                                          |
| nominal_output_voltage    | V    | Nominal output voltage                   |
| nominal_power             | VA   | Nominal value of apparent power          |
| nominal_real_power        | W    | Nominal value of real power              |
| number_of_bad_batteries   |      | Number of bad battery packs              |
| number_of_batteries       |      | Number of internal battery packs         |
| output_apparent_power     | VA   | Output apparent power                    |
| output_current            | A    | Output current                           |
| output_frequency          | Hz   | Output frequency                         |
| output_l1_current         | A    | Output L1 current                        |
| output_l1_n_voltage       | V    | Output L1-N voltage                      |
| output_l1_power_percent   | %    | Output L1 percentage of apparent power relative to maximum load |
| output_l1_real_power      | W    | Output L1 real power                     |
| output_l2_current         | A    | Output L2 current                        |
| output_l2_n_voltage       | V    | Output L2-N voltage                      |
| output_l2_power_percent   | %    | Output L2 percentage of apparent power relative to maximum load |
| output_l2_real_power      | W    | Output L2 real power                     |
| output_l3_current         | A    | Output L3 current                        |
| output_l3_n_voltage       | V    | Output L3-N voltage                      |
| output_l3_power_percent   | %    | Output L3 percentage of apparent power relative to maximum load |
| output_l3_real_power      | W    | Output L3 real power                     |
| output_phases             |      | Output phases                            |
| output_real_power         | W    | Output real power                        |
| overload_setting          | %    | Load when UPS switches to overload condition |
| real_power                | W    | Current value of real power              |
| reboot_on_battery         |      | UPS coldstarts from battery              |
| self_test_date            |      | Date of last self test (opaque by mfg)   |
| self_test_interval        | secs | Interval between self tests              |
| self_test_result          |      | Results of last self test (opaque by mfg) |
| shutdown_ability          |      | Enable or disable UPS shutdown ability   |
| start_on_ac               |      | UPS starts when power is applied or re-applied |
| start_on_battery          |      | Allow to start UPS from battery          |
| system_identifier         |      | UPS system identifier (opaque by mfg)    |
| total_battery_current     | A    | Total battery current                    |
| ups_display_language      |      | Language to use on front panel (opaque by mfg) |
| ups_reboot_delay          | secs | Interval to wait before rebooting the UPS |
| ups_shutdown_delay        | secs | Interval to wait after shutdown with delay command |
| ups_temperature           | °C  |  UPS temperature                          |
| ups_type                  |      | UPS type (opaque by mfg)                 |
| voltage_transfer_reason   |      | Reason for last transfer to battery (opaque by mfg) |
| warning_battery_setpoint  | %    | Battery level when UPS switches to "Warning" state |
| watchdog_status           |      | UPS watchdog status                      |

### Device actions

{% important %}
The username and password configured for the device must be granted
`instcmds` permissions on the NUT server. No actions will be available if
no user credentials are specified for a given device. See the NUT
server configuration instructions for additional information.

Home Assistant cannot determine whether a user can access a specific
action without executing it. If you attempt to perform an action for
which the user does not have permission, an exception will be thrown
at runtime.
{% endimportant %}

A device action is available for each parameterless NUT
[command](https://networkupstools.org/docs/user-manual.chunked/apcs03.html)
supported by the device.

These commands will be available as device actions in Home Assistant,
allowing you to interact with your power source.

## Automation Examples

Home Assistant {% term automations %} can be created to monitor and
take actions on power sources monitored by a NUT server. The following
example shows how to use this integration in a Home Assistant
automation.

This example is just a starting point, and you can use it as
inspiration to create your own automations.

Contributions of additional examples to enhance this documentation are
welcome ❤️.

### UPS Power Failure Notification

The following example sends a notification to your mobile device when
a monitored UPS suffers a power loss and the state changes to
battery. In this example, the NUT server is configured with a device
named `ups` and it provides a `status` sensor.

```yaml
# Send notification on UPS Power Failure
automation:
 - alias: NUT Power Failure Notification
   description: NUT Power Failure Notification
   mode: single

   triggers:
    - trigger: state
      entity_id:
        - sensor.ups_status
      to: On Battery Battery Discharging

   conditions: []

   actions:
     - action: notify.notify
       data:
          title: UPS Power Failure
          message: The UPS lost power and is now on battery
```

## Known limitations

Not all NUT functionality is available through this integration. The
following are known limitations of this integration:

- This NUT integration supports a subset of NUT "variables" and
"commands".
- This NUT integration does not support setting of NUT "variables".
- This NUT integration does not support NUT "commands" that require parameters.

It is also important to know:

- This integration does not manage any power sourcing devices
  directly. Instead, it calls a NUT server using the NUT protocol.
- This integration does not install NUT on the Home Assistant server. This
  project is therefore unable to update to a new version of NUT.

## Troubleshooting

### Third-party NUT server add-on hostname

Some users install a third-party Home Assistant Community add-on to
provide their NUT server. These add-ons are not maintained or
supported by Home Assistant.

The add-on option is available for users running
{% term "Home Assistant Operating System" %} or
{% term "Home Assistant Supervised" %}. Please see the Home Assistant
Community [Network UPS Tools (NUT)
add-on](https://github.com/hassio-addons/addon-nut) for installation and
configuration information, including the required hostname.

### Issues with user credentials and permissions

The username and password configured for the device must be granted
`instcmds` permissions on the NUT server. No actions will be available if
no user credentials are specified for a given device. See the NUT
server configuration instructions for additional information.

Below are example configurations that create the username `my_user`
with a PASSWORD and permission to execute all commands.

If you are using the Home Assistant Community NUT add-on, below is
an example Configuration for the add-on's users list:

```yaml
- username: my_user
  password: [PASSWORD]
  instcmds:
    - all
  actions:
    - set
```

If you are configuring NUT server directly, below is the example
`upsd.users` file:

```text
[my_user]
    password = my_password
    actions = SET
    instcmds = ALL
```

### Using NUT to list all variables

{% important %}
The NUT package is not installed on Home Assistant. NUT commands are
therefore not available from the Home Assistant command line. These
instructions apply to users running a separate NUT server or who are
performing [advanced troubleshooting](#Advanced troubleshooting).
{% endimportant %}

The NUT server provides "variables" regarding your power source
device. If you have command line access to the system running your NUT
server, you can query NUT directly using the `upsc` command.

Below is an example where NUT is configured with a device named `my_ups`:

```bash
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

The NUT integration supports many variables with the prefix `device`,
`ups`, `battery`, `input`, `output`, and `outlet`. An additional
sensor for `ups.status.display` is created by the NUT integration to
provide a human-readable form of `ups.status`.

### Using NUT to list all commands

{% important %}
As noted above, NUT is not installed on Home Assistant. NUT commands
are therefore not available from the Home Assistant command
line. These instructions apply to users running a separate NUT server
or who are performing [advanced troubleshooting](#Advanced
troubleshooting).
{% endimportant %}

The NUT server provides commands for controlling your power source
device. If you have command line access to the system running your NUT
server, you can query NUT directly for the available commands using
the `upscmd -l` command.

Below is an example where NUT is configured with a device named `my_ups`:

```bash
$ upscmd -l my_ups
Instant commands supported on UPS [my_ups]:
beeper.disable - Disable the UPS beeper
beeper.enable - Enable the UPS beeper
test.battery.start.quick - Start a quick battery test
test.battery.stop - Stop the battery test
```

### Advanced troubleshooting

{% warning %}
Only advanced users should perform these operations.
{% endwarning %}

For users running the Home Assistant Community NUT add-on, it may be
necessary to execute command line instructions within the NUT Docker
container.  This may be useful for running `upsc` or `upscmd`. Enter
the following command at the Home Assistant command line:

```bash
docker exec -it $(docker ps -f name=nut -q) bash
```

After entering any commands, type the following to return:

```bash
exit
```

## Remove integration

This integration follows standard integration removal. No extra steps
are required.

{% include integrations/remove_device_service.md %}
