---
title: AI Task
description: Instructions on how to set up AI task entities with Home Assistant.
ha_category:
  - AI
ha_release: '2025.7'
ha_quality_scale: internal
ha_domain: ai_task
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **AI Task** {% term integration %} allows you to use AI to help you configure Home Assistant.

{% include integrations/building_block_integration.md %}

For each task, you can set a preferred AI task entity. This allows you to use different AI models for different purposes, such as generating text, summarizing information, or even controlling devices. When the entity ID is omitted in the action, the preferred AI task entity will be used.

## The state of an AI task entity

The {% term state %} of an AI task {% term entity %} is a timestamp showing the date and time when the AI task was last used.

{% include integrations/actions.md %}

## Examples

### Template entity counting items on a camera


```yaml
template:
  - triggers:
      - trigger: homeassistant
        event: start
      - trigger: time_pattern
        minutes: "/5"  # update every 5 minutes
    actions:
      - action: ai_task.generate_data
        data:
          task_name: "{{ this.entity_id }}"
          instructions: >-
            This is the inside of my goose coop. How many birds (chickens, geese, and
            ducks) are inside the coop?
          structure:
            birds:
              selector:
                number:
          attachments:
            media_content_id: media-source://camera/camera.chicken_coop
            media_content_type: image/jpeg
        response_variable: result
    sensor:
      - name: "Chickens"
        state: "{{ result.data.birds }}"
        state_class: total
```


Alternative ideas: detect number of parking spots available, count people in a room, or detect if a door is open.

### Structured output example


```yaml
# Example: Generate weather and indoor comfort report
script:
- alias: "Weather and comfort report"
  sequence:
    - action: ai_task.generate_data
      data:
        task_name: "weather comfort report"
        instructions: |
          Based on the current conditions:
          - Outdoor temperature: {{ states('sensor.outdoor_temperature') }}°C
          - Weather condition: {{ states('weather.home') }}
          - Indoor temperature: {{ states('sensor.living_room_temperature') }}°C
          - Indoor humidity: {{ states('sensor.living_room_humidity') }}%

          Generate a funny weather description and assess indoor comfort level.
        structure:
          weather_description:
            description: "A humorous description of the current weather outside"
            required: true
            selector:
              text:
          indoor_comfort:
            description: "Assessment of how comfortable it is inside compared to outside"
            required: true
            selector:
              text:
      response_variable: comfort_report
    - action: notify.persistent_notification
      data:
        title: "🏠 Home climate report"
        message: |
          🌤️ **Weather outside:**
          {{ comfort_report.data.weather_description }}

          🛋️ **Indoor comfort:**
          {{ comfort_report.data.indoor_comfort }}
```


### Simple text generation example


```yaml
# Example: Generate a notification when garage door is left open
automation:
- alias: "Garage door notification"
  triggers:
    - trigger: state
      entity_id: cover.garage_door
      to: 'on'
      for:
        minutes: 10
  actions:
    - action: ai_task.generate_data
      data:
        task_name: "garage door left open comment"
        instructions: "Generate a funny notification that garage door was left open"
      response_variable: generated_text
    - action: notify.persistent_notification
      data:
        message: "{{ generated_text.data }}"
```


### Weather visualization example


```yaml
# Example: Up-to date weather image
automation:
  - alias: "Update image when weather changes"
    triggers:
      - trigger: state
        entity_id: weather.home
    actions:
      - alias: "Generate an image with AI Task"
        action: ai_task.generate_image
        response_variable: generated_image
        data:
          task_name: weather visualization
          instructions: >-
            New York when the weather is {{ states("weather.home") }}

      - alias: "Send out a manual event to update the image entity"
        event: new_weather_image
        event_data:
          url: '{{ generated_image.url }}'

template:
  - trigger:
      - alias: "Update image when a new weather image is generated"
        trigger: event
        event_type: new_weather_image
    image:
      - name: "AI generated image of New York"
        url: "http://localhost:8123{{ trigger.event.data.url }}"
```
