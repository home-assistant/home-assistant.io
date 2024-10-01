---
title: Select
description: Instructions on how to manage your Select entities with Home Assistant.
ha_category:
  - Select
ha_release: 2021.7
ha_quality_scale: internal
ha_domain: select
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Select** {% term integration %} manages the state of the select entities and allows
you to control them. This integration allows other integrations to offer
a limited set of selectable options for the entity.

{% include integrations/building_block_integration.md %}

## The state of a select entity

The state of a select entity is the value of the currently selected option.

<p class='img'>
<img src='/images/integrations/select/state_select.png' alt='Screenshot showing the state of a select entity in the developer tools' />
Screenshot showing the state of a select entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

The select {% term entity %} exposes additional {% term actions %} to control the entity in, for example,
{% term automation %} or {% term scripts %}. These actions can be created via the UI, but are
also available in YAML (for which examples are provided below).

### Action `select.select_first`

The {% my developer_call_service service="select.select_first" %} action
changes the selected option of the select entity to the first option in the
list of options available.

This action does not have additional options.

 {% my developer_call_service badge service="select.select_first" %}

An example in YAML:

```yaml
action: select.select_first
target:
  entity_id: select.my_entity
```

### Action `select.select_last`

The {% my developer_call_service service="select.select_last" %} action changes
the selected option of the select entity to the last option in the list of
options available.

This action does not have additional options.

{% my developer_call_service badge service="select.select_last" %}

An example in YAML:

```yaml
action: select.select_last
target:
  entity_id: select.my_entity
```

### Action `select.select_next`

The {% my developer_call_service service="select.select_next" %} action changes
the selected option of the select entity to the next option in the list of
options available. If the current select option is unknown, the first option
in the list is selected instead.

In case the current select option is the last option in the list, it will by
default, cycle back the first option and select that one instead. This cycle
behavior can be disabled by setting the `cycle` option to `false` in the
action data.

{% my developer_call_service badge service="select.select_next" %}

Examples in YAML:

```yaml
action: select.select_next
target:
  entity_id: select.my_entity
```

```yaml
# Disable cycling back to the first option
action: select.select_next
target:
  entity_id: select.my_entity
data:
  cycle: false
```

### Action `select.select_option`

The {% my developer_call_service service="select.select_option" %} action
changes the selected option to a specific desired option provided in the
action using the required `option` action data.

The action call will not succeed if the selected option is not available in
the list of options for the targeted entity.

{% my developer_call_service badge service="select.select_option" %}

An example in YAML:

```yaml
action: select.select_option
target:
  entity_id: select.my_entity
data:
  option: "example_option"
```

### Action `select.select_previous`

The {% my developer_call_service service="select.select_previous" %} action
changes the selected option of the select entity to the previous option in the
list of options available. If the current select option is unknown, the
last option in the list is selected instead.

In case the current select option is the first option in the list, it will by
default, cycle back the last option and select that one instead. This cycle
behavior can be disabled by setting the `cycle` option to `false` in the
action data.

{% my developer_call_service badge service="select.select_previous" %}

Examples in YAML:

```yaml
action: select.select_previous
target:
  entity_id: select.my_entity
```

```yaml
# Disable cycling back to the last option
action: select.select_previous
target:
  entity_id: select.my_entity
data:
  cycle: false
```
