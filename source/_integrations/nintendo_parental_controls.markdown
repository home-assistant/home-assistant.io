---
title: Nintendo Switch parental controls
description: The Nintendo Switch Parental Controls integration allows you to monitor and control screentime for children via the Nintendo Switch Parental Controls service.
ha_release: 2025.11
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@pantherale0'
ha_domain: nintendo_parental_controls
ha_integration_type: service
ha_platforms:
  - number
  - select
  - sensor
  - switch
  - time
ha_category:
  - Gaming
ha_quality_scale: bronze
ha_config_flow: true
---

The **Nintendo Switch Parental Controls** {% term integration %} integrates with the Nintendo Switch Parental Controls service, allowing parents to monitor and control screentime for their children.

## Supported devices

Devices supported by the Nintendo Switch Parental Controls mobile app are supported by this integration.

## Prerequisites

To use the Nintendo Switch Parental Controls integration, you must access your Nintendo account's authentication tokens. This process must be performed on a device **without** the official Nintendo Switch Parental Controls mobile app installed. The integration needs to intercept the authentication flow, which the app typically handles automatically.

You will need:
- Your Nintendo account credentials.
- A computer or mobile device without the official app installed.

## Configuration

 1. In the Home Assistant UI, go to {% my integrations title="**Settings** > **Devices & services**" %}.

 2. Select **Add integration** and search for **Nintendo Switch Parental Controls**.

 3. You will be prompted to provide an **Access token**. Select the link provided in the dialog description. This link is unique to your setup session.

 4. A new browser tab will open. Log in to your Nintendo account using your credentials.

 5. After successful login, you will see a **Linking an External Account** screen. For the Nintendo account you wish to link, right-click the red button **Select this person** and choose **Copy Link** (or **Copy Link Address** / **Copy URL** depending on your browser).

    - **Important**: Do not select the button directly, as this can redirect you and prevent you from getting the necessary token.

    - The copied link should have a format similar to `npf54789befxxxxxxxx://auth#session_token_code={redacted}&state={redacted}&session_state={redacted}`.

 6. Close the Nintendo Account browser tab.

 7. Paste the entire copied link (the full string) into the **Access Token** field in the Home Assistant configuration dialog.

 8. Select **Submit**.

 9. The configuration flow should then present additional options.

10. Select **Submit** to finalize the setup.

## Supported functionality

### Entities

The **Nintendo Switch Parental Controls** integration provides the following entities.

#### Number

- **Max screentime today**
  - **Description**: Maximum amount of screentime to allow today, for unlimited screentime, set to `-1`. By setting this to `0` and turning the **Suspend software** switch on, you can 'lock' your Nintendo Switch.

#### Select
- **Restriction mode**
  - **Description**: Controls whether the same screen time limits are applied every day or if each day of the week has its own separate limit.

#### Sensors

- **Used screen time**
  - **Description**: The current used screen time for a given device.
  - **Unit of measurement**: `minutes`
  - **Device class**: `duration`
- **Time remaining**
  - **Description**: The amount total amount of time remaining for a device.
  - **Unit of measurement**: `minutes`
  - **Device class**: `duration`

#### Switch
- **Suspend software**
  - **Description**: Enable to automatically suspend running software when the Bedtime alarm is reached or the maximum screen time is exceeded. Turn off to allow software to continue running past these limits. 

#### Time

- **Bedtime alarm**
  - **Description**: A set bedtime for a given device, at this time, the Switch can either "lock" or show an alert in the top left corner.
- **Bedtime end time**
  - **Description**: The time that bedtime should end. Set to 00:00 to disable. Accepts values between 05:00 and 09:00 for the bedtime end time.

{% include integrations/actions.md %}

### Action: Update pin code

The `nintendo_parental_controls.update_pin_code` action allows you to change the parental controls override PIN of a specified device. When entering this PIN on the Switch, all parental control restrictions can be bypassed.

- **Data attribute**: `device_id`
  - **Description**: The ID of the device to change the PIN on.
  - **Optional**: No
- **Data attribute**: `pin`
  - **Description**: The new PIN is to be set between 1000 and 99999999.
  - **Optional**: No

### Action: Retrieve player usage report

The `nintendo_parental_controls.player_usage_report` action allows you to retrieve details regarding what Nintendo applications an individual player has used on a specified device.

- **Data attribute**: `device_id`
  - **Description**: The ID of the device to retrieve a report for.
  - **Optional**: No
- **Data attribute**: `player`
  - **Description**: The used screen time sensor for the player to retrieve a report for.
  - **Optional**: No

### Action: Retrieve device usage report

The `nintendo_parental_controls.device_usage_report` action allows you to retrieve details regarding what Nintendo applications have been used on a specified device.

- **Data attribute**: `device_id`
  - **Description**: The ID of the device to retrieve a report for.
  - **Optional**: No

### Action: Update daily restrictions

The `nintendo_parental_controls.update_daily_restrictions` action allows you to update playtime and bedtime restrictions for a specific day of the week on a specified device.

{% note %}
Daily restrictions can only be updated when the device's restriction mode is set to **Different for each day**.
{% endnote %}

{% important %}
Calling this action overwrites the existing daily configuration for the specified day:
- Any omitted restriction setting (`max_play_time`, or `bedtime_start`/`bedtime_end`) will be disabled for that day. For example, to adjust `max_play_time` while retaining an existing bedtime schedule, you must supply both `bedtime_start` and `bedtime_end` in the same call.
- To disable all restrictions for a specific day, provide only the `device_id` and `day_of_week`.
{% endimportant %}

- **Data attribute**: `device_id`
  - **Description**: The ID of the device to update daily restrictions for.
  - **Optional**: No
- **Data attribute**: `day_of_week`
  - **Description**: The day of the week to update restrictions for (`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, or `sunday`).
  - **Optional**: No
- **Data attribute**: `max_play_time`
  - **Description**: The maximum playtime allowed in minutes for this day (between 0 and 360). Omit to disable playtime limits for this day.
  - **Optional**: Yes
- **Data attribute**: `bedtime_start`
  - **Description**: The time when bedtime restrictions start (must be between 16:00 and 23:00, or 00:00). Both `bedtime_start` and `bedtime_end` must be provided to enable bedtime restrictions.
  - **Optional**: Yes
- **Data attribute**: `bedtime_end`
  - **Description**: The time from which play is allowed (must be between 05:00 and 09:00). Both `bedtime_start` and `bedtime_end` must be provided to enable bedtime restrictions.
  - **Optional**: Yes

## Known limitations

- The integration currently does not provide all the functionality found in the mobile app. Future updates will see this extended.
- A cloud connection is required as it is not possible to make a local connection to your Switch.
- The range used for bonus time is set by Nintendo and therefore cannot be changed.
- When changing the PIN, Nintendo will send you an email automatically. This cannot be disabled in the integration. The email does not contain the PIN itself.

## Troubleshooting

### Data is not updating in Home Assistant

Make sure the Switch has access to the internet, without this, usage data is not being sent to Nintendo.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
