---
description: Instructions on how to integrate your SFR Box broadband router into Home Assistant.
ha_release: 2023.2
ha_domain: sfr_box
---

The **SFR Box** {% term integration %} connects your **SFR** broadband router to Home Assistant over your local network. It shows the state of your internet connection, details about your DSL or fiber line, and the status of your phone line. You can restart the box from Home Assistant.

For example, you can get notified when your internet connection comes back after an outage, keep track of DSL line quality over time, or restart the box automatically when the connection stays down.

## Supported devices

The integration uses the local API of the box. This API is known to be available on the following models:

- NB4
- NB5
- NB6
- NB6V
- NB6VAC

## Unsupported devices

The following devices are not supported:

- NCC models: these models do not appear to provide the local API that the integration uses.

## Prerequisites

- Your SFR Box and Home Assistant must be on the same local network.
- To use the phone line entities and the restart button, you need the username and password of the box's web interface. The default username is `admin`. The default password is the Wi-Fi security key printed on the label of the box.

{% include integrations/config_flow.md %}

After you enter the host, Home Assistant asks whether you want to set credentials. Credentials are optional, but they enable the phone line entities and the restart button. Select **Set credentials (recommended)** to enter them, or **Skip authentication** to continue without them.

{% configuration_basic %}
Host:
  description: "The hostname, IP address, or full URL of your SFR Box. For example, `192.168.1.1` or `https://sfrbox.example.com`. The default is `192.168.0.1`."
Username:
  description: "Optional. The username for accessing your SFR Box's web interface. The default is `admin`."
Password:
  description: "Optional. The password for accessing your SFR Box's web interface. The default is the Wi-Fi security key found on the device label."
{% endconfiguration_basic %}

## Supported functionality

The **SFR Box** integration provides the following entities.

Some entities depend on the type of internet line, which the integration detects when it starts:

- DSL entities are only available when the box uses a DSL line.
- The **FTTH status** entity is only available when the box uses a fiber line.
- Phone line (VoIP) entities and the **Restart** button are only available when you set credentials.

### Binary sensors

- **DSL status**
  - **Description**: Whether the DSL line is connected
  - **Remarks**: Only available on DSL lines
- **FTTH status**
  - **Description**: Whether the fiber line is connected
  - **Remarks**: Only available on fiber lines
- **VoIP call history active**
  - **Description**: Whether the call history is turned on in the box
  - **Remarks**: Requires credentials
- **VoIP phone hook status**
  - **Description**: Whether the phone connected to the box is **On-hook** or **Off-hook**
  - **Remarks**: Requires credentials
- **VoIP status**
  - **Description**: Whether the phone line is connected
  - **Remarks**: Requires credentials
- **WAN status**
  - **Description**: Whether the box is connected to the internet

### Buttons

- **Restart**
  - **Description**: Restarts the SFR Box
  - **Remarks**: Requires credentials

### Sensors

- **DSL attenuation down** and **DSL attenuation up**
  - **Description**: Signal attenuation of the DSL line, in dB, for download and upload
  - **Remarks**: Only available on DSL lines. These entities are [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity)
- **DSL connect count**
  - **Description**: Number of DSL connection attempts
  - **Remarks**: Only available on DSL lines. This entity is disabled by default
- **DSL CRC error count**
  - **Description**: Number of transmission errors on the DSL line
  - **Remarks**: Only available on DSL lines. This entity is disabled by default
- **DSL line mode**
  - **Description**: The DSL standard used by the line
  - **Remarks**: Only available on DSL lines. This entity is disabled by default
- **DSL line status**
  - **Description**: Current state of the DSL line: **No defect**, **Loss of frame**, **Loss of signal**, **Loss of power**, or **Loss of signal quality**
  - **Remarks**: Only available on DSL lines. This entity is disabled by default
- **DSL noise down** and **DSL noise up**
  - **Description**: Noise margin of the DSL line, in dB, for download and upload
  - **Remarks**: Only available on DSL lines. These entities are disabled by default
- **DSL rate down** and **DSL rate up**
  - **Description**: Synchronization speed of the DSL line, in kbit/s, for download and upload
  - **Remarks**: Only available on DSL lines
- **DSL training**
  - **Description**: Current step of the DSL line synchronization, such as **Idle** or **Showtime** when the line is synchronized
  - **Remarks**: Only available on DSL lines. This entity is disabled by default
- **Network infrastructure**
  - **Description**: Type of internet line used by the box: **ADSL**, **FTTH**, or **GPRS**
  - **Remarks**: This entity is disabled by default
- **Temperature**
  - **Description**: Internal temperature of the box
  - **Remarks**: This entity is disabled by default
- **Voltage**
  - **Description**: Power supply voltage of the box, in mV
  - **Remarks**: This entity is disabled by default
- **VoIP infrastructure**
  - **Description**: Type of line used for the phone service: **ADSL**, **FTTH**, or **GPRS**
  - **Remarks**: Requires credentials. This entity is disabled by default
- **WAN mode**
  - **Description**: How the box connects to the internet, such as **ADSL (PPP)** or **FTTH (Routed)**
  - **Remarks**: This entity is disabled by default

