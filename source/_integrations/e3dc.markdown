---
title: E3/DC
description: Instructions on how to integrate an E3/DC home power station with Home Assistant over Modbus TCP.
ha_categories:
  - energy.solar_batteries
ha_release: "2026.12"
ha_iot_class: Local Polling
ha_codeowners:
  - '@AlCalzone'
ha_domain: e3dc
ha_config_flow: true
ha_integration_type: device
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_quality_scale: bronze
ha_zeroconf: true
---

The **E3/DC** {% term integration %} connects Home Assistant to an E3/DC home power station from HagerEnergy over Modbus TCP. It reads the power flows between solar, battery, house, grid and wallboxes.

## Use cases

- Seeing where your power goes. Solar production, battery charging and discharging, house consumption and grid import and export are all live sensors.
- Running appliances on surplus solar. Start a heavy load once the solar power exceeds what the house uses.
- Knowing when the house runs on backup power. The emergency power sensor shows when the power station supplies the house during a grid failure.
- Noticing when backup power is not ready. The **Emergency power ready** binary sensor shows whether the power station can switch to emergency power. How long it can then supply the house depends on the battery's charge, which the **Battery** sensor shows.

## Supported devices

The integration supports E3/DC home power stations whose Modbus interface uses the E3/DC protocol ("Simple Mode"), such as the S10 E, S10 E PRO, S10 X, S20 X PRO and E3/DC one, and the systems running the Q10 and P10 firmware lines.

Newer firmware releases add registers: the failsafe timeouts from release 2025_06, the inverter mode from release 2025_43, and the battery's limits and stored energy from release 2026_04. The SG Ready status comes with the 32-bit power meter values. The integration checks which of these your firmware serves during setup and adds only the matching entities. After a firmware update, reload the integration.

## Unsupported devices

The SunSpec protocol mode of the Modbus interface is not supported. E3/DC systems reached only over the RSCP protocol are not supported either.

## Prerequisites

1. On the power station, go to **Main menu** > **Smart Functions** > **Smart Home** > **Modbus**.
2. Turn **Modbus** on, and set **Protocol** to **E3DC**.
3. Note the port. The default is `502`.

The power station answers Modbus requests only from devices in its own subnet.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the power station."
Port:
  description: "The Modbus TCP port set in the power station's Smart Home menu. The default is `502`."
{% endconfiguration_basic %}

A discovered power station is set up on the default port `502`. If you set a different port, add the integration manually.

{% note %}
Home Assistant can share a Modbus connection between integrations. Another integration that already talks to the same power station shares the connection instead of opening a second one.
{% endnote %}

## Reconfiguration

If the power station gets a new IP address or you change its Modbus port, you can update the entry without removing the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **E3/DC** integration.
2. Next to the power station entry, select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Reconfigure**.
3. Update the **Host** and **Port**, then select **Submit**.

The integration reads the serial number again and accepts the new settings only if they lead to the same power station.

When Home Assistant discovers the power station at a new IP address, it updates the host by itself.

## Supported functionality

### Sensors

The power station device has these sensors:

- **PV power**, **Battery power**, **House power** and **Grid power**, in watts. Battery power is positive while discharging and negative while charging. Grid power is positive while importing and negative while feeding in.
- **Battery**: the battery's state of charge.
- **Self-sufficiency** and **Self-consumption**, in percent.

These sensors depend on the installed hardware:

- **Wallbox power** and **Wallbox solar power**, in watts, if a wallbox is configured.
- **Additional feeder power**, in watts, if a power meter measures an additional feeder, such as a second PV inverter.
- **Emergency power**, if the power station supports emergency power. It shows whether emergency power is active, inactive or not available. On the S10 E and S10 E PRO, **Motor switch off** means the emergency power motor switch is not in its on position.

The integration checks the wallboxes and power meters when it starts. After you add a wallbox or a power meter, reload the integration.

These sensors depend on the firmware:

- **Stored energy**, **Battery capacity**, **Maximum charge power** and **Maximum discharge power**, if the power station reports its battery capacity. Maximum discharge power is negative. All but stored energy are diagnostic sensors.
- **Inverter mode**, a diagnostic sensor. It shows normal operation, or the idle, off-grid power save mode.
- **Active power failsafe timeout** and **Reactive power failsafe timeout**, diagnostic sensors that are disabled by default. They show how long an active or reactive power setpoint holds. A timeout of 0 turns the failsafe off.
- **SG Ready status**, a diagnostic sensor that is disabled by default. It shows the SG Ready operating state: **Blocked**, **Normal operation**, **Switch-on recommended** or **Forced on**. Any other value shows as unknown.

### Binary sensors

The power station device has these binary sensors:

- **Charging locked** and **Discharging locked**: the energy management system has blocked the battery.
- **Emergency power ready**: emergency power is available once the battery is charged.
- **Charging limited by forecast**: the weather forecast holds back charging capacity for the expected sunshine. This shows whether that is happening right now, not whether the forecast setting is on.
- **Feed-in limited**: output is throttled because the maximum feed-in was reached.
- **Charging lockout period** and **Discharging lockout period**: a lockout time from **Smart Charge** is active. Disabled by default.

## Data updates

The integration polls the power station every 5 seconds.

## Troubleshooting

{% details "Setup reports that the device is not an E3/DC power station" %}

### Symptom: "The device answered, but it is not an E3/DC power station in E3/DC protocol mode"

When you add the integration, the form shows this error. An integration that was already set up stops with "The device is not an E3/DC power station in E3/DC protocol mode."

#### Description

The integration checks register 40001 for the E3/DC identifier. The power station reports it only while its Modbus interface uses the E3/DC protocol.

#### Resolution

1. On the power station, go to **Main menu** > **Smart Functions** > **Smart Home** > **Modbus**.
2. Set **Protocol** to **E3DC**, not **SUN_SPEC**.
3. Add the integration again, or reload it.

{% enddetails %}

{% details "Setup fails to connect" %}

### Symptom: "Failed to connect"

When you add the integration, the form shows this error. An integration that was already set up keeps retrying, and its sensors are unavailable.

#### Description

Home Assistant got no answer from the power station at the host and port you entered.

#### Resolution

1. Check that Modbus is turned on in the power station's **Smart Home** menu, and that the port matches.
2. Check that Home Assistant is in the same subnet as the power station. The power station answers Modbus requests only from devices in its own subnet.
3. Check that the host is the power station's current IP address. If it changed, [reconfigure](#reconfiguration) the entry with the new address. To keep it from changing, give the power station a fixed IP address in your router.

{% enddetails %}

{% details "Setup reports a different serial number" %}

### Symptom: "The device at this address has serial number …, not …"

An integration that worked before stops with this error.

#### Description

Home Assistant recognizes your power station by the serial number it read when you added the integration. A different power station now answers at the host and port of this entry. For example, your router gave the IP address to another E3/DC power station.

#### Resolution

1. If the power station of this entry moved to a new IP address, [reconfigure](#reconfiguration) the entry with that address. A fixed IP address in your router keeps it from moving again.
2. To use the power station that answers now instead, add it as a new entry and delete this one.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, turn Modbus off in the power station's **Smart Home** menu if nothing else uses it.
