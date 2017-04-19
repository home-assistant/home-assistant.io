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

Any component has the possibility to add a panel to the frontend. Panels will be rendered full screen and have real-time access to the Home Assistant object via JavaScript. Examples of this in the app are map, logbook and history.

Adding a custom panel to your component is easy. For this example we're assuming your component is in `hello_panel.py`. Start by converting your panel to a folder. Create a folder called `hello_panel` and move `hello_panel.py` to `hello_panel/__init__.py`. In that same folder, create a file `panel.html`.

Your component should register the panel. The minimum required code for your component is:

```python
"""A minimal custom panel example."""
import os

from homeassistant.components.frontend import register_panel

DOMAIN = 'hello_panel'
DEPENDENCIES = ['frontend']

PANEL_PATH = os.path.join(os.path.dirname(__file__), 'panel.html')


def setup(hass, config):
    """Initialize a minimal custom panel."""
    register_panel(hass, 'hello', PANEL_PATH, title='Hello World',
                   icon='mdi:appnet', config=config.get(DOMAIN, {}))
    return True
```

The `panel.html` contains the needed building blocks to create the elements inside the view.

```javascript
<dom-module id='ha-panel-hello'>
  <template>
    <style>
      p {
        font-weight: bold;
      }
    </style>
    <p>Hello {% raw %}{{who}}{% endraw %}. Greetings from Home Assistant.</p>
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
      computed: 'computeWho(panel)',
    }
  },

  computeWho: function (panel) {
    return panel && panel.config && panel.config.who ? panel.config.who : 'World';
  },
});
</script>
```

Create an entry for the new panel in your `configuration.yaml` file:

```yaml
hello_panel:
  who: 'You'
```

For more examples, see the [Custom panel Examples](/cookbook#custom-panel-examples) on our examples page.
