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

## Prerequisites for Habitica integration

- To set up the Habitica integration, you must first have an active Habitica account. You can register for an account at [Habitica.com](https://habitica.com/). 
- During the setup process in Home Assistant, you can choose between two login options: 
  - "Login to Habitica", which allows you to log in with your *username* or *email* and *password*.
  - "Login to other instances", which requires your `User ID` and `API Token`. The `User ID` and `API Token` can be retrieved by logging into your Habitica account, navigating to the **Settings** menu, and selecting **Site Data**. 
  - Additionally, you will need to provide the URL for the Habitica instance you wish to connect to; the default URL is `https://habitica.com`, but you can specify a different URL if you are using an alternative Habitica instance or a self-hosted instance.

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
- **Gems:** Shows the total number of gems currently owned by your Habitica character, used for purchasing items and customizations.
- **Mystic hourglasses:** Displays the number of mystic hourglasses earned as a subscriber, which can be redeemed for exclusive items from past events.

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

## Actions

### Action `habitica.cast_skill`

Use a skill or spell from your Habitica character on a specific task to affect its progress or status.

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `config_entry` | no       |  Config entry of the character to cast the skill.                                                                 |
| `skill`        | no       |  Skill or spell you want to cast on the task. Only skills available to your character's class can be used.        |
| `task`         | no       |  The name of the task to target. Alternatively, you can use the `task ID` or **alias**. Supported task types are **to-do**, **habit**, and **daily**. |

#### Available skills

- **Rogue:** `pickpocket`, `backstab`
- **Warrior:** `smash`
- **Mage:** `fireball`

To use task aliases, make sure **Developer Mode** is enabled under [**Settings -> Site Data**](https://habitica.com/user/settings/siteData). Task aliases can only be edited via the **Habitica** web client.

### Task update actions

The Habitica integration offers four actions to update the details and configuration of dailies, to-do's, habits and rewards.

#### Common attributes

Habitica tasks share a common set of details and configuration options, and as such, the attributes listed below are available for all task update actions.

| Data attribute         | Optional | Description                                                                                                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config_entry           | no       | Select the Habitica account to update a task.                                                                                                           |
| task                   | no       | The name (or task ID) of the daily you want to update.                                                                                                  |
| rename                 | yes      | The new title for the Habitica task.                                                                                                                    |
| description            | yes      | The new description for the Habitica task.                                                                                                              |
| priority               | yes      | Update the difficulty of a task. (not available for rewards)                                                                                            |
| tag                    | yes      | Add tags to the Habitica task. If a tag does not already exist, a new one will be created.                                                              |
| remove_tag             | yes      | Remove tags from the Habitica task.                                                                                                                     |
| alias                  | yes      | A task alias can be used instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The task alias must be unique among all your tasks. |

#### Action `habita.update_daily`

| Data attribute         | Optional | Description                                                                                                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| add_checklist_item     | yes      | Add new checklist items to a task's checklist.                                                                                                          |
| remove_checklist_item  | yes      | Remove checklist items from a task's checklist.                                                                                                         |
| score_checklist_item   | yes      | Mark checklist items from a task's checklist as completed.                                                                                              |
| unscore_checklist_item | yes      | Undo completion of checklist items from a task's checklist.                                                                                             |
| start_date             | yes      | Update the start date of a daily to define when it becomes active. Also determines the specific weekday or day of the month on which the habit repeats. |
| frequency              | yes      | Update the repetition interval of a daily.                                                                                                              |
| every_x                | yes      | Set the number of days, weeks, months, or years after which the daily repeats. A value of 0 means the daily will never be due (a 'Grey-Daily').           |
| repeat                 | yes      | Update the days of the week the daily repeats.                                                                                                          |
| repeat_monthly         | yes      | Update if a monthly recurring task repeats on the same day or the same week and weekday of the month, determined by the start date.                     |
| reminder_time          | yes      | Add reminders to a Habitica task.                                                                                                                       |
| remove_reminder_time   | yes      | Remove specific reminders from a Habitica task.                                                                                                         |
| clear_reminder         | yes      | Remove all reminders from a Habitica task.                                                                                                              |
| streak                 | yes      | Adjust or reset the streak counter of the daily.                                                                                                        |

#### Action `habita.update_todo`

| Data attribute         | Optional  | Description                                                                                                       |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| add_checklist_item     | yes       | Add new checklist items to a task's checklist.                                                                    |
| remove_checklist_item  | yes       | Remove checklist items from a task's checklist.                                                                   |
| score_checklist_item   | yes       | Mark checklist items from a task's checklist as completed.                                                        |
| unscore_checklist_item | yes       | Undo completion of checklist items from a task's checklist.                                                       |
| priority               | yes       | Update the difficulty of a task.                                                                                  |
| date                   | yes       | Update or set the to-do's due date.                                                                               |
| clear_date             | yes       | Remove the due date from the to-do.                                                                               |
| reminder               | yes       | Add reminders to a Habitica task.                                                                                 |
| remove_reminder        | yes       | Remove specific reminders from a Habitica task.                                                                   |
| clear_reminder         | yes       | Remove all reminders from a Habitica task.                                                                        |

#### Action `habita.update_habit`

| Data attribute         | Optional  | Description                                                                                                       |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| up_down                | yes       | Update if the habit is good and rewarding (positive), bad and penalizing (negative), or both.                     |
| frequency              | yes       | Update the reset frequency of a habit's counter: daily at the start of a new day, weekly after Sunday night, and monthly at the end of the month. |
| counter_up             | yes       | Update the up counter of a positive habit.                                                                        |
| counter_down           | yes       | Update the down counter of a negative habit.                                                                      |

#### Action `habita.update_reward`

| Data attribute | Optional  | Description                  |
| -------------- | --------- | -----------------------------|
| cost           | yes       | Update the cost of a reward. |

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
