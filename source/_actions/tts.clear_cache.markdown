---
title: "Clear TTS cache"
action: tts.clear_cache
domain: tts
description: "Removes all cached text-to-speech files and clears the memory."
related_actions:
  - tts.speak
  - tts.say
---

Use this action to remove all cached text-to-speech files and clear the in-memory cache. This is useful when you want to free up space or force messages to be generated again.

{% include actions/ui_header.md %}

To clear the cache from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Clear TTS cache**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tts.clear_cache`. It takes no options:

{% example %}
action: |
  action: tts.clear_cache
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- Clearing the cache removes both the stored files and the in-memory cache. The next time a message is spoken, it is generated again. For more details, see the [cache section](/integrations/tts/#cache).

{% include actions/stuck.md %}

{% include actions/related.md %}
