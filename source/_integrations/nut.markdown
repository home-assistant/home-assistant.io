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
---

The `nut` sensor platform allows you to monitor a UPS (battery backup) by using data from a [NUT](https://networkupstools.org/) (Network UPS Tools) server.

## Configuration

To add `nut` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Network UPS Tools (NUT)**.

Alternatively, you need to add the following to your `configuration.yaml` file:

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

{% configuration %}
  host:
    description: The host name or IP address of the device that is running NUT.
    required: false
    default: localhost
    type: string
  port:
    description: The port number.
    required: false
    default: 3493
    type: integer
  alias:
    description: Name of the UPS on the NUT server.
    required: false
    default: Will default to the first UPS name listed.
    type: string
  username:
    description: Username to login to the NUT server.
    required: false
    default: none
    type: string
  password:
    description: Password to login to the NUT server.
    required: false
    default: none
    type: string
  resources:
    description: Contains all entries to display.
    required: true
    type: list
{% endconfiguration %}

## Example

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

Use the values from the left hand column. Support is included for most values with 'ups', 'battery', 'input' and 'output' prefixes.

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

## UPS Status - human-readable version

An additional virtual sensor type `ups.status.display` is available translating the UPS status value retrieved from `ups.status` into a human-readable version.

```yaml
sensor:
  - platform: nut
    resources:
      - ups.status.display
```
