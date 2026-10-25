---
title: Folder
description: Instructions on how to monitor the size and contents of a folder in Home Assistant.
ha_categories:
  - computers_network.monitoring
ha_iot_class: Local Polling
ha_release: 0.64
ha_config_flow: true
ha_domain: folder
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: legacy
---

The **Folder** {% term integration %} monitors a folder on the system running Home Assistant. It creates a sensor that shows the total size of the files in that folder, so you can, for example, get notified when a backup or recordings folder grows too large.

You can add the same folder more than once, each time with a different filter. For example, you can track the size of only the video files in a folder next to the total size of all files.

## Prerequisites

The folder you want to monitor must be in the list of folders Home Assistant is allowed to access. Add the folder to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) and restart Home Assistant before you add the integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Path to the folder:
  description: "The full path to the folder you want to monitor, starting from the root. For example, `/config` or `/media/recordings`."
Filter:
  description: "Only count files that match this pattern. For example, `*.txt` counts only text files. The filter uses [Unix shell-style wildcards](https://docs.python.org/3/library/fnmatch.html). The default is `*`, which counts all files."
{% endconfiguration_basic %}

## Configuration options

You can change the filter after you add the integration. To change it, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Folder**, and then select the cogwheel {% icon "mdi:cog-outline" %} next to the folder.

{% configuration_basic %}
Filter:
  description: "Only count files that match this pattern. For example, `*.txt` counts only text files. The default is `*`, which counts all files."
{% endconfiguration_basic %}

## Supported functionality

Each folder you add appears as a service named after the folder. For example, `/media/recordings` appears as **recordings**.

### Sensors

- **Size**: The sensor is named after the folder and shows the total size, in megabytes (MB), of the files in the folder that match the filter.

The sensor also has the following attributes:

- **Path**: The path of the monitored folder.
- **Filter**: The filter that is applied.
- **Number of files**: The number of files that match the filter.
- **Bytes**: The total size of the matching files, in bytes.
- **File list**: A list of the paths of the matching files.

## Data updates

The integration checks the folder every minute.

## Known limitations

- The integration does not look inside subfolders. Files in subfolders are not included in the size. A subfolder that matches the filter is included in **Number of files** and **File list**, but not in the size.
- Folders with a very large number of files make the **File list** attribute large, which can increase the size of your database.

## Troubleshooting

### Symptom: "Configured path is not in allowlist"

When adding the integration, the form shows the message "Configured path is not in allowlist".

#### Description

Home Assistant is not allowed to access the folder you entered.

#### Resolution

1. Add the folder to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs).
2. Restart Home Assistant.
3. Add the integration again.

### Symptom: "Configured path is not a directory" or "Configured path is not readable"

When adding the integration, the form shows one of these messages.

#### Description

The path you entered does not exist, is a file instead of a folder, or Home Assistant does not have permission to read it.

#### Resolution

1. Check that you entered the full path, starting from the root, for example `/media/recordings`.
2. Check that the folder exists on the system running Home Assistant.
3. Check that Home Assistant has permission to read the folder.

### Symptom: Repair issue about the YAML configuration

After updating Home Assistant, you see a repair issue saying the **Folder** YAML configuration could not be imported.

#### Description

Configuring the **Folder** integration in YAML is deprecated. Home Assistant imports your existing YAML configuration automatically. If a folder can't be imported, for example because it is not in `allowlist_external_dirs`, a repair issue explains why.

#### Resolution

1. Follow the steps in the repair issue and restart Home Assistant. The folder is then imported.
2. After the import succeeds, remove the `folder` sensor entries from your {% term "`configuration.yaml`" %} file.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
