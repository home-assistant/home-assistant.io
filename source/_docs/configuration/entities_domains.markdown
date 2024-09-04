---
title: "Entities and domains"
description: "Describes what entities and domains are in Home Assistant."
related:
  - docs: /docs/configuration/state_object/
    title: State object, entity state
---

Your {% term devices %} are represented in Home Assistant as entities. Entities are the basic building blocks to hold data in Home Assistant. An entity represents a {% term sensor %}, actor, or function in Home Assistant. Entities are used to monitor physical properties or to control other entities. An term entity is usually part of a {% term device %} or a {% term service %}. Entities have [states](/docs/configuration/state_object/) and [attributes](#entity-attributes).

<p class='img'><img src='/images/getting-started/entities.png' style='border: 0;box-shadow: none;' alt="Screenshot showing the Entities table">Screenshot of the Entities table. Each line represents an entity.</p>

## Entity attributes

Entities have attributes. There are a few attributes that are used by Home Assistant for representing the entity in a specific way. Each integration will also have its own attributes to represent extra state data about the entity. For example, the light integration has attributes for the current brightness and color of the light. When an attribute is not available, Home Assistant will not write it to the state. The list of available attributes depends on the {% term device %}.

<p class='img'>
  <img src='/images/integrations/light/state_light.png' alt='Screenshot showing three lights with different states and attributes'>
  Example showing three lights with differents states and different attributes.
</p>

For more information on entity attributes, refer to the [attributes](/docs/configuration/state_object/#attributes) section on the state objects page.

## Domains

Each integration in Home Assistant has a unique identifier: a domain. All of the entities and actions available in Home Assistant are provided by integrations and thus belong to such a domain. The first part of the entity or action, before the . shows the domain they belong to. For example light.kitchen is an entity in the light domain from the light integration.

Currently, the following domains are available (also known as *building block integrations* or *entity integrations*):

- [Air quality](/integrations/air_quality/)
- [Alarm control](/integrations/alarm_control_panel/)
- [Automation](/integrations/device_automation/)
- [Binary sensor](/integrations/binary_sensor/)
- [Button](/integrations/button/)
- [Calendar](/integrations/calendar/)
- [Camera](/integrations/camera/)
- [Climate](/integrations/climate/)
- [Conversation](/integrations/conversation/)
- [Cover](/integrations/cover/)
- [Date](/integrations/date/)
- [Date/Time](/integrations/datetime/)
- [Device tracker](/integrations/device_tracker/)
- [Event](/integrations/event/)
- [Fan](/integrations/fan/)
- [Humidifier](/integrations/humidfier/)
- [Image processing](/integrations/image_processing/)
- [Input boolean](/integrations/input_boolean/) (Not a building block integration)
- [Input button](/integrations/input_button/) (Not a building block integration)
- [Input datetime](/integrations/input_datetime/) (Not a building block integration)
- [Input number](/integrations/input_number/) (Not a building block integration)
- [Input select](/integrations/input_select/) (Not a building block integration)
- [Input text](/integrations/input_text/) (Not a building block integration)
- [Light](/integrations/light/)
- [Lock](/integrations/lock/)
- [Media player](/integrations/media_player/)
- [Notifications](/integrations/notify/)
- [Number](/integrations/number/)
- [Person](/integrations/person/) (Not a building block integration)
- [Scene](/integrations/scene/)
- [Script](/integrations/script/) (Not a building block integration)
- [Select](/integrations/select/)
- [Sensor](/integrations/sensor/) (Not a building block integration)
- [Siren](/integrations/siren/)
- [Speech-to-text](/integrations/stt/)
- [Sun](/integrations/sun/) (Not a building block integration)
- [Switch](/integrations/switch/)
- [Text](/integrations/text/)
- [Text-to-speech](/integrations/tts/)
- [Time](/integrations/time/)
- [To-do-list](/integrations/todo/)
- [Update](/integrations/update/)
- [Vacuum](/integrations/vacuum/)
- [Wake-word detection](/integrations/wake_word/)
- [Water heater](/integrations/water_heater/)
- [Weather](/integrations/weather/)
- [Zone](/integrations/zone/)
