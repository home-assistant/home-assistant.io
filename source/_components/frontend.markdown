---
layout: page
title: "Frontend"
description: "Offers a frontend to Home Assistant."
date: 2015-12-06 21:35
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Other"
---

This offers the official frontend to control Home Assistant.

```yaml
# Example configuration.yaml entry
frontend:
```

## {% linkable_title Themes %}

Starting with version 0.49 you can define themes:

Example:

```yaml
# Example configuration.yaml entry
frontend:
  themes:
    happy:
      primary-color: pink
    sad:
      primary-color: blue
```

The example above defined two themes named `happy` and `sad`. For each theme you can set values for CSS variables. For a partial list of variables used by the main frontend see [ha-style.html](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/resources/ha-style.html).

There are 2 themes-related services:

 - `frontend.reload_themes`: reloads theme configuration from your `configuration.yaml` file.
 - `frontend.set_theme(name)`: sets backend-preferred theme name. 

Example in automation:

Set a theme at the startup of Home Assistant:

```yaml
automation:
  - alias: 'Set theme at startup'
    initial_state: 'on'
    trigger:
     - platform: homeassistant
       event: start
    action:
      service: frontend.set_theme
      data:
        name: happy
```

To enable "night mode": 

```yaml
automation:
  - alias: 'Set dark theme for the night'
    initial_state: True
    trigger:
      - platform: time
        at: '21:00'
    action:
      - service: frontend.set_theme
        data:
          name: darkred
```

### {% linkable_title Manual Theme Selection %}

When themes are enabled in the `configuration.yaml` file, a new option will show up in the Configuration panel under `configuration.yaml` called "Set a theme." You can then choose any installed theme from the dropdown list and it will be applied immediately.


## {% linkable_title Loading extra HTML %}

Starting with version 0.53 you can specify extra HTML files to load.

Example:

```yaml
# Example configuration.yaml entry
frontend:
  extra_html_url:
    - https://example.com/file1.html
    - /file2.html
```

Those will be loaded via `<link rel='import' href='{{ extra_url }}' async>` on any page (states and panels)
