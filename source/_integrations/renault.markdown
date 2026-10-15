---
title: Renault
description: Instructions on how to integrate your Renault, Dacia, or Alpine vehicle into Home Assistant using the My Renault service.
ha_category:
  - Binary sensor
  - Button
  - Car
  - Number
  - Presence detection
  - Select
  - Sensor
ha_release: 2021.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@epenet'
ha_domain: renault
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - number
  - select
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
---

The **Renault** {% term integration %} connects your Renault, Dacia, or Alpine vehicle to Home Assistant through the **My Renault** cloud service. It uses the same account as the My Renault app on your phone.

For example, you can:

- See the battery level, range, charge state, and mileage of your vehicle on your dashboard.
- Get notified when charging is complete.
- Pre-heat or pre-cool the cabin before you leave in the morning.
- Start or stop charging, or set battery charge limits, based on your energy prices.
- Track the location of your vehicle.

## Supported devices

The integration works with vehicles that are linked to a My Renault account. The features available depend on the vehicle model, and some features require a subscription. The following models are known to work:

- **Renault**: 4 E-Tech, 5 E-Tech, Arkana E-Tech, Austral, Captur II, Clio V, Espace VI, Master E-Tech, Megane IV, Megane E-Tech, Rafale, Scenic E-Tech, Symbioz, Twingo III Z.E., Zoe
- **Dacia**: Bigster, Duster III, Sandero III, Spring
- **Alpine**: A290

Other models linked to a My Renault account may also work. In that case, the integration uses a default set of features and writes a message to the log.

## Prerequisites

- A My Renault account with your vehicle linked to it. If you can see your vehicle in the My Renault app, the integration can access it.
- The email address and password you use to sign in to the My Renault app.
- For remote control features, such as starting the air conditioning or charging, your vehicle might need an active subscription, such as the _Pack EV Remote Control_ or the _Pack Smart Navigation_.

{% include integrations/config_flow.md %}

If your email address is linked to more than one Kamereon account, Home Assistant asks you to select the account your vehicles are assigned to. If there is only one account, it is selected automatically.

{% configuration_basic %}
Locale:
  description: "Your country code, for example `fr_FR` or `en_GB`. Select the country where your My Renault account is registered."
Email:
  description: "The email address you use to sign in to the My Renault app."
Password:
  description: "The password you use to sign in to the My Renault app."
Account ID:
  description: "The Kamereon account ID associated with your vehicles. This is only asked if your email address is linked to more than one account."
{% endconfiguration_basic %}

Each vehicle linked to the account is added as a device, named after its registration number.

To change the locale, email address, or password later, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Renault**, then select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reconfigure**. You must select the same Kamereon account.

## Supported functionality

The **Renault** integration provides the following entities. The entities available for your vehicle depend on its model, whether it is electric, hybrid, or fuel-powered, and your subscription. The integration only creates entities for the features that your vehicle supports.

### Binary sensors

- **Charging**
  - **Description**: Whether the vehicle is charging
  - **Available for**: Electric and plug-in hybrid vehicles
- **Plug**
  - **Description**: Whether the charging cable is plugged in
  - **Available for**: Electric and plug-in hybrid vehicles
- **HVAC**
  - **Description**: Whether the air conditioning is running
- **Lock**
  - **Description**: Whether the vehicle is locked or unlocked
- **Driver door**, **Passenger door**, **Rear left door**, **Rear right door**, and **Hatch**
  - **Description**: Whether each door or the hatch is open

### Buttons

- **Start air conditioner**
  - **Description**: Starts the air conditioning at 21°C
  - **Remarks**: To use another temperature or start time, use the [Start A/C](/actions/renault.ac_start/) action
- **Start charge** and **Stop charge**
  - **Description**: Starts or stops charging
  - **Available for**: Electric and plug-in hybrid vehicles
- **Flash lights**
  - **Description**: Flashes the lights of the vehicle, for example to find it in a parking lot
