---
title: "Download file"
action: downloader.download_file
domain: downloader
description: "Downloads a file to the configured download location."
---

Use this action to download a file to the location configured for the Downloader integration.

The download directory must exist and be writable by Home Assistant.

{% include actions/ui_header.md %}

To download a file from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select **Downloader: Download file**.
6. Enter the URL to download.
7. Set the other options if you need them.
8. Select **Save**.

### Options in the UI

{% options_ui %}
URL:
  description: The URL of the file to download.
Subdirectory:
  description: The subdirectory inside the configured download location.
  required: false
Filename:
  description: The filename to use for the downloaded file.
  required: false
Overwrite:
  description: Whether to overwrite an existing file.
  required: false
  default: false
Headers:
  description: Custom HTTP headers to add to the request.
  required: false
  default: {}
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `downloader.download_file`. A basic example looks like this:

{% example %}
action: |
  action: downloader.download_file
  data:
    url: "https://example.com/file.txt"
{% endexample %}

This downloads `file.txt` to the configured download location.

### Options in YAML

{% options_yaml %}
url:
  description: The URL of the file to download.
  required: true
  type: string
subdir:
  description: The subdirectory inside the configured download location.
  required: false
  type: string
filename:
  description: The filename to use for the downloaded file.
  required: false
  type: string
overwrite:
  description: Whether to overwrite an existing file.
  required: false
  type: boolean
  default: false
headers:
  description: Custom HTTP headers to add to the request.
  required: false
  type: map
  default: {}
{% endoptions_yaml %}

This action does not support targets.

## Good to know

- If the configured path is not absolute, Home Assistant treats it as relative to the configuration directory.
- When a download finishes, Home Assistant emits either `downloader_download_completed` or `downloader_download_failed` on the event bus.

{% include actions/stuck.md %}

{% include actions/related.md %}
