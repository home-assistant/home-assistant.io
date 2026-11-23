---
description: Integrate Imou smart devices into Home Assistant.
ha_release: 2026.7
ha_domain: imou
---

The **Imou** {% term integration %} connects to the [Imou Open Platform](https://open.imoulife.com) using your App ID and App secret. Devices linked to your platform account are discovered automatically.

Channel devices expose **Live view SD** and **Live view HD** camera entities. Depending on what the cloud API reports for each device, the integration also creates alarm control panel, button, switch, siren, select, binary sensor, and sensor entities. See [Supported functionality](#supported-functionality) for the full list.

## Use cases

- Watch a live stream or a still image from a camera that is online.
- See whether a camera, gateway, or plug is online, sleeping, or upgrading.
- Arm or disarm a supported gateway.
- Turn a supported plug on or off, and read its power use.
- Get a notification when a supported door or window contact opens.

## Supported devices

The integration supports Imou cameras, gateways, plugs, and sensors that are already on your Imou Open Platform account and reported by the cloud API. It does not add a device that Home Assistant only saw on the local network.

Which entities appear depends on the device. For example, pan and tilt buttons are created only when the device supports them, and a battery sensor appears only when the device reports a battery level.

Add or remove devices in the Imou Open Platform or the Imou app. Home Assistant picks up the change on the next refresh. See [Data updates](#data-updates).

## Prerequisites

Before using the Imou integration, create an Imou Open Platform application:

1. Visit [Imou Open Platform](https://open.imoulife.com).
2. Register or log in to your Imou account, then open the **Control board**.
3. Go to **App Information** to obtain an **App ID** and **App secret**.
4. Add your Imou devices in the Imou Open Platform or Imou mobile app so they appear on your account.

{% include integrations/config_flow.md %}

Home Assistant can discover Imou and Lechange devices on the local network from their MAC address. Opening a discovered Imou integration shows the same setup form as adding it manually: enter your Imou Open Platform App ID, App secret, and server region. The discovered device is not added to your account automatically.

{% configuration_basic %}
App ID:
  description: The App ID from your Imou Open Platform application.
App secret:
  description: The App secret from your Imou Open Platform application.
Server region:
  description: The API region for your account. Choose the region closest to where your account was registered.
{% endconfiguration_basic %}

When adding the integration, select **Server region** to match your Open Platform account:

- **Singapore (Asia-Pacific)** (`sg`)
- **Europe** (`eu`)
- **North America** (`na`)
- **China** (`cn`)

These regions correspond to the API endpoints used by the integration.

An existing entry keeps the server it was already using. If it was saved as **Europe** or **North America**, Home Assistant changes the saved **Server region** to the name of that server. If the name does not match your account, update **Server region** as described below.

### Updating credentials and server region

After setup, you can change the **App secret** and **Server region** without removing the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Imou** integration, then **Configure**.
3. Enter the updated **App secret** and choose the correct **Server region**.

Home Assistant validates the credentials against the Imou Open Platform before saving the changes.

If the platform rejects your App ID or App secret during normal operation, Home Assistant prompts you to **Reauthenticate** instead. Use that flow when only the App secret changed and you are fixing an authentication error.

## API usage

Imou Open Platform API usage limits apply to your App ID:

1. Each App ID includes 30,000 free API requests per month. Requests after that are rejected until you add quota, billed at the [published unit price](https://open.imoulife.com/price), or until the month resets.
2. API endpoints are split by region. Select the matching **Server region** during setup. For details, see the [development specification](https://open.imoulife.com/book/http/develop.html).
3. For additional API documentation, see the HTTP interface section in the [development documentation](https://open.imoulife.com/book/en).

## Supported functionality

### Camera

Each device channel with a camera feed exposes two camera entities:

- **Live view SD**: Standard-definition cloud live stream (enabled by default).
- **Live view HD**: High-definition cloud live stream (disabled by default; enable it in the entity settings if you need HD).

You can view a still image or start a live stream when the device is online.

### Buttons

The integration exposes button entities when the cloud API reports that the action is supported for a device:


- **PTZ up**, **PTZ down**, **PTZ left**, **PTZ right**: Move the camera lens in the corresponding direction. Each press moves the lens for a short interval. The device must support PTZ.
- **Mute**: Silence alarm audio on supported gateway devices.
- **Restart**: Remotely restart the device (shown with the restart device class when supported).

### Switches

When the cloud API reports that the toggle is supported for a device, the integration exposes switch entities.

Primary controls:

- **Abnormal sound alarm**: Toggle abnormal sound detection alarms.
- **Audio recording**: Toggle audio recording on supported cameras.
- **Human detection**: Toggle human detection on supported cameras.
- **Indicator light**: Toggle the device status indicator LED on supported models.
- **Motion detection**: Toggle motion detection on supported cameras.
- **Plug switch**: Control the main power relay on supported IoT socket devices.
- **Privacy mode**: Enable privacy mode that closes or disables the camera lens on supported models.
- **White light**: Manually toggle the camera white LED illuminator on supported models.

Device settings (**Configuration** category):

- **Alarm-linked siren**: Link the device siren to alarm events on supported models.
- **Alarm-linked white light**: Link the white light to alarm events on supported models.
- **Flip image**: Flip the camera image vertically on supported models.
- **Pet detection**: Toggle pet detection on supported cameras.
- **Prompt sound**: Toggle prompt sounds on supported models.
- **Smart tracking**: Toggle smart tracking on supported cameras.
- **Wide dynamic range**: Toggle wide dynamic range on supported cameras.

### Siren

On supported cameras and gateways, the integration exposes a **Siren** entity when the cloud API reports that the siren can be started or stopped.

- **Turn on** sounds the siren.
- **Turn off** stops the siren.

The cloud API doesn't report whether the siren is sounding. The state is **Unknown** until you turn the siren on or off. If the device supports both commands, the state then shows the last command you sent. This might not match the device, for example, when the siren stops by itself. Because Home Assistant can't read the real state, the dashboard shows separate on and off buttons instead of a toggle.

**Alarm-linked siren** is a separate switch. It only links the siren to alarm events.

### Alarm control panel

On supported gateways and hubs, the integration exposes an alarm control panel entity named after the device. In the UI, use **Arm home**, **Arm away**, and **Disarm** when the cloud API reports those actions for the device. The entity state shows armed home, armed away, or disarmed accordingly.

### Selects

When the cloud API reports that the option is supported for a device, the integration exposes the following select entities:

Device settings (**Configuration** category):

- **Night vision mode**: Choose the night vision mode on supported cameras.
- **Volume**: Choose mute, low, medium, or high volume on supported devices.

On supported PTZ cameras with saved presets:

- **Go to collection point**: Choose a preset to move the camera to that position. After the move, the select returns to its prompt option so you can pick another preset.

### Binary sensors

When the cloud API reports that a contact state is supported for a device, the integration exposes the following binary sensor entity:

- **Door**: Open or closed state of a door or window contact on supported devices.

### Sensors

When the cloud API reports that a measurement is supported for a device, the integration exposes sensor entities. Only supported sensor types are created for each device.

- **Battery**: Battery level as a percentage on supported battery-powered devices.
- **Temperature**: Current ambient temperature in degrees Celsius on supported models.
- **Humidity**: Current relative humidity as a percentage on supported models.
- **Power**, **Voltage**, **Current**: Real-time electrical measurements on supported IoT socket and power-monitoring devices.
- **Energy consumption**: Total energy used in kilowatt-hours on supported socket devices.
- **Usage duration**: Total operating time in minutes on supported socket devices.
- **Cycles today**: Number of switch cycles for the current day on supported socket devices.
- **Storage used**: Storage usage as a percentage. When the storage medium is unavailable or reports an abnormal condition, the entity state is `unknown`.
- **Status**: Device connectivity state (`online`, `offline`, `sleep`, or `upgrading`). This sensor remains available when the device is offline so you can still see its last reported state.

Battery, storage used, and status sensors are shown under **Diagnostic** on the device page. Other sensors appear under **Sensors**.

## Data updates

The integration {% term polling polls %} the Imou cloud every 2 minutes. Each poll refreshes the device list and the status of devices already on the account.

- A device you add in the Imou app or Open Platform is added on the next poll, including its entities.
- A device you remove from the account is removed from Home Assistant, including its entities.
- A command, such as a switch, button, select, siren, or alarm control panel action, is sent immediately. Measurements such as battery, power, and online status update on the next poll.

## Examples

{% include docs/paste_yaml_tip.md %}

Replace `notify.my_device` with your own notification entity, such as your phone.

### Automation: Notify when a camera goes offline

- **Trigger**: State
  - **Entity**: Living room Status
  - **To**: Disconnected
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)
  - **Message**: The living room camera is offline.

{% details "YAML example for an offline camera" %}

{% example %}
automation: |
  alias: "Notify when the living room camera is offline"
  triggers:
    - trigger: state
      entity_id: sensor.living_room_status
      to: "offline"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The living room camera is offline."
{% endexample %}

{% enddetails %}

### Automation: Notify when a door opens

- **Trigger**: State
  - **Entity**: Front door
  - **To**: Open
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)
  - **Message**: The front door opened.

{% details "YAML example for an open door" %}

{% example %}
automation: |
  alias: "Notify when the front door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The front door opened."
{% endexample %}

{% enddetails %}

## Security and privacy considerations

This integration communicates with Imou cloud services. Device control commands are sent through Imou servers. Review Imou's [privacy policy](https://open.imoulife.com/book/http/privacy.html) and terms of service before proceeding.

## Troubleshooting

### Invalid App ID or App secret

Verify that **App ID**, **App secret**, and **Server region** match your Imou Open Platform application and account region.

If you changed the **App secret**, Home Assistant may ask you to reauthenticate the Imou integration. Enter the new **App secret**; you do not need to remove the integration. You can also update the **App secret** and **Server region** at any time from **Configure** (see [Updating credentials and server region](#updating-credentials-and-server-region)).

### API quota is used quickly

The integration polls the platform every 2 minutes. For one device, each poll sends at least two requests: the device list and the device status. Over 30 days that is about 43,000 requests, which is more than the 30,000 free requests. More devices, and extra readings such as sensors, use more. When the quota is used up, the device list, live view, and controls cannot reach the cloud until you add quota or the month resets.

Open **My Resources** in the Open Platform console to check or add quota, then reload the Imou integration.

### A device does not appear

Confirm the device is on the same Open Platform account as the App ID, and that **Server region** matches that account. A device found only by MAC address on your network is not added automatically. After you add it in the Imou app, wait for the next poll (up to 2 minutes) or reload the integration.

### Live view does not start

Live view needs the device to be online and Home Assistant to reach the Imou cloud. **Live view HD** is disabled by default. Enable that entity if you expect the HD stream. If standard definition also fails, check the device in the Imou app and your monthly quota.

### A button is unavailable

Buttons are unavailable when a device is offline or no longer on your account. Ensure the device has power and network connectivity and appears online in the Imou app.

### A switch is unavailable

Switches are unavailable when a device is offline or no longer on your account. Ensure the device has power and network connectivity and appears online in the Imou app.

### A select is unavailable

Selects are unavailable when a device is offline or no longer on your account. Ensure the device has power and network connectivity and appears online in the Imou app.

### A binary sensor is unavailable

Binary sensors are unavailable when a device is offline or no longer on your account. Ensure the device has power and network connectivity and appears online in the Imou app.

### A sensor is unavailable

Most sensors are unavailable when a device is offline or no longer on your account. Ensure the device has power and network connectivity and appears online in the Imou app.

The **Status** sensor is an exception: it stays available when the device is offline and reports `offline` instead of becoming unavailable.

### A siren is unavailable

The siren is unavailable when the device is offline or no longer on your account. Ensure the device appears online in the Imou app.

### An alarm control panel is unavailable

The alarm control panel is unavailable when the device is offline or no longer on your account. Ensure the gateway or hub appears online in the Imou app.

## Known limitations

- The integration only talks to the Imou cloud. Live view and controls stop when Home Assistant cannot reach the cloud, even if the device is on your local network.
- Each App ID includes 30,000 free API requests per month. The 2-minute poll uses more than that for one device. After the quota is used up, cloud calls fail until you add quota or the month resets. See [API usage](#api-usage).
- Status such as online, battery, power, and door contact state can be up to 2 minutes old. The system does not detect a door that opens and closes again between polls.
- An entity is created only when the cloud API reports that the device supports it.
- **Live view HD** is disabled by default.
- The cloud API doesn't report whether the siren is sounding. Until you turn it on or off, the state is **Unknown**. If the device supports both commands, the state then shows the last command you sent, which might not match the device if the siren stops by itself. See [Siren](#siren).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
