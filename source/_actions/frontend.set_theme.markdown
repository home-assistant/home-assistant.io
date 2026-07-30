---
title: "Set theme"
action: frontend.set_theme
domain: frontend
description: "Sets the theme Home Assistant uses by default."
related_actions:
  - frontend.reload_themes
---

Use this action to set the theme Home Assistant uses by default, for light mode and, optionally, for dark mode. A common use is to switch themes automatically, for example a darker look in the evening and a lighter one during the day.

The theme you set here is saved and restored when Home Assistant restarts. If someone picks a theme manually on their [user profile](/integrations/frontend/#applying-themes), that choice overrides this action for that person.

## Prerequisites

- The theme has to be installed and enabled before you can set it. See [defining themes](/integrations/frontend/#defining-themes).
- Only administrators can run this action.

{% include actions/ui_header.md %}

To set the theme from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Set theme**.
6. Select the **Theme** to use, and optionally a **Dark theme override**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Theme:
  description: The theme to use by default. Select **default** to use the standard Home Assistant theme.
  required: false
Dark theme override:
  description: The theme to use in dark mode. When no dark override is set, the light-mode theme is used in dark mode as well.
  required: false
{% endoptions_ui %}

Set at least one of **Theme** or **Dark theme override**. Any option you leave out keeps its previous value.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `frontend.set_theme`. A basic example looks like this:

{% example %}
action: |
  action: frontend.set_theme
  data:
    name: "default"
{% endexample %}

This sets the default light-mode theme back to the standard Home Assistant theme.

### Options in YAML

{% options_yaml %}
name:
  description: The theme to use by default. Use `default` to use the standard Home Assistant theme.
  required: false
  type: string
name_dark:
  description: The theme to use in dark mode. Use `none` to remove the dark-mode override, so the light-mode theme is also used in dark mode.
  required: false
  type: string
{% endoptions_yaml %}

You must set at least one of `name` or `name_dark`. Any option you leave out keeps its previous value.

## Good to know

- A theme someone selects on their own [user profile](/integrations/frontend/#applying-themes) overrides this action for that person, across their devices.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: a dark theme at night, a light theme during the day

Switch to a darker theme at sunset and back to a lighter one at sunrise.

- **Trigger**: Sunset
- **Trigger**: Sunrise
- **Action**: Set theme, picking the matching theme for each

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Day and night theme"
  triggers:
    - trigger: sun.sunset
      id: "night"
    - trigger: sun.sunrise
      id: "day"
  actions:
    - choose:
        - conditions:
            - condition: trigger
              id: "night"
          sequence:
            - action: frontend.set_theme
              data:
                name: "HA Dark"
        - conditions:
            - condition: trigger
              id: "day"
          sequence:
            - action: frontend.set_theme
              data:
                name: "HA Light"
{% endexample %}

{% enddetails %}

### Automation: apply your preferred light and dark themes at startup

Set both a light-mode theme and a dark-mode override whenever Home Assistant starts, so every user and device falls back to your preferred look.

- **Trigger**: Home Assistant starts
- **Action**: Set theme, with both a theme and a dark theme override

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Apply preferred themes on startup"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: frontend.set_theme
      data:
        name: "HA Light"
        name_dark: "HA Dark"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
