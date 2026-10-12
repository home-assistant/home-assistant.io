---
title: Activity
description: Instructions on how to enable the activity integration for Home Assistant.
ha_category:
  - History
ha_release: 0.7
ha_domain: logbook
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Activity** {% term integration %} provides a different perspective on the history of your house by showing all the changes that happened to your house in reverse chronological order. It depends on the [Recorder](/integrations/recorder/) integration for storing the data. This means that if the Recorder integration is set up to use a database such as MySQL or PostgreSQL, the Activity integration uses that database instead of the default SQLite database.

## Viewing activity in the Activity panel

The **Activity** panel shows recorded changes and events in your home, with the most recent events first. You can narrow it down to the areas, devices, or entities you are interested in.

1. In the sidebar, select **Activity**.
   - On a wide screen, the **Sources** pane opens on the left.
   - On a narrow screen, such as a phone, select **Sources** {% icon "mdi:tune-variant" %} in the toolbar to open it.
2. Optional: To see only part of your activity, in the **Sources** pane, select **Add target**, then select the floors, areas, devices, entities, or labels you want to see.
3. Optional: To narrow down the activity further, use the filters below the targets. The filters also work without a target.
   - **Type**: shows only activity of entities of the selected types. For example, select the **Motion** type under **Binary sensor** to see only motion activity.
   - **Integrations**: shows only activity of entities that are provided by the selected integrations.
   - Home Assistant remembers your targets and filters the next time you open the panel. To remove all of them, select **Clear filter** {% icon "mdi:filter-variant-remove" %} at the top of the pane.
4. To change the time period, select the date range in the toolbar.
   - To move to the previous or next period, select the arrows next to the date range.
5. Optional: In the top right corner, select **Menu** {% icon "mdi:dots-vertical" %} for more options:
   - **Refresh**: loads the latest activity.
   - **Download data**: exports the activity that is currently shown in CSV format.
   - **Reset**: removes your targets and filters and goes back to the default time period.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your {% term "`configuration.yaml`" %} file. If that is the case, the following example shows you how to enable this integration manually, by adding it to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
logbook:
```

{% configuration %}
exclude:
  description: "Entities and domains to hide from the **Activity** panel. ([Configure filter](#configure-filter))"
  required: false
  type: map
  keys:
    entities:
      description: The list of entity IDs to hide from the **Activity** panel.
      required: false
      type: list
    entity_globs:
      description: The entities that match a listed pattern to hide from the **Activity** panel (for example, `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to hide from the **Activity** panel.
      required: false
      type: list
include:
  description: "Entities and domains to show in the **Activity** panel. ([Configure filter](#configure-filter))"
  required: false
  type: map
  keys:
    entities:
      description: The list of entity IDs to show in the **Activity** panel.
      required: false
      type: list
    entity_globs:
      description: The entities that match a listed pattern to show in the **Activity** panel (for example, `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to show in the **Activity** panel.
      required: false
      type: list
{% endconfiguration %}

## Configure filter

To narrow down what you see in the **Activity** panel, use the **Sources** pane, as described in [Viewing activity in the Activity panel](#viewing-activity-in-the-activity-panel). If you want to hide some entities from the activity for all the users, all the time, you can set up a filter in your {% term "`configuration.yaml`" %} file.

By default, the **Activity** panel uses the same filter as the [Recorder](/integrations/recorder/) integration. To limit which entities are shown in the **Activity** panel, use the `include` and `exclude` parameters.

```yaml
# Example filter to include specified domains and exclude specified entities
logbook:
  include:
    domains:
      - alarm_control_panel
      - light
    entity_globs:
      - binary_sensor.*_occupancy
  exclude:
    entities:
      - light.kitchen_light
```

{% include common-tasks/filters.md %}

### Common filtering examples

To hide the activity of some entities or domains, add the `exclude` parameter:

```yaml
# Example of excluding domains and entities from activity tracking (formerly called logbook)
logbook:
  exclude:
    entities:
      - sensor.last_boot
      - sensor.date
    entity_globs:
      - sensor.weather_*
    domains:
      - sun
```

To see only the activity of specific entities or domains, use the `include` parameter:

```yaml
# Example to show how to only track the activity of the listed domains and entities
logbook:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

You can also use the `include` list and filter out some entities or domains with
an `exclude` list. Usually, this makes sense if you define domains on the include
side and filter out some specific entities.

```yaml
# Example of combining include and exclude configurations for activity tracking
logbook:
  include:
    domains:
      - sensor
      - switch
      - media_player
  exclude:
    entities:
      - sensor.last_boot
      - sensor.date
    entity_globs:
      - sensor.weather_*
```

### Hiding entities and domains

If you have `sensor.date` to show the current date in the UI, but you do not want to see its change every day in the **Activity** panel, you can hide it. To hide entities, add them to the `exclude` > `entities` list.

To hide all activity of a whole domain, add it to the `exclude` > `domains` list. For example, if you use the `sun` domain only in automations, you might not want to see every sunrise and sunset in the **Activity** panel.

Hidden entities still take up space in the database. To save space, exclude them in the [Recorder](/integrations/recorder/) integration instead.

### Custom entries

To add your own entries to the **Activity** panel, use the [**Log activity**](/actions/logbook.log/) action in an automation or a script.

{% important %}
When calling the `logbook.log` action without a `domain` or `entity_id`, entries will be added with the `logbook` domain. Ensure that the `logbook` domain is not filtered away if you want these entries to appear in your **Activity** panel.
{% endimportant %}

{% note %}
Some entities change so often that they would fill the **Activity** panel. Home Assistant does not show the activity of these entities:

- Sensors that have a unit of measurement, a state class, or a numeric device class, such as temperature or power.
- Counter, image, and proximity entities.

{% endnote %}

{% include integrations/actions.md %}
