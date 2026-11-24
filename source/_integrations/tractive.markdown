---
description: Instructions on how to integrate Tractive within Home Assistant.
ha_release: 2021.9
ha_domain: tractive
---

[Tractive](https://tractive.com/en/) is an Austrian company that develops real-time location trackers for pets and other animals using GPS and GSM technology.

The **Tractive** {% term integration %} brings the location of your pets and the status of their Tractive trackers into Home Assistant. You can see where your pet is on a map and follow your pet's activity and sleep on your dashboards.

Use cases: Get a notification when your dog leaves home and turn on live tracking to find it faster. Get reminded to charge the tracker before the battery runs out. Make the tracker beep or light up to find your cat in the dark. If your tracker provides health data, keep an eye on whether your pet reaches its daily activity goal.

## Supported devices

The integration supports all Tractive GPS trackers that are assigned to a pet in your Tractive account.

## Unsupported devices

The following trackers are not supported by the integration:

- Trackers that are shared with you from another Tractive account. For details, refer to [Known limitations](#known-limitations).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address of your Tractive account.
Password:
  description: The password of your Tractive account.
{% endconfiguration_basic %}

## Supported functionality

The **Tractive** integration provides the following entities for each pet registered in your Tractive account. The integration creates two devices per pet: a tracker device named **Tracker** followed by the tracker ID, which holds the entities related to the tracker hardware, and a device named after your pet, which holds the activity, rest, sleep, and weight sensors.

### Binary sensors

- **Charging**
  - **Description**: Whether the tracker is charging.
  - **Remarks**: Only created for trackers that report their charging state.
- **Power saving**
  - **Description**: Whether the tracker is in a power saving zone.

### Device trackers

- **Tracker**
  - **Description**: The current location of your pet, as reported by the tracker. The entity uses the name of the tracker device.
  - **Remarks**: When the location comes from a phone with the Tractive app nearby, the source type of the entity is Bluetooth instead of GPS.

### Sensors

- **Activity time**
  - **Description**: Time your pet has been active today.
- **Battery**
  - **Description**: Battery level of the tracker.
- **Daily goal**
  - **Description**: Daily activity goal set for your pet in the Tractive app.
- **Day sleep**
  - **Description**: Time your pet has slept during the day.
- **Night sleep**
  - **Description**: Time your pet has slept during the night.
- **Rest time**
  - **Description**: Time your pet has been resting today.
- **Status**
  - **Description**: Current status of the tracker.
  - **Options**: Inaccurate position, Not reporting, Operational, System shutdown user, System startup
- **Weight**
  - **Description**: Weight of your pet, as stored in your pet's profile in the Tractive app.
  - **Remarks**: The entity state is `unknown` if no weight is set for your pet. Home Assistant checks for weight changes every 30 minutes.

{% note %}
The **Activity time**, **Daily goal**, **Day sleep**, **Night sleep**, and **Rest time** sensors are only created for pets whose tracker provides health data. Trackers without health features and trackers with an inactive subscription do not provide this data.
{% endnote %}

### Switches

- **Buzzer**
  - **Description**: Turns the buzzer of the tracker on or off, for example to help you find your pet.
- **LED**
  - **Description**: Turns the LED light of the tracker on or off.
- **Live tracking**
  - **Description**: Turns live tracking on or off. With live tracking on, the tracker reports its location more often.

{% note %}
The switches are unavailable while the tracker is in a power saving zone.
{% endnote %}

## Tractive automation examples

The following examples show how to use your Tractive tracker in Home Assistant automations. They are starting points, and you can adapt them to create your own automations.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when your pet leaves home

This automation sends a notification to your mobile device when your pet leaves your home zone and turns on live tracking, so the tracker reports its location more often while you look for your pet. If you set up a power saving zone at home in the Tractive app, the **Live tracking** switch is unavailable until the tracker leaves that zone. Replace the entity IDs in the example with the entity IDs of your own Tractive tracker and mobile device.

- **Trigger**: Zone left
  - **Target**: Tracker ABCD1234 (`device_tracker.tracker_abcd1234`)
  - **Zone**: Home (`zone.home`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: `Your pet has left home. Live tracking is now on.`
- **Action**: Turn on switch
  - **Target**: Tracker ABCD1234 Live tracking (`switch.tracker_abcd1234_live_tracking`)

{% details "YAML example for notifying when your pet leaves home" %}

{% example %}
automation: |
  alias: "Notify when the pet leaves home"
  triggers:
    - trigger: zone.left
      target:
        entity_id: device_tracker.tracker_abcd1234
      options:
        zone: zone.home
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Your pet has left home. Live tracking is now on."
    - action: switch.turn_on
      target:
        entity_id: switch.tracker_abcd1234_live_tracking
{% endexample %}

{% enddetails %}

### Automation: Remind you to charge the tracker

This automation sends a notification to your mobile device when the battery level of the tracker drops below 20%, so you can charge it before it runs out. Replace the entity IDs in the example with the entity IDs of your own Tractive tracker and mobile device.

- **Trigger**: Battery level crossed threshold
  - **Target**: Tracker ABCD1234 Battery (`sensor.tracker_abcd1234_battery`)
  - **Threshold type**: Below 20%
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: A message with the current battery level

{% details "YAML example for reminding you to charge the tracker" %}

{% example %}
automation: |
  alias: "Remind me to charge the pet tracker"
  triggers:
    - trigger: battery.level_crossed_threshold
      target:
        entity_id: sensor.tracker_abcd1234_battery
      options:
        threshold:
          type: below
          value:
            number: 20
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The pet tracker battery is at
          {{ states('sensor.tracker_abcd1234_battery') }}%.
          Time to charge it.
{% endexample %}

{% enddetails %}

## Data updates

The **Tractive** integration receives push updates from the Tractive API. When the integration starts, it fetches the current state of your trackers and pets once. After that, the Tractive API sends state changes, such as a new location, battery level, or activity data, to Home Assistant as they happen, so the entities update in near real time without {% term polling %}. The only exception is the **Weight** sensor: the integration reads the weight from your pet's profile every 30 minutes.

## Known limitations

- The integration requires a Tractive Premium subscription.
- Your Tractive account must allow signing in with an email address and password. Accounts that can only sign in with a Google or Apple account are not supported.
- Trackers (pets) that are shared from another account to your account are not visible in Home Assistant. You need to set up each Tractive account that owns a tracker (pet) as a separate integration entry.

## Troubleshooting

{% details "Can't sign in during setup" %}

### Symptom: "Invalid authentication"

When you try to set up the integration, the form shows the message "Invalid authentication".

#### Description

The Tractive API did not accept the email address and password you entered.

#### Resolution

1. Go to the [Tractive web app](https://my.tractive.com/) and check that you can sign in with the same email address and password.
2. If you usually sign in with a Google or Apple account, make sure your Tractive account also has a password. The integration only supports signing in with an email address and password.
3. Set up the integration again with the email address and password that work in the Tractive web app.

{% enddetails %}

{% details "Setup fails with too many requests" %}

### Symptom: "Too many requests. Please try again later."

When you try to set up the integration, reconfigure it, or sign in again, the form shows the message "Too many requests. Please try again later."

#### Description

The Tractive API limits how many requests it accepts in a short time. When that limit is reached, it rejects new sign-in attempts for a while.

#### Resolution

Wait a few minutes, then try again.

{% enddetails %}

{% details "A pet or tracker is missing" %}

### Symptom: A pet or tracker from the Tractive app doesn't show up in Home Assistant

You see a pet or tracker in the Tractive app, but Home Assistant has no device or entities for it.

#### Description

The integration only adds trackers that are assigned to a pet in the Tractive account you used to set up the integration. Pets without a tracker, and trackers that another account shares with you, are skipped. The integration looks for pets and trackers when it starts, so a tracker you assign later only shows up after the integration is reloaded.

#### Resolution

1. In the Tractive app, make sure the tracker is assigned to a pet.
2. If the tracker is shared with you from another account, add the integration again with the Tractive account that owns the tracker. Each account gets its own entry.
3. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Tractive**. Next to the entry, select the three-dot {% icon "mdi:dots-vertical" %} menu, then select **Reload**.

{% enddetails %}

{% details "Activity and sleep sensors are missing" %}

### Symptom: The Activity time, Daily goal, Day sleep, Night sleep, and Rest time sensors are missing

Your pet's device in Home Assistant has the **Weight** sensor, but no activity, rest, or sleep sensors.

#### Description

The integration only creates these sensors when the tracker provides health data. This depends on the tracker model and on your subscription. The integration checks for health data when it starts, so sensors for health data that becomes available later, for example after you upgrade your subscription, only show up after the integration is reloaded.

#### Resolution

1. In the Tractive app, check that you can see activity and sleep data for your pet. If the app doesn't show this data, your tracker or subscription doesn't provide it.
2. If the app shows the data, go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Tractive**. Next to the entry, select the three-dot {% icon "mdi:dots-vertical" %} menu, then select **Reload**.

{% enddetails %}

{% details "The switches are unavailable" %}

### Symptom: The Buzzer, LED, and Live tracking switches show as unavailable

The other entities of the tracker work, but the switches show as unavailable.

#### Description

The tracker is in a power saving zone. The switches are unavailable while the tracker reports that it is in a power saving zone.

#### Resolution

Wait until the tracker leaves the power saving zone. The switches become available again automatically. To check whether the tracker is in a power saving zone, enable the **Power saving** binary sensor of the tracker, which is disabled by default.

{% enddetails %}

{% details "Home Assistant asks you to sign in again" %}

### Symptom: Home Assistant asks you to re-authenticate the Tractive integration

The Tractive entities stop updating, and Home Assistant shows that the Tractive integration needs your attention.

#### Description

The Tractive API no longer accepts the saved credentials, for example because you changed your Tractive password.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. On the Tractive entry, follow the prompt to re-authenticate and enter your current Tractive email address and password.

If Home Assistant shows the message "The login details correspond to a different account", you entered the credentials of another Tractive account. Start again, and enter the credentials of the account you used to set up this integration entry. To add another account, add the integration again instead.

To update the credentials before Home Assistant asks for them, select the three-dot {% icon "mdi:dots-vertical" %} menu next to the Tractive entry, then select **Reconfigure**.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