- **Sound horn**
  - **Description**: Sounds the horn of the vehicle

### Device tracker

- **Location**
  - **Description**: The last known GPS location of the vehicle

### Numbers

- **Minimum charge level**
  - **Description**: The minimum battery charge level that the vehicle keeps, from 15% to 45% in steps of 5%
  - **Available for**: Electric and plug-in hybrid vehicles that support charge limits
- **Target charge level**
  - **Description**: The battery charge level at which charging stops, from 55% to 100% in steps of 5%
  - **Available for**: Electric and plug-in hybrid vehicles that support charge limits
  - **Remarks**: For example, a target of 80% can help preserve long-term battery health

### Selects

- **Charge mode**
  - **Description**: How the vehicle charges when it is plugged in
  - **Options**: Always, Always charging, Schedule mode, Scheduled
  - **Available for**: Electric and plug-in hybrid vehicles

### Sensors

- **Battery**
  - **Description**: The battery charge level
  - **Available for**: Electric and plug-in hybrid vehicles
- **Battery autonomy**
  - **Description**: The estimated electric range
  - **Available for**: Electric and plug-in hybrid vehicles
- **Battery available energy**
  - **Description**: The energy available in the battery
  - **Available for**: Electric and plug-in hybrid vehicles
- **Battery temperature**
  - **Description**: The temperature of the battery
  - **Available for**: Electric and plug-in hybrid vehicles
- **Charge state**
  - **Description**: The charging state, such as **Not charging**, **Waiting for planned charge**, **Charging**, or **Charge ended**
  - **Available for**: Electric and plug-in hybrid vehicles
- **Charging mode**
  - **Description**: The charging mode set in the vehicle: **Always**, **Delayed**, **Delegated**, or **Scheduled**
  - **Available for**: Electric and plug-in hybrid vehicles
- **Charging power** or **Admissible charging power**
  - **Description**: The current charging power, or the maximum power the vehicle accepts, depending on the model
  - **Available for**: Electric and plug-in hybrid vehicles
- **Charging remaining time**
  - **Description**: The time left until charging is complete
  - **Available for**: Electric and plug-in hybrid vehicles
- **Plug state**
  - **Description**: The state of the charging plug, such as **Unplugged** or **Plugged in**
  - **Available for**: Electric and plug-in hybrid vehicles
- **Fuel autonomy**
  - **Description**: The estimated fuel range
  - **Available for**: Fuel and hybrid vehicles
- **Fuel quantity**
  - **Description**: The amount of fuel in the tank
  - **Available for**: Fuel and hybrid vehicles
- **Mileage**
  - **Description**: The total distance traveled by the vehicle
- **Outside temperature**
  - **Description**: The temperature outside the vehicle
- **HVAC SoC threshold**
  - **Description**: The minimum battery <abbr title="state of charge">SoC</abbr>, in %, needed to start the air conditioning remotely
- **Front left tyre pressure**, **Front right tyre pressure**, **Rear left tyre pressure**, and **Rear right tyre pressure**
  - **Description**: The pressure of each tire
- **Remote engine start**
  - **Description**: The status of the last remote engine start
- **Last battery activity**, **Last HVAC activity**, and **Last location activity**
  - **Description**: When the vehicle last reported battery, air conditioning, or location data
  - **Remarks**: These entities are disabled by default
- **Remote engine start code**
  - **Description**: The code of the last remote engine start
  - **Remarks**: This entity is disabled by default

{% include integrations/actions.md %}

## Renault automation examples

The Renault integration lets you react to the state of your vehicle and control it from your automations.
Here are some ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified when charging is complete

Send a notification to your phone when your vehicle finishes charging. Replace the entity IDs in the example with the entity IDs of your vehicle and phone.

- **Trigger**: State: **Charge state** changes to **Charge ended**
  - **Target**: Your vehicle's **Charge state** sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when charging is complete" %}

