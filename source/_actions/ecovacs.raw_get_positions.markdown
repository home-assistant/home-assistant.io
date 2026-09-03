---
title: "Get raw positions"
action: ecovacs.raw_get_positions
domain: ecovacs
description: "Retrieves a raw response containing the positions of the charger and the vacuum."
---

Use this action to retrieve the raw position response for an Ecovacs vacuum and its charger.

{% include actions/ui_header.md %}

To get raw positions from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Ecovacs vacuum.
6. From the actions shown for that target, select **Get raw positions**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecovacs.raw_get_positions`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: ecovacs.raw_get_positions
  target:
    entity_id: vacuum.deebot_n8_plus
  response_variable: ecovacs_positions
{% endexample %}

This retrieves the raw position response for `vacuum.deebot_n8_plus`.

### Options in YAML

This action has no additional YAML options beyond the target. Optionally, set `response_variable` to store the response.

{% include actions/targets.md domain="vacuum" %}

## Response data

The action returns a raw response with the positions of the vacuum and charger. The exact response structure depends on the vacuum model and firmware.

The response includes coordinates under `resp -> body -> data` like this:

```yaml
vacuum.deebot_n8_plus:
  ret: ok
  resp:
    header:
      pri: 1
      tzm: 480
      ts: "1717748487712"
      ver: 0.0.1
      fwVer: 1.2.0
      hwVer: 0.1.1
    body:
      code: 0
      msg: ok
      data:
        deebotPos:
          x: 1
          y: 5
          a: 85
          invalid: 0
        chargePos:
          - x: 5
            y: 9
            a: 85
            t: 1
            invalid: 0
        mid: "200465850"
  id: 5o81
  payloadType: j
```

## Good to know

This action is mainly useful when you need the raw position data for troubleshooting or custom processing.

{% include actions/stuck.md %}

{% include actions/related.md %}
