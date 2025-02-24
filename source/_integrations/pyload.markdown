---
title: pyLoad
description: Instructions on how to integrate pyLoad download manager with Home Assistant.
ha_category:
  - Downloading
ha_release: 0.58
ha_iot_class: Local Polling
ha_domain: pyload
ha_codeowners:
  - '@tr4nt0r'
ha_platforms:
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: service
ha_config_flow: true
---

The [**pyLoad**](https://pyload.net/) {% term integration %} enables monitoring your downloads directly in Home Assistant. This integration provides various sensors to keep track of your download activities and allows creating automations based on the sensor information, alongside button and switch controls for performing specific tasks such as aborting downloads and managing file restarts.

## About pyLoad

**pyLoad** is an open-source download manager designed for always-on devices like home servers, NAS systems, and routers. It supports various file hosts, container formats, and web standards, enabling fully automated, unattended downloads. With its web interface, pyLoad allows for easy remote management from any device.

## How you can use this integration

The **pyLoad** integration allows you to monitor and control your downloads directly from Home Assistant. Here are some ways you can use it:

- **Track active downloads** – Send a notification when all downloads are complete or if the queue is empty.
- **Free space alerts** – Set up an automation to alert you when disk space is low, ensuring downloads don’t fail due to storage issues.
- **Pause downloads** – Automatically pause downloads when streaming or gaming to avoid bandwidth congestion, then resume them later.

## Prerequisites

To set up the pyLoad integration, you must have a running pyLoad instance on your home server, NAS, or any other device. An always-on device is recommended. Ensure that pyLoad's web interface is accessible for Home Assistant.

If you haven't set up pyLoad yet, an easy way to get it up and running is by installing the [pyLoad-ng add-on for Home Assistant](https://github.com/tr4nt0r/pyload-ng).

- During the setup process in Home Assistant, you will need:
  - pyLoad account credentials – A valid *username* and *password* to authenticate with pyLoad.
  - The {% term host %} of the device running pyLoad.
  - The port number that pyLoad is listening on (default is usually `8000`).

{% note %}

The account used for integration must either be an admin account or one with at least the following permissions: `DELETE`, `STATUS`, `LIST`, and `MODIFY`. You can set up and manage users and permissions under **Settings -> Users** in the pyLoad web interface.

{% endnote %}

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the device running your pyLoad instance."
Port:
  description: "The port of the pyLoad instance. pyLoad uses port 8000 by default."
Uses an SSL Certificate:
  description: "If enabled, the connection to the pyLoad instance will use HTTPS."
Verify SSL certificate:
  description: "If checked, the SSL certificate will be validated to ensure a secure connection."
Username:
  description: "The username used to access the pyLoad instance."
Password:
  description: "The password associated with the pyLoad account."
{% endconfiguration_basic %}

## Sensors

- **Speed**: Monitors the current download speed.
- **Active downloads**: Indicates the number of files pyLoad is actively downloading
- **Downloads in queue**: Shows the number of downloads currently in the queue.
- **Finished downloads**: Indicates the number of completed downloads.
- **Free space**: Shows the available disk space in the download directory.

## Buttons

- **Abort all running downloads**: Aborts all currently running downloads.
- **Delete finished files/packages**: Deletes all finished files and packages.
- **Restart all failed files/packages**: Restarts all failed downloads.
- **Restart pyLoad core**: Restarts the pyLoad core.

## Switches

- **Pause/Resume Queue**: Pauses or resumes the download queue. When paused, active downloads will continue, but new downloads in the queue will not start.
- **Auto-reconnect**: If configured, enables pyLoad to automatically reconnect the internet connection.

## Automations

Get started with these example {% term automations %}.

### Pause downloads when disk space is low

This automation will pause new downloads when your available disk space falls below 5 GB.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Monitor pyLoad download queue"
description: "Pause new downloads when the disk space is low."
triggers:
  - trigger: numeric_state
    entity_id: sensor.pyload_free_space
    below: 5000000000  # Trigger when free space drops below 5 GB (in bytes)
actions:
  - action: switch.turn_off
    target:
      entity_id: switch.pyload_pause_resume_queue
  - service: notify.persistent_notification
    data:
      message: "Free space is low, pausing pyLoad queue."
mode: single
```

{% endraw %}

{% enddetails %}

### Halt pyLoad downloads when watching Netflix

This automation halts all active pyLoad downloads when watching Netflix on your media player.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Halt pyLoad downloads when watching Netflix"
description: "Halt all pyLoad downloads when Netflix streaming starts on the media player."
triggers:
- trigger: state
  entity_id: media_player.android_tv
  to: playing
conditions:
- condition: state
  entity_id: media_player.android_tv
  attribute: app_id
  state: com.netflix.ninja
actions:
- action: button.press
  target:
    entity_id: button.pyload_abort_all_running_downloads
- action: notify.persistent_notification
  data:
    message: "pyLoad downloads have been halted because Netflix streaming started."
mode: single
```

{% endraw %}

{% enddetails %}

## Data updates

This integration {% term polling polls %} your **pyLoad** instance every 20 seconds. If you prefer a different update frequency, you can define a **custom polling interval** — see [Defining a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval) for details.

## Known limitations

- **Paused downloads**: When the download queue is paused, active downloads will continue, but new downloads in the queue will not start until the queue is resumed.
- **Halt all downloads**: To completely halt downloading, use the `Abort all running downloads` action. The `Restart failed files/packages` action will also resume any aborted downloads.

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
