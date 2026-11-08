---
description: Instructions on how to use iCloud to track devices in Home Assistant.
ha_release: '0.10'
ha_domain: icloud
---

The **Apple iCloud** {% term integration %} allows you to detect presence using the [iCloud](https://www.icloud.com/) service. iCloud allows users to track their location on iOS devices.

There is currently support for the following platforms within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Calendar](#calendar)
- [Device tracker](#device-tracker)
- [Sensor](#sensor)
- [To-do list](#to-do-list)

It does require that your devices are registered with the [Find My](https://www.apple.com/icloud/find-my/) service.

{% include integrations/config_flow.md %}

{% warning %}
You may receive recurring emails and notifications from Apple stating that someone has logged into your account if the integration is improperly configured. If this occurs, select `Don't Allow` on your iOS device and reconfigure the Integration Credentials when prompted.

For the notification, press "Allow", then "OK".
{% endwarning %}

To prevent excessive battery drainage, a dynamic interval is used for each individual device instead of a fixed interval for all devices linked to one account. The dynamic interval is based on the current zone of a device, the distance towards home and the battery level of the device.

## Two-factor authentication

Use your regular Apple Account password when setting up the integration. If Apple requires two-factor authentication, Home Assistant asks you to enter the six-digit verification code displayed on one of your trusted Apple devices or sent to your trusted phone number.

If you do not receive a verification code, select **Request a new verification code** in the verification step to ask Apple to send another code.

## In case of troubleshooting

Delete the integration's configuration (most likely in `/config/.storage/icloud`), then retry.

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Include completed reminders:
  description: Fetch completed reminders as well as unfinished ones. Defaults to `false`.
{% endconfiguration_basic %}

## Platforms

### Binary sensor

The iCloud integration adds the following binary sensors for each device on your Apple Account. Some binary sensors are only added if the device supports them.

- **Online**: Whether the device can currently be reached.
- **Lost mode**: Whether Lost Mode is turned on.
- **Low power mode**: Whether Low Power Mode is turned on.
- **Activation lock**: Whether Activation Lock is turned on.
- **Location services**: Whether location services are turned on.
- **Location current**: Shows **Problem** when Apple flags the last known location as outdated, and **OK** otherwise. Only added for devices that report a location.
- **Location accurate**: Shows **Problem** when Apple flags the last known location as inaccurate, and **OK** otherwise. Only added for devices that report a location.
- **Wipe in progress**: Whether an erase is currently running on the device.
- **Remote lock**: Whether Apple has accepted a remote lock that has not been applied to the device yet.
- **Locating**: Whether the device is being located right now. The integration asks Apple for a location on every update, so this entity is on most of the time and is [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

### Button

The iCloud integration adds a button for each device that can play a sound.

- **Play sound**: Plays the Lost device sound on the device, which is useful for finding a misplaced device. The device rings even when it is set to **Mute** or **Do not disturb**.

### Calendar

The iCloud integration adds a calendar entity for each of your iCloud calendars, showing the event in progress or the next one due. Calendars are read-only, so events cannot be created or edited from Home Assistant.

### Device tracker

The iCloud integration will track available devices on your iCloud account.

### Sensor

The iCloud integration adds the following sensors for each device on your Apple Account. Some sensors are only added if the device supports them.

- **Battery**: The battery level of the device.
- **Battery status**: Whether the battery is charging, full, or not charging.
- **Status**: The status Apple reports for the device, such as online, offline, or pending.
- **Owner**: The family member the device belongs to, or the owner of the Apple Account if you did not set up the integration with family sharing.
- **Last located**: When the device was last located.
- **Location type**: How the location was determined, such as GPS, Wi-Fi, or cellular.
- **Location accuracy**: How accurate the location is, in meters.
- **Altitude**: The altitude of the location, in meters.
- **Floor**: The floor level of the location, where Apple reports one.
- **Last locked**: When the device was last locked.
- **Last lost**: When the device was last put into Lost Mode.
- **Last wiped**: When the device was last erased.

The location sensors are only added for devices that report a location, and the lock, Lost Mode, and erase sensors only for devices that support those features. The **Floor**, **Last locked**, **Last lost**, and **Last wiped** entities are disabled by default.

### To-do list

The iCloud integration adds a to-do list entity for each of your Apple Reminders lists. You can add, edit, complete, and delete reminders, including their due date and notes. Changes sync back to your Apple devices. By default, only unfinished reminders are fetched. To also fetch completed reminders, enable **Include completed reminders** in the [configuration options](#configuration-options).

Reminder groups hold other lists rather than reminders, so they do not appear as to-do lists. Home Assistant to-do lists are flat, so subtasks appear as regular items rather than nested under a parent. They are listed directly below the reminder they belong to, the way you see them in Reminders on your Apple devices.

{% note %}
If you have [Advanced Data Protection](https://support.apple.com/en-us/102651) turned on, your reminders are end-to-end encrypted and Home Assistant cannot read them yet. Those reminders are left out of the to-do list, so a list can look shorter in Home Assistant than it does on your Apple devices.
{% endnote %}

{% include integrations/actions.md %}

## Media source

iCloud photo albums and shared streams are displayed in the media browser, "Media" > "iCloud". This will display a list of configured iCloud accounts, selecting the account will give a choice of "Albums" and "Shared Streams". Selection of these will give a list of available photo albums, and selecting these will display the current contents of the album.

## Diagnostics

The integration provides [diagnostics](/docs/configuration/troubleshooting/#download-diagnostics) to help with troubleshooting. There are two downloads:

- The integration download contains the account information and the data Apple reports for every device.
- Each device page has its own download, containing the data Apple reports for that device. For devices Apple no longer reports, the download falls back to the account information.

Your username and password, device and personal identifiers, location coordinates, family member names, and the Lost Mode contact number and message are redacted. The device name is kept so you can tell the downloads apart.