## SFR Box automation examples

The **WAN status** binary sensor and the **Restart** button let you react when your internet connection drops.
Here are some ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified when the internet connection comes back

While your internet connection is down, notifications to your phone cannot be delivered. This automation sends a notification as soon as the connection is back, so you know there was an outage. Replace the entity IDs in the example with the entity IDs of your box and your phone.

- **Trigger**: State changed
  - **Target**: Your box's **WAN status** binary sensor
  - **From**: Off
  - **To**: On
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when the internet connection comes back" %}

{% example %}
automation: |
  alias: "Notify when the internet connection comes back"
  triggers:
    - trigger: state
      entity_id: binary_sensor.sfr_box_wan_status
      from: "off"
      to: "on"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The internet connection is back after an outage."
{% endexample %}

{% enddetails %}

### Automation: Restart the box when the internet connection stays down

Restarting the box often fixes a connection that does not recover on its own. This automation presses the **Restart** button when the connection has been down for 15 minutes. The **Restart** button is only available when you set credentials. If the outage is on SFR's side, the box restarts every 15 minutes until the connection is back. Replace the entity IDs in the example with the entity IDs of your box.

- **Trigger**: State changed
  - **Target**: Your box's **WAN status** binary sensor
  - **To**: Off
  - **For at least**: `00:15:00`
- **Action**: Press button
  - **Target**: Your box's **Restart** button

{% details "YAML example for restarting the box when the connection stays down" %}

{% example %}
automation: |
  alias: "Restart the SFR Box when the internet connection stays down"
  triggers:
    - trigger: state
      entity_id: binary_sensor.sfr_box_wan_status
      to: "off"
      for:
        minutes: 15
  actions:
    - action: button.press
      target:
        entity_id: button.sfr_box_restart
{% endexample %}

{% enddetails %}

## Data updates

The **SFR Box** integration {% term polling polls %} data from the box every minute.

## Known limitations

- The integration only works on your local network. It cannot connect to the box through SFR's online services.
- Home Assistant does not discover the box automatically. You need to enter its host during setup.
- The integration detects the type of internet line when it starts. If your line changes, for example from DSL to fiber, reload the integration to get the matching entities.
- Boxes that report another type of line, such as FTTB, do not get DSL or fiber entities.
- The integration does not provide Wi-Fi settings or the list of connected devices.

## Troubleshooting

{% details "Home Assistant cannot connect to the box" %}

### Symptom: Setup fails with a connection error

When you set up the integration, you get an error that Home Assistant cannot connect to the box.

#### Description

Home Assistant cannot reach the local API of the box with the host you entered.

#### Resolution

1. Check that the box is turned on and that Home Assistant is on the same local network.
2. Check that you can open the box's web interface from a browser on your network, using the same host.
3. If you use a full URL, check that it starts with `http://` or `https://`.
4. Check that your model is listed under [Supported devices](#supported-devices).

{% enddetails %}

{% details "Home Assistant reports that the credentials are invalid" %}

### Symptom: Home Assistant asks you to enter the credentials again

You see one of the following:

- During setup, you get an invalid authentication error.
- After setup, **SFR Box** appears under **Attention required** in **Settings** > **Devices & services**.
- When you press the **Restart** button, Home Assistant shows **The provided credentials are invalid.**

#### Description

The box doesn't accept the username and password that Home Assistant uses. This usually happens after you change the password in the box's web interface. Home Assistant notices this during setup, during data updates, and when you press the **Restart** button. It then asks you to enter the credentials again.

#### Resolution

1. Check that you can sign in to the box's web interface with the same username and password.
2. If you have never changed them, use `admin` as the username and the Wi-Fi security key from the label of the box as the password.
3. In the box's web interface, check that signing in with a password is allowed.
4. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
5. Under **Attention required**, select **Reconfigure** on the **SFR Box** card, and enter the new credentials.
   - If **SFR Box** is not listed there, select **SFR Box**, then the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reconfigure**. Confirm the host, select **Set credentials (recommended)**, and enter the new credentials.

{% enddetails %}

{% details "Some entities are missing" %}

### Symptom: You cannot find some of the entities listed on this page

Some entities listed under [Supported functionality](#supported-functionality) do not appear in Home Assistant.

#### Description

Many sensors are disabled by default. Other entities only exist for some line types, or only when you set credentials.

#### Resolution

1. To turn on a disabled entity, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **SFR Box**, then select the entity and turn on **Enabled** in its settings.
2. For the phone line entities and the **Restart** button, add credentials. Select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, select **Reconfigure**, confirm the host, and then select **Set credentials (recommended)**.
3. If your line type changed, reload the integration from the three dots {% icon "mdi:dots-vertical" %} menu.

{% enddetails %}

{% details "The IP address of the box changed" %}

### Symptom: All entities become unavailable

All entities of the box become unavailable, but you can still open the box's web interface at a new address.

#### Description

The integration connects to the host you entered during setup. If the address of the box changes, Home Assistant can no longer reach it.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **SFR Box**.
3. Select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reconfigure**.
4. Enter the new host and follow the steps.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
