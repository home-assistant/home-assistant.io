---
description: Instructions on how to integrate Fully Kiosk Browser with Home Assistant
ha_release: 2022.9
ha_domain: fully_kiosk
---

[Fully Kiosk Browser](https://www.fully-kiosk.com) is a powerful kiosk browser for Android devices. It provides several features for monitoring and controlling your Android device. This integration gives you access to control your device and view the status in Home Assistant.

## Requirements

This integration requires the Fully Remote Admin feature to be enabled in the Fully Kiosk Browser app. This feature requires the paid Fully Plus license. You can test it out for free, but Fully Kiosk Browser will display a watermark on your device.

You will need the IP address of your device, and the Fully Remote Admin password you set in the Fully Kiosk Browser app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your device.
Password:
  description: The Fully Remote Admin password from the Fully Kiosk Browser app.
Uses an SSL certificate:
  description: Whether Fully Kiosk Browser is configured to use an SSL certificate for connections.
Verify SSL certificate:
  description: Whether to verify the SSL certificate when connecting to Fully Kiosk Browser. This should be off for self-signed certificates.
{% endconfiguration_basic %}

## Capabilities

The following is available as sensors:

- Device plugged in
- Kiosk mode enabled/disabled
- Battery level
- Current page
- Current foreground app
- Device storage space available
- Device RAM available

The following controls are available:

- Bring Fully Kiosk to the foreground
- Send Fully Kiosk to the background
- Load the start URL
- Restart the Fully Kiosk Browser app
- Reboot your device (requires root)
- Maintenance mode on/off
- Lock/unlock kiosk mode
- Motion detection on/off
- Screensaver on/off
- Screensaver timer
- Screensaver brightness
- Screen on/off
- Screen off timer
- Screen brightness
- Play and stop media files
- Set device volume
- Clear Fully Kiosk Browser cache

The following is available as camera entity:

- Camera (the camera only works in Fully Kiosk if the **Motion detection** is set to **On**).

The following is available as image entity:

- Screenshot

The following notify entities that can be passed to `notify.send_message` action are available:

- Text-to-speech
- Overlay message

The following is available as update entity:

- App version (refer to [App updates](#app-updates))

{% note %}
The Fully Kiosk Browser app does not provide feedback on the device volume or media playback status, so we are unable to display the current volume level or playback status.
{% endnote %}

### App updates

Devices with a supported app and edition have an update {% term entity %} with the same name as the device.
It shows the version of the Fully app installed on the device and the latest version available from the Fully website.
When you install an update, the app downloads it from the Fully website, installs it, and restarts.
Until the new version is running, the entity shows which step the update is in: downloading, installing, waiting for someone to confirm the installation, or restarting.

What the update entity can do depends on the app and edition installed on your device:

- **Fully Kiosk Browser (APK)**: Install the latest version or a specific version.
- **Fully Kiosk Browser EMM**: Install the latest version or a specific version of the EMM edition.
- **Fully Single App Kiosk**: Install the latest version or a specific version.
- **Fully Video Kiosk**: Install the latest version or a specific version.
- **Google Play edition**: Informational only. You can't install updates from Home Assistant. The latest version shown is the one available as an APK file from the Fully website, which can differ from the version available on Google Play.

#### Installing a specific version

By default, the update entity installs the latest version. You can also install a specific version, or reinstall the version that is already installed.

1. Go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}.
2. Search for and select **Update: Install update**.
3. As the target, select the update entity of your device.
4. Enable **Version** and enter the version you want to install, for example, `1.61.3`.
   - For the EMM edition, you can enter the version with or without `-emm` at the end.
5. Select **Perform action**.

For more details, see the [**Install update**](/actions/update.install/) action.

#### Confirming the installation on the device

Android installs the update without asking only when Fully Kiosk Browser is the device owner, or when the device is rooted.
On other devices, someone has to confirm the installation on the device's screen.
Home Assistant warns you about this before the update starts, and the update shows **Waiting for user** while the device waits for the confirmation.

To get a notification when a device waits for someone to confirm an update, you can use an automation like this one.

{% details "YAML example for a notification when the update waits for a confirmation" %}

{% example %}
automation: |
  alias: "Send a notification when the tablet waits for an update confirmation"
  triggers:
    - trigger: state
      entity_id: update.wall_tablet
      attribute: install_phase
      to: waiting_for_user
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Update waiting"
        message: >
          Confirm the Fully Kiosk Browser update on the wall tablet's screen.
{% endexample %}

{% enddetails %}

{% include integrations/actions.md %}

## Data updates

The integration {% term polling polls %} each Fully Kiosk Browser device every 30 seconds.

For app updates, the integration also checks the update feed on the Fully website every 12 hours.
This check is shared between all your devices.
If the check fails, the integration tries again after 15 minutes and keeps the known versions. If no check has succeeded yet, the update entities are unavailable.

## Known limitations

The following limitations apply to app updates:

- You can only install versions that are listed in the Fully update feed. The feed covers downloads updated within the last 365 days.
- You can't switch to a different app or edition. For example, you can't replace the regular edition with the EMM edition.
- You can't install a version older than the installed one, because Android doesn't downgrade apps.
- If an installation fails on the device, or the new version is not running in time, the action shows an error. The update has 5 minutes, or 15 minutes when someone has to confirm the installation on the device.
- Devices on Android 5 or earlier don't have an update entity, because the current versions of the app don't support them.
- Apps other than the ones listed in [App updates](#app-updates), such as Fully Exam Kiosk, don't have an update entity.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
