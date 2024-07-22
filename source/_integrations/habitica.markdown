---
title: Habitica
description: Instructions on enabling Habitica support for your Home Assistant
ha_category:
  - Hub
  - Sensor
ha_release: 0.78
ha_iot_class: Cloud Polling
ha_domain: habitica
ha_platforms:
  - button
  - sensor
  - switch
  - todo
ha_codeowners:
  - '@ASMfreaK'
  - '@leikoilja'
  - '@tr4nt0r'
ha_config_flow: true
ha_integration_type: integration
---

The Habitca {% term integration %} enables you to monitor your adventurer's progress and stats in Home Assistant and seamlessly integrates your to-do's and daily tasks.  

{% include integrations/config_flow.md %}

## Sensors

- **Class:** Indicates the class of your character (Warrior, Rogue, Healer, or Mage).
- **Display name:**  Shows the character's display name.
- **Experience:** Displays the current experience points of the character (for example, "144 XP").
- **Gold:** Shows the amount of gold owned by your character (for example, "22.29 GP").
- **Health:** Shows the current health points of the character (for example, "42 HP").
- **Level:** Displays the current level of the character.
- **Mana:** Displays the current mana points of your character (for example, "61 MP").
- **Max. mana:** Indicates the maximum mana points your character can have at the current level (for example, "70 MP").
- **Next level:** Indicates the remaining experience points needed to reach the next level (for example, "440 XP").
- **Habits:** Shows the number of habits being tracked (for example, "4 tasks").
- **Rewards:** Displays the rewards that can be redeemed (for example, "1 task")

## To-do lists

The following Habitica tasks are available as to-do lists in Home Assistant. You can add, delete, edit and check-off completed tasks

- **To-Do's:** Displays a comprehensive list of active and completed to-dos. Each to-do includes its due date if applicable, allowing you to check them off, edit them, delete them, and create new to-dos seamlessly.
- **Dailies:** Shows the daily tasks that need to be completed today or in the future. Tasks completed yesterday can still be marked off as "yesterdailies" until a new day starts.

## Button controls

- **Start my day:** Initiates daily routine actions in Habitica, including resetting your dailies, deal damage from unfinished dailies and quest bosses, habits adjustment, buff expiration, and mana regeneration based on completed dailies.
- **Revive from death:** Allows your character to revive from death in Habitica. Upon revival, HP is fully restored, but your character will lose all gold, 1 level, all experience points, one stat point, and one piece of equipment.
- **Buy a health potion:** Allows your character to purchase a health potion in Habitica. Instantly applies the potion upon purchase, healing 15 HP at a cost of 25 GP.
- **Allocate all stat points**: Assigns all unallocated stat points based on the previously set automatic allocation method. If no method is set, all points are assigned to strength (STR).

## Switch controls

- **Rest in the Inn:** When enabled, allows your character to rest in the inn in Habitica, pausing damage dealt from dailies and quest bosses.


## API Service

At runtime, you will be able to use the API for each respective user by their Habitica's username.
You can override this by passing `name` key, this value will be used instead of the username.
If you are hosting your own instance of Habitica, you can specify a URL to it in `url` key.

### API Service Parameters

The API is exposed to Home Assistant as an action called `habitica.api_call`. To call it, you should specify these keys in the data:

| Data attribute | Required | Type     | Description                                                                                                       |
| ---------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `name`                 | yes      | string   | Habitica's username as per `configuration.yaml` entry.                                                            |
| `path`                 | yes      | [string] | Items from API URL in form of an array with method attached at the end. See the example below.                    |
| `args`                 | no       | map      | Any additional JSON or URL parameter arguments. See the example below and [apidoc](https://habitica.com/apidoc/). |

A successful run of this action will fire an event `habitica_api_call_success`.

| Event data attribute | Type     | Description                                                                                                                                                           |
| -------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`               | string   | Copied from the data attribute.                                                                                                                                   |
| `path`               | [string] | Copied from the data attribute.                                                                                                                                   |
| `data`               | map      | Deserialized `data` field of JSON object Habitica's server returned in response to API call. For more info see the [API documentation](https://habitica.com/apidoc/). |

#### Let's consider some examples on how to use the action

For example, let's say that there is a configured `habitica` platform for user `xxxNotAValidNickxxx` with their respective `api_user` and `api_key`.
Let's create a new task (a todo) for this user via Home Assistant. There is an [API call](https://habitica.com/apidoc/#api-Task-CreateUserTasks) for this purpose.
To create a new task one should hit `https://habitica.com/api/v3/tasks/user` endpoint with `POST` request with a JSON object with task properties.
So let's call the API on `habitica.api_call`.

- The `name` key becomes `xxxNotAValidNickxxx`.
- The `path` key is trickier.
  - Remove `https://habitica.com/api/v3/` at the beginning of the endpoint URL.
  - Split the remaining on slashes (/) and **append the lowercase method** at the end.
  - You should get `["tasks", "user", "post"]`. To get a better idea of the API you are recommended to try all of the API calls in IPython console [using this package](https://github.com/ASMfreaK/habitipy/blob/master/README.md).
- The `args` key is more or less described in the [API documentation](https://habitica.com/apidoc/).

Combining all together:
call `habitica.api_call` with data

```json
{
  "name": "xxxNotAValidNickxxx",
  "path": ["tasks", "user", "post"],
  "args": {"text": "Use API from Home Assistant", "type": "todo"}
}
```

This call will create a new todo on `xxxNotAValidNickxxx`'s account with text `Use API from Home Assistant` like this:

![example task created](/images/screenshots/habitica_new_task.png)

Also an event `habitica_api_call_success` will be fired with the following data:

```json
{
  "name": "xxxNotAValidNickxxx",
  "path": ["tasks", "user", "post"],
  "data": {
    "challenge": {},
    "group": {"approval": {"required": false,
     "approved": false,
     "requested": false},
    "assignedUsers": [],
    "sharedCompletion": "recurringCompletion"},
    "completed": false,
    "collapseChecklist": false,
    "type": "todo",
    "notes": "",
    "tags": [],
    "value": 0,
    "priority": 1,
    "attribute": "str",
    "text": "Use API from Home Assistant",
    "checklist": [],
    "reminders": [],
    "_id": "NEW_TASK_UUID",
    "createdAt": "2018-08-09T18:03:27.759Z",
    "updatedAt": "2018-08-09T18:03:27.759Z",
    "userId": "xxxNotAValidNickxxx's ID",
    "id": "NEW_TASK_UUID"}
}
```

## Templating

`sensor.habitica_USER_habits` and `sensor.habitica_USER_rewards` have state attributes listing the user's respective tasks. For example, you can see this information in **{% my developer_states title="Developer Tools > States" %}** under `sensor.habitica_USER_habits` > **Attributes**, or by adding a [Markdown card](/dashboards/markdown/) to a dashboard with the following code:

{% raw %}

```jinja
{% for key, value in states.sensor.habitica_USER_habits.attributes.items() %}
  {% if 'text' in value | string %}
    {{ loop.index }}. {{ value.text }}
  {% endif %}
{% endfor %}
```

{% endraw %}
