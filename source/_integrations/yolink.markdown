---
title: YoLink
description: Instructions on how to integrate YoLink Devices into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Light
  - Lock
  - Number
  - Sensor
  - Siren
  - Switch
ha_release: 2022.6
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@matrixd2'
ha_domain: yolink
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - lock
  - number
  - select
  - sensor
  - siren
  - switch
  - valve
ha_integration_type: hub
---

Integrates [YoLink](https://www.yosmart.com/) Devices into Home Assistant.

{% include integrations/config_flow.md %}

## Authentication methods

The integration supports two ways to authenticate:

- **YoLink account (OAuth2)**: sign in with your YoLink account. This only gives access to the account's default home and is limited to a single entry.
- **User Access Credentials (UAC)**: per home credentials created in the YoLink app. Each home becomes its own integration entry, so this is the way to add more than one home.

If you only have one home, signing in with your account is the simplest option. If you have several homes, or already added your default home and want to add another one, use UAC.

### Creating User Access Credentials

1. Open the **YoLink app** on your phone.
2. Go to **Settings** > **Account** > **Advanced Settings** > **User Access Credentials**.
3. Tap **+** to create a new UAC.
4. Select the **home** this UAC should give access to.
5. Copy the **UAID** and **Secret Key** and enter them in the integration setup form.
6. Repeat for each home you want to add to Home Assistant.

The same home cannot be added through both authentication methods, the integration detects it and rejects the second entry.

{% details "Using custom application credentials" %}
Home Assistant will use account linking provided by Nabu Casa for authenticating with YoLink, this service is provided for free and does not require a Nabu Casa subscription. The steps below are thus not required.
If you want to use separate credentials, please contact <service@yosmart.com> to obtain a `client_id` and `client_secret`. Then you can add your credentials via application credentials. Settings > Devices & services > click the menu (three dots at the top right of the screen) and then **Application Credentials**. Enter your credentials in the pop-up window.
{% enddetails %}

## Supported device list

The integration is tested and verified for the following devices from YoLink:

- YS1604-UC (SpeakerHub)
- YS3604-UC (YoLink KeyFob)
- YS3614-UC (Mini FlexFob)
- YS4002-UC (YoLink Thermostat)
- YS4003-UC (YoLink Thermostat Heatpump)
- YS4004-UC (YoLink Thermostat 2)
- YS4906-UC + YS7706-UC (Garage Door Kit 1)
- YS4908-UC + YS7706-UC (Garage Door Kit 2 (Finger))
- YS4909-UC (Water Valve Controller)
- YS5001-UC (X3 Water Valve Controller)
- YS5002-UC (YoLink Motorized Ball Valve)
- YS5003-UC (Water Valve Controller 2)
- YS5006-UC (FlowSmart Control)
- YS5007-UC (FlowSmart Meter)
- YS5008-UC (FlowSmart All-in-One)
- YS5705-UC (In-Wall Switch)
- YS5706-UC (YoLink Relay)
- YS5707-UC (Dimmer Switch)
- YS5708-UC (In-Wall Switch 2)
- YS6602-UC (YoLink Energy Plug)
- YS6604-UC (YoLink Plug Mini)
- YS6704-UC (In-wall Outlet)
- YS6801-UC (Smart Power Strip)
- YS6802-UC (Smart Outdoor Power Strip)
- YS6803-UC (Outdoor Energy Plug)
- YS7103-UC (Siren Alarm)
- YS7104-UC (Outdoor Alarm Controller)
- YS7105-UC (X3 Outdoor Alarm Controller)
- YS7106-UC (Power Fail Alarm)
- YS7107-UC (Outdoor Alarm Controller 2)
- YS7201-UC (Vibration Sensor)
- YS7606-UC (YoLink Smart Lock M1)
- YS7607-UC (YoLink Smart Lock M2)
- YS7616-UC (YoLink Smart Lock)
- YS7617-UC (YoLink Smart Lock)
- YS7618-UC (YoLink Smart Lock)
- YS7704-UC (Door Sensor)
- YS7706-UC (Garage Door Sensor)
- YS7707-UC (Contact Sensor)
- YS7804-UC (Motion Sensor)
- YS7805-UC (Outdoor Motion Sensor)
- YS7903-UC (Water Leak Sensor)
- YS7904-UC (Water Leak Sensor 2)
- YS7905-UC (WaterDepthSensor)
- YS7906-UC (Water Leak Sensor 4)
- YS7916-UC (Water Leak Sensor 4 MoveAlert)
- YS7A01-UC (Smart Smoke/CO Alarm)
- YS8003-UC (Temperature Humidity Sensor)
- YS8004-UC (Weatherproof Temperature Sensor)
- YS8005-UC (Weatherproof Temperature & Humidity Sensor)
- YS8006-UC (X3 Temperature & Humidity Sensor)
- YS8007-UC (Thermometer Hygrometer)
- YS8008-UC (Floating Thermometer)
- YS8013-UC (Thermometer Hygrometer)
- YS8014-UC (X3 Outdoor Temperature Sensor)
- YS8015-UC (X3 Outdoor Temperature & Humidity Sensor)
- YS8017-UC (Thermometer)
- YS8023-UC (Hygrometer Thermometer)
- YS4102-UC (Sprinkler)
- YS4103-UC (Sprinkler Timer)
- YS7914-UC (Leak Sensor)

{% include integrations/actions.md %}

## Community notes

1. This integration requires an MQTT connection to be established via port 8003. If you are using a firewall, please allow communication via port 8003 in the firewall settings.
2. If you use a network proxy, such as a VPN, the integration may not be able to update the device status. Turn off the VPN.
3. Do not enter UAC credentials as custom application credentials for the OAuth2 sign-in. To use UAC, pick **Use UAC credentials** when adding the integration.
