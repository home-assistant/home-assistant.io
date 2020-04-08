---
title: Wunderlist
description: Instructions on how to use Wunderlist with Home Assistant.
ha_category:
  - Calendar
ha_release: 0.84
ha_domain: wunderlist
---

The `wunderlist` integration allows you to create tasks in [Wunderlist](https://www.wunderlist.com) from Home Assistant. You can use this if you want Home Assistant to send you a task that you should not forget, e.g., Congratulate Dani.

## Setup

Wunderlist API uses OAuth2, so you need to obtain a `client_id` and an `access_token`.
There are two ways:

1. Go to the [Wunderlist IoT app page](https://wunderlist-iot.herokuapp.com), log in with your Wunderlist account and accept the application permissions.
   It will print for you the `client_id` and the `access_token`.
2. Or you can create your own application and `access_token` following the instructions at the [Wunderlist developer page](https://developer.wunderlist.com/).

Store the parameters in your Home Assistant configuration:

```yaml
# Example configuration.yaml entry
wunderlist:
  client_id: YOUR_CLIENT_ID
  access_token: YOUR_ACCESS_TOKEN
```

{% configuration %}
client_id:
  description: The ID of your Wunderlist application (OAuth2).
  required: true
  type: string
access_token:
  description: A token for your Wunderlist personal account (For the ``client_id`` application).
  required: true
  type: string
{% endconfiguration %}

## Creating tasks with service `create_task`

This integration offers a new service domain `wunderlist` with the service `create_task`.
You can call this service with the argument  `list_name` the argument `name` and the optional parameter `starred` to create a new task.

| Service data attribute | Optional | Description                    | Example         |
| ---------------------- | -------- | ------------------------------ | --------------- |
| list_name              | no       | Name of the list               | "Shopping list" |
| name                   | no       | Name of the new task           | "Spanish Jam"   |
| starred                | yes      | Create the task starred or not | false           |

## Disclaimer

This product uses the Wunderlist API but is not endorsed or certified by Wunderlist.
