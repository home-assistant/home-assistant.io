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

Keeps track on `select` entities in your environment, their state, and allows
you to control them. This integration allows other integrations to offer
a limited set of selectable options for the entity.

## Services

The select entity exposes additional to control the entity in, for example,
automation or scripts. These service can be created via the UI, but are
also available in YAML (for which examples are provided below).

### Service `select.select_first`

The {% my developer_call_service service="select.select_first" %} service
changes the selected option of the select entity to the first option in the
list of options available.

This service does not have additional options.

 {% my developer_call_service badge service="select.select_first" %}

An example in YAML:

```yaml
service: select.select_first
target:
  entity_id: select.my_entity
```

### Service `select.select_last`

The {% my developer_call_service service="select.select_last" %} service changes
the selected option of the select entity to the last option in the list of
options available.

This service does not have additional options.

{% my developer_call_service badge service="select.select_last" %}

An example in YAML:

```yaml
service: select.select_last
target:
  entity_id: select.my_entity
```

### Service `select.select_next`

The {% my developer_call_service service="select.select_next" %} service changes
the selected option of the select entity to the next option in the list of
options available. If the current select option is unknown, the first option
in the list is selected instead.

In case the current select option is the last option in the list, it will by
default, cycle back the first option and select that one instead. This cycle
behavior can be disabled by setting the `cycle` option to `false` in the
service call data.

{% my developer_call_service badge service="select.select_next" %}

Examples in YAML:

```yaml
service: select.select_next
target:
  entity_id: select.my_entity
```

```yaml
# Disable cycling back to the first option
service: select.select_next
target:
  entity_id: select.my_entity
data:
  cycle: false
```

### Service `select.select_option`

The {% my developer_call_service service="select.select_option" %} service
changes the selected option to a specific desired option provided in the
service call using the required `option` service call data.

The service call wil not succeed if the selected option is not available in
the list of options for the targeted entity.

{% my developer_call_service badge service="select.select_option" %}

An example in YAML:

```yaml
service: select.select_option
target:
  entity_id: select.my_entity
data:
  option: "example_option"
```

### Service `select.select_previous`

The {% my developer_call_service service="select.select_previous" %} service
changes the selected option of the select entity to the previous option in the
list of options available. If the current select option is unknown, the
last option in the list is selected instead.

In case the current select option is the first option in the list, it will by
default, cycle back the last option and select that one instead. This cycle
behavior can be disabled by setting the `cycle` option to `false` in the
service call data.

{% my developer_call_service badge service="select.select_previous" %}

Examples in YAML:

```yaml
service: select.select_previous
target:
  entity_id: select.my_entity
```

```yaml
# Disable cycling back to the last option
service: select.select_previous
target:
  entity_id: select.my_entity
data:
  cycle: false
```
