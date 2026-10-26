---
title: "Set temporary hold"
action: nuheat.set_temporary_hold
domain: nuheat
description: "Hold a NuHeat thermostat at a target temperature until a chosen future date and time."
related_actions:
  - climate.set_temperature
  - climate.set_preset_mode
  - climate.set_hvac_mode
---

Use this action when you want a NuHeat temperature hold to end at a chosen time instead of the next scheduled event. When the hold expires, the thermostat resumes its schedule. Changing the target during the hold preserves its end time.

{% include actions/ui_header.md %}

To add a timed hold to an existing automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open your automation or script.
3. In **Then do**, select **Add action**.
4. Select what you want to control. Under **By target** (see [Targets](#targets)), select your NuHeat climate entity.
5. Select **Set temporary hold**.
6. Enter **Target temperature** in Home Assistant's temperature unit.
7. Choose a future date and time in **Hold until**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Target temperature:
  description: The temperature to maintain, in Home Assistant's configured temperature unit. Home Assistant uses fallback control limits of 7–35 °C, approximately 45–95 °F.
  required: true
Hold until:
  description: A future date and time when the hold ends. Local times use Home Assistant's timezone. There is no default expiry.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nuheat.set_temporary_hold`. Use `target` to select your NuHeat climate entity. Both `temperature` and `hold_until` are required.

For an existing automation or script, this action sets a one-hour hold at 21 °C. If Home Assistant uses Fahrenheit, replace `21` with a suitable Fahrenheit target, such as `70`. Replace the example entity with your thermostat.

{% example %}
action: |
  action: nuheat.set_temporary_hold
  target:
    entity_id: climate.floor_heating
  data:
    temperature: 21
    hold_until: "{{ (utcnow() + timedelta(hours=1)).isoformat() }}"
{% endexample %}

### Options in YAML

{% options_yaml %}
temperature:
  description: The temperature to maintain, in Home Assistant's configured temperature unit. There is no default target.
  required: true
  type: float
hold_until:
  description: A future date and time. Without a UTC offset, the value uses Home Assistant's timezone. Include an explicit offset during an ambiguous local time, such as a daylight-saving clock change.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" entity_type="NuHeat climate entity" example="climate.floor_heating" %}

## Good to know

- Both fields are required and have no default value.
- A past expiry or a nonexistent local time is rejected. An ambiguous local time requires an explicit UTC offset.
- The target must be finite and within Home Assistant's fallback control range. These limits are not the thermostat's native hardware limits.
- This action sets a timed hold even if the thermostat was previously following a schedule, in Manual operation, or in Standby.
- **Temporary hold** selected as a climate preset ends at the next scheduled event. This action lets you choose an explicit expiry instead.
- If the thermostat is unavailable, check its connection in the NuHeat app before trying again.
- Cloud confirmation can take a few seconds. Home Assistant does not automatically retry a write if its outcome is uncertain.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: replace a preset hold with a chosen expiry

In an existing automation that selects **Temporary hold**, replace that action with **Set temporary hold** when you need a specific end time. Keep the same thermostat target, enter **Target temperature**, and choose a future **Hold until**. This changes the hold duration without requiring you to change the automation's trigger.

### Automation: change the target without extending the hold

In an existing automation or script that changes the temperature during a timed hold, use **Set thermostat target temperature** for the same NuHeat entity. Home Assistant preserves the hold's confirmed end time. Use **Set temporary hold** again only when you also want to choose a new expiry.

{% include actions/stuck.md %}

{% include actions/related.md %}
