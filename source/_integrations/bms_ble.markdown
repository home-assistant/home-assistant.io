---
title: BLE Battery Management System
description: The BLE Battery Management System integration allows to monitor Bluetooth Low Energy (BLE) battery management systems (BMS).
ha_release: 2026.1
ha_category: Energy
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@patman15'
ha_domain: bms_ble
ha_integration_type: device
related:
  - url: https://github.com/patman15/aiobmsble/
    title: Asynchronous Library to Query Battery Management Systems via Bluetooth LE
  - url: https://esphome.io/components/bluetooth_proxy/
    title: ESPHome Bluetooth Proxy
  - url: https://github.com/piitaya/lovelace-mushroom
    title: Mushroom template card
  - docs: /integrations/bluetooth/
    title: Bluetooth integration
  - docs: /integrations/shelly/#bluetooth-support
    title: Shelly Bluetooth proxy support
  - docs: /integrations/template/#sensor
    title: Template sensors
  - docs: /docs/glossary/
    title: Glossary
---

<!--- Use this template together with the developer documentation, under [Documentation standard](https://developers.home-assistant.io/docs/documenting/standards) and the documentation rules of the [Integration Quality Scale](https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/). -->

The **BLE Battery Management System** {% term integration %} is used to integrate with Bluetooth Low Energy (BLE) battery management systems (BMS) of [various brands](#supported-devices). The integration exposes [basic information](#sensors) from the BMS, e.g. voltage, current, power.

<a name="safety"></a>
{% caution %}
The **BLE Battery Management System integration shall not be used for safety relevant operations!** The correctness or availability of data cannot be guaranteed (see [warranty section of the license](/developers/license)), since the implementation is mostly based on openly available information or non-validated vendor specifications.
Further, issues with the Bluetooth connection, e.g. disturbances, can lead to unavailable or incorrect values.

**Do not rely on the reported values** to control actions required to prevent battery damage, overheating (fire), or other harmful events.
{% endcaution %}

## Supported devices

The following devices are known to be supported by the integration:

- ABC/SOK BMS (show up as `ABC-`&#x2026;, `SOK-`&#x2026;)
- Braun Power BMS (show up as `BL-`&#x2026; or `HSKS-`&#x2026;)
- ANT BMS (show up as `ANT-BLE`&#x2026;)
- CBT Power BMS, Creabest batteries
- D-powercore BMS (show up as `DXB-`&#x2026;)
  - Fliteboard batteries (show up as `TBA-`&#x2026;)
- Daly BMS (show up as `DL-`&#x2026;)
  - 100Balance BMS
  - Bulltron batteries
- E&J Technology BMS (show up as `libatt`&#x2026;)
  - Elektronicx batteries (show up as `LT-`&#x2026;)
  - Lithtech batteries (show up as `LT-12V-`&#x2026; or `L-12V`&#x2026;)
  - Meritsun, Supervolt v1 (show up as `SV12V`&#x2026;), and Volthium (show up as `V-12V`&#x2026;) batteries
- ECO-WORTHY + BW02 adapter (show up as `ECO-WORTHY`&#x2026;)
  - DCHOUSE batteries (show up as `DCHOUSE`&#x2026;)
- Ective, Startcraft, Topband batteries (show up as `$PFLAC`&#x2026;, `NWJ20`&#x2026;, `ZM20`&#x2026;)
- Felicity ESS (show up as `F10`&#x2026;) and FLB batteries (show up as `F07`&#x2026;)
- HumsiENK Smart BMS (show up as `HS`&#x2026;)
- JBD BMS, Jiabaida, Xiaoxiang (show up as `JBD-`&#x2026;)
  - accurat batteries, Aolithium batteries
  - BasenGreen, Bulltron, CHINS, DCHOUSE, ECO-WORTHY, Epoch batteries
  - Eleksol, Fritz Berger, Liontron, LANPWR, OGRPHY, Perfektium, Ultimatron batteries
  - SBL batteries (show up as `SBL-`&#x2026;), Supervolt v3 batteries (show up as `SX1`&#x2026;), Vatrer batteries
- JK BMS, Jikong, (HW version &ge; 6 required)
- LiTime, Power Queen, and Redodo batteries
- LiPower BMS
- NEEY balancer (4th gen) (show up as `GW-24S`&#x2026;)
- Offgridtec LiFePo4 Smart Pro: type A & B (show up as `SmartBat-A`&#x2026; or `SmartBat-B`&#x2026;)
- PaceEX BMS (show up as `PC-`&#x2026;)
- Pro BMS Smart Shunt
  - Foxwell BT630
  - Leagend CM100
- Renogy BMS, Renogy Pro BMS
- RoyPow batteries
- Seplos v2 (show up as `BP[0-2]?`)
- Seplos v3 (show up as `SP[00-199]B`&#x2026; or `CSY`&#x2026;)
  - CEG Carmine Energia Gratis (show up as `XZHX`&#x2026;)
- Super-B Epsilon BMS (show up as `Epsilon-`&#x2026;)
- TDT BMS
  - Wattcycle batteries
- TianPower BMS (show up as `TP_`&#x2026;)
- Vatrer BMS (show up as `YYMMDDVVVAAAAxx` (date, V, Ah))

## Unsupported devices

{% tip %}
For missing detection patterns or new device support, consider a [contribution to aiobmsble](https://github.com/patman15/aiobmsble?tab=contributing-ov-file) or carefully fill out a [feature request](https://github.com/patman15/aiobmsble/issues/new?template=feature_request.yml) with the requested information.
{% endtip %}

The following devices are cannot be supported by the integration:

- ECO-WORTHY batteries that show up as <code>ECOxxxx</code> use classic Bluetooth.

## Prerequisites

- The [Bluetooth integration](/integrations/bluetooth/) must be enabled and functional.

{% include integrations/config_flow.md %}

## Supported functionality

The **BLE Battery Management System** {% term integration %} provides the following {% term entities %}.

{% note %}
Some of this integration's sensors are disabled by default to reduce storage
overhead for Home Assistant. These are marked with an asterisk (**\***). To use a
disabled sensor, you need to enable them first. See the [enabling or disabling
entities](/common-tasks/general/#enabling-or-disabling-entities)
documentation for information on how to do this.
{% endnote %}

### Sensors

- **battery level [%]**: state of charge (SoC), range 100% (full) to 0% (battery empty)
- **battery health [%]**: state of health (SoH), range 100% to 0%, not available on all BMSs
- **charge cycles [#]**: lifetime number of charge cycles
- **current [A]**: positive for charging, negative for discharging
- **power [W]**: positive for charging, negative for discharging
- **runtime [s]**: remaining discharge time till SoC 0%, <code>unavailable</code> during idle/charging
- **stored energy [Wh]**: currently stored energy
- **temperature [°C]**: (average) battery sensor temperature
- **voltage [V]**: overall battery voltage

### Diagnostic sensors

- **delta cell voltage [V]**: maximum difference between any two cells in a pack
- **link quality [%]\***: successful BMS queries out of the last hundred update periods
- **max cell voltage [V]\***: overall maximum cell voltage in the system
- **min cell voltage [V]\***: overall minimum cell voltage in the system
- **RSSI [dBm]\***: received signal strength indicator

### Attributes

Some {% term sensors %} provide additional attributes giving details about the {% term state %}. These attributes are optional and are not available for all devices.

{% details "Optional sensor attributes" %}

Sensor | Attribute | Description
-- | -- | --
**battery level** | `pack battery level` | array of pack battery SoC
**current** | `balance current` | overall balance current
**current** | `pack currents` | array of battery pack currents
**cycles** | `pack cycles` | array battery pack cycles
**delta cell voltage** | `pack delta cell voltage` | array of individual cell voltages
**maximal cell voltage** | `cell number` | number of the cell with highest voltage
**minimal cell voltage** | `cell number` | number of the cell with lowest voltage
**temperature** | `temperature sensors` | array of temperature sensor values
**voltage** | `pack voltages` | array of pack voltages

{% enddetails %}

## Data updates

The **BLE Battery Management System** {% term integration %} {% term polling polls %} data from the device every 30 seconds by default. It is discouraged to change that value. If you still want to do so, please see the default way to define a [custom interval](/common-tasks/general/#defining-a-custom-polling-interval). Note that Bluetooth discoveries can take up to a minute in worst case. Thus, expect side effects, when going below the default of 30 seconds!

## Known limitations

{% note %}
The integration does not provide the ability to change settings of the device. For controlling the BMS, use the manufacturer's app instead (see <a href="#safety">safety notice</a>).
{% endnote %}

{% details "Elektronicx, Lithtech batteries" %}
Bluetooth is turned off, when there is no current. Thus, device will get unavailable / cannot be added.
{% enddetails %}

{% details "Liontron batteries" %}
These batteries need a shorter interval between queries. Be a bit patient to get them added and set a <a href="/common-tasks/general/#defining-a-custom-polling-interval">custom interval</a> of about 9s to keep a stable connection.
{% enddetails %}

{% details "Seplos v2" %}
The internal Bluetooth adapter issues <code>AT</code> commands in regular intervals which can interfere with BMS messages causing them to be corrupted. This impacts data availability (<code>link quality</code>).
{% enddetails %}

## Troubleshooting

{% important %}
A lot of transient issues are due to problems with Bluetooth adapters. Most prominent example is the performance limitation of the [internal Raspberry Pi BT adapter](/integrations/bluetooth/#cypress-based-adapters), resulting in, e.g., sometimes wrong data, when you have multiple devices connected. Please check the Home Assistant [Bluetooth integration](/integrations/bluetooth) page for known issues and consider using a [recommended high-performance adapter](/integrations/bluetooth/#known-working-high-performance-adapters).
{% endimportant %}

### Device is not recognized

#### Symptom: “No supported devices found via Bluetooth.”

When trying to set up the integration, the form shows the message “No supported devices found via Bluetooth.”.

#### Description

This means the integration could not find a [supported device](#supported-devices) among the current Bluetooth devices in range.

#### Resolution

To resolve this issue, try the following steps:

1. Verify that your BMS type is listed as [supported device](#supported-devices).
2. If a name detection pattern is listed (*show up as*), make sure your device matches it.
3. Make sure that your device is available in the [advertisement monitor](https://my.home-assistant.io/redirect/bluetooth_advertisement_monitor/). If your device is missing or the `RSSI` value is `-75 dBm`or worse, please check your BT setup (is the device in range?).
4. Make sure that no other device is connected to the BMS, e.g. app on your phone
5. If you use a BT proxy, make sure you have set `active: true` and that you do not exceed the [BT proxy limit](https://esphome.io/components/bluetooth_proxy/) of 3 devices/proxy; check the logs of the proxy whether the device is recognized. Note: The [Bluetooth proxy of Shelly devices](/integrations/shelly/#bluetooth-support) does not support active connections and thus cannot be used.
6. Check the list of [known limitations](#known-limitations).
7. Go to **Settings > Devices & services > Bluetooth** (the [Bluetooth integration](https://my.home-assistant.io/redirect/integration/?domain=bluetooth)). Select **configure** {% icon "mdi:cog" %} on the relevant adapter and verify that you have connection slots available.

### The device goes unavailable temporarily or permanently

In case sensors are reported `unavailable`:

1. Enable the diagnostic sensors, i.e. `RSSI` and `link quality`.
2. Check your connection quality for about 24hrs. The value of `link quality` results from (temporarily) bad `RSSI` values, which are impacted by disturbances of the Bluetooth communication. Your quality should be at least *fair* according to the following reference.
3. Verify that you have a proper Bluetooth setup according to the recommendations for the [Bluetooth Integrations](/integrations/bluetooth).

{% details "Link quality reference" %}
<table>
<thead>
<tr><th>Quality</th><th>link quality [%]</th><th>RSSI [dBm]</th></tr>
</thead>
<tbody>
<tr><td>excellent</td><td>98 to 100</td><td>-60 to high</td></tr>
<tr><td>good</td><td>90 to 98</td><td>-60 to -75</td></tr>
<tr><td>fair</td><td>80 to 90</td><td>-75 to -80</td></tr>
<tr><td>weak</td><td>60 to 80</td><td>-80 to -90</td></tr>
<tr><td>bad</td><td>0 to 60 </td><td>-90 to low</td></tr>
</tbody>
</table>
{% enddetails %}

### Device requires Bluetooth pairing

If required for a device this procedure is only needed once.

1. Open a [terminal to Home Assistant](/common-tasks/supervised/#installing-and-using-the-ssh-add-on).
2. Use the command `bluetoothctl devices` to check that your devices is detected.
3. Run `bluetoothctl pair <MAC_of_BMS>` to start pairing the device.

## Example sensor templates

### Runtime in human readable format

use a [template sensor](/integrations/template/#sensor) or a card to show templates, e.g. [Mushroom template card](https://github.com/piitaya/lovelace-mushroom) with the following template:

{% raw %}

```yaml
{{ timedelta(seconds=int(states("sensor.smartbat_runtime"), 0)) }}
```

{% endraw %}
results in e.g. `4 days, 4:20:00`

### Individual cell voltage sensors

The individual voltages are available as [attribute](/docs/configuration/state_object/#about-entity-state-attributes) to the `delta cell_voltage` sensor. Click the {% term sensor %} and at the bottom of the graph expand the `attribute` section. Alternatively, look them up in the [developer tools](/docs/tools/dev-tools/).
To create individual {% term sensors %}, go to [Settings > Devices & Services > Helper](https://my.home-assistant.io/redirect/helpers) and add a [template sensor](/integrations/template/#sensor) for each cell to monitor using the state template:
{% raw %}

```yaml
{{ iif(has_value("sensor.smartbat_delta_cell_voltage"), state_attr("sensor.smartbat_delta_cell_voltage", "cell_voltages")[0], None) }}
```

{% endraw %}
The index `[0]` can be in the range from `0` to the number of `cells-1`, i.e. `0-3` for a `4` cell battery. See [templating](/docs/configuration/templating/) for an overview and more functions.

Field | Content
-- | --
Unit of measurement | `V`
Device class | `Voltage`
State class | `Measurement`
Device | `smartbat`

{% details "Configuration via YAML"  icon="mdi:cursor-hand" %}
{% raw %}

```yaml
template:
  - sensor:
    - name: cell_voltage_0
      state: >-
        {{ state_attr('sensor.smartbat_delta_cell_voltage', 'cell_voltages')[0] }}
      unit_of_measurement: 'V'
      state_class: measurement
      device_class: voltage
      availability: >- 
        {{ has_value('sensor.smartbat_delta_cell_voltage') }}
```

{% endraw %}
{% enddetails %}

### Discharge sensor

Use a [threshold sensor](/integrations/threshold/) based on the current to/from the battery. Negative means discharging, positive is charging.

## Energy dashboard integration

If you want your battery to be integrated with the Home Assistant [energy dashboard](https://my.home-assistant.io/redirect/energy/) you need to integrate the reported power value separately for charge and discharge power to two energy values. Use the template examples in the following to generate the required sensors for the energy dashboard via {% term YAML %} in the `configuration.yaml` file. The same result can be achieved by configuring equivalent [template sensors](/integrations/template/#sensor) and [integration helper](/integrations/integration).

{% details "Add two template sensors for power in and out" %}

{% raw %}

```yaml
template:
  - sensor:
    - unique_id: smartbat_charge_power
      state: "{{ [states('sensor.smartbat_power') | float, 0] | max}}"
      unit_of_measurement: 'W'
      state_class: measurement
      device_class: power
      availability: "{{ has_value('sensor.smartbat_power') }}"
    - unique_id: smartbat_discharge_power
      state: "{{ [states('sensor.smartbat_power') | float, 0] | min | abs}}"
      unit_of_measurement: 'W'
      state_class: measurement
      device_class: power
      availability: "{{ has_value('sensor.smartbat_power') }}"
```

{% endraw %}

{% enddetails %}

{% details "Add two integration sensors for energy in and out" %}

{% raw %}

```yaml
sensor:
  - platform: integration
    name: energy_in
    source: sensor.template_charge_power
  - platform: integration
    name: energy_out
    source: sensor.template_discharge_power
```

{% endraw %}

{% enddetails %}

Then go to the [energy dashboard configuration](https://my.home-assistant.io/redirect/config_energy/), add a battery system and set the two sensors `energy_in` and `energy_out`.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.
