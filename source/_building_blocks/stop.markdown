---
title: "Stop"
building_block: stop
category: decisions
description: "Stop the automation or script, optionally with a response or as an error."
related_building_blocks:
  - condition
  - if
---

The **Stop** building block stops the automation or script. The next steps don't run. Use it to end a run early, for example, inside an **If-then** when something is not as expected. A script can also use it to return a response.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Stop**.
4. Optional: In **Reason for stopping**, enter why the run stops. The reason is shown in the logs and in the [trace](/docs/automation/testing/#traces).
5. Optional: To return a response from a script, in **The name of the variable to use as response**, enter the name of the variable that holds the response.
6. Optional: To mark the run as failed, turn on **Stop because of an unexpected error**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Reason for stopping:
  description: Why the run stops. Shown in the logs and in the trace.
  required: false
The name of the variable to use as response:
  description: The variable that holds the response of the script. The variable must contain a mapping of keys and values. You can't use it together with **Stop because of an unexpected error**.
  required: false
Stop because of an unexpected error:
  description: If turned on, the run is marked as failed. Turned off by default.
  required: false
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `stop` with the reason:

{% example %}
action: |
  stop: "Stop running the rest of the sequence"
{% endexample %}

To return a response from a script, add `response_variable` with the name of the variable that holds the response:

{% example %}
action: |
  stop: "Stop running the rest of the sequence"
  response_variable: "my_response_variable"
{% endexample %}

To mark the run as failed, add `error: true`:

{% example %}
action: |
  stop: "Well, that was unexpected!"
  error: true
{% endexample %}

### Options in YAML

{% options_yaml %}
stop:
  description: >
    Why the run stops. Shown in the logs and in the trace. You must add `stop`, but you can leave the reason empty, for example, `stop: ""`.
  required: true
  type: string
response_variable:
  description: The name of the variable that holds the response of the script. The variable must contain a mapping of keys and values. You can't combine it with `error`.
  required: false
  type: string
error:
  description: If `true`, the run is marked as failed.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- **Stop** ends the whole run, not only the current building block. Inside **Run in parallel**, the other actions that already started still finish.
- To only stop the steps that follow in the current sequence when something is not true, use a [**Condition**](/building-blocks/condition/) building block instead.
- If the variable in **The name of the variable to use as response** doesn't exist, the run stops with an error.

## Examples

### Script and automation: Return the outdoor temperature from a script

The script `get_outdoor_temperature` puts the outdoor temperature in a variable, and returns it with **Stop**. The automation calls the script every morning, receives the response in its own variable, and sends it in a notification.

To receive a response, the automation must call the script directly, as `script.get_outdoor_temperature`. The `script.turn_on` action doesn't wait for the script and doesn't return a response. For details, refer to [Waiting for a script to complete](/docs/script/#waiting-for-a-script-to-complete).

- **Script**: Get outdoor temperature
  - **Action**: Define variables
    - `result`: the outdoor temperature
  - **Action**: Stop
    - **Reason for stopping**: `Return the outdoor temperature`
    - **The name of the variable to use as response**: `result`
- **Automation**: Morning temperature
  - **Trigger**: Time
    - **At time**: `07:00`
  - **Action**: Get outdoor temperature (the script)
    - **Response variable**: `weather`
  - **Action**: Send a notification message
    - **Target**: My Device (`notify.my_device`)
    - **Message**: `It's {{ weather.temperature }} °C outside.`

{% details "YAML example" %}

{% example %}
script: |
  get_outdoor_temperature:
    alias: "Get outdoor temperature"
    sequence:
      - variables:
          result:
            temperature: "{{ states('sensor.outdoor_temperature') }}"
      - stop: "Return the outdoor temperature"
        response_variable: result
{% endexample %}

{% example %}
automation: |
  alias: "Morning temperature"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: script.get_outdoor_temperature
      response_variable: weather
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "It's {{ weather.temperature }} °C outside."
{% endexample %}

{% enddetails %}
