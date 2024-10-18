---
title: Home Assistant frontend
description: Offers a frontend to Home Assistant.
ha_category:
  - Other
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/frontend'
ha_domain: frontend
ha_integration_type: system
---

This offers the official frontend to control Home Assistant. This integration is enabled by default unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your {% term "`configuration.yaml`" %} file. If that is the case, the following example shows you how to enable this integration manually in the {% term "`configuration.yaml`" %} file.

```yaml
# Example configuration.yaml entry
frontend:
```

{% configuration %}
  themes:
    description: Allows you to define different themes. See below for further details.
    required: false
    type: map
    keys:
      "[identifier]":
        description: Name to use in the frontend.
        required: true
        type: [list, map]
        keys:
          "[css-identifier]":
            description: The CSS identifier.
            required: true
            type: [list, string]
  extra_module_url:
    description: "List of additional JavaScript modules to load in `latest` JavaScript mode."
    required: false
    type: list
  extra_js_url_es5:
    description: "List of additional JavaScript code to load in `es5` JavaScript mode."
    required: false
    type: list
  development_repo:
    description: Allows you to point to a directory containing frontend files instead of taking them from a prebuilt PyPI package. Useful for Frontend development.
    required: false
    type: string
{% endconfiguration %}

## Defining themes

### Theme format

The frontend integration allows you to create custom themes to influence the look and feel of the user interface.
Example of a configuration entry in the {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
frontend:
  themes:
    happy:
      primary-color: pink
      accent-color: orange
    sad:
      primary-color: steelblue
      accent-color: darkred
```

The example above defines two themes named `happy` and `sad`. For each theme, you can set values for CSS variables. If you want to provide hex color values, wrap those in quotation marks, since otherwise, YAML would consider them a comment (`primary-color: "#123456"`).

### Supported theme variables

#### Primary and accent color

Primary and accent colors are the main colors of the application.
They can be changed it using `primary-color` and `accent-color` variables.

#### State color

Each entity has its own color, based on `domain`, `device_class`, and `state`, to be easily recognizable. Theses colors are used in [dashboards](/dashboards/) and [history](/integrations/history/). Home Assistant has default color rules that fit most use cases.

Here is a list of domains that support colors: `alarm_control_panel`, `alert`, `automation`, `binary_sensor`, `calendar`, `camera`, `climate`, `cover`, `device_tracker`, `fan`, `group`, `humidifier`, `input_boolean`, `light`, `lock`, `media_player`, `person`, `plant`, `remote`, `schedule`, `script`, `siren`, `sun`, `switch`, `timer`, `update`, and `vacuum`.

The color rules can be customized using theme variables:

1. `state-{domain}-{device_class}-{state}-color`
2. `state-{domain}-{state}-color`
3. `state-{domain}-(active|inactive)-color`
4. `state-(active|inactive)-color`

Note that the variables will be used in the listed order, so if multiple match your entity, the first matching variable (= most specific one) will be used.

```yaml
# Example configuration.yaml entry
frontend:
  themes:
    my_theme:
      state-cover-garage-open-color: "#ff0000"
      state-media_player-inactive-color: "#795548"
```

The example above defines red color for open garage doors and brown color for inactive media players.

### Unsupported theme variables

Although we do our best to keep things working, the behavior of other theme variables can change between releases. For a partial list of variables used by the main frontend see [ha-style.ts](https://github.com/home-assistant/frontend/blob/master/src/resources/ha-style.ts).

### Dark mode support

It is also possible to create themes that are based on the default dark mode theme. New themes can also support both light and dark mode and allow the user to switch between those on the user profile page:

{% my profile badge %}

Extended example to show the mode definitions.

```yaml
# Example configuration.yaml entry
frontend:
  themes:
    happy:
      primary-color: pink
      text-primary-color: purple
    sad:
      primary-color: steelblue
      modes:
        dark:
          secondary-text-color: slategray
    day_and_night:
      primary-color: coral
      modes:
        light:
          secondary-text-color: olive
        dark:  
          secondary-text-color: slategray
```

Theme `happy`: Same as in the previous example. This legacy format is still supported and will behave as before and automatically use the default light theme as the base.

Theme `sad`: By using the new `modes` key plus the subkey `dark` this theme will now be based on the default dark theme. The final theme rules are determined in three steps: First, the default dark theme CSS variables will be applied, then second the CSS variables from the top level of the theme that are mode-independent (`primary-color: steelblue` in this example) and lastly the mode-specific CSS variables will be layered on top (`secondary-text-color: slategray`).

Note: Since this example theme only has a `dark` mode defined, this mode will automatically be used.

Theme `day_and_night`: This theme has both a `light` and a `dark` mode section. That tells the frontend to allow the user to choose which mode to use from the user profile (default selection is based on the system settings). Independent of the selection, the primary color will be set to coral, but based on the chosen mode either the default light or dark theme will be used as the basis for rendering, plus the secondary text color will be either olive or slategray.

### Theme configuration splitting

As with all configuration, you can either:

- Directly specify the themes inside your {% term "`configuration.yaml`" %} file.
- Put them into a separate file (e.g., `themes.yaml`) and include that in your configuration (`themes: !include themes.yaml`).
- Create a dedicated folder (e.g., `my_themes`) and include all files from within this folder (`themes: !include_dir_merge_named my_themes`).

For more details about splitting up the configuration into multiple files, see [this page](/docs/configuration/splitting_configuration/).

Check our [community forums](https://community.home-assistant.io/c/projects/themes) to find themes to use.

## Setting themes

There are two themes-related actions:

- `frontend.reload_themes`: Reloads theme configuration from your {% term "`configuration.yaml`" %} file.
- `frontend.set_theme`: Sets backend-preferred theme name.

### Action `set_theme`

| Data attribute | Description                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `name`         | Name of the theme to set, `default` for the default theme or `none` to restore to the default.      |
| `mode`         | If the theme should be applied in light or dark mode `light` or `dark` (Optional, default `light`). |

If no dark mode backend theme is set, the light mode theme will also be used in dark mode.
The backend theme settings will be saved and restored on a restart of Home Assistant.

### Manual theme selection

When themes are enabled in the {% term "`configuration.yaml`" %} file, a new option will show up in the user profile page (accessed by clicking your user account initials at the bottom of the sidebar). You can then choose any installed theme from the dropdown list and it will be applied immediately.
This will overrule the theme settings set by the above actions, and will only be applied to the current device.

<p class='img'>
  <img src='/images/frontend/user-theme.png' />
  Set a theme
</p>

## Loading extra JavaScript

Starting with version 0.95 you can load extra custom JavaScript.

Example:

```yaml
# Example configuration.yaml entry
frontend:
  extra_module_url:
    - /local/my_module.js
  extra_js_url_es5:
    - /local/my_es5.js
```

Modules will be loaded with `import({{ extra_module }})`, on devices that support it (`latest` mode).
For other devices (`es5` mode) you can use `extra_js_url_es5`, this will be loaded with `<script defer src='{{ extra_module }}'></script>`.

The ES5 and module version will never both be loaded, depending on if the device supports `import` the module of ES5 version will be loaded.

### Manual language selection

The browser language is automatically detected. To use a different language, go to the user profile page (accessed by clicking your user account initials at the bottom of the sidebar) and select one. It will be applied immediately.

<p class='img'>
  <img src='/images/frontend/user-language.png' />
  Choose a Language
</p>
