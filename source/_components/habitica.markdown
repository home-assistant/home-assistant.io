---
layout: page
title: "Habitica"
description: "Habitica support"
date: 2018-07-30 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: habitica.png
ha_category: Hub
ha_version: 0.75
---

This component allows you to monitor and manage your Habitica profile. This component exposes the [Habitica's API](https://habitica.com/apidoc/) as a Home Assistant service. It support multple users and allows you to automate checking out your habits and daily tasks or casting magics using Home Assistant.
This component enables usage of [`sensor.habitica` platform.](/components/sensor.habitica/)
To use the component you should use this example configuration:

```yaml
# Minimum viable configuration.yaml entry
habitica:
   - api_user: 'numbers1-and2-lett-ers1-fromuserid22'
     api_key: 'numbers1-and2-lett-ers1-fromapikey22'
```

You can specify several users, providing `api_user` and `api_key` for each. 
At runtime you will be able to use api for each respective user by their Habitica's username. 
You can override this by passing `name` key, this value will be used istead of the username. 
If you are hosting your own instance of Habitica, you can specify a URL to it in `url` key.

Configuration variables:

{% configuration %}
api_user:
  description: "Habitica's API user ID. This value can be grabbed from [account setting](https://habitica.com/user/settings/api)"
  required: true
  type: string
api_key:
  description: "Habitica's API password (token). This value can be grabbed from [account setting](https://habitica.com/user/settings/api) by pressing 'Show API token'"
  required: true
  type: string
name:
  description: "Override for Habitica's username"
  required: false
  type: string
  default: Deduced at startup
url:
  description: "URL to your Habitica instance, if you are hosting your own"
  required: false
  type: string
  default: http://habitica.com
{% endconfiguration %}

### {% linkable_title API Service Parameters %}

The API is exposed to Home Assistant as a service called `habitica.api_call`. To call it you should specify this keys in service data:
| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | ---- | ----------- |
| `name` | yes | string |  Habitica's username as per `configuration.yaml` entry. |
| `path` | yes | [string] | Items from API URL in form of an array with method attached at the end. Consider the examples below. |
| `args` | no | map string: any | Any additional json or url parameter arguments. See example below |


Let's consider some examples on how to call the service.

For example, let's say that there is a configured `habitica` platform for user `johndoe` with their respective `api_user` and `api_key`.
Let's create a new task (a todo) for this user via Home Assitant. There is an [API call](https://habitica.com/apidoc/#api-Task-CreateUserTasks) for this purpose. 
To create a new task one should hit `https://habitica.com/api/v3/tasks/user` endpoint with `POST` request with a json object with task properties.
So let's call the API on `habitica.api_call`.
* The `name` key becomes `johndoe`.
* The `path` key is trickier. First of all get rid of 'https://habitica.com/api/v3/' at the beginning of the endpoint URL. Then split the remaining on slashes (/) and append the lowercase method at the end. You should get `["tasks", "user", "post"]`. To get a better idea of the API you can try all of the API calls in IPython console [using this package](https://github.com/ASMfreaK/habitipy/blob/master/README.md).
* The `args` key is more or less described in the docs.

Combining all together:
```
call habitica.api_call with data

{
  "name": "johndoe",
  "path": ["tasks", "user", "post"],
  "args": {"text": "Use API from Home Assistant", "type": "todo"} 
}
```

This call will create a new todo on `johndoe` account with text `Use API from Home Assistant`
