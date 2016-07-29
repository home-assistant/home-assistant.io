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

Create a `__init__.py` file which is loading the panel in a sub-folder like `sse_panel` of your `.homeassistant/custom_components/` folder.

```python
"""Custom panel example using Server-sent events."""
import os

from homeassistant.components.frontend import register_panel

DOMAIN = 'sse_panel'
DEPENDENCIES = ['frontend']

PANEL_PATH = os.path.join(os.path.dirname(__file__), 'sse.html')


def setup(hass, config):
    """Initialize the custom SSE panel."""
    title = config.get(DOMAIN, {}).get('title')

    config = None if title is None else {'title': title}

    register_panel(hass, 'sse', PANEL_PATH, title='Hello SSE',
                   icon='mdi:checkbox-marked-outline', config=config)
    return True
```

Use the sample from the [Server-sent Events](/developers/server_sent_events/)

```html
<!DOCTYPE html>
<html>
<body>
    <h1>Getting Home Assistant server events</h1>
    <div id="events"></div>
    <script type="text/javascript">
        var source = new EventSource("/api/stream");
        source.onmessage = function(event) {
            document.getElementById("events").innerHTML += event.data + "<br>";
        };
    </script>
</body>
</html>
```

Create an entry for the new panel in your `configuration.yaml` file:

```yaml
sse_panel:
  title: 'Server-sent Envent'
```

For more examples, see the [Custom panel Examples](/cookbook#custom-panel-examples) on our examples page.
