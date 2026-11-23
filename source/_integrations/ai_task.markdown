---
description: Instructions on how to set up AI task entities with Home Assistant.
ha_release: '2025.7'
ha_domain: ai_task
---

The **AI Task** {% term integration %} lets your automations, scripts, and the Home Assistant interface use AI for a single job. For example, to describe what a camera sees, to generate an image, or to decide whether a delivery driver is at the door.

{% include integrations/building_block_integration.md %}

The AI task {% term entities %} come from AI integrations. For example, OpenAI, Google Gemini, and Ollama add them. For the full list of AI integrations, refer to [AI integrations](/integrations/category/ai_voice/ai_models/).

## Ways to use AI tasks

You can use AI tasks in the following ways:

- In automations and scripts, with the AI task actions. With them, you can generate text or structured data, generate images, and evaluate questions. For all actions, refer to [List of actions](#list-of-actions).
- In the Home Assistant interface, with the **Suggest** button. For example, when you save an automation, it suggests a name, a description, a category, and labels.

Not every AI task supports every action. For example, some AI tasks can generate data, but not images.

## AI tasks, AI tools, and conversation agents

AI tasks and {% term "AI tools" %} work in opposite directions:

- With AI tools, a {% term "conversation agent" %} or an {% term "AI app" %} uses Home Assistant. During a conversation, it decides which AI tools to call. For example, it calls an AI tool to turn off a light.
- With an AI task, Home Assistant uses the AI model of an AI integration. Your automation, your script, or the **Suggest** button sends a single job to an AI task, and gets the result back. For example, when someone rings the doorbell, your automation asks an AI task whether the camera image shows a delivery driver. There's no conversation, and an AI task doesn't use AI tools.

So an AI task can't control your devices. To control your devices with AI, use a conversation agent with the **Device control** set of AI tools. For details, refer to [Sets of AI tools](/integrations/llm/#sets-of-ai-tools).

## Choosing the preferred AI task entities

When an action doesn't name an AI task entity, Home Assistant uses the preferred one. The **Suggest** button also uses the preferred AI task entity for data generation. You can choose a different one for each kind of task. For example, a fast model to generate text, and another model that can generate images.

Prerequisites:

- An administrator account in Home Assistant.
- An AI integration that adds AI tasks. For example, [OpenAI](/integrations/openai_conversation/).

To choose the preferred AI task entities:

1. Go to {% my config_ai title="**Settings** > **System** > **AI**" %}.
2. On the **AI suggestions** card, under **Data generation tasks**, select an AI task entity.
   - The list only shows AI tasks that can generate data.
3. Optional: under **Image generation tasks**, select an AI task entity that can generate images.
4. Optional: under **Decisions**, select an AI task entity that can evaluate questions.
5. Select **Save**.
   - Result: The actions and the **Suggest** button use these AI task entities when you don't select one yourself.

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

### Template sensor: count chickens in the coop

This template sensor uses [Generate data](/actions/ai_task.generate_data/) to count the chickens in a camera snapshot of your coop. It updates when Home Assistant starts and every 5 minutes. It uses your preferred AI task entity for data generation.

You can use the same approach for other counts. For example, count the free spots in a parking lot or the people in a room.

Add this to your {% term "`configuration.yaml`" %} file. Replace the camera entity ID with your own.

```yaml
template:
  - triggers:
      - trigger: homeassistant
        event: start
      - trigger: time_pattern
        # Update every 5 minutes
        minutes: "/5"
    actions:
      - action: ai_task.generate_data
        data:
          task_name: "{{ this.entity_id }}"
          instructions: >
            This is the inside of my chicken coop.
            How many chickens are inside the coop?
          structure:
            chickens:
              selector:
                number:
          attachments:
            media_content_id: media-source://camera/camera.chicken_coop
            media_content_type: image/jpeg
        response_variable: result
    sensor:
      - name: "Chickens"
        state: "{{ result.data.chickens }}"
        state_class: measurement
```

### Script: create a weather and indoor comfort report

This script uses [Generate data](/actions/ai_task.generate_data/) with a structure. The AI task returns two separate fields: a funny description of the weather and an assessment of the indoor comfort. The script then shows both fields in a notification.

Paste this into the YAML editor of a new script. Replace the weather and sensor entity IDs with your own.

{% example %}
script: |
  alias: "Weather and comfort report"
  sequence:
    - action: ai_task.generate_data
      data:
        task_name: "Weather comfort report"
        instructions: |
          Based on the current conditions:
          - Outdoor temperature:
            {{ states('sensor.outdoor_temperature', with_unit=True) }}
          - Weather condition: {{ states('weather.home') }}
          - Indoor temperature:
            {{ states('sensor.living_room_temperature', with_unit=True) }}
          - Indoor humidity:
            {{ states('sensor.living_room_humidity', with_unit=True) }}

          Generate a funny weather description and assess the indoor
          comfort level.
        structure:
          weather_description:
            description: "A funny description of the weather outside"
            required: true
            selector:
              text:
          indoor_comfort:
            description: "How comfortable it is inside compared to outside"
            required: true
            selector:
              text:
      response_variable: comfort_report
    - action: notify.persistent_notification
      data:
        title: "Home climate report"
        message: |
          **Weather outside:**
          {{ comfort_report.data.weather_description }}

          **Indoor comfort:**
          {{ comfort_report.data.indoor_comfort }}
{% endexample %}

### Automation: notify when the garage door is left open

When the garage door has been open for 10 minutes, this automation uses [Generate data](/actions/ai_task.generate_data/) to write a funny reminder. Without a structure, the AI task returns plain text. The automation then shows the text in a notification.

Paste this into the YAML editor of a new automation. Replace the cover entity ID with your own.

{% example %}
automation: |
  alias: "Garage door notification"
  triggers:
    - trigger: state
      entity_id: cover.garage_door
      to: "open"
      for:
        minutes: 10
  actions:
    - action: ai_task.generate_data
      data:
        task_name: "Garage door left open comment"
        instructions: >
          Generate a funny notification that the garage door was left
          open.
      response_variable: generated_text
    - action: notify.persistent_notification
      data:
        message: "{{ generated_text.data }}"
{% endexample %}

### Template image: show the current weather as a picture

When the weather changes, this automation uses [Generate image](/actions/ai_task.generate_image/) to create a picture of New York in the current weather. It then fires an event with the image URL. A template image entity reacts to that event and shows the new picture. The example uses your preferred AI task entity for image generation.

Add this to your {% term "`configuration.yaml`" %} file. Replace the weather entity ID with your own. The action returns the image URL as a path, without the address of your Home Assistant. The template image adds `http://localhost:8123` in front of it. If your Home Assistant uses a different local address, replace that part.

The image URL is only valid for one hour. Home Assistant downloads the picture the first time you view the image entity, and then keeps it until the next picture arrives. If you don't view the picture within an hour, it doesn't load until the weather changes again.

```yaml
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
          task_name: "Weather visualization"
          instructions: >
            New York when the weather is {{ states('weather.home') }}
      - alias: "Send out a manual event to update the image entity"
        event: new_weather_image
        event_data:
          url: "{{ generated_image.url }}"

template:
  - triggers:
      - alias: "Update image when a new weather image is generated"
        trigger: event
        event_type: new_weather_image
    image:
      - name: "AI generated image of New York"
        url: "http://localhost:8123{{ trigger.event.data.url }}"
```
