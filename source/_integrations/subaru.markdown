---
title: Subaru
description: Instructions on how to setup your Subaru account with Home Assistant.
ha_category:
  - Car
  - Sensor
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@G-Two'
ha_domain: subaru
ha_platforms:
  - sensor
---

The Subaru integration retrieves information provided by Subaru connected vehicle services.  Before using this integration, you must first register and have login credentials to [MySubaru](https://www.mysubaru.com).

This integration requires an active vehicle subscription to the [Subaru STARLINK](https://www.subaru.com/engineering/starlink/safety-security.html) service (available in USA and Canada).

Currently, this integration only provides the Sensor platform. Subaru has deployed two generations of telematics, Gen 1 and Gen 2. The latter offers much more vehicle information. Use the tables below to determine which sensors are available to your vehicle.

| Model     | Gen 1     | Gen 2 |
|-----------|-----------|-------|
| Ascent    |           | 2019+ |
| Crosstrek | 2016-2018 | 2019+ |
| Forester  | 2016-2018 | 2019+ |
| Impreza   | 2016-2018 | 2019+ |
| Legacy    | 2016-2019 | 2020+ |
| Outback   | 2016-2019 | 2020+ |
| WRX       | 2017+     |       |

| Sensor                   | Gen 1   | Gen 2   |
|--------------------------|---------|---------|
| 12V battery voltage      |         | &check; |
| Average fuel consumption |         | &check; |
| Distance to empty        |         | &check; |
| EV battery level         |         | &check; |
| EV range                 |         | &check; |
| EV time to full charge   |         | &check; |
| External temperature     |         | &check; |
| Odometer                 | &check;*| &check; |
| Tire pressures           |         | &check; |

\* Gen 1 odometer only updates every 500 miles <br>

{% include integrations/config_flow.md %}

<p class='note'>
If your account includes multiple vehicles, the same PIN will be used for all vehicles. Ensure that you have configured all vehicles in your account to have the same PIN.
</p>

## Options

Subaru integration options are set via:

**Configuration** -> **Integrations** -> **Subaru** -> **Options**.

The only option is:

- **Enable vehicle polling *[Default: off]*:** When enabled, vehicle polling will send a remote command to your vehicle every 2 hours to obtain new sensor data. This involves "waking" your vehicle and requesting that it send new data to Subaru servers. Without vehicle polling, new sensor data is only received when the vehicle automatically pushes data (normally after engine shutdown). This option only applies to Gen 2 vehicles with Security Plus subscriptions.

<p class='note warning'>
Vehicle polling draws power from the 12V battery. Long term use without driving may drain the battery resulting in the inability to start.
</p>

## FAQ - Troubleshooting

**Q:** I have a Subaru STARLINK Security Plus subscription. How do I use the locator, remote lock and remote horn features in Home Assistant?

**A:** Those features are supported by the underlying `subarulink` Python package, and will be integrated into Home Assistant soon. Both Gen 1 and Gen 2 will be supported.

---

**Q:** Will remote start ever be supported?

**A:** Yes, Gen 2 remote start and climate settings are supported by the underlying `subarulink` Python package, and will be integrated into Home Assistant soon.

---
**Q:** Why do I need to enter my PIN during configuration?

**A:** The PIN is saved to your configuration to support vehicle polling, since a remote update command is being sent to your vehicle. In addition, the PIN will be used to support remote locator, lock, lights/horn in the future.

---

**Q:** Why wasn't I asked to enter my PIN during configuration?

**A:** A PIN is only required to send a remote command. If you do not have a STARLINK Security Plus subscription, you will not be prompted for a PIN.

---

**Q:** Why don't my sensor readings appear to change in "real-time"?

**A:** Gen 2 telematics vehicles will send updated data when the vehicle is shutdown. After about 5 minutes, the data should be reflected in Home Assistant. In addition, some data, such as tire pressures, are only measured while the vehicle is in motion. The pressures reported are the last reading when the vehicle is shutdown.

---

**Q:** Should I enable the vehicle polling option?

**A:** Probably not. One use case is if you have a PHEV and want to monitor your charging progress. Another use case is if you want to use your vehicle as a temperature sensor. Otherwise, the data isn't going to change much after you've shutdown your vehicle. A future revision will  expose vehicle polling as a service to enable incorporation into automations.
