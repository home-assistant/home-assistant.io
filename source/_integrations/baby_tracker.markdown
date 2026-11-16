---
title: Baby Tracker (Nighp)
description: Instructions on how to integrate your Nighp Baby Tracker account into Home Assistant.
ha_categories:
  - health_wellbeing
ha_release: 2026.12
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@wtadler'
ha_config_flow: true
ha_domain: baby_tracker
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Baby Tracker (Nighp)** {% term integration %} connects your account for the Baby Tracker app by Nighp to Home Assistant. It shows each baby's last diaper, feed, and sleep as sensors, so you can see them on a dashboard or use them in automations. For example, you can send yourself a message when a baby hasn't had a feed in four hours.

This integration is not made or supported by Nighp, the maker of Baby Tracker. For help, open an issue in the Home Assistant Core repository; please don't contact Nighp.

## Supported devices

The integration doesn't use any hardware. It works with a Baby Tracker account, and every baby in the account when you set up the integration becomes a {% term device %} in Home Assistant. Records logged on any phone signed in to the account show up in Home Assistant after the next update.

## Prerequisites

- A Baby Tracker account with the email address and password you use to sign in to the app.
- At least one baby added to the account in the app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "The email address of your Baby Tracker account."
Password:
    description: "The password of your Baby Tracker account."
{% endconfiguration_basic %}

Home Assistant checks the email and password before it saves anything. The first time you set up the integration, Home Assistant loads your account's full history in one go, which can take a moment. Each Baby Tracker account can be added once.

Home Assistant signs in as its own device, named **Home Assistant**. It never borrows the identity of a phone.

## Supported functionality

The **Baby Tracker (Nighp)** integration creates one device for each baby in your account. The device has the baby's name, and **Baby** when the baby has no name in the app. Nighp is the manufacturer, and the model is **Baby Tracker**.

### Sensors

Each baby has three sensors. Their state is the time of the baby's newest record of that kind, so a dashboard card can show "23 minutes ago" instead of a clock time. The state is unknown when the baby has no record of that kind.

- **Last diaper**
  - **Description**: When the baby's newest diaper was logged.
- **Last feed**
  - **Description**: When the baby's newest feed was logged. The newest of the nursing, formula, and pumped milk records counts as the last feed.
- **Last sleep**
  - **Description**: When the baby's newest sleep was logged.

## Use cases

- A wall dashboard of last activity. Put **Last diaper**, **Last feed**, and **Last sleep** on one card. The sensors are timestamps, so the card can show how long ago each happened, for example "23 minutes ago".
- A reminder when a feed is overdue. Send a message when **Last feed** hasn't changed for a set time. See the first example below.
- A message when a diaper is logged on another phone, so whoever is away knows without asking. See the second example below.

## Baby Tracker (Nighp) automation examples

These examples use a baby named Homer, so the sensors are `sensor.homer_last_feed` and `sensor.homer_last_diaper`. The entity IDs in your Home Assistant follow your baby's name.

{% include docs/paste_yaml_tip.md %}

### Automation: Send a message when a baby hasn't had a feed in four hours

**Last feed** is the time of the newest feed. A time trigger can run four hours after it: a new feed before then moves the reminder later, and a feed logged after the fact counts from when it happened. While the sensor is unknown or unavailable, the trigger waits.

- **Trigger**: Time
  - **Mode**: Value of a date/time helper or timestamp-class sensor
  - **Entity with timestamp**: Homer Last feed
  - **Offset**: 04:00:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for sending a message after four hours without a feed" %}

{% example %}
automation: |
  alias: "Homer has not had a feed in four hours"
  triggers:
    - trigger: time
      at:
        entity_id: sensor.homer_last_feed
        offset: "04:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Homer has not had a feed in four hours."
{% endexample %}

{% enddetails %}

### Automation: Send a message when a new diaper is logged

