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
ha_category: []
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

## Actions

The integration provides the following actions.

### Action: Add bonus time

The `nintendo_parental_controls.add_bonus_time` action adds additional bonus screen time to a specified device, which is granted outside of the maximum allowed screentime.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the config entry containing the device to grant bonus time.
  - **Optional**: No
- **Data attribute**: `device_id`
  - **Description**: The ID of the device to grant bonus time.
  - **Optional**: No
- **Data attribute**: `bonus_time`
  - **Description**: The amount of time in minutes to grant (minimum of 5, maximum of 30).
  - **Optional**: No

## Known limitations

The integration currently does not provide all the functionality found in the mobile app. Future updates will see this extended.

Further, this integration relies on the cloud and cannot make a local connection to your Switch.

The range used for bonus time is set by Nintendo and therefore cannot be changed.

## Troubleshooting

### Data is not updating in Home Assistant

Make sure the Switch has access to the internet, without this, usage data is not being sent to Nintendo.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
