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

The **Sentry** {% term integration %} connects Home Assistant to [Sentry](https://sentry.io/), an error tracking service that can be cloud-hosted or self-hosted. It captures logged errors and unhandled exceptions and sends them to your Sentry instance, where you can browse, search, and get alerted on them.

This is mainly useful if you develop custom integrations or want deeper insight into errors happening inside your Home Assistant instance. Sentry groups repeated errors, shows stack traces, and can notify you when new issues appear, so you do not have to watch the logs manually.

{% important %}
A free Sentry account includes 5000 events per month. Depending on how many events Home Assistant sends, you may need to upgrade your Sentry account or accept periods without data flowing from Home Assistant to Sentry.
{% endimportant %}

## Prerequisites

You need a Sentry account and a <abbr title="Data Source Name">DSN</abbr>. The DSN tells Home Assistant where to send error events.

To get your DSN:

1. Go to **Projects**.
2. Select **Create project**.
3. Fill out the **Give your project a name** field, assign a team, and then select **Create project**.
4. Select the **Get your DSN** link at the top of the page. Your DSN looks like `https://examplePublicKey@o0.ingest.sentry.io/0`.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Sentry DSN:
  description: "The Data Source Name (DSN) of your Sentry project. It tells Home Assistant where to send error events."
{% endconfiguration_basic %}

## Configuration options

After setup, you can fine-tune what Home Assistant sends to Sentry. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Sentry** integration, and then select the cogwheel {% icon "mdi:cog-outline" %} (**Configure**).

- **The log level Sentry will register an event for**: The minimum log level that creates a Sentry event. Defaults to **error**.
- **The log level Sentry will record events as breadcrumbs for**: The minimum log level recorded as breadcrumbs, which add context leading up to an event. Defaults to **warning**.
- **Optional name of the environment**: A label, such as `production` or `development`, to separate events in Sentry.
- **Send handled events**: Also send errors that Home Assistant already caught and handled. Off by default.
- **Send events from custom components**: Include errors that originate from custom integrations. Off by default.
- **Send events from third-party packages**: Include errors that originate from third-party Python packages. Off by default.
- **Enable performance tracing**: Send performance tracing data to Sentry. Off by default.
- **Tracing sample rate**: The fraction of traces to send when tracing is enabled, between 0.0 and 1.0 (1.0 sends all of them). Defaults to 1.0.

{% note %}
After changing these options, restart Home Assistant to apply them.
{% endnote %}

## Supported functionality

The Sentry integration does not add any {% term entities %}. Once set up, it runs in the background and forwards errors and unhandled exceptions to your Sentry instance as they happen. Each event is enriched with context about your installation, such as the integrations in use, to help with debugging.

## Data updates

Sentry does not poll for data. Home Assistant sends events to your Sentry instance as errors occur.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
