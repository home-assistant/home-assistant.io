---
title: My Home Assistant
description: Support for the my.home-assistant.io redirect service.
ha_category:
  - Other
ha_release: 2021.3
ha_domain: my
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
related:
  - docs: /docs/tools/quick-search/#my-links
    title: My links
---

The **My Home Assistant** {% term integration %} adds support for the [My Home Assistant](https://my.home-assistant.io) redirect service. The service lets a link from outside Home Assistant, such as a link in this documentation, open a specific page inside your own Home Assistant instance without needing to know its hostname or IP address.

For example, when the documentation says "go to {% my integrations title="**Settings** > **Devices & services**" %}", selecting that link opens the **Devices & services** page in the Home Assistant instance you selected or saved in your browser.

## Use cases

- **Documentation links**: open a specific Home Assistant page straight from this documentation, for example, to jump directly to adding an integration or opening the logs.
- **Blog posts and release notes**: follow a link from a blog post or release announcement to the right place in your own Home Assistant.
- **Third-party tools and integrations**: let external applications deep-link into Home Assistant without having to know or store your instance URL.

## How it works

My Home Assistant is a redirect service hosted at [my.home-assistant.io](https://my.home-assistant.io). When you select a My link, the service asks your browser which Home Assistant instance you want to open. Your instance URL is stored locally in your browser and is never sent to any external service, not even to the My Home Assistant service itself. Once you have chosen your instance, subsequent My links open directly without asking again.

This integration registers a hidden panel in Home Assistant that handles the incoming redirect from the My Home Assistant service and takes you to the right page.

{% tip %}
My Home Assistant is designed with privacy in mind. Your Home Assistant instance URL stays in your browser and is not sent to the My Home Assistant service.
{% endtip %}

For more information, see the [My Home Assistant FAQ](https://my.home-assistant.io/faq/).

## Configuration

This integration is enabled by default as part of [`default_config`](/integrations/default_config/), so no setup is required. If you have removed the `default_config:` line from your {% term "`configuration.yaml`" %} file, you can enable this integration manually:

```yaml
# Example configuration.yaml entry
my:
```

## Creating your own My links

You can create your own My links to share with others. Visit [my.home-assistant.io/create-link](https://my.home-assistant.io/create-link/) to browse the available redirects and generate a link you can copy and share.
