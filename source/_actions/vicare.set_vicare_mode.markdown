---
title: "Set ViCare mode"
action: vicare.set_vicare_mode
domain: vicare
description: "Sets the mode of the climate device as defined by Viessmann."
---

The **Set ViCare mode** action sets the mode of the climate device as defined by Viessmann.

This gives you more fine-grained control of the heating modes than the standard [`climate.set_hvac_mode`](/integrations/climate/) action, because it exposes the Viessmann operation modes directly.

{% include actions/targets.md domain="climate" %}

{% include actions/ui_header.md %}

To set the ViCare mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Viessmann ViCare: Set ViCare mode**.
6. Select the climate entity as the target, then enter the **ViCare mode**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
ViCare mode:
  description: The new ViCare mode. For the values your device supports, see the `vicare_modes` attribute of the climate entity.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vicare.set_vicare_mode`. A basic example looks like this:

{% example %}
action: |
  action: vicare.set_vicare_mode
  target:
    entity_id: climate.living_room
  data:
    vicare_mode: heating
{% endexample %}

This sets the selected climate device to the `heating` mode.

### Options in YAML

{% options_yaml %}
vicare_mode:
  description: >
    The new ViCare mode. For the values your device supports, see the
    `vicare_modes` attribute of the climate entity. Depending on the
    device, supported values include `dhw`, `dhwAndHeating`,
    `dhwAndHeatingCooling`, `forcedNormal`, `forcedReduced`, `heating`,
    and `standby`.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

The available modes depend on your specific Viessmann device. Always check the `vicare_modes` attribute of the climate entity for the values it accepts.

For a mapping of the standard Home Assistant climate modes to Viessmann operation modes, see [setting the HVAC mode](/integrations/vicare/#setting-the-hvac-mode) on the integration page.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
