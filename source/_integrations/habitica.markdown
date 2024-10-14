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
