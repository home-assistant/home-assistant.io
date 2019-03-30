---
layout: page
title: "Netatmo"
description: "Instructions on how to integrate Netatmo component into Home Assistant."
date: 2016-06-02 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Hub
ha_release: "0.20"
ha_iot_class: Cloud Polling
---

The `netatmo` component platform is the main component to integrate all Netatmo related platforms.

To enable the Netatmo component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
netatmo:
  api_key: YOUR_CLIENT_ID
  secret_key: YOUR_CLIENT_SECRET
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
api_key:
  description: The `client id` from your Netatmo app.
  required: true
  type: string
secret_key:
  description: The `client secret` from your Netatmo app.
  required: true
  type: integer
username:
  description: Username for the Netatmo account.
  required: true
  type: string
password:
  description: Password for the Netatmo account.
  required: true
  type: string
discovery:
  description: Whether to discover Netatmo devices. Set it to False, if you want to choose which Netatmo device you want to add.
  required: false
  type: boolean
  default: true
webhooks:
  description: Enable webhooks for instant events of the Welcome and Presence cameras.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

### {% linkable_title Get API and Secret Key %}

To get your API credentials, you have to declare a new application in the [Netatmo Developer Page](https://dev.netatmo.com/). Sign in using your username and password from your regular Netatmo account.
Click on 'Create an App' at the top of the page.

<p class='img'>
<img src='/images/screenshots/netatmo_create.png' />
</p>
You have to fill the form, but only two fields are required: Name and Description. It doesn't really matter what you put into those. Just write something that make sense to you. To submit your new app, click on create at the bottom of the form.

<p class='img'>
<img src='/images/screenshots/netatmo_app.png' />
</p>

That's it. You can copy and paste your new `client id` and `client secret` in your Home Assistant configuration file just as described above, in the configuration example.

<p class='img'>
<img src='/images/screenshots/netatmo_api.png' />
</p>

### {% linkable_title Webhooks %}

The Welcome and Presence cameras can send instant events to Home Assistant by using webhooks. There are different types of events, each with slightly different data attached. To enable the webhooks add `webhooks: true` to your configuration. It is also required to have your camera enabled in Home Assistant. You can do this either by manually setting up the [platform](https://www.home-assistant.io/components/camera.netatmo/) or by enabeling [discovery](https://www.home-assistant.io/components/netatmo/#discovery).

To be able to receive events from Netatmo, your Home Assistant instance needs to be accessible from the web ([Hass.io instructions](https://www.home-assistant.io/addons/duckdns/)) and you need to have the base_url configured for the HTTP component ([docs](https://www.home-assistant.io/components/http/#base_url)).

Events coming in from Netatmo will be available as events in Home Assistant and are fired as netatmo_*, along with their data. You can use this event to trigger automations.

#### {% linkable_title Events %}

The following events are available:

- netatmo_person (Welcome)
- netatmo_movement (Welcome & Presence)
- netatmo_human (Presence)
- netatmo_animal (Presence)
- netatmo_vehicle (Presence)
- netatmo_other (Welcome & Presence)

All events (except `netatmo_other`) contain the following attributes:

| Attribute | Description |
| --------- | ----------- |
| event_type | Type of event. E.G. `movement`.
| home_name | Name of the home the camera belongs to.
| camera_id | MAC address of the camera.
| message | Message describing what has been seen by the camera.

The Presence camera additionally has these attributes:

| Attribute | Description |
| --------- | ----------- |
| snapshot_url | URL to a picture of the full frame of the event.
| vignette_url | URL to a picture cropped down to the area of interest.

The Welcome camera additionally has these attributes for `netatmo_person` events:

| Attribute | Description |
| --------- | ----------- |
| id | ID of the person that has been seen.
| name | Name of the person that has been seen.
| is_known | Boolean value if the person is known.
| face_url | URL to a picture of the person.

The `netatmo_other` event passes all the webhook data through for all webhook events that don't match any of the above. Set the [level of logging](https://www.home-assistant.io/components/logger/) for the `netatmo` component to `debug` to view the data in the Home Assistant logs.

### {% linkable_title Services (only for webhooks) %}

There are two services to manually add and drop the webhooks. This might be useful if your webhook has been banned and you want to readd the webhook without restarting Home Assistant.

| Service | Description |
| ------- | ----------- |
| addwebhook | Subscribe to webhooks. By default the automatically generated URL will be used. But you can pass `{"url": "https://yourdomain.com/yourwebhook/"}` as service data to the service call if you want to use a manually created [webhook trigger](https://www.home-assistant.io/docs/automation/trigger/#webhook-trigger). In this case you have to manually process the data that is sent by Netatmo.
| dropwebhook | Unsubscribe existing webhooks.
