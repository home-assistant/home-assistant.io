---
description: Instructions on how to set up AI task entities with Home Assistant.
ha_release: '2025.7'
ha_domain: ai_task
---

The **AI Task** {% term integration %} allows you to use AI to generate text, structured data, and images, or to [evaluate questions](/actions/ai_task.evaluate/) about information you provide.

{% include integrations/building_block_integration.md %}

For each task, you can set a preferred AI task entity. This allows you to use different AI models for different purposes, such as generating text, summarizing information, or even controlling devices. When the entity ID is omitted in the action, the preferred AI task entity will be used.

## AI task states

The {% term state %} of an AI task {% term entity %} is a timestamp showing the date and time when the AI task was last used. Home Assistant stores the timestamp in UTC, for example, `2026-01-01T12:00:00.123456+00:00`. The Home Assistant interface shows it in your local date and time format.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

{% include integrations/actions.md %}

## Examples

### Automation: thank a delivery driver at the front door

When someone rings the doorbell, use [Evaluate](/actions/ai_task.evaluate/) to check a camera snapshot for a delivery driver. If the estimated probability is at least 90%, use [Speak](/actions/tts.speak/) to play a thank-you message through the doorbell speaker.

Prerequisites:

- A doorbell with a camera and a doorbell event entity that supports the [Doorbell rang](/triggers/doorbell.rang/) trigger.
- A doorbell speaker exposed as a media player that supports text-to-speech playback, such as a supported [UniFi Protect](/integrations/unifiprotect/) doorbell. Not every doorbell supports this.
- A configured [text-to-speech](/integrations/tts/) entity and a preferred AI task evaluation entity that supports image attachments.

In the automation editor, use this sequence:

1. Add a **Doorbell rang** trigger and select your front door doorbell.
2. Add an **Evaluate** action with a question named `delivery_driver`: "Is the person at the front door a delivery driver delivering a package?" Use the `noul` question type, attach the front door camera, and store the response in `delivery`.
3. Add an **If-then** action with a template condition that checks whether `delivery.answers.delivery_driver.noul` is at least `0.9`.
4. In the **Then** branch, add **Speak**, select your text-to-speech entity and doorbell media player, and enter "Thank you for delivering the package!".

The example below includes the question format and condition. Replace the event, camera, media player, and text-to-speech entity IDs with your own. It uses your preferred evaluation entity; you can also set `entity_id` in the **Evaluate** action's data.

{% details "YAML example for thanking a delivery driver" %}

Paste this into the YAML editor of a new automation:

{% example %}
automation: |
  alias: "Thank a delivery driver at the front door"
  triggers:
    - trigger: doorbell.rang
      target:
        entity_id: event.front_door_doorbell
  actions:
    - action: ai_task.evaluate
      data:
        task_name: "Check for a delivery driver"
        questions:
          delivery_driver:
            type: noul
            instructions: >
              Is the person at the front door a delivery driver delivering
              a package? Use visible evidence, such as a package being
              carried or placed by the door.
        attachments:
          - media_content_id: media-source://camera/camera.front_door
            media_content_type: image/jpeg
      response_variable: delivery
    - if: "{{ delivery.answers.delivery_driver.noul >= 0.9 }}"
      then:
        - action: tts.speak
          target:
            entity_id: tts.home_assistant_cloud
          data:
            media_player_entity_id: media_player.front_door_doorbell
            message: "Thank you for delivering the package!"
{% endexample %}

{% enddetails %}

The `noul` value is the model's estimated probability, not a guarantee. Adjust the `0.9` threshold to suit your camera view. Below that threshold, the automation does not play a message.

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
