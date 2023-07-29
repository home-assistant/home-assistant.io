---
title: Enphase Envoy
description: Instructions on how to setup Enphase Envoy with Home Assistant.
ha_category:
  - Energy
ha_release: 0.76
ha_iot_class: Local Polling
ha_domain: enphase_envoy
ha_zeroconf: true
ha_config_flow: true
ha_codeowners:
  - '@gtdiehl'
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

A sensor platform for the [Enphase Envoy / IQ Gateway](https://[enphase.com/en-us/products-and-services/envoy-and-combiner](https://enphase.com/store/comunicacao)) solar energy gateway.

Works with older models that only have (some) production metrics (ie. Envoy-C or Envoy LCD or R), newer models with only production metrics (ENVOY-S Standard) and models that offer both production and consumption metrics (ie. Envoy-S metered).

{% include integrations/config_flow.md %}

### Initial Configuration details

The initial configuration window requires you to enter the details how to access the Envoy. Following fields have to be filled.

#### Host

Enter the IP address of the Envoy. If the Envoy is auto-discovered it will be pre-filled. The IP address may be an ipv4 or ipv6 address.

#### Username and Password

Specify the username and password to access the envoy data. What username and password to use depends on the ENVOY type and/or it's firmware version:

- If your IQ Gateway / Envoy-S is on Firmware 7.x or later, use your Enphase Enlighten username and password. Make sure the enable the 'Use Enlighten' option at the bottom of the form.

- For older models and ENVOY-S with firmware before 7.x use `envoy` without a password, `installer` without a password or a valid username and password for the type.

- For older models that require username `installer` with a password this can be obtained with this: [tool](https://thecomputerperson.wordpress.com/2016/08/28/reverse-engineering-the-enphase-installer-toolkit/).
- In some cases, you need to use the username `envoy` with the last 6 digits of the unit's serial number as password. 

See [the Enphase documentation](https://support.enphase.com/s/article/What-is-the-Username-and-Password-for-the-Administration-page-of-the-Envoy-local-interface) for more details on various units.

**Note** This integration does not provide the additional data accessible by Enphase Installer or DIY accounts, only data accessible by Home owner accounts is provided.

#### Serial number

Specify the Envoy serial number. If the Envoy is auto-discovered it will be pre-filled.

#### Use Enlighten

Enable this option with IQ Gateway/ENVOY-S Firmware 7.x or later that require Enphase tokens for authentication. It will use the username and password to retrieve the authentication token from the Enphase website and use it to access the Envoy.

### Runtime configuration

Once the Envoy has been running and is operational, the following configuration items are available:

#### Scan Interval

By default the Envoy data is collected every 60 seconds. One can change the setting to what is desired with a minimum of every 5 seconds. Upon changing the value, reload the integration (or restart Home Assistant).

What the optimal scan frequency is depends on the typeEnvoy model. Models without meters typically update the inverter data every 5 minutes. Models using meters update measurements way more frequent, probably every second or so. Hence the default of 60 seconds as starting point. Some models may have capacity issues running at high refresh rates, so no single recipe is available.

**Note** Envoy Metered has a data streaming option to bring in data as it comes available which is not currently supported by this integration.

## Firmware and it's impact

Enphase model offering differs in various countries as does firmware versions and releases. Not all firmware is released in all countries and as a result firmware versions may differ largely in time. Enphase does push new firmware to the IQ Gateway / Envoy, 'not necessarily letting the home owner know'. In the past this has broken this integration as API details and change information is limited available. See the [Enphase documentation website](https://enphase.com/installers/resources/documentation/communication) for information available.

### Different models have different features

This integration supports various models but as models have different features they will not all provide the same data. Brief list of reported data below.

#### ENVOY C / R / LCD

- Current power production, today's, last 7 days and lifetime energy production.

#### IQ Gateway / ENVOY S standard (non metered)

- Current power production, today's, last 7 days and lifetime energy production.
- Current power production for each connected inverter.

#### IQ Gateway / ENVOY S standard metered

What data is available depends on how many current transformer clamps (CT) are installed and what currents they measure. Both production and consumption clamps can be installed, each for up to 3 phases or multiple circuits on their own breaker in single phase setup.

##### with connected current transformer clamps

- Current power production, today's, last 7 days and lifetime energy production over all phases.
- Current power production, today's, last 7 days and lifetime energy production for each individual phase named L1, L2 and L3.
- Current power production for each connected inverter.

##### without connected current transformer clamps

The current firmware (D7.6.175 and probably some other right before and after it) without CT clamps connected and configured does obviously not report these measurements. But for some reason it is only reporting:

- Current power production and lifetime energy production. Today's and last 7 day energy production reportedly are both solid 0.
- Lifetime Energy production reportedly resets to zero roughly every 1.19 MWh.
- Current power production for each connected inverter.

## How to switch to Enphase token authorization

Once the envoy received the new firmware that requires token authorization data collection will fail. To switch to the token usages:

- In Home Assistant go to the Enphase Envoy integration and delete it.
- Restart Home Assistant
- The envoy will be auto-discovered again. If not add an Envoy Integration manually.
- In the configuration screen now use your Enphase Enlighten username and password and enable the 'Use Enlighten' option.
- Once it's configured it will continue reporting data in the same entities.
- Optionally change the default time interval from 60 to what is preferred.

## Troubleshooting

When issues occur with this integration some items to check are:

- What model are you using. This will drive what can be expected.
- What firmware is your model using, Was a firmware update recently pushed to the device?
- Enable debug logging and let it run for a couple of minutes, disable it again and the log file will download to your computer. Check for obvious errors and be prepared to share it as needed to troubleshooting. All data collected is logged in lines like `Fetched from https://192.168.01.10/some_url: <Response [200 OK]>:`
- When configuring the Envoy for token use it will reach out to the Enphase Enlighten website to obtain a token. Reportedly the Enphase website is not equally responsive every moment of the day, week, moth, year and the setup will fail. At this moment the only answer to that is your perseverance or just try at another moment.
- The token lifetime is currently 1 year. The token is cached eliminating the need to connect toe Enphase each reload or restart. When the token is expired or some other authorization hiccup occurs a new token will be obtained. If that is needed at a moment it can't connect to Enphase it will try until success but in the mean time no data is collected from the Envoy.
