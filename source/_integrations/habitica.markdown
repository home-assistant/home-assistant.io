---
title: Habitica
description: Instructions on enabling Habitica support for your Home Assistant
ha_category:
  - Calendar
  - Image
  - Sensor
  - To-do list
ha_release: 0.78
ha_iot_class: Cloud Polling
ha_domain: habitica
ha_platforms:
  - binary_sensor
  - button
  - calendar
  - diagnostics
  - image
  - sensor
  - switch
  - todo
ha_codeowners:
  - '@tr4nt0r'
ha_config_flow: true
ha_integration_type: integration
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://habitica.com/
    title: Habitica
---

The Habitica {% term integration %} enables you to monitor your adventurer's progress and stats from [Habitica](https://habitica.com/) in Home Assistant and seamlessly integrates your to-do's, daily tasks, and many more things.

## About Habitica

Habitica is a gamified task manager and habit tracker that turns your daily goals and to-dos into a role-playing game, helping you stay motivated and productive while earning rewards and leveling up your avatar.

## How you can use this integration

The Habitica integration lets you automate task management, such as creating to-dos when appliances finish or marking dailies complete using smart sensors. You can visualize tasks and stats in Home Assistant dashboards or create notifications for due tasks, keeping you organized and on track with your goals.

## Prerequisites for Habitica integration

