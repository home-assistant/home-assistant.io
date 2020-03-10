---
title: Google Pub/Sub
description: Setup for Google Pub/Sub integration
ha_category:
  - History
ha_release: 0.88
ha_domain: google_pubsub
---

The `google_pubsub` integration allows you to hook into the Home Assistant event bus and send events to [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/overview). The current [free tier](https://cloud.google.com/free/) of GCP should allow you to sync about 1 event every 2 seconds on average (2 million invocations per month).

## First time setup

This assumes you already have a Google Cloud project. If you don't, please create one in the [Google Cloud Console](https://console.cloud.google.com/projectcreate)

You need to create a Service Account key in the [Google Cloud API Console](https://console.cloud.google.com/apis/credentials/serviceaccountkey)
- Choose a new "New Service Account", give it a name and leave the key type as JSON
- Select the role: Pub/Sub Publisher 

This will download the Service Account JSON key to your machine. Do NOT share this with anyone. Place this file in your Home Assistant configuration folder.

Next, create a Google Pub/Sub topic in the [Google Cloud API Console](https://console.cloud.google.com/cloudpubsub/topicList). The topic name will become something like `projects/project-198373/topics/topic-name`. Note the last part only (the name you chose): `topic-name`.


## Configuration

Add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google_pubsub:
  project_id: YOUR_PROJECT_ID
  topic_name: YOUR_TOPIC_NAME
  credentials_json: CREDENTIALS_FILENAME
```

{% configuration %}
project_id:
  description: Project ID from the Google console (looks like `words-2ab12`).
  required: true
  type: string
topic_name:
  description: The Pub/Sub [relative](https://cloud.google.com/pubsub/docs/admin#resource_names) topic name (looks like `hass`).
  required: true
  type: string
credentials_json:
  description: The filename of the Google Service Account JSON file.
  required: true
  type: string
filter:
  description: Filter domains and entities for Google Cloud Pub/Sub.
  required: true
  type: map
  keys:
    include_domains:
      description: List of domains to include (e.g., `light`).
      required: false
      type: list
    exclude_domains:
      description: List of domains to exclude (e.g., `light`).
      required: false
      type: list
    include_entities:
      description: List of entities to include (e.g., `light.attic`).
      required: false
      type: list
    exclude_entities:
      description: List of entities to include (e.g., `light.attic`).
      required: false
      type: list
{% endconfiguration %}

<div class='note warning'>
  Not filtering domains or entities will send every event to Google PubSub, thus hitting the free tier limit very fast. Be sure to fill in this configuration parameter or have a paid subscription for Google Cloud.
</div>

### Saving the data using a Google Cloud Function

To save your data automatically to BigQuery, follow the [instructions here](https://github.com/timvancann/home-assistant-pubsub-cloud-function). The current [free tier](https://cloud.google.com/free/) of GCP should allow to store up to 10GB of data.
