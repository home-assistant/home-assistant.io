---
title: "Configuring Home Assistant with AI"
description: "Ask a conversation agent in Assist or an AI app to organize your home, explain your automations, set up the Energy dashboard, and fix repair issues."
related:
  - docs: /integrations/llm/
    title: LLM
  - docs: /integrations/mcp_server/
    title: Model Context Protocol
  - docs: /docs/configuration/troubleshooting/#troubleshooting-with-ai
    title: Troubleshooting with AI
---

AI can help you configure Home Assistant and organize your home. You ask in your own words, and the AI does the work in Home Assistant for you. For example, it can move your devices to the right areas, explain what an automation does, or add your solar panels to the **Energy** dashboard.

You can ask a {% term "conversation agent" %} in {% term Assist %}, or an {% term "AI app" %}, such as Claude or ChatGPT. Both use the **Home Assistant** set of {% term "AI tools" %}. Only administrators can use this set.

## What you can ask AI to do

With the **Home Assistant** set of {% term "AI tools" %}, a conversation agent or an AI app can help you in the following ways:

- Organize your home. It can create, rename, and delete {% term areas %}, floors, and labels. It can also rename {% term devices %} and {% term entities %}, move them to another area, and disable them.
  - For example, ask "Which lights don't have an area yet?" Then ask "Move the Ceiling light and the Spots to the Kitchen area."
- Understand your {% term automations %} and {% term scripts %}. It can read their configuration, so it can explain what an automation does. It can't create or edit them.
  - For example, ask "What does the Good morning automation do?"
- Set up the [Energy dashboard](/docs/energy/). It can read and change its settings. It can also find the statistics that fit each entry.
  - For example, ask "Add my solar panels to the Energy dashboard."
- Fix [repair issues](/integrations/repairs/). It can list the issues that Home Assistant found. It can fix the issues that Home Assistant offers a fix for. If a fix needs your browser, for example to sign in to an account, you fix the issue yourself.
  - For example, ask "Which repair issues are open, and which of them can you fix?"
- Add and set up {% term integrations %}. It can add an integration or a helper, and change the options of an integration that is set up. It can also set up devices that Home Assistant discovered.
  - For example, ask "Create a light group with the Ceiling light and the Spots."
- Change the information about your home. For example, it can change the name, the location, the time zone, and the unit system.
- Get help with templates and actions. It can explain a template or an action, suggest the right one for what you want, and help you fix a template. Test what it suggests before you use it. For example, test a template in the template editor under {% my tools_template title="**Settings** > **Tools** > **Template**" %}. For more help with templates, refer to [Debugging templates](/docs/templating/debugging/).

