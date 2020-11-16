---
title: Home Assistant Frontend
description: Offers a frontend to Home Assistant.
ha_category:
  - Other
ha_release: 0.7
ha_iot_class:
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/frontend'
ha_domain: frontend
---

This offers the official frontend to control Home Assistant. This integration is by default enabled, unless you've disabled or removed the [`default_config:`](https://www.home-assistant.io/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
frontend:
```

{% configuration %}
  javascript_version:
    description: "DEPRECATED, it is now done using feature detection in the browser. Version of the JavaScript to serve to clients. Options: `es5` - transpiled so old browsers understand it.  `latest` - not transpiled, so will work on recent browsers only. `auto` - select a version according to the browser user-agent. The value in the configuration can be overiden by putting `es5` or `latest` in the URL. For example `http://localhost:8123/states?es5` "
    required: false
    type: string
    default: auto
  themes:
    description: Allow to define different themes. See below for further details.
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
    description: "List of additional javascript modules to load in `latest` javascript mode."
    required: false
    type: list
  extra_js_url_es5:
    description: "List of additional javascript code to load in `es5` javascript mode."
    required: false
    type: list
  development_repo:
    description: Allow to point to a directory containing frontend files instead of taking them from a pre-built PyPI package. Useful for Frontend development.
    required: false
    type: string
{% endconfiguration %}


## Defining Themes

Starting with version 0.49 you can define themes:

```yaml
# Example configuration.yaml entry
frontend:
  themes:
    happy:
      primary-color: pink
    sad:
      primary-color: blue
```

The example above defined two themes named `happy` and `sad`. For each theme you can set values for CSS variables. For a partial list of variables used by the main frontend see [ha-style.ts](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/resources/ha-style.ts).

Check our [community forums](https://community.home-assistant.io/c/projects/themes) to find themes to use.

### Setting themes

There are 2 themes-related services:

 - `frontend.reload_themes`: reloads theme configuration from your `configuration.yaml` file.
 - `frontend.set_theme`: sets backend-preferred theme name.

 ### Service `set_theme`

| Service data attribute | Description                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `name`                 | Name of the theme to set, `default` for the default theme or `none` to restore to the default.      |
| `mode`                 | If the theme should be applied in light or dark mode `light` or `dark` (Optional, default `light`)  |

If no dark mode backend theme is set, the light mode theme will also be used in dark mode.
The backend theme settings will be saved and restored on a restart of Home Assistant.

### Manual Theme Selection

When themes are enabled in the `configuration.yaml` file, a new option will show up in the user profile page (accessed by clicking your user account initials at the bottom of the sidebar). You can then choose any installed theme from the dropdown list and it will be applied immediately.
This will overrule the theme settings set by the above service calls, and will only be applied to the current device.

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
For other devices (`es5` mode) you can use `extra_js_url_es5`, this will be loaded with `<script defer src='{{ extra_module }}'></script>`

The ES5 and module version will never both be loaded, depending on if the device supports `import` the module of ES5 version will be loaded.

### Manual Language Selection

The browser language is automatically detected. To use a different language, go to the user profile page (accessed by clicking your user account initials at the bottom of the sidebar) and select one. It will be applied immediately.

<p class='img'>
  <img src='/images/frontend/user-language.png' />
  Choose a Language
</p>
