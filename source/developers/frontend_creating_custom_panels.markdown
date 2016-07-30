---
layout: page
title: "Creating custom panels"
description: "Introduction to create custom panels for Home Assistant."
date: 2016-07-29 13:00
sidebar: true
comments: false
sharing: true
footer: true
---

Starting with 0.25 there is support for custom panels. This means that you can create a frontend in the way you want and hook it into Home Assistant.

Create a `__init__.py` file which is loading the panel in a sub-folder like `hello_panel` of your `.homeassistant/custom_components/` folder.

```python
"""A minimal custom panel example."""
import os

from homeassistant.components.frontend import register_panel

DOMAIN = 'hello_panel'
DEPENDENCIES = ['frontend']

PANEL_PATH = os.path.join(os.path.dirname(__file__), 'panel.html')


def setup(hass, config):
    """Initialize a minimal custom panel."""
    title = config.get(DOMAIN, {}).get('title')

    config = None if title is None else {'title': title}

    register_panel(hass, 'hello', PANEL_PATH, title='Hello World',
                   icon='mdi:appnet', config=config)
    return True
```

The `panel.html` contains the needed building blocks to create the elements inside the view.

```html
<dom-module id='ha-panel-hello'>
  <template>
    <style>
      :host {
        background: #f5f5f5;
        display: block;
        height: 100%;
        overflow: auto;
      }
      .mount {
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
        font-weight: 300;
      }
    </style>
    <p>Hello {{who}}. Greetings from Home Assistant.</p>
  </template>
</dom-module>

</script>
Polymer({
  is: 'ha-panel-hello',
  properties: {
    // Home Assistant object
    hass: {
      type: Object,
    },
    // If should render in narrow mode
    narrow: {
      type: Boolean,
      value: false,
    },
    // If sidebar is currently shown
    showMenu: {
      type: Boolean,
      value: false,
    },
    // Home Assistant panel info
    // panel.config contains config passed to register_panel serverside
    panel: {
      type: Object,
    },
    who: {
      type: String,
      value: 'You'
    }
  }
});
</script>
```

Create an entry for the new panel in your `configuration.yaml` file:

```yaml
hello_panel:
  title: 'Custom panel'
```

For more examples, see the [Custom panel Examples](/cookbook#custom-panel-examples) on our examples page.
