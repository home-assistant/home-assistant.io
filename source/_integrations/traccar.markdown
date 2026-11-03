---
description: Instructions how to use Traccar GPS tracker to track devices in Home Assistant.
ha_release: 0.83
ha_domain: traccar
---

`Traccar` uses GPS for tracking and has support for over 1500 different types of devices. You can use the [Traccar Client](https://www.traccar.org/client/) app on a smartphone via `webhook`.

{% tip %}
Looking for documentation on how to communicate with a Traccar Server? See the [Traccar Server](/integrations/traccar_server/) integration documentation.
{% endtip %}

To configure Traccar Client, you must set it up via the integrations panel in the configuration screen. This will give you the webhook URL to use during mobile device configuration. This URL has to be set in the Traccar app.

{% include integrations/config_flow.md %}