To find a problem with AI, refer to [Troubleshooting with AI](/docs/configuration/troubleshooting/#troubleshooting-with-ai). For every AI tool in the set, refer to [List of Home Assistant AI tools](/integrations/llm/#list-of-home-assistant-ai-tools).

{% important %}
**Risk of sharing personal information with your AI provider**

The conversation agent or AI app sends what it reads to its AI provider. With the Home Assistant AI tools, this can include detailed information about your home and your daily life. For example, it can include the location of your home, the names of your rooms and devices, who is home, and when your automations run. It can also include your logs and your energy use. The AI tool that reads your logs masks values that look like credentials, but it can't recognize every secret.

To avoid this:

- Only use the Home Assistant AI tools for the tasks where you want help. You can do most of these tasks yourself in the UI. Where you can, the [List of Home Assistant AI tools](/integrations/llm/#list-of-home-assistant-ai-tools) says how.
- Before you ask about your logs, check what they contain. For details, refer to [Sensitive information in logs](/common-tasks/general/logs/#sensitive-information-in-logs).
- If you have a powerful computer, you can run a local AI model on it. Then this information doesn't leave your network. For example, use a conversation agent from [Ollama](/integrations/ollama/).
{% endimportant %}

{% important %}
**Risk of unintended changes**

The Home Assistant AI tools change Home Assistant without asking you first. They can control every entity, not only the entities that you expose to voice assistants. If the AI misunderstands a request, it can turn off devices, run scripts, or change or delete settings that you didn't intend to change. When it deletes an area, a floor, or a label, or changes an entity ID, your automations and scripts aren't updated. Automations and scripts that use them can stop working.

To avoid this:

- Before you ask AI to change things, [create a backup](/common-tasks/general/backups/#creating-a-manual-backup).
- Before you rename an entity, or delete an area, a floor, or a label, check which automations and scripts use it. For an entity, open its dialog, and select **Menu** {% icon "mdi:dots-vertical" %} > **Related**.
- Use a separate assistant to configure Home Assistant. For everyday voice control, keep an assistant whose conversation agent only uses **Device control**. For the steps, refer to [Setting up a separate assistant for the Home Assistant AI tools](/integrations/llm/#setting-up-a-separate-assistant-for-the-home-assistant-ai-tools).
- To try it without changing anything, use an AI app with **Read-only** turned on. A conversation agent always gets the entire set of AI tools, so you can't limit it to reading.
- After each change, check the result in Home Assistant.
{% endimportant %}

## Difference between using Assist and an AI app

Both use the same **Home Assistant** set of {% term "AI tools" %}, so they can help with the same tasks. They differ in where you ask, and in how they connect to Home Assistant:

- A {% term "conversation agent" %} in {% term Assist %}: You ask in the Assist dialog of Home Assistant or of the {% term "Home Assistant Companion app" %}. You need an AI integration that adds conversation agents. For example, [OpenAI](/integrations/openai_conversation/) adds conversation agents. The Home Assistant AI tools only work when you're signed in with an administrator account. So they don't work on a {% term "voice satellite" %}.
- An {% term "AI app" %}: You ask in an app such as Claude or ChatGPT, outside Home Assistant. It connects through the [Model Context Protocol](/integrations/mcp_server/) integration. You can make it read-only, so it can explain things but can't change them.

## Asking a conversation agent in Assist

You can ask a {% term "conversation agent" %} in the Assist dialog of Home Assistant, or of the {% term "Home Assistant Companion app" %}. For what you can ask, refer to [What you can ask AI to do](#what-you-can-ask-ai-to-do).

Prerequisites:

- An administrator account in Home Assistant.
- An assistant whose conversation agent uses the **Home Assistant** set of {% term "AI tools" %}. For the steps, refer to [Setting up a separate assistant for the Home Assistant AI tools](/integrations/llm/#setting-up-a-separate-assistant-for-the-home-assistant-ai-tools).

To ask a conversation agent in Assist:

1. On a dashboard, in the top-right corner, select **Assist** {% icon "mdi:comment-processing-outline" %}.
   - On a narrow screen, it's under **Menu** {% icon "mdi:dots-vertical" %}. On a computer, you can also press <kbd>A</kbd>.
2. At the top of the dialog, select the name of the assistant, and choose the assistant that uses the Home Assistant AI tools.
3. Ask what you want to do, in your own words.
   - For example, ask "Move the Ceiling light and the Spots to the Kitchen area."
4. Optional: To see what the conversation agent did, select **Show details** above the answer.
   - Result: The details list the AI tools that the conversation agent used, with the result it got back.
5. Check the result in Home Assistant.
   - The conversation agent can be wrong. For example, after it moves a device, check the area of the device under {% my areas title="**Settings** > **Areas, labels & zones**" %}.
   - To see which actions the conversation agent performed, go to {% my tools_action_history title="**Settings** > **Tools** > **Action history**" %}.

## Asking an AI app

You can also ask an {% term "AI app" %}. For example, you can ask Claude, ChatGPT, Claude Code, Codex, or OpenCode. The AI app connects to Home Assistant through the [Model Context Protocol](/integrations/mcp_server/) integration. It then uses the same AI tools as a conversation agent. For what you can ask, refer to [What you can ask AI to do](#what-you-can-ask-ai-to-do).

Prerequisites:

- An administrator account in Home Assistant.
- An AI app that supports <abbr title="Model Context Protocol">MCP</abbr> servers.
- If the AI app runs in the cloud, for example when you use it through a website, your Home Assistant instance must be accessible from the internet. Use [Home Assistant Link](/integrations/link/) or another method of [remote access](/docs/configuration/remote/).

To ask an AI app:

1. Go to {% my config_ai title="**Settings** > **System** > **AI**" %}. If the **Model Context Protocol** card shows an **Enable** button, select it.
2. Next to **Main URL**, select **Configure** {% icon "mdi:cog" %}, and check that the AI app gets the **Home Assistant** set of AI tools.
   - When you enable the integration, the main URL includes it. If you set up the integration earlier, check that **Expose all AI tools** is turned on, or that **Home Assistant** is selected under **AI tools**.
3. Optional: If you only want answers, turn on **Read-only** in the same dialog. For details, refer to [Configuration options](/integrations/mcp_server/#configuration-options).
   - Result: The AI app can still read your configuration, but it can't change anything. For example, it can't move devices or perform actions.
4. Next to **Main URL**, select **Copy URL** {% icon "mdi:content-copy" %}. Then add the URL to your AI app, and sign in with an administrator account.
   - For the steps, refer to [Client configuration](/integrations/mcp_server/#client-configuration) in the Model Context Protocol documentation.
   - Use the **Main URL**. The individual URLs ignore the configuration options of the integration, including **Read-only**.
5. In the AI app, ask what you want to do, in your own words.
   - For example, ask "Create a label called Outdoor, and add it to the Fairy lights and the Floodlight."
6. Check the result in Home Assistant.
   - The AI app can be wrong. For example, after it moves a device, check the area of the device under {% my areas title="**Settings** > **Areas, labels & zones**" %}.
