---
title: "Clear TTS cache"
action: tts.clear_cache
domain: tts
description: "Removes cached text-to-speech files and clears the memory."
related_actions:
  - tts.speak
  - tts.say
---

Use this action to remove cached text-to-speech files and clear the in-memory cache. This is useful when you want to free up space or force messages to be generated again. To keep the messages you use regularly, only remove files that haven't been used for a number of days.

{% include actions/ui_header.md %}

To clear the cache from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Clear TTS cache**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Days unused:
  description: Only removes files that haven't been used for this many days. For example, a value of 30 keeps every message played in the last 30 days. If omitted, all cached files are removed.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tts.clear_cache`. This example removes files that haven't been used for 30 days:

{% example %}
action: |
  action: tts.clear_cache
  data:
    days: 30
{% endexample %}

### Options in YAML

{% options_yaml %}
days:
  description: Only removes files that haven't been used for this many days. For example, a value of 30 keeps every message played in the last 30 days. If omitted, all cached files are removed.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- Without `days`, clearing the cache removes both the stored files and the in-memory cache. The next time a message is spoken, it is generated again. For more details, see the [cache section](/integrations/tts/#cache).
- With `days`, a file counts as used each time a message is played from it. Messages that are still in the in-memory cache are never removed.
- Home Assistant doesn't clear the cache on its own. To keep it small, call this action with `days` from an automation, for example once a week.

{% include actions/stuck.md %}

{% include actions/related.md %}
