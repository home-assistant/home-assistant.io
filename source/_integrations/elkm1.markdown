---
title: Elk-M1 Control
description: Instructions to setup the Elk-M1 controller.
ha_release: 0.81
ha_category:
  - Hub
  - Alarm
  - Climate
  - Light
  - Scene
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_domain: elkm1
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
---

The Elk-M1 is a home security and automation controller that is capable of alarm control panel functions and automation.

The Elk-M1 controller is manufactured by [Elk Products](https://www.elkproducts.com).

There is currently support for the following device types within Home Assistant:

- **Alarm** - An Elk-M1 area (also known as partition) is represented as an `alarm_control_panel`.
- **Climate** - An Elk-M1 thermostat is represented as a `climate` entity.
- **Light** - An Elk-M1 light (which can be X10, Insteon, UPB) is represented as a `light`.
- **Scene** - Elk-M1 tasks are represented as `scene` entities.
- **Sensor** - Elk-M1 counters, keypads, panel, settings, and zones are represented as `sensor` entities.
- **Switch** - Elk-M1 outputs are represented as `switch` entities.

If you would like your `alarm_control_panel` devices to keep track of the user whose code was last used to change the status of that partition (via the attributes `changed_by` and `changed_by_id`) you must configure your Elk's global setting location 35, “System Log Data Update” transmission, so that the M1 sends the updated partition status whenever it changes. (It may work anyway if you have exactly one area configured and do not have that setting enabled.)


## Configuration

To add `ElkM1` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Elk-M1 Control**.

Alternatively, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
elkm1:
  - host: elk://IP_ADDRESS_1
  ...
  - host: elk://IP_ADDRESS_2
    prefix: gh  # for guest house controller
```

{% configuration %}
host:
  description: Connection string to Elk of the form `<method>://<address>[:port]`. `<method>` is `elk` for non-secure connection, `elks` for secure connection, and `serial` for serial port connection. `<address>` is IP address or domain or for `serial` the serial port that the Elk is connected to. Optional `<port>` is the port to connect to on the Elk, defaulting to 2101 for `elk` and 2601 for `elks`. For `serial` method, _address_ is the path to the tty _/dev/ttyS1_ for example and `[:baud]` is the baud rate to connect with (Elk systems default to 115200 baud, but this can be changed during Elk system configuration).  You may have multiple host sections for connecting multiple controllers.
  required: true
  type: string
username:
  description: Username to login to Elk. Only required if using `elks` connection method.
  required: false
  type: string
password:
  description: Password to login to Elk. Only required if using `elks` connection method.
  required: false
  type: string
prefix:
  description: The prefix to use, if any, for all the devices created for this controller. At most one host can omit the prefix, all others must have a unique prefix within the Home Assistant instance.
  require: false
  type: string
temperature_unit:
  description: The temperature unit that the Elk panel uses. Valid values are `C` and `F`.
  required: false
  type: string
  default: F
auto_configure:
  description: Auto configure `area`, `counter`, `keypad`, `output`, `setting`, `task`, `thermostat`, `plc`, and `zone` by only adding elements that ElkM1 reports on the initial sync.
  required: false
  type: boolean
  default: False
area:
  description: Elk areas to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
counter:
  description: Elk counters to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
keypad:
  description: Elk keypads to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
output:
  description: Elk outputs to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
setting:
  description: Elk settings to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
task:
  description: Elk tasks to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
thermostat:
  description: Elk thermostats to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
plc:
  description: Elk PLC lights to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
zone:
  description: Elk zones to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
{% endconfiguration %}

Example configuration of the above:

```yaml
elkm1:
  host: elks://IP_ADDRESS
  username: USERNAME
  password: PASSWORD
  area:
    exclude: [5-8]
  zone:
    exclude: [11-16, 19-192, 199-208]
  plc:
    include: [a1-d16, 192]
    exclude: [b12-d5]
```

Example configuration using `auto_configure`:

```yaml
elkm1:
  host: elks://IP_ADDRESS
  username: USERNAME
  password: PASSWORD
  auto_configure: true
```

Example for a serial port instance on /dev/ttyUSB0 at 115200 baud:

```yaml
elkm1:
  - host: serial:///dev/ttyUSB0:115200
    # Elk doesn't know which areas/zones/etc are unused, so it can generate
    # many unwanted Home Assistant Entities.  Be liberal in excluding them:
    area:
      exclude: [2-8]
    zone:
      exclude: [17-192, 195-208]
    plc:
      enabled: false
    task:
      enabled: false
    counter:
      exclude: [1-64]
    keypad:
      exclude: [3-16]
    setting:
      exclude: [1-20]
    output:
      enabled: false
    thermostat:
      enabled: false
```