- To set up the Habitica integration, you must first have an active Habitica account. You can register for an account at [Habitica.com](https://habitica.com/).
- During the setup process in Home Assistant, you can choose between two login options:
  - "Login to Habitica", which allows you to log in with your *username* or *email* and *password*.
  - "Login to other instances", which requires your `User ID` and `API Token`. The `User ID` and `API Token` can be retrieved by logging into your Habitica account, navigating to the **Settings** menu, and selecting **Site Data**.
  - Additionally, you will need to provide the URL for the Habitica instance you wish to connect to; the default URL is `https://habitica.com`, but you can specify a different URL if you are using an alternative Habitica instance or a self-hosted instance.

{% include integrations/config_flow.md %}

### Login to Habitica

{% configuration_basic %}
"Email or username":
  description: "Email or username (case-sensitive) to connect Home Assistant to your Habitica account"
Password:
  description: "Password for the account to connect Home Assistant to Habitica"
{% endconfiguration_basic %}

### Advanced configuration

If you choose "**Login to other instances**" you will be presented the following configuration options:

{% configuration_basic %}
"User ID":
  description: "User ID of your Habitica account (*see [prerequisites](#prerequisites-for-habitica-integration)*)"
API Token:
  description: "API Token of the Habitica account (*see [prerequisites](#prerequisites-for-habitica-integration)*)"
URL:
  description: "URL of the Habitica installation to connect to. Defaults to `https://habitica.com` (*see [prerequisites](#prerequisites-for-habitica-integration)*)"
Verify SSL certificate:
  description: Enable SSL certificate verification for secure connections. Disable only if connecting to a Habitica instance using a self-signed certificate
{% endconfiguration_basic %}

## Sensors

- **Class**: Indicates the class of your character (Warrior, Rogue, Healer, or Mage).
- **Display name**:  Shows the character's display name.
- **Experience**: Displays the current experience points of the character (for example, "144 XP").
- **Gold**: Shows the amount of gold owned by your character (for example, "22.29 GP").
- **Health**: Shows the current health points of the character (for example, "42 HP").
- **Level**: Displays the current level of the character.
- **Mana**: Displays the current mana points of your character (for example, "61 MP").
- **Max. mana**: Indicates the maximum mana points your character can have at the current level (for example, "70 MP").
- **Next level**: Indicates the remaining experience points needed to reach the next level (for example, "440 XP").
- **Gems**: Shows the total number of gems currently owned by your Habitica character, used for purchasing items and customizations.
- **Mystic hourglasses**: Displays the number of mystic hourglasses earned as a subscriber, which can be redeemed for exclusive items from past events.
- **Strength, intelligence, constitution, perception**: Display your character's attribute points (stats). The sensors' attributes provide a breakdown of contributions from level, battle gear, class equip bonus, allocation, and buffs.
- **Eggs**: Shows the total number of eggs in your inventory. The sensor's attributes provide a detailed list of each egg type and quantity.
- **Pet food**: Displays the total amount of food available. The sensor's attributes list each food type and its quantity. Feed it to your pets and they may grow into a sturdy steed.
- **Saddles**: Indicates the number of saddles owned, used for instantly raising pets to mounts.
- **Hatching potions**: Shows the total count of available hatching potions. The sensor's attributes detail each potion type and quantity. Pour them on an egg to hatch a pet.
- **Quest scrolls**: Displays the total number of quest scrolls in your inventory. A list of each quest scroll and its quantity is provided in the sensor's attributes.

## Binary sensors

- **Pending quest invitation**: Indicates if you have an invitation to a quest awaiting your response.
  
## Image

- **Avatar**: Displays your character's current avatar (note: animated avatars are currently not supported and will be displayed as static images).

## To-do lists

The following Habitica tasks are available as to-do lists in Home Assistant. You can add, delete, edit and check-off completed tasks

- **To-Do's**: Displays a comprehensive list of active and completed to-dos. Each to-do includes its due date if applicable, allowing you to check them off, edit them, delete them, and create new to-dos seamlessly.
- **Dailies**: Shows the daily tasks that need to be completed today or in the future. Tasks completed yesterday can still be marked off as "yesterdailies" until a new day starts.

## Calendars

- **To-Do calendar:** Lists the due dates for all active to-do tasks. Each event on this calendar represents a to-do item that has a set due date, making it easy to track upcoming deadlines and plan accordingly.
- **Dailies calendar:** Displays all daily tasks that are scheduled for today and are still active. It also shows all tasks scheduled for future dates, helping you stay organized and track upcoming routines. The calendar sensor will be active if there are unfinished tasks for today and display the next due daily (based on sort order if there are multiple tasks due for that day).
- **To-Do reminders calendar**: Lists events for reminders associated with your to-dos in Habitica, helping you track when notifications for specific to-dos are expected.
- **Dailies reminders calendar**: Shows events for reminders linked to your Habitica dailies, ensuring you know when notifications for your dailies will occur.

## Button controls

- **Start my day**: Initiates daily routine actions in Habitica, including resetting your dailies, deal damage from unfinished dailies and quest bosses, habits adjustment, buff expiration, and mana regeneration based on completed dailies.
- **Revive from death**: Allows your character to revive from death in Habitica. Upon revival, HP is fully restored, but your character will lose all gold, 1 level, all experience points, one stat point, and one piece of equipment.
- **Buy a health potion**: Allows your character to purchase a health potion in Habitica. Instantly applies the potion upon purchase, healing 15 HP at a cost of 25 GP.
- **Allocate all stat points**: Assigns all unallocated stat points based on the previously set automatic allocation method. If no method is set, all points are assigned to strength (STR).

## Button controls for class skills

If you've unlocked the class system, button controls for casting player and party skills will become available, depending on the class you've selected. For task skills see [action `habitica.cast_skill`](#action-habiticacast_skill)

### Mage

- **Ethereal surge**: You sacrifice Mana so the rest of your party, except for other mages, gains MP. (based on: INT)
- **Earthquake**: Your mental power shakes the earth and buffs your party's intelligence. (based on: unbuffed INT)
- **Chilling frost:** With one cast, ice freezes all your streaks so they won't reset to zero tomorrow.

### Warrior

- **Defensive stance**: You crouch low and gain a buff to constitution. (based on: unbuffed CON)
- **Valorous presence**: Your boldness buffs your whole party's strength. (based on: unbuffed STR)
- **Intimidating gaze:** Your fierce stare buffs your whole Party's constitution. (based on: unbuffed CON)

### Rogue

- **Tools of the trade**: Your tricky talents buff your whole party's perception. (based on: unbuffed PER)
- **Stealth**: With each cast, a few of your undone dailies won't cause damage tonight. Their streaks and colors won't change. (based on: PER)

### Healer

- **Healing light**: Shining light restores your health. (based on: CON and INT)
- **Searing brightness**: A burst of light makes your tasks more blue/less red. (based on: INT)
- **Protective aura**: You shield your party by buffing their constitution. (based on: unbuffed CON)
- **Blessing**: Your soothing spell restores your whole party's health. (based on: CON and INT)

## Switch controls

- **Rest in the Inn**: When enabled, allows your character to rest in the inn in Habitica, pausing damage dealt from dailies and quest bosses.

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

### Action `habitica.accept_quest`

Accept a pending invitation to a quest. For an example, see the [`Auto-accept quest invitation`](#auto-accept-quest-invitation) automation, which demonstrates how this action can be used to automatically accept quest invitations.

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | Config entry of the character to accept the quest.             |

### Action `habitica.reject_quest`

Reject a pending invitation to a quest.

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | Config entry of the character to reject the quest.             |

### Action `habitica.leave_quest`

Leave the current quest you are participating in.

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | Config entry of the character to leave the quest.              |

### Action `habitica.abort_quest` 🔒

Terminate your party's ongoing quest. All progress will be lost, and the quest roll returned to the owner's inventory. Only the quest leader or group leader can perform this action.

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | Config entry of the character to abort the quest.              |

{% note %}
Actions marked with 🔒 have usage restrictions. See action descriptions for details.
{% endnote %}

### Action `habitica.start_quest` 🔒

Begin the quest immediately, bypassing any pending invitations that haven't been accepted or rejected. Only the quest leader or group leader can perform this action.

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | Config entry of the character to force-start the quest.        |

### Action `habitica.cancel_quest` 🔒

Cancel a quest that has not yet started. All accepted and pending invitations will be canceled, and the quest roll returned to the owner's inventory. Only the quest leader or group leader can perform this action.

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | Config entry of the character to cancel the quest.             |

### Action `habitica.score_habit`

Increase the positive or negative streak of a habit.

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `config_entry` | no       |  Config entry of the character tracking the habit.                                                            |
| `task`         | no       |  The name, `task ID`, or **alias** of the habit to track.                                                         |
| `direction`    | no       |  `up` for positive progress or `down` for negative progress you want to track for your habit.                     |

### Action `habitica.score_reward`

Buy a custom reward with gold.

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `config_entry` | no       |  Config entry of the character buying the reward.                                                                 |
| `task`         | no       |  The name, `task ID`, or **alias** of the custom reward to buy.                                                   |

### Action `habitica.transformation`

Use a transformation item from your Habitica character's inventory on a member of your party or yourself.

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `config_entry` | no       |  Config entry of the character using the transformation item.                                                    |
| `item`         | no       |  The transformation item you want to use. Item must be in the character's inventory.                               |
| `target`       | no       |  The character you want to use the transformation item on. Matches by display name, username, or user ID.           |

#### Available transformation items

- **Snowball**: `snowball` (transforms into a snowfriend)
- **Spooky sparkles**: `spooky_sparkles` (transforms into a ghost)
- **Seafoam**: `seafoam` (transforms into a starfish)
- **Shiny seed** `shiny_seed` (transforms into flower)

### Action `habitica.get_tasks`

Fetch tasks from your Habitica account, with optional filters to narrow down the results for more precise task retrieval.

| Data attribute | Optional | Description                                                                                              |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| config_entry   | no       | Choose the Habitica character to retrieve tasks from.                                                    |
| type           | yes      | Filter tasks by type.  Valid types: "habits", "dailies", "todos", "rewards".                                                                                     |
| priority       | yes      | Filter tasks by difficulty. Valid values: "trivial", "easy", "medium", "hard".                                                                              |
| task           | yes      | Select specific tasks by matching their name (or task ID).                                               |
| tag            | yes      | Filter tasks that have one or more of the selected tags.                                                 |
| keyword        | yes      | Filter tasks by keyword, searching across titles, notes, and checklists.                                 |

## Automations

Get started with these automation examples for Habitica, each featuring ready-to-use blueprints!

### Auto-accept quest invitation

Automatically accepts quest invitations from your Habitica party and creates a persistent notification to inform you when a quest has been successfully accepted.

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/habitica-auto-accept-quest-invitation/791002" %}

{% details "Example YAML configuration" %}

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id: binary_sensor.habitica_pending_quest_invitation
    from: "off"
    to: "on"
actions:
  - action: habitica.accept_quest
    data:
      config_entry: config_entry_id
    response_variable: action_response
  - action: notify.persistent_notification
    data:
      title: You have been invited to a quest!
      message: >-
        ![{{action_response["key"]}}](https://habitica-assets.s3.amazonaws.com/mobileApp/images/inventory_quest_scroll_{{action_response["key"]}}.png)

        The invitation has been accepted, and the quest {% if
        action_response["active"] %}has already started{% else %}is waiting
        for other party members to join{% endif %}.
```

{% endraw %}

{% enddetails %}

{% note %}
When creating automations, be mindful of the [rate limits](#known-limitations). Frequent triggers or multiple concurrent automations can quickly exceed the allowed number of requests.
{% endnote %}

### Create "Empty the dishwasher" to-do

Automatically create a Habitica to-do when the dishwasher finishes its cycle.

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/habitica-create-to-do-when-dishwasher-finishes-its-cycle/786625" %}

{% details "Example YAML configuration" %}

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id: sensor.dishwasher
    from: "on"
    to: "off"

actions:
  - action: todo.add_item
    data:
      item: "Empty the dishwasher 🥣🍽️"
      due_date: "{{now().date()}}"
      description: "Empty the clean dishes from the dishwasher and load any dirty dishes that are waiting."
    target:
      entity_id: todo.habitica_to_dos
```

{% endraw %}

{% enddetails %}

### Complete toothbrushing tasks on your Habitica Dailies list

Automatically mark your morning and evening toothbrushing dailies as complete when your toothbrush usage is detected.

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/habitica-complete-toothbrushing-tasks-on-your-habitica-dailies-list/786631" %}

{% details "Example YAML configuration" %}

```yaml
triggers:
  - trigger: state
    entity_id: sensor.oralb_toothbrush_state
    to: "running"
    for:
      hours: 0
      minutes: 0
      seconds: 10 # Time delay for debouncing to avoid false triggers
actions:
  - choose:
      - conditions:
          - condition: time
            after: "05:00:00"
            before: "12:00:00"
        sequence:
          - action: todo.update_item
            data:
              item: "Brush your teeth in the morning 🪥"
              status: completed
            target:
              entity_id: todo.habitica_dailies
      - conditions: 
          - condition: time
            after: "18:00:00"
            before: "23:59:00"
        sequence:
          - action: todo.update_item
            data:
              item: "Brush your teeth before bed 🪥"
              status: completed
            target:
              entity_id: todo.habitica_dailies
```

{% enddetails %}

## Data updates

This integration retrieves data from Habitica every 60 seconds to ensure timely updates.

## Known limitations

Habitica imposes a rate limit of 30 requests per minute for third-party applications, which applies collectively to all tools and integrations you use.

This integration performs the following requests:

- 3 requests per data update (every 60 seconds).
- 1 request per action, such as executing skills or interacting with to-dos and dailies.
- 1 additional request 5 seconds after an action to sync the data with Habitica.

Please keep these limits in mind to avoid exceeding Habitica's request allowance. Efforts are ongoing to optimize the integration and reduce the number of requests it makes.

## Troubleshooting

The Habitica integration relies on an active internet connection to communicate with **Habitica**. If you encounter issues, verify that your network connection is stable. Additionally, the Habitica service itself may experience downtime, whether unexpected or due to scheduled maintenance. In these trying times of uncertainty and challenge, when fate tests your resolve, seek guidance from the [Habitica Outage Instructions](https://habitica.fandom.com/wiki/Outage_Instructions) on the community-maintained Habitica wiki — wisdom shared by adventurers who have faced such trials before.

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs stop the debug logging again (_download of debug log file will start automatically_). Further _if still possible_, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
