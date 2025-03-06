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

The Network UPS Tools (NUT) integration allows you to monitor and manage a UPS (battery backup) using a [NUT](https://networkupstools.org/) server. It lets you view their status, receives notifications about important events, and execute commands as device actions.

{% include integrations/config_flow.md %}

## Example Resources

Given the following example output from NUT (your variables may differ):

```yaml
$ upsc ups_name@192.168.11.5
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

Use the values from the left hand column. Support is included for most
values with `ups`, `battery`, `input` and `output` prefixes.

## UPS Status - human-readable version

An additional virtual sensor type `ups.status.display` is available
translating the UPS status value retrieved from `ups.status` into a
human-readable version.

## Device Actions

A device action is available for each parameterless NUT [command](https://networkupstools.org/docs/user-manual.chunked/apcs03.html) supported by the device. To find the list of supported commands for 
your specific UPS device, you can use the `upscmd -l` command followed by the UPS name:

```bash
$ upscmd -l my_ups
Instant commands supported on UPS [my_ups]:
beeper.disable - Disable the UPS beeper
beeper.enable - Enable the UPS beeper
test.battery.start.quick - Start a quick battery test
test.battery.stop - Stop the battery test
```

These commands will be available as device actions in Home Assistant, allowing you to interact with your UPS.

### User Credentials and Permissions

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
