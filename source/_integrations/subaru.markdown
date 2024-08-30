---
title: Subaru
description: Instructions on how to setup your Subaru account with Home Assistant.
ha_category:
  - Car
  - Lock
  - Presence detection
  - Sensor
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@G-Two'
ha_domain: subaru
ha_platforms:
  - device_tracker
  - diagnostics
  - lock
  - sensor
ha_integration_type: integration
---

This integration retrieves vehicle information and actuates remote services provided by [Subaru STARLINK](https://www.subaru.com/subaru-starlink/starlink-safety-and-security.html) (currently only available in USA and Canada).

This integration requires a telematics equipped Subaru and an active vehicle subscription to the Subaru STARLINK service. Before using this integration, you must first register and have login credentials to [MySubaru](https://www.mysubaru.com).

Subaru has deployed three generations of telematics with different feature sets. Use the table below to determine your vehicle's telematics generation and capabilities. This table is a best guess based upon what Subaru [lists as available features](https://www.subaru.com/vehicle-info/subaru-starlink/starlink-safety-and-security/compare-packages.html?model=&year=).

| Model     | Gen 1     | Gen 2     | Gen 3 |
|-----------|-----------|-----------|-------|
| Ascent    |    ---    | 2019-2023 | 2024+ |
| BRZ       |    ---    | 2022-2023 |  ---  |
| Crosstrek | 2016-2018 | 2019+     |  ---  |
| Forester  | 2016-2018 | 2019+     |  ---  |
| Impreza   | 2016-2018 | 2019-2022 | 2023+ |
| Legacy    | 2016-2019 | 2020-2022 | 2023+ |
| Outback   | 2016-2019 | 2020-2022 | 2023+ |
| WRX       | 2017-2021 | 2022-2023 |  ---  |

In addition to the telematics generational differences, there are two levels of STARLINK subscriptions, "Safety Plus" and "Security Plus". All remote services (such as locks and location tracking) require a "Security Plus" level subscription.

{% include integrations/config_flow.md %}

{% important %}
If your account includes multiple vehicles, the same PIN will be used for all vehicles. Ensure that you have configured all vehicles in your account to have the same PIN.
{% endimportant %}

## Sensors

Available sensors will vary by model, year, and subscription type. The integration will add all supported sensors for your vehicle. Sensor data is usually only updated when the vehicle is turned off unless the [polling option](#options) is enabled.

| Sensor                   | Gen 1   | Gen 2   | Gen 3   |
|--------------------------|---------|---------|---------|
| Average fuel consumption |         | &check; | &check; |
| Distance to empty        |         | &check; | &check; |
| EV battery level         |         | &check; | &check; |
| EV range                 |         | &check; | &check; |
| EV time to full charge   |         | &check; | &check; |
| Odometer                 | &check;*| &check; | &check; |
| Tire pressures           |         | &check; | &check; |

\* Gen 1 odometer only updates every 500 miles <br>

## Lock

This integration supports remote locking and unlocking of vehicle doors. If doors are remotely unlocked, they will automatically relock if a door is not opened within a minute. There is no remote notification of this automatic relock.  
{% note %}
The current lock status is always unknown due to the fact that the Subaru API does not report this data.
{% endnote %}

### Unlock specific door

In addition to the standard actions built into the lock entity, this integration also provides a `subaru.unlock_specific_door` action to specify a door to unlock.

The action requires the `door` parameter which may be set to one of the following:

- `all`: unlocks all doors
- `driver`: unlocks only the driver's door
- `tailgate`: unlocks only the tailgate (not all vehicles support this option)

## Device tracker

Tracks the most recently reported location of the vehicle. The vehicle reports its location when it is turned off. If enabled, the [polling option](#options) will also update the vehicle location.

## Options

Subaru integration options are set via:

**Settings** -> **Devices & services** -> **Subaru** -> **Options**.

- **Enable vehicle polling *[Default: off]*:** When enabled, vehicle polling will send a remote command to your vehicle every 2 hours to obtain new sensor data. This involves "waking" your vehicle and requesting that it send new data to Subaru servers. Without vehicle polling, new sensor data is only received when the vehicle automatically pushes data (normally after engine shutdown). This option only applies to vehicles with Security Plus subscriptions because it uses a "locate" command to request the data.

{% warning %}
Vehicle polling draws power from the 12V battery. Long term use without driving may drain the battery resulting in the inability to start.
{% endwarning %}

## FAQ - Troubleshooting

**Q:** I have a Subaru STARLINK Security Plus subscription. How do I use the locator, and remote light/horn features in Home Assistant?

**A:** Those features are supported by the underlying [subarulink](https://github.com/G-Two/subarulink) Python package, and will be integrated into Home Assistant soon. Both Gen 1 and Gen 2 will be supported.

---

**Q:** Will remote start ever be supported?

**A:** Yes, Gen 2/3 remote start and climate settings are supported by the underlying [subarulink](https://github.com/G-Two/subarulink) Python package, and will be integrated into Home Assistant soon.

---
**Q:** Why do I need to enter my PIN during configuration?

**A:** The PIN is saved to your configuration to support vehicle polling, since a remote update command is being sent to your vehicle. In addition, the PIN is used to support the lock platform and will be used for the remote start, locator, and lights/horn functions in the future.

---

**Q:** Why wasn't I asked to enter my PIN during configuration?

**A:** A PIN is only required to send a remote command. If you do not have a STARLINK Security Plus subscription, you will not be prompted for a PIN.

---

**Q:** Why don't my sensor readings appear to change in "real-time"?

**A:** Gen 2/3 telematics vehicles will send updated data when the vehicle is shutdown. After about 5 minutes, the data should be reflected in Home Assistant. In addition, some data, such as tire pressures, are only measured while the vehicle is in motion. The pressures reported are the last reading when the vehicle is shutdown.

---

**Q:** Should I enable the vehicle polling option?

**A:** Probably not. One use case is if you have a PHEV and want to monitor your charging progress.  Otherwise, the data isn't going to change much after you've shutdown your vehicle (tire pressures are only updated when the vehicle is in motion). A future revision will expose vehicle polling as an action to enable incorporation into automations.
