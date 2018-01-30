---
layout: page
title: "Custom Card"
description: "Instructions how to integrate the Custom Card component into Home Assistant."
date: 2018-01-30 16:58
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Front end
---

The `custom_card` component allows the user to show custom cards (custom UI) on the frontend without hijacking the card of another entity (Current custom UI cards that pass their config via `customize:` require updates for this).

To use custom cards in your installation, copy your custom html files to `<config-dir>/www/custom_ui/` and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
frontend:
  extra_html_url:
    - /local/custom_ui/ha-test-card.html
  extra_html_url_es5:
    - /local/custom_ui/ha-test-card.html

custom_card:
  example:
    full_card: ha-test-card
    state_card: ha-test-card
    more_info_card: ha-test-card
    config:
      key1: val1
      key2: val2
```

{% configuration %}
  custom_card:
    description: Alias for the card. Multiple entries are allowed.
    required: true
    type: map
    keys:
      full_card*:
        description: name of the full card.
        required: false
        type: String
      state_card*:
        description: name of the state card.
        required: false
        type: String
      more_info_card:
        description: name of the more info card.
        required: false
        type: String
      config:
        description: additional config for the card provided by the API.
        required: false
        type: Any
{% endconfiguration %}
*At least `full_card` or `state_card` is required.

# {% linkable_title For developers %}
To keep the state attributes clean, custom cards provides the optional `config:` via an API call:
```javascript
this.hass.callApi('post', 'custom_card', {entity_id: this.stateObj.entity_id}).then(function (data) {
  console.log(data);
}.bind(this), function () {
  console.log('Error getting config:' + data);
}.bind(this));
```