{% example %}
automation: |
  alias: "Notify when the car has finished charging"
  triggers:
    - trigger: state
      entity_id: sensor.reg_number_charge_state
      to: "charge_ended"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Your car has finished charging."
{% endexample %}

{% enddetails %}

### Automation: Pre-heat the cabin on weekday mornings

Start the air conditioning at 19°C at 7:30 on weekdays, so the cabin is comfortable when you leave. To find the vehicle ID for the YAML example, select the vehicle in the UI editor first, then switch to YAML mode.

- **Trigger**: Time
  - **At time**: `07:30:00`
  - **Days of the week**: Monday, Tuesday, Wednesday, Thursday, and Friday
- **Action**: Start A/C
  - **Vehicle**: Your vehicle
  - **Temperature**: `19`

{% details "YAML example for pre-heating the cabin on weekday mornings" %}

{% example %}
automation: |
  alias: "Pre-heat the car on weekday mornings"
  triggers:
    - trigger: time
      at: "07:30:00"
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: renault.ac_start
      data:
        vehicle: abcde1234567890abcde1234567890ab
        temperature: 19
{% endexample %}

{% enddetails %}

## Data updates

The **Renault** integration {% term polling polls %} the Renault servers for data. The vehicle data is split into several groups, such as battery, location, and air conditioning. The integration makes on average one request per minute, so each value is updated every N minutes, where N is the total number of data groups across all your vehicles. For example, if your vehicle supports 6 groups, each value is updated every 6 minutes. With 2 such vehicles on the same account, each value is updated every 12 minutes.

This keeps the integration within the request limits of the Renault servers. If the servers still report that too many requests were made, the integration pauses updates for 15 minutes and keeps showing the last known values.

When you change a charge limit, Home Assistant shows the new value right away, before the Renault servers confirm it.

## Known limitations

- The integration depends on the Renault servers and on an internet connection. It cannot connect to the vehicle directly.
- Some features require a subscription, such as the _Pack EV Remote Control_ or the _Pack Smart Navigation_.
- Not all features are available on all models. For example, the horn, lights, and tire pressure are not available on many recent vehicles, and some electric vehicles cannot stop charging remotely.
- Two-factor authentication on the My Renault account is not supported.
- A vehicle that you add to your My Renault account later only appears in Home Assistant after you reload the integration.
- The **Start air conditioner** button always uses 21°C. To use another temperature, use the [Start A/C](/actions/renault.ac_start/) action.

## Troubleshooting

{% details "Home Assistant asks you to sign in again" %}

### Symptom: Home Assistant asks you to reauthenticate the Renault integration

**Renault** appears under **Attention required** in **Settings** > **Devices & services**.

#### Description

The Renault servers no longer accept the stored sign-in, for example because you changed your password in the My Renault app.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Under **Attention required**, select **Reconfigure** on the **Renault** card.
3. Enter your new password.

{% enddetails %}

{% details "The integration keeps retrying to set up" %}

### Symptom: The integration fails to set up and retries

The Renault integration shows that it failed to set up and retries automatically.

#### Description

Home Assistant cannot reach the Renault servers, or the servers cannot return the details of your vehicles. This can happen during maintenance of the Renault servers.

#### Resolution

1. Check that your vehicle shows up in the official My Renault app.
2. If the app also has problems, wait until the Renault servers are available again. The integration retries automatically.

{% enddetails %}

{% details "Setup fails with a connection error" %}

### Symptom: Setup shows Failed to connect

When you set up the integration, you get a **Failed to connect** error, even though the My Renault app works.

#### Description

Two-factor authentication is turned on for your My Renault account. The integration does not support two-factor authentication.

#### Resolution

1. Check whether two-factor authentication is turned on in your My Renault account settings.
2. If the Renault servers are temporarily unavailable, try again later.

{% enddetails %}

{% details "No Kamereon account is found during setup" %}

