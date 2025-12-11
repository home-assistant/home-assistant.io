---
title: Sentry
description: Record errors to Sentry.
ha_category:
  - System monitor
ha_iot_class: Cloud Polling
ha_release: 0.104
ha_config_flow: true
ha_codeowners:
  - '@dcramer'
  - '@frenck'
ha_domain: sentry
ha_integration_type: service
---

{% important %}
The free Sentry account allows 5000 events per month. Depending on the amount of events sent to Sentry, you will either have to upgrade your Sentry account or have a period without data flowing from Home Assistant to Sentry.
{% endimportant %}

The Sentry integration in Home Assistant integrates with [Sentry](https://sentry.io/) to capture both logged errors as well as unhandled exceptions in Home Assistant.

## Preparation

Before configuring the Sentry integration, you'll need to get Sentry account and a DSN.

Follow these steps to get the DSN:

1. Go to **Projects**.
2. Select **Create project**.
3. Fill out the **Give your project a name** and **choose Assign a Team** fields and select the **Create project** button.
4. Select the **Get your DSN** link in top of the page.
   - Your DSN is now visible and looks like <https://sdasdasdasdsadsadas@sentry.io/sdsdfsdf>

{% include integrations/config_flow.md %}

## Options

The Sentry integration provides settings to:

- Set an environment name for your instance.
- Limit the event log level to trigger on, and the log level of the breadcrumbs.
- Ability to send out error events that are handled.
- Ability to send out events caused by custom integrations.
- Ability to send out events originating from third-party Python packages.
- Enable performance tracing and tune the tracing sample rate used.

To change the settings, go to {% my integrations title="**Settings** > **Devices & services**" %}. Select the **Sentry** integration. Then, select **Options**.

After changing the Sentry settings, you'll need to restart Home Assistant in order to make them effective.
