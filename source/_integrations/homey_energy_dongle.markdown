---
title: Homey Energy Dongle
description: Instructions on how to integrate the Homey Energy Dongle with Home Assistant.
ha_release: 2026.12
ha_categories:
  - energy.meters_monitoring
  - water.meters_leak_detection
ha_platforms:
  - diagnostics
  - sensor
ha_iot_class: Local Push
ha_quality_scale: gold
ha_config_flow: true
ha_codeowners:
  - '@Doekse'
ha_domain: homey_energy_dongle
ha_integration_type: device
ha_zeroconf: true
---

The **Homey Energy Dongle** {% term integration %} shows the data of your smart meter in Home Assistant. Plug the [Homey Energy Dongle](https://homey.app/energy-dongle/) into the P1 port of your smart meter, and Home Assistant receives your energy usage in real time over your local network. No cloud needed.

You can see how much electricity you use and return to the grid, the voltage, current, and power of each phase, and the readings of your gas, water, or heat meter when it's connected to your smart meter. All of it works with the [Energy dashboard](/home-energy-management/).

## Supported devices

- Homey Energy Dongle

The Homey Energy Dongle works with digital smart meters that have a P1 port. P1 is the name of a port on most smart meters in Europe. It looks like an old telephone connector (RJ12). If your meter mentions "<abbr title="Dutch smart meter requirements">DSMR</abbr>" or "<abbr title="Electricity smart metering requirements">ESMR</abbr>", it's supported. Check [Compatibility of the Homey Energy Dongle](https://support.homey.app/hc/en-us/articles/17233328965916-Compatibility-of-the-Homey-Energy-Dongle) for the list of tested meters.

Home Assistant reads these DSMR versions, and detects the version of most meters automatically:

- **5**: The Netherlands
- **5B**: Belgium
- **5L**: Luxembourg
- **5S**: Sweden
- **5EONHU**: Hungary (E.ON)
- **Q3D**: Austria
- **4** and **2.2**: Older Dutch meters

## Unsupported devices

- Analog meters
- Smart meters with a port labeled "RS485", "Modbus", or "M-Bus", even when it uses an RJ12 connector
- Smart meters with a HAN port that uses a larger RJ45 connector
- Smart meters that send encrypted data, see [Known limitations](#known-limitations)

## Prerequisites

1. Set up the Homey Energy Dongle in the Homey app. If you don't have a Homey, you can create a free Homey Cloud account. Follow [Set up your Homey Energy Dongle](https://support.homey.app/hc/en-us/articles/18381162503324-Set-up-your-Homey-Energy-Dongle).
2. In the Homey app, tap **Devices** in the tab bar.
3. Find the Homey Energy Dongle, then press and hold it.
4. Tap the settings icon in the upper-right corner.
5. Go to **Advanced Settings** and set **Local API** to **Enabled**.
6. If Home Assistant doesn't discover the Homey Energy Dongle, write down the IP address shown in **Advanced Settings**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of the Homey Energy Dongle, for example `192.168.1.100`. You can find it in the Homey app under the device settings, in **Advanced Settings**. You don't need it when Home Assistant discovers the Homey Energy Dongle."
DSMR version:
  description: "The telegram format of your smart meter, for example **DSMR 5** for the Netherlands or **DSMR 5B (Belgium, Fluvius)** for Belgium. Home Assistant only asks for it when it can't detect the version. See [Supported devices](#supported-devices)."
{% endconfiguration_basic %}

## Supported functionality

Home Assistant only adds sensors for the data your smart meter sends. When new data shows up later, like a gas meter that was just connected, Home Assistant adds its sensors automatically.

### Electricity meter

- **Power**: Your net power usage in W. Positive when you use power from the grid, negative when you return power to the grid.
- **Power (phase 1, 2, 3)**: Your net power usage per phase in W.
- **Voltage (phase 1, 2, 3)**: The voltage per phase.
- **Current (phase 1, 2, 3)**: The current per phase.
- **Total energy imported**: All energy you used from the grid, in kWh.
- **Total energy exported**: All energy you returned to the grid, in kWh.
- **Total energy imported (high tariff)** and **(low tariff)**: The energy you used per tariff. Meters with more than two tariffs show **Total energy imported (tariff 1–4)** instead.
- **Total energy exported (high tariff)** and **(low tariff)**: The energy you returned per tariff. Meters with more than two tariffs show **Total energy exported (tariff 1–4)** instead.
- **Active tariff**: Whether the high or low tariff is active.
- **Current average demand** and **Maximum demand this month**: Your average power over the current 15 minutes, and the highest average this month. Only Belgian meters send these, for the capacity tariff.

These diagnostic sensors are [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity):

- **Telegram timestamp**
- **Long power failures** and **Short power failures**
- **Voltage sags (phase 1, 2, 3)** and **Voltage swells (phase 1, 2, 3)**

### Gas, water, and heat meters

When a gas, water, or heat meter is connected to your smart meter, Home Assistant adds it as a separate {% term device %} with a **Meter reading** sensor. Some gas meters report energy instead of volume. Their **Meter reading** shows energy.

## Examples

{% include docs/paste_yaml_tip.md %}

### Add your smart meter to the Energy dashboard

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Under **Electricity grid**, add **Total energy imported** as grid consumption and **Total energy exported** as return to grid.
3. Under **Gas consumption** or **Water consumption**, add the **Meter reading** sensor of your gas or water meter.

### Get notified when a phase is overloaded

Get a notification when phase 1 draws more than 23 A for 30 seconds, so you can switch something off before your main fuse trips.

- **Trigger**: Numeric state of **Current (phase 1)** above 23 for 30 seconds
- **Action**: Send a notification

{% details "YAML example for a phase overload notification" %}

{% example %}
automation: |
  alias: "Phase 1 overloaded"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.electricity_meter_current_phase_1
      above: 23
      for:
        seconds: 30
  actions:
    - action: notify.notify
      data:
        message: "Phase 1 is drawing more than 23 A."
{% endexample %}

{% enddetails %}

## Use cases

- See your energy usage, solar return, and gas usage in the Energy dashboard.
- Start the washing machine or dishwasher when the low tariff is active.
- Lower the charging power of your EV when a phase gets close to its limit, so your main fuse doesn't trip.
- Spot a water leak when your water meter keeps counting at night.

## Data updates

The Homey Energy Dongle pushes new data to Home Assistant as soon as your smart meter sends it. DSMR 5 meters send data every second, DSMR 4 meters every 10 seconds.

When Home Assistant receives no data for 60 seconds, the sensors become unavailable. Home Assistant then tries to reconnect every 30 seconds.

## Known limitations

- The Homey Energy Dongle allows two Local API connections at the same time. Home Assistant uses one of them.
- The Local API has no password. Anyone on your local network can read your smart meter data.
- Home Assistant can't read encrypted smart meter data. Some energy providers in Austria, Luxembourg, and Sweden encrypt the data of your smart meter.
- When the IP address of the Homey Energy Dongle changes, Home Assistant only updates it automatically for meters that send a serial number. Swedish and Hungarian (E.ON) meters don't. For those meters, [update the IP address](#the-ip-address-of-the-homey-energy-dongle-changed) yourself.
- Home Assistant doesn't remove gas, water, or heat meters that are disconnected from your smart meter, because wireless meters can be out of reach for a while. To remove one, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Homey Energy Dongle**, open the device, and select **Delete**.

## Troubleshooting

### The Local API is disabled

Home Assistant shows a repair issue, and the sensors become unavailable. In the Homey app, go to the device settings of the Homey Energy Dongle, then **Advanced Settings**, and set **Local API** to **Enabled**. Home Assistant reconnects automatically.

### Too many connections

The Homey Energy Dongle allows two Local API connections. Home Assistant shows a repair issue when both are in use. Close the other app or integration that is connected to the Homey Energy Dongle. Home Assistant reconnects automatically.

### Home Assistant doesn't receive any data

In Belgium, Denmark, Sweden, and Switzerland, some smart meters have a P1 port that your energy provider needs to activate. Until then, the Homey Energy Dongle receives no data. Ask your energy provider to activate the P1 port. Most providers let you request this through their customer portal or by email.

### The sensors become unavailable often

Some smart meters don't supply enough power to the Homey Energy Dongle. This is common with DSMR 4 and DSMR 2 meters. Connect the supplied USB-C cable to the Homey Energy Dongle and to a power source.

### Wrong or missing values

When the active tariff is swapped, or sensors are missing, you may have selected the wrong DSMR version. To change it:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Homey Energy Dongle**.
3. Next to the entry, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.
4. Select the right **DSMR version**.

### The IP address of the Homey Energy Dongle changed

When your smart meter sends a serial number, Home Assistant updates the IP address automatically when it discovers the Homey Energy Dongle again. Swedish and Hungarian (E.ON) meters don't send one. For those meters, change the **Host** with **Reconfigure**, like in [Wrong or missing values](#wrong-or-missing-values). To prevent this, give the Homey Energy Dongle a fixed IP address in your router.

### Reporting an issue

When you report an issue, add the diagnostics of the integration. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Homey Energy Dongle**, then select the three dots {% icon "mdi:dots-vertical" %} menu and select **Download diagnostics**. Include the brand and model of your smart meter.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

When no other app uses the Local API, you can set **Local API** to **Disabled** in the Homey app. This disconnects all Local API connections.