### Symptom: Setup shows Unable to find Kamereon account

When you set up the integration, Home Assistant shows **Unable to find Kamereon account**.

#### Description

None of the accounts linked to your email address has a vehicle with complete details. This can happen when a vehicle was only just added to your My Renault account.

#### Resolution

1. Check that your vehicle shows up in the official My Renault app.
2. Wait a while, and try the setup again.

{% enddetails %}

{% details "Access to the account is denied" %}

### Symptom: Setup fails because access to the Kamereon account was denied

The Renault integration fails to set up, with a message that access to the Kamereon account was denied by the Renault servers.

#### Description

The Renault servers refuse access to the Kamereon account stored in Home Assistant. Home Assistant does not retry automatically.

#### Resolution

1. Check that your vehicle shows up in the official My Renault app.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Renault**, then select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reconfigure**.
3. If you need to use another Kamereon account, remove the integration and add it again with that account.

{% enddetails %}

{% details "The Renault account no longer exists" %}

### Symptom: A repair says that the Renault account no longer exists

Home Assistant shows a repair that your Renault account no longer exists.

#### Description

The Kamereon account stored in Home Assistant is no longer linked to your vehicles, for example after Renault moved them to a new account.

#### Resolution

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %}.
2. Select the Renault repair and follow the steps to select the new account.

If you already added your vehicles again under a new Renault entry, the repair asks you to delete the entry for the old account instead. If your sign-in is no longer valid, Home Assistant first asks you to reauthenticate.

{% enddetails %}

{% details "Some entities or buttons are missing" %}

### Symptom: Your vehicle has fewer entities than listed on this page

Some entities or buttons listed under [Supported functionality](#supported-functionality) do not appear for your vehicle.

#### Description

The integration only creates entities for the features that your vehicle model and subscription support. When the Renault servers report that a feature is not supported or that access is denied, the integration skips it and writes a message to the log. Some entities are also disabled by default.

#### Resolution

1. Check whether the feature is available in the My Renault app for your vehicle.
2. Check your subscription in the My Renault app.
3. To turn on a disabled entity, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Renault**, select your vehicle, and then select **+N disabled entities**. Select the entity, select the cogwheel {% icon "mdi:cog-outline" %}, turn on **Enabled**, and select **Update**.

{% enddetails %}

{% details "An action or button fails" %}

### Symptom: An action or button shows an error

When you use an action, a button, a number, or a select, Home Assistant shows that an unknown error occurred while communicating with the Renault servers.

#### Description

The Renault servers refused the command. This usually happens when the feature is not available for your vehicle model or subscription, or when the vehicle cannot be reached. In that case, the error message often contains `err.func.wired.forbidden`.

When you change a charge limit, you can also get an error that the battery state of charge data is currently unavailable. Wait for the next data update, and try again.

#### Resolution

1. Try the same command in the My Renault app.
2. If it works in the app but not in Home Assistant, report an issue as described below.

{% enddetails %}

{% details "A new vehicle does not appear" %}

### Symptom: A vehicle you added to your account is missing

You added a vehicle to your My Renault account, but it does not appear in Home Assistant.

#### Description

The integration only reads the list of vehicles when it starts.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Renault**.
2. Select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reload**.

{% enddetails %}

### Reporting an issue

When you report an issue, include a debug log and the diagnostics data:

1. Turn on [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) for the Renault integration.
2. Reload the integration, and wait until the issue occurs again.
3. Turn off debug logging. The debug log file downloads automatically.
4. Download the [diagnostics](/integrations/diagnostics/) data of the integration or the vehicle.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

### Removing a vehicle you no longer own

When you remove a vehicle from your My Renault account, it stays in Home Assistant. To remove it:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Renault**.
2. Select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reload**.
3. Select the vehicle, then select the three dots {% icon "mdi:dots-vertical" %} menu and select **Delete**.

You can only delete a vehicle that is no longer linked to your account.
