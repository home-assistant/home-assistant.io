---
title: Miele
description: Instructions on how to set up the Miele integration within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Hub
  - Light
  - Sensor
  - Switch
  - Vacuum
ha_iot_class: Cloud Push
ha_release: '2025.5'
ha_domain: miele
ha_codeowners:
  - '@astrandb'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - fan
  - light
  - sensor
  - switch
  - vacuum
ha_integration_type: integration
ha_zeroconf: true
ha_quality_scale: bronze
---

The Miele {% term integrations %} allows users to integrate their home appliances using the [official 3rd party API](https://www.miele.com/developer).

Miele is known as a manufacturer of premium appliances for cooking, laundry care, and floor care.

## Use cases

- Monitor the multiple sensors of the appliance and trigger automations based on these sensors.
- Monitor the program status of the appliances.
- Control settings on the appliances.

{% note %}
Note that the feature availability depends on the appliance model.
{% endnote %}

## Supported devices

You can find general information about supported devices on the [Miele website](https://www.miele.com/developer/capabilities.html). The integration supports any Miele appliance connected to a Miele user account. Miele WiFiConn@ct appliances can be connected directly via a Wi-Fi router. Miele Zigbee appliances must use the Miele@home Gateway XGW3000.

The appliance must be connected to the Miele CloudService by using the Miele app.

{% note %}
New generation washer/dryers and new generation vacuum cleaners:
Endpoints for the new generations are not yet available and will be released in the fall of 2025.
{% endnote %}

## Prerequisites

Make sure that you have your username, password, and country available for your Miele account.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration configuration may ask for *Client ID* and *Client Secret*. See [Troubleshooting](/integrations/miele/#troubleshooting) below and [Application Credentials](/integrations/application_credentials) for more details.

## Supported functionality

{% note %}

- The entities' availability depends on the appliance type and the generation of the product, and the appliance might not support all the entities for its type. Please refer to the product manual for details on implementation of specific functions.
- Products from professional and semi-professional series are generally not supported due to the limitations in the Miele 3rd party API.
- Some appliances don't report data while they are turned off, so corresponding entities will not appear in the Miele integration after loading until the appliances are turned on.
{% endnote %}

### Binary sensor

{% details "List of binary sensors" %}

- **Operation state**:
  - **Door**: Shows if the door on the appliance is open or closed.
  - **Full remote control**: Shows the state of Full remote control feature on appliances that supports it.
  - **Mobile start**: Shows the state of Mobile start feature on appliances that supports it.
  - **Notification active**: Shows if there is a notification message active on the appliance. The API does not supply any information on the details of the notifications.
  - **Problem**: Shows if there is an error message active on the appliance. The API does not supply any information on the details of the error.
  - **Smart grid**: Shows the state of Smart grid feature on appliances that supports it.
{% enddetails %}

### Button

{% details "List of button entities" %}

Button entities are used to control program progress in washing machines, dryers, dishwashers, robot vacuum cleaners, and others. The exact response to pressing a button can vary slightly between product models, but the result is usually intuitive. The API enables and disables the buttons according to the actual state of the appliance. Most appliances require you to manually activate mobile start or remote control mode.

- **Start**: Starts or resumes a program.
- **Pause**: Pauses a program.
- **Stop**: Stops a program.

{% enddetails %}

### Climate

{% details "List of climate entities" %}

Climate entities are used to control target temperatures in refrigerators, freezers, and wine cabinets. One, two, or three zones can be controlled depending on the capabilities of the appliance.

{% enddetails %}

### Fan

{% details "List of fan entities" %}

- **Fan**: The speed of extraction fans can be monitored and controlled in many models of cooker hoods and combined induction hobs with integrated extraction fans.

{% enddetails %}

### Light

{% details "List of light entities" %}

- **Light**: The light can be turned on and off in many models of ovens, cooker hoods, and wine cabinets.
- **Ambient light**: Some models of cooker hoods have ambient light that can be turned on and off.
{% enddetails %}

### Sensor

{% details "List of sensors" %}

- **Operation state**:
  - **Status**: Represents the current operation state of the device. The default entity name is just the appliance type. For example, "Dishwasher".
  - **Program**: Shows the currently active program. On coffee machines, the program sensor also provides an extra state attribute `profile` in order to distinguish which profile is in use on the machine.
  - **Program phase**: Shows the current phase in the running program.
  - **Program type**: Shows the current program type.
  - **Spin speed**: Shows the spin speed selected for the current washing machine program.
  - **Energy consumption**: Shows the energy consumption during the current program cycle. The value will be reset after finishing the program.
  - **Energy forecast**: Shows the forecast percentage of the maximum energy the program will consume for a given cycle.
  - **Water consumption**: Shows the water consumption during the current program cycle. The value will be reset after finishing the program.
  - **Water forecast**: Shows the forecast percentage of the maximum water the program will consume for a given cycle.
  - **Temperature**: Represents the current temperature in refrigerators, freezers, and ovens. Entities are created for up to 3 zones depending on the device capabilities. For zones 2 and 3, the temperature sensor is dynamically created when the appliance is turned on and a valid value is reported.
  - **Target temperature**: Shows the set target temperature for ovens and washing machines.
  - **Core temperature**: Shows the core temperature of the food in ovens with an appropriate temperature probe. This sensor is dynamically created when the appliance is turned on, a program is started and the temperature probe is connected to the appliance.
  - **Target core temperature**: Shows the set core target temperature for the food in ovens with an appropriate temperature probe. This sensor is dynamically created when the appliance is turned on, a program is started and the core target temperature is set on the device.
  - **Drying step**: Shows the selected drying step on tumble dryers.
  - **Elapsed time**: Shows the number of minutes that the current program has been running.
  - **Remaining time**: Shows the estimated number of minutes remaining in the current program cycle. This value can fluctuate during a program cycle based on load dirtiness or water‑heating time.
  - **Start in**: Shows the number of minutes until a delayed program start, if configured.
  - **Plate**: Four to six sensors that show the current state of hob heating plates. The status mimics the display on the actual hob. For example, 0 is off, 5 is approximately 50% power, and "B" is power boost. Plates can only be monitored from Home Assistant, not controlled.
{% enddetails %}

### Switch

{% details "List of switch entities" %}

- **Power**: The Power switch has slightly different characteristics depending on the appliance model. For some devices, it works more or less as a traditional power switch, while it behaves like a wake-up/sleep toggle on others. The availability of the switch is controlled by the API, depending on the operational state of the appliance.
- **Supercooling**: The switch controls Supercooling mode for refrigerators.
- **Superfreezing**: The switch controls Superfreezing mode for freezers.
{% enddetails %}

### Vacuum

{% details "List of vacuum entities" %}

- **Robot vacuum cleaner**: Miele robot vacuum cleaners can be monitored and controlled to a limited extent. The device can be started, stopped, and paused. The fan speed can also be set.
{% enddetails %}

## Actions

### Action `miele.set_program`

Set and start a program for applicable appliances. Note that the device must be in a state where it will accept a new program, for example, most washing machines must be in state `on` and many appliances must be set manually to 'MobileStart' or 'MobileControl' in advance. An error message is displayed if the device did not accept the action command.
The action can be set up by UI in Automations editor. It can also be executed in Developer tools.

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `device_id`    | no       |  Select device in GUI mode, then switch to YAML mode to see the device_id.                                        |
| `program_id`   | no       |  Enter the program_id number. The easiest way to find the number is to use the `get_programs` action from developer tools. It can also be found by fetching a diagnostic download while running the actual program. Use the value from the key  `state.programId.value_raw`.|

### Action `miele.set_program_oven`

Set and start a program for oven appliances. Note that the device must be in a state that will accept a new program. For example, most ovens must be in the state `on`, and many appliances must be set manually to 'MobileStart' or 'MobileControl' in advance. An error message is displayed if the device does not accept the action command.
The action can be set up by UI in the **Automations** editor. It can also be executed in the **Developer tools**.

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `device_id`    | no       |  Select device in GUI mode, then switch to YAML mode to see the device_id.                                        |
| `program_id`   | no       |  Enter the program_id number. The easiest way to find the number is to use the `get_programs` action from developer tools. It can also be found by fetching a diagnostic download while running the actual program. Use the value from the key  `state.programId.value_raw`.|
| `duration`     | yes      |  Set an optional duration for the oven program.|
| `temperature`  | yes      |  Set an optional target temperature for the oven program.|

### Action `miele.get_programs`

Get the list of available programs and associated parameters for applicable appliances. The API will return an empty list if the device doesn't support programs (for example, freezers). Same requirements on device state as described for `set_program` action above.

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `device_id`    | no       |  Select the device in GUI mode, then switch to YAML mode to see the device_id.                                        |

## Automation examples

Get started with these automation examples

### Send a notification when the appliance ends the program

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Notify when program ends"
triggers:
  - trigger: state
    entity_id:
      - sensor.washing_machine
    to: program_ended
actions:
  - service: notify.notify
    data:
      message: "The appliance has finished the program."
```

{% endraw %}
{% enddetails %}

### Set program and start washing machine

Load your washing machine and manually activate mobile start or remote control mode on the machine.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Wash cottons early in the morning"
description: "Set cottons program and start washing machine early in the morning"
triggers:
  - trigger: time
    at: "04:00:00"
actions:
  - action: miele.set_program
    data:
      device_id: <Your washing machine's device_id>
      program_id: 1
```

{% endraw %}
{% enddetails %}

## Data updates

This integration uses server-sent events from the Miele API to receive live updates from the appliances.
When the configuration entry is loaded or after a streaming error (for example after disconnection), the integration will request all data (such as appliance info, available commands, programs, settings, and status) for all appliances.

## Known limitations

- The Miele 3rd party API does not fully match the Miele app. Some programs, options, or settings available in the app may not be accessible or usable via the API.
- This integration supports only one integration entry, as the Miele 3rd party API does not allow for the unique identification of an account.

## Troubleshooting

{% details "Manual entry of authentication credentials" %}

Follow these instructions if you are instructed to do so by a developer or by Miele support. It is not needed for normal use of the integration.

- Visit [https://www.miele.com/developer](https://www.miele.com/f/com/en/register_api.aspx) and sign up for a developer account.
- Enter an arbitrary name for your connection and the email of your login for the original Miele app.
- On success, you will get an email with an activation link. Press the **Activate** button. Make note of the client ID and secret - you will need them for the next step.
You may be prompted to create an [Application - The provided Miele User Account email address must be all lowercase; otherwise, it will result in authentication failures.
- The password should not contain any special characters. Even though it works in the Miele app, it may not work with the API.
- Allow a couple of minutes to get the activation email. All changes in the developer portal take a couple of minutes before the change is implemented. Save your credentials as you will need them later.

{% enddetails %}

{% details "Problem: Unavailable entities for a device" %}

After reloading the Miele integration, the entities related to an appliance that used to be available are no longer available.

Unavailable entities can have multiple causes:

- The appliance is turned off. When it is turned off, the appliance is disconnected and the API does not retrieve information about the appliance.
- The appliance is experiencing a network issue.
- The Miele API is experiencing issues.

To try to solve the above issues, follow these steps:

1. Turn on the appliance and reload the Miele integration.
2. If the appliance is turned on and the issue persists, check the network connection of the appliance and perform a soft reset on the appliance.
3. If the issue persists, check the connection of the appliance with the Miele API by checking it in the Miele app.
   1. Open the Miele app.
   2. Go to the appliance that is experiencing the issue.
   3. Press the cog-wheel to view more information.
4. If everything is correct and the issue persists, contact Miele support.
   - [Miele service and contact](https://www.miele.com/)
   - [Miele developer Help & Support](https://www.miele.com/developer)

{% enddetails %}

{% details "Problem: Program or program phase is unknown" %}

The most common cause is that the code presented by the API is unknown to the integration. Details of the missing code can be found in the Home Assistant log or in the diagnostic file. Please open an issue on GitHub with the details from the logs. Please also include information on the program or program phase that was active when the message occurred.

Unknown can also be displayed if the state is reported as unknown by the API, usually caused by a temporary malfunction in the cloud service.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. If you have entered your own credentials, you will be asked if you want to keep them or delete them. If you want to delete them later you can do that from the tree-dot menu in {% my integrations title="**Settings** > **Devices & services**" %}.

{% include integrations/remove_device_service.md %}
