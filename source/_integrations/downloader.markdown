---
title: Downloader
description: Instructions on how to setup the downloader integration with Home Assistant.
ha_category:
  - Downloading
ha_release: pre 0.7
ha_quality_scale: internal
ha_domain: downloader
ha_codeowners:
  - '@erwindouna'
ha_integration_type: integration
ha_config_flow: true
---

The **Downloader** {% term integration %} provides an action to download files. It will raise an error and not continue to set itself up when the download directory does not exist. The directory needs to be writable for the user who is running Home Assistant.

{% include integrations/config_flow.md %}

If the path is not absolute, it’s assumed to be relative to the Home Assistant configuration directory (for example, `/config/downloads`). So if you have a folder called `/config/my_download_folder`, when prompted to **Select a location to get to store downloads**, enter `my_download_folder`. Home Assistant checks if the directory exists.

### Use the action

Go to the "Developer Tools", then to "Actions", and choose `downloader.download_file` from the list of available actions. Fill the "data" field as shown in the example below and select "Perform action".

```json
{"url":"http://domain.tld/path/to/file"}
```

This will download the file from the given URL.

| Data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `url`                  |       no | The URL of the file to download.               |
| `subdir`               |      yes | Download into subdirectory of **download_dir** |
| `filename`             |      yes | Determine the filename.                        |
| `overwrite`            |      yes | Whether to overwrite the file or not, defaults to `false`. |

### Download status events

When a download finished successfully, Home Assistant will emit a `downloader_download_completed` event to the event bus which you can use to write automations against.
In case download failed another event `downloader_download_failed` is emitted to indicate that the download did not complete successfully.

Along with the event the following payload parameters are available:

| Parameter | Description                                                                                                                                                                                                                                                    |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `url`  | The `url` that was requested.|                                                                                                                                      
| `filename`    | The `name` of the file that was being downloaded.|

#### Example automation:

```yaml
- alias: "Download Failed Notification"
  triggers:
    - trigger: event
      event_type: downloader_download_failed
  actions:
    - action: persistent_notification.create
      data:
        message: "{{trigger.event.data.filename}} download failed"
        title: "Download Failed"
 ```