The state of **Last diaper** changes each time a new diaper appears, whether it was logged on a phone or somewhere else. This example sends a message when that happens, and ignores the sensor becoming unknown or unavailable.

- **Trigger**: State of an entity
  - **Entity**: Homer Last diaper
  - **From**: Is not Unknown, Unavailable
  - **To**: Is not Unknown, Unavailable
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for sending a message about a new diaper" %}

{% example %}
automation: |
  alias: "Homer has a new diaper"
  triggers:
    - trigger: state
      entity_id: sensor.homer_last_diaper
      not_from:
        - "unknown"
        - "unavailable"
      not_to:
        - "unknown"
        - "unavailable"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "A new diaper was logged for Homer."
{% endexample %}

{% enddetails %}

## Data updates

The **Baby Tracker (Nighp)** integration {% term polling polls %} the Baby Tracker service every 5 minutes. The interval is fixed. Records logged on a phone show up in Home Assistant after the next update.

The first update loads your account's full history. Home Assistant saves what it has seen, so after a restart it fetches only what's new.

To check for new records sooner, use the `homeassistant.update_entity` action on any Baby Tracker sensor, for example in an automation or a script.

## Known limitations

- The integration only reads your account. It can't log diapers, feeds, or sleep. Use the Baby Tracker app for that.
- Records arrive on a schedule, not instantly. See [Data updates](#data-updates).
- Nighp doesn't offer a public API. The integration uses the same sync service as the app, which Nighp can change without notice. A change may stop the integration until it's updated.
- Babies added to the account after you set up the integration appear after you reload the integration or restart Home Assistant.
- Each sensor shows only the newest record of its kind. The integration doesn't provide a history of every record.

## Troubleshooting

{% details "Can't set up the integration" %}

### Symptom: "The email or password is wrong."

When you set up the integration, the form shows the message "The email or password is wrong."

#### Description

Baby Tracker didn't accept the email address and password.

#### Resolution

1. Check that you can sign in to the Baby Tracker app with the same email address and password.
2. Enter them again in Home Assistant.

### Symptom: "Couldn't reach the Baby Tracker service. Check your connection and try again."

When you set up the integration, the form shows this message.

#### Description

Home Assistant couldn't connect to the Baby Tracker service.

#### Resolution

1. Check that your Home Assistant instance is connected to the internet.
2. Wait a few minutes and try again. The service may be down for a short time.

{% enddetails %}

{% details "Sensors are unavailable after you change your password" %}

### Symptom: Sensors are unavailable after you change your password

The sensors show **Unavailable**, or after a restart the integration card shows that setup failed. The log says the service rejected the sign-in.

#### Description

Baby Tracker rejected the saved password, usually because it was changed in the app. The integration keeps the password you entered during setup and can't ask for a new one.

#### Resolution

1. Go to **Settings** > **Devices & services** and select the **Baby Tracker (Nighp)** card.
2. Remove the integration. Next to your account, select the three dots {% icon "mdi:dots-vertical" %} menu, and then select **Delete**. Confirm the deletion.
3. Add **Baby Tracker (Nighp)** again with your email address and your current password.

Adding the integration again loads your account's history again.

{% enddetails %}

{% details "Sensors are unavailable or show old values" %}

### Symptom: Sensors are unavailable

The sensors show **Unavailable**.

#### Description

Home Assistant couldn't update from the Baby Tracker service, so the sensors are unavailable until an update works again.

#### Resolution

1. Check that your Home Assistant instance is connected to the internet.
2. Look in the Home Assistant log for the error. It names the reason the update failed.
3. If the error continues, report it in the [Home Assistant Core issue tracker](https://github.com/home-assistant/core/issues).

### Symptom: A sensor doesn't show a record you just logged

#### Description

Records logged on a phone arrive at the next update, within 5 minutes.

#### Resolution

Use the `homeassistant.update_entity` action on any Baby Tracker sensor to update right away.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. Deleting the integration also deletes the saved sync state.

{% include integrations/remove_device_service.md %}
