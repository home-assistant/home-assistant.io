---
title: Famn
description: Instructions on how to integrate Famn family calendars, chores, and todos with Home Assistant.
ha_category:
  - Calendar
  - Sensor
  - Todo
ha_release: 2026.9
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@danielkaldheim'
ha_domain: famn
ha_platforms:
  - calendar
  - sensor
  - todo
ha_integration_type: service
ha_quality_scale: bronze
---

The **Famn** {% term integration %} connects your [Famn](https://famn.app) family space with Home Assistant, so your home can react to family life: chores and todos appear as todo lists, family calendars show up in Home Assistant, and every change in Famn reaches Home Assistant instantly.

Automations can create todos in Famn (for example when the washing machine finishes), and whoever completes them in the Famn app earns task XP as usual.

## Prerequisites

- A Famn account with at least one space (family), created in the Famn app.
- The Famn app on your phone to approve the pairing.

The integration connects as a *paired device* of one space — the same mechanism Famn uses for wall displays. It can only see that one space, and you can revoke its access at any time from the Famn app.

{% include integrations/config_flow.md %}

During setup, Home Assistant shows a QR code and a pairing code:

1. Scan the QR code with your phone, or open the Famn app and go to **Settings** > **Spaces** > **Approve device**.
2. Select the space you want to connect and approve the pairing.
3. The pairing code expires after 5 minutes; restart the setup if it does.

To connect more than one space, add the integration once per space.

## Supported functionality

### Todo lists

Every chore list and todo list of the space becomes a todo entity:

- **Chore lists** are recurring tasks managed in Famn. Items can be checked off from Home Assistant; completing an item grants task XP to the family member, exactly as in the app. Chores cannot be created or edited from Home Assistant.
- **Todo lists** additionally support creating items — from the UI, from voice assistants via [Assist](/voice_control/), or from automations with the `todo.add_item` action (including a description and a due date). Items created from Home Assistant are marked as such in Famn.
- **Shopping lists** (grocery lists) are fully two-way: add items from Home Assistant — "add milk to the shopping list" via Assist works out of the box — and whoever is in the store sees them instantly in the Famn app; items checked off in the store disappear from Home Assistant just as fast.

Completed items disappear from the entity once Famn confirms them. Re-opening a completed item is not supported.

### Calendars

Every calendar of the space becomes a calendar entity, including entity calendars Famn maintains for vehicles and properties. Recurring events are expanded by Famn itself — exceptions, moved occurrences, and canceled dates are handled correctly. Calendars are read-only from Home Assistant; use [calendar triggers](/integrations/calendar/#automation) to automate on events.

### Sensors

- **Tasks due today** — how many open items across all lists are due before the end of the day, with `overdue` and `open_items` attributes. Overdue items count as due today.
- **Per-list due today** — the same count for each individual list.
- **Member XP** — one sensor per family member on the current weekly leaderboard, with `rank`, `chores_completed`, `current_streak_days`, `longest_streak_days`, and `season_ends_at` attributes. Famn seasons reset every Monday; a member without XP yet reads as `0`.
- **Dinner tonight** — what the Famn meal planner has planned for today, with the recipe image as the entity picture and `servings`, `prep_time`, and `notes` as attributes. Unknown on days without a plan.

### Notifications

The **Family** notify entity sends a message to every member of the space — pushed to each phone and shown in the Famn app's notification inbox, attributed to Home Assistant. Each family member with a Famn account also gets their own notify entity (for example `notify.famn_emma`) to reach just one person: *"Dinner is ready"* to whoever is upstairs. Famn rate-limits the pairing, so a runaway automation cannot spam the family.

```yaml
automation:
  - alias: "Water leak alert"
    triggers:
      - trigger: state
        entity_id: binary_sensor.water_leak_bathroom
        to: "on"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.famn_family
        data:
          title: "Alarm"
          message: "Water leak detected in the bathroom!"
```

### Events

Every realtime event from the space fires a `famn_event` on the event bus, whether or not it maps to an entity:

| Data | Description |
| ---- | ----------- |
| `topic` | What changed, for example `TaskItem`, `TaskList`, `Calendar`, `SpaceScore`. |
| `action` | What happened, for example `created`, `updated`, `event-created`, `xp-awarded`. |
| `space_id` | The paired space. |
| `payload` | The changed object as Famn sent it. |

## Data updates

The integration holds a live connection to Famn and receives changes as they happen — a chore checked off in the app updates Home Assistant within seconds. If the connection drops, the integration reconnects automatically and additionally polls every 15 minutes as a fallback.

## Automation examples

### Create a todo when the washing machine finishes

```yaml
automation:
  - alias: "Washing machine done"
    triggers:
      - trigger: state
        entity_id: sensor.washing_machine_status
        to: "finished"
    actions:
      - action: todo.add_item
        target:
          entity_id: todo.famn_todos
        data:
          item: "Empty the washing machine"
          description: "The wash cycle finished"
```

### Celebrate a completed chore

```yaml
automation:
  - alias: "Chore celebration"
    triggers:
      - trigger: event
        event_type: famn_event
        event_data:
          topic: TaskItem
          action: updated
    actions:
      - action: light.turn_on
        target:
          entity_id: light.kids_room
        data:
          effect: rainbow
```

### Evening reminder while chores remain

```yaml
automation:
  - alias: "Chores reminder"
    triggers:
      - trigger: time
        at: "19:00:00"
    conditions:
      - condition: numeric_state
        entity_id: sensor.famn_tasks_due_today
        above: 0
    actions:
      - action: tts.speak
        target:
          entity_id: tts.home
        data:
          media_player_entity_id: media_player.kitchen
          message: >
            There {{ 'is' if states('sensor.famn_tasks_due_today') | int == 1 else 'are' }}
            still {{ states('sensor.famn_tasks_due_today') }} chores to do today.
```

### Announce upcoming calendar events

```yaml
automation:
  - alias: "Leave for practice"
    triggers:
      - trigger: calendar
        entity_id: calendar.famn_familie
        event: start
        offset: "-00:30:00"
    actions:
      - action: notify.notify
        data:
          message: "{{ trigger.calendar_event.summary }} starts in 30 minutes."
```

## Known limitations

- The integration sees exactly one space per config entry; the Famn account itself is never exposed.
- Calendars and chores are read-only apart from completing items; the Famn app remains the place to create and edit them.
- Completions and created todos are attributed to the space owner in Famn's history (marked as done via Home Assistant); per-person attribution requires completing the item in the app.
- Member XP sensors follow Famn's weekly season and reset to `0` on Mondays.

## Troubleshooting

### The integration asks to be paired again

Famn revoked the device registration — for example, if it was deleted under **Settings** > **Spaces** > *space* > **Devices** in the app, or if Home Assistant was offline long enough for the credentials to expire (90 days). Re-authenticate to pair again; entities and history are kept.

### Entities stop updating instantly

The live connection may be blocked by a firewall or proxy; the integration then falls back to polling every 15 minutes. Enable debug logging to see the connection attempts:

```yaml
logger:
  logs:
    homeassistant.components.famn: debug
```

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Afterwards, also remove the paired device in the Famn app under **Settings** > **Spaces** > *space* > **Devices** to revoke its credentials.
