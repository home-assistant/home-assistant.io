---
title: "Read from KNX bus"
action: knx.read
domain: knx
description: "Sends GroupValueRead requests to the KNX bus."
related_actions:
  - knx.send
  - knx.event_register
  - knx.exposure_register
---

The **KNX: Read from KNX bus** action sends a GroupValueRead request to one or more KNX group addresses. The response can be used in automations through the [KNX telegram](/integrations/knx/#telegram-trigger) trigger, and it is processed in KNX entities.

This is useful when you want to actively ask a KNX device for its current value, for example to refresh a cover position after it has been moving for a while, instead of waiting for the device to report on its own.

The action can also return the answer directly as [response data](#response-data). Store it in a response variable to use the value in later steps of the same automation or script, without setting up an entity or a trigger for the group address.

To issue GroupValueRead requests for all state addresses of an entity at once, you can use the [Home Assistant: Update entity](/integrations/homeassistant/#action-update-entity) action instead.

{% include actions/ui_header.md %}

To read from the KNX bus in an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **KNX: Read from KNX bus**.
6. Enter the **Group address** to read from.
7. Optionally, in the **Response variable** field, enter a name to store the answer in, such as `knx_response`. Response data is only available when you read a single group address.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Group address:
  description: The group address(es) to send the read request to. Provide a list to read multiple group addresses. When a response variable is set, only a single group address is allowed.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `knx.read`. A basic example looks like this:

{% example %}
action: |
  action: knx.read
  data:
    address: "1/0/15"
{% endexample %}

This sends a GroupValueRead request to group address `1/0/15`.

To get the answer back, add a response variable:

{% example %}
action: |
  action: knx.read
  data:
    address: "1/0/15"
  response_variable: knx_response
{% endexample %}

This waits for the answer to the read request and stores it in `knx_response`.

### Options in YAML

{% options_yaml %}
address:
  description: >
    The group address(es) to send the read request to. A list reads multiple
    group addresses. When `response_variable` is set, only a single group
    address is allowed.
  required: true
  type: [string, list]
{% endoptions_yaml %}

## Response data

When you set a `response_variable`, the action waits up to 2 seconds for the GroupValueResponse or GroupValueWrite telegram that answers the read request and returns it. Response data is only available for a single group address. If you provide a list of group addresses, the action fails with a validation error. If no answer arrives within the timeout, the action fails with the error `No response received for {address}`.

The response contains the following fields:

- `value`: The decoded value. It is decoded with the datapoint type (DPT) that the ETS project file uploaded in the KNX panel assigns to the group address. If the project does not define a DPT for the address, or no project file is uploaded, this is `null`.
- `unit`: The unit of the value according to the DPT, if any.
- `dpt_main`: The main datapoint type number.
- `dpt_sub`: The sub datapoint type number.
- `dpt_name`: The DPT value type name. See the [KNX value types](/integrations/knx/#value-types).
- `payload`: The raw telegram payload. DPT 1, 2, and 3 yield an integer. Other DPTs yield a list of integers 0-255, one per byte.
- `source`: The individual address of the device that answered.
- `source_name`: The name of that device in your ETS project. Empty if unknown.

An example of the response looks like this:

```yaml
value: 21.5
unit: "°C"
dpt_main: 9
dpt_sub: 1
dpt_name: temperature
payload: [12, 51]
source: "1.1.5"
source_name: "MDT Thermostat"
```

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: read a temperature and send a notification

This script reads the current temperature from a KNX group address and sends the decoded value in a notification. The value is decoded using the DPT from the uploaded ETS project file.

{% details "YAML example for using the response data" %}

{% example %}
script: |
  alias: "Report living room temperature"
  sequence:
    - action: knx.read
      data:
        # Living room temperature group address
        address: "5/1/2"
      response_variable: knx_response
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The living room temperature is
          {{ knx_response.value }} {{ knx_response.unit }}.
{% endexample %}

{% enddetails %}

### Automation: update a cover position after movement

This automation reacts to a cover-move telegram and, after a short delay, reads the cover position address so Home Assistant stays in sync.

{% details "YAML example for reading a cover position" %}

{% example %}
automation: |
  alias: "Update cover position"
  triggers:
    - trigger: knx.telegram
      # Cover move trigger
      destination: "0/4/20"
  actions:
    - delay: "0:0:10"
    - action: knx.read
      data:
        # Cover position address
        address: "0/4/21"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
