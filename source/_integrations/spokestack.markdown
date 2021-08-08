---
title: "Spokestack Text-to-Speech (TTS)"
description: "Spokestack TTS platform documentation"
ha_release: "0.38"
ha_category: Text-to-speech
ha_iot_class: "Cloud Push"
ha_codeowners:
  - '@spokestack'
  - '@will-rice'
  - '@space-pope'
ha_domain: spokestack
---

[Spokestack](https://www.spokestack.io/) offers open-source libraries for adding a voice interface to _anything_. `spokestack` is a text-to-speech platform that uses our Python [library](https://github.com/spokestack/spokestack-python) to read text with natural sounding custom voices. Usage of TTS with the default voice is free, but the API requires authentication. If you already have an account, [log in](https://www.spokestack.io/login), otherwise you will need to [create](https://www.spokestack.io/create) one. The credentials can be found in your [account settings](https://www.spokestack.io/account/settings).

{% include integrations/config_flow.md %}

{% configuration %}
key_id:
  description: Spokestack API key ID
  required: true
  type: string
  default: None

key_secret:
  description: Spokestack API secret key
  required: true
  type: string
  default: None

language:
  description: The language to use. We only support English right now, but we are expanding support
  required: false
  type: string
  default: "`en-US`"

voice:
  description: Voice used for synthesis. Only the default voice is available for now, but more are on the way.
  required: false
  type: string
  default: "`demo-male`"

mode:
  description: Synthesis mode. The supported modes are `text`, `ssml`, and `markdown`
  required: false
  type: string
  default: "`text`"
{% endconfiguration %}
