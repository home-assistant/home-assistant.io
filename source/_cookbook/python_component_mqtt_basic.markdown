---
title: "Basic MQTT Example"
description: ""
ha_category: Custom Python Component Examples
---

<div class='note'>

This example requires you to have the [MQTT integration](/integrations/mqtt/) up and running.

</div>

This is a simple hello world example to show the basics of using MQTT in a custom integration. To use this example, create the file `<config dir>/custom_components/hello_mqtt.py` and copy the below example code.

This example follows a topic on MQTT and updates the state of an entity to the last message received on that topic. It will also register a service 'set_state' that will publish a message to the MQTT topic that we're listening to.

```python
import homeassistant.loader as loader

# The domain of your component. Should be equal to the name of your component.
DOMAIN = "hello_mqtt"

# List of integration names (string) your integration depends upon.
DEPENDENCIES = ["mqtt"]


CONF_TOPIC = "topic"
DEFAULT_TOPIC = "home-assistant/hello_mqtt"


def setup(hass, config):
    """Set up the Hello MQTT component."""
    mqtt = hass.components.mqtt
    topic = config[DOMAIN].get(CONF_TOPIC, DEFAULT_TOPIC)
    entity_id = "hello_mqtt.last_message"

    # Listener to be called when we receive a message.
    # The msg parameter is a Message object with the following members:
    # - topic, payload, qos, retain
    def message_received(msg):
        """Handle new MQTT messages."""
        hass.states.set(entity_id, msg.payload)

    # Subscribe our listener to a topic.
    mqtt.subscribe(topic, message_received)

    # Set the initial state.
    hass.states.set(entity_id, "No messages")

    # Service to publish a message on MQTT.
    def set_state_service(call):
        """Service to send a message."""
        mqtt.publish(topic, call.data.get("new_state"))

    # Register our service with Home Assistant.
    hass.services.register(DOMAIN, "set_state", set_state_service)

    # Return boolean to indicate that initialization was successfully.
    return True
```

Load the integration by adding the following to your `configuration.yaml`. When your integration is loaded, a new entity should popup and there should be a new service available to call.

```yaml
# configuration.yaml entry
hello_mqtt:
  topic: some_mqtt/topic/here
```

You can call the service with example payload:

```json
{
  "new_state": "some new state"
}
```
