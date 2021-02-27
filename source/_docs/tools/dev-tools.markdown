---
title: "Developer Tools"
description: "Description of the Developer Tools."
---

The frontend contains a section called "Developer Tools".

<p class='img'>
<img src='/images/screenshots/developer-tools.png' />
Screenshot of Home Assistant's Developer Tools.
</p>

| Section |Description |
| ------- |----- |
| States | Sets the representation of an entity |
| Services | Calls services from integrations |
| Events | Fires events |
| Templates | Renders templates |

## What can I do with Developer Tools?

The Developer Tools is meant for **all** (not just for the developers) to quickly try out things - like calling services, updating states, raising events, and publishing messages in MQTT). It is also a necessary tool for those who write custom automations and scripts by hand. The following describes each of the sections in detail.

## Services

This section is used to call Services that are available in the ServiceRegistry.

The list of services in the “Service” dropdown are automatically populated based on the integrations that are found in the configuration, automation and script files.  If a desired service does not exist, it means either the integration is not configured properly or not defined in the configuration, automation or script files.

When a Service is selected, and if that service requires an `entity_id` to be passed, the “Entity” dropdown will automatically be populated with corresponding entities.

A Service may also require additional input to be passed. It is commonly referred to as “service data”. The service data is accepted in YAML format, and it may be optional depending on the service.

When an entity is selected from the Entity dropdown, it automatically populates service data with the corresponding `entity_id`. The service data YAML can then be modified to pass additional \[optional\] parameters. The following is an illustration on how to call a `light.turn_on` service.

To turn on a light bulb, use the following steps:
1.	Select `light.turn_on` from the Service dropdown
2.	Select the entity (typically the light bulb) from the Entity dropdown (if no entity_id is selected, it turns on ALL lights)
3.	If an entity is selected, the service data is populated with basic YAML that will be passed to the service. Additional data can also be passed by updating the YAML as below.

```yaml
entity_id: light.bedroom
brightness: 255
rgb_color: [255, 0, 0]
```

## States

This section shows all the available entities, their corresponding state and the attribute values. The state and the attribute information is what Home Assistant sees at run time. To update the entity with a new state, or a new attribute value, click on the entity, scroll to the top, and modify the values, and click on “SET STATE” button.

Note that this is the state representation of a device within Home Assistant. That means, it is what Home Assistant sees, and it does not communicate with the actual device in any manner. The updated information can still be used to trigger events, and state changes. To communicate with the actual device, it is recommended to call services in the services section above, instead of updating state.

For example, changing the `light.bedroom` state from `off` to `on` does not turn on the light. If there is an automation that triggers on the `state` change of the `light.bedroom`, it will be triggered – even though the actual bulb has not turned on. Also, when the bulb state changes – the state information will be overridden. In other words, the changes that are made through the “States” section are temporary, and is recommended to use for testing purposes only.

## Events

This Events section is as basic as it can get. It does only one thing – fires events on the event bus.
To fire an event, simply type the name of the event, and pass the event data in JSON format.
For ex: To fire a custom event, enter the `event_type` as `event_light_state_changed` and the event data JSON as

```yaml
state: on
```

If there is an automation that handles that event, it will be automatically triggered. See below:

```yaml
- alias: "Capture Event"
  trigger:
    platform: event
    event_type: event_light_state_changed
  action:
    - service: notify.notify
      data:
        message: "Light is turned {{ trigger.event.data.state }}"
```

## Template Editor

The Template Editor provides a way to quickly test templates prior to placing them into automations and scripts. A code editor is on the left side and your real-time output is displayed in the preview on the right side.

By default this will contain sample code that illustrates how templates can be written and tested. This sample code can be removed and replaced with your own. You can restore the default example by pressing the "Reset to Demo Template" button beneath the code editor.

For more information about Jinja2, visit [Jinja2 documentation](http://jinja.pocoo.org/docs/dev/templates/), and also read templating document [here](/topics/templating/).
