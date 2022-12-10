---
title: Network UPS Tools (NUT)
description: Instructions on how to set up NUT sensors within Home Assistant.
ha_category:
  - System Monitor
ha_iot_class: Local Polling
ha_release: 0.34
ha_domain: nut
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@ollo69'
ha_zeroconf: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

The Network UPS Tools (NUT) integration allows you to monitor a UPS
(battery backup) by using data from a [NUT](https://networkupstools.org/)
server.

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
