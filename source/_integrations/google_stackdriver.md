---
title: "Google Stackdriver"
description: "Setup for Google Stackdriver integration"
logo: google_stackdriver.png
ha_category:
  - History
ha_release: 0.104
---

The `google_stackdriver` integration allows you to stream logs to [Google Stackdriver Logging](https://cloud.google.com/logging/). The current [free tier](https://cloud.google.com/free/) of GCP should allow you to log up to 50 GiB.

## First time setup

This assumes you already have a Google Cloud project. If you don't, please create one in the [Google Cloud Console](https://console.cloud.google.com/projectcreate)

You need to create a Service Account key in the [Google Cloud API Console](https://console.cloud.google.com/apis/credentials/serviceaccountkey)
- Choose a new "New Service Account", give it a name and leave the key type as JSON
- Select the role: Logs Writer 

This will download the Service Account JSON key to your machine. Do NOT share this with anyone. Place this file in your Home Assistant config folder.


## Configuration

Add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google_stackdriver:
  key_file: frog32ch_key.json
  labels:
    source: homeassistant
```

{% configuration %}
key_file:
  description: The filename of the Google Service Account JSON file.
  required: true
  type: string
log_level:
  description: Log level that should be streamed to Stackdriver.
  required: false
  type: string
labels:
  description: Labels to add to every log entry. If streaming logs from multiple sources to Stackdriver this allows them to be separated by using filters.
  required: true
  type: map
{% endconfiguration %}

<div class='note warning'>
Depending on how much logging is done by your setup and the log level configured for Stackdriver this could exhaust the free tier. To avoid getting surprises it is recommended to set up an [alert](https://cloud.google.com/stackdriver/pricing#alert-usage) to get notified before the free tier is exhausted.  
</div>
