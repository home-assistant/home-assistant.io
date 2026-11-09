---
description: Instructions on how to track the sun within Home Assistant.
ha_release: pre 0.7
ha_domain: sun
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Sun** {% term integration %} calculates sun-related times such as sunrise, sunset, dawn, and dusk based on your configured home location. This means that all time-based calculations and triggers will be accurate for your specific location, as defined in your [basic configuration](/docs/configuration/basic/).

The sun {% term integration %} will use the location as
{% my general title="configured in your Home Assistant configuration" %} to
track if the sun is above or below the horizon. The sun can be used within
automations as
[a trigger with an optional offset to simulate dawn/dusk][sun_trigger] or as
[a condition with an optional offset to test if the sun has already set or risen][sun_condition].

[sun_trigger]: /docs/automation/trigger/#sun-trigger
[sun_condition]: /conditions/sun/

## Configured by default

This {% term integration %} is configured and installed by default, so you don't need
to set it up yourself, unless you've disabled or removed the
[`default_config:`](/integrations/default_config/) line from your
YAML configuration.

If that is the case, follow the steps below to set it up.

{% include integrations/config_flow.md %}

## YAML configuration

Alternatively, you can configure and set up this integration manually via YAML.
To enable the sun integration in your installation, add the
following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sun:
```

<p class='img'>
<img src='/images/screenshots/more-info-dialog-sun.png' />
</p>

## Automation trigger

Home Assistant provides a set of dedicated sun triggers for sunrise, sunset, dawn, dusk, solar noon, solar midnight, golden hour, blue hour, midnight sun, polar night, and the sun's elevation. See the [list of triggers](#list-of-triggers) below for the full set.

For example, to run an automation at sunrise, use the [Sunrise](/triggers/sun.sunrise/) trigger. In the automation editor, add a trigger and search for **Sunrise**. To run it before or after sunrise, set an **Offset**, and choose **Before** or **After** under **Offset type**.

In YAML, the Sunrise trigger looks like this:

```yaml
triggers:
  - trigger: sun.sunrise
```

### Classic sun trigger

The classic `sun` trigger is still supported. It reacts when the sun rises or sets, with an optional offset. The dedicated triggers offer more sun events, such as dawn, dusk, and golden hour, and let you set the offset as **Before** or **After** in the UI.

The classic sun trigger needs the trigger type `sun` and an event (`sunset` or `sunrise`):

```yaml
triggers:
  - trigger: sun
    event: sunrise
```

The following keys are available:

- **`event`**: Required. Either `sunrise` or `sunset`.
- **`offset`**: Optional. A time offset relative to the sun event, specified as a number of seconds or in `HH:MM:SS` format. A negative value makes the trigger react _before_ the sun event, a positive value makes it react _after_.

For example, if sunrise is at 06:00 and you set `offset: "-01:00:00"`, the automation runs at 05:00. With `offset: "01:00:00"`, it runs at 07:00. The same rule applies to sunset.

{% tip %}

Because the duration of twilight varies throughout the year, a fixed offset is not always the best way to trigger automations around dawn or dusk. For more precise dawn or dusk automations, use the [Dawn](/triggers/sun.dawn/) or [Dusk](/triggers/sun.dusk/) trigger, where you can choose the **Twilight type**. To react at a specific angle of the sun, use the [Sun elevation crossed threshold](/triggers/sun.elevation_crossed_threshold/) trigger.

{% endtip %}

### Sun elevation triggers

The sun elevation is the angle between the sun and the horizon. To run an automation when the sun reaches a specific angle, use the [Sun elevation crossed threshold](/triggers/sun.elevation_crossed_threshold/) trigger. To react to every elevation update, use the [Sun elevation changed](/triggers/sun.elevation_changed/) trigger instead.

This is useful for automations around dawn or dusk because the length of twilight changes during the year. A value between `0` degrees and `-6` degrees is often used for twilight. For example, `-4` degrees can be a practical point for turning on outdoor lights.

{% example %}
trigger: |
  trigger: sun.elevation_crossed_threshold
  options:
    threshold:
      type: below
      value:
        number: -4
{% endexample %}

### Maintains entity `sun.sun`

| Possible state  | Description                        |
| --------------- | ---------------------------------- |
| `above_horizon` | When the sun is above the horizon. |
| `below_horizon` | When the sun is below the horizon. |

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Sensors

The sensors are also available as attributes on the `sun.sun` entity for backward compatibility.

| Sensors       | Description                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Next rising   | Date and time of the next sun rising (in UTC).                                                                         |
| Next setting  | Date and time of the next sun setting (in UTC).                                                                        |
| Next dawn     | Date and time of the next dawn (in UTC).                                                                               |
| Next dusk     | Date and time of the next dusk (in UTC).                                                                               |
| Next noon     | Date and time of the next solar noon (in UTC).                                                                         |
| Next midnight | Date and time of the next solar midnight (in UTC).                                                                     |
| Elevation     | Solar elevation. This is the angle between the sun and the horizon. Negative values mean the sun is below the horizon. |
| Azimuth       | Solar azimuth. The angle is shown clockwise from north.                                                                |

## Binary sensors

The binary sensors are also available as attributes on the `sun.sun` entity for backward compatibility.

| Sensors       | Description                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Solar rising  | `on` when the sun is currently rising (after solar midnight and before solar noon).                                    |
