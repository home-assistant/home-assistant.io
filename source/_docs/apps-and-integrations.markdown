---
title: "Apps and integrations"
description: "Integrations connect Home Assistant to your devices and services. The Marketplace adds integrations, dashboard cards, and themes from the community. Apps are separate applications that run alongside Home Assistant, such as a file editor. Learn how they differ."
---

Integrations and apps both add features to Home Assistant, but they work differently. Integrations connect Home Assistant to your devices and services. Apps are separate applications that run alongside Home Assistant on the same system. The Marketplace adds integrations, dashboard cards, and themes that the community creates.

## Integrations

An {% term integration %} runs inside Home Assistant. It connects Home Assistant to a device or a service, for example, to your lights, your vacuum cleaner, or a weather service. An integration can add devices and entities that you can use in your dashboards and automations.

You add integrations under {% my integrations title="**Settings** > **Devices & services**" %}. Integrations are available on all installation types. For documentation on the integrations that come with Home Assistant, refer to the [list of integrations](/integrations/).

## Marketplace

The Marketplace lets you install integrations, dashboard cards, themes, and templates that the community creates. You open it under {% my marketplace_browse title="**Settings** > **Marketplace**" %}. The Marketplace comes with Home Assistant and is available on all installation types. Only administrators can use it.

The Marketplace is different from {% my integrations title="**Settings** > **Devices & services**" %}. There, you add the integrations that come with Home Assistant. Integrations from the Marketplace are {% term "custom integrations" %}. They don't come with Home Assistant, so you install them from the Marketplace first. After that, you set them up like any other integration. You add most of them under **Settings** > **Devices & services**.

The Marketplace doesn't install apps, and the app store doesn't install integrations, dashboard cards, or themes. To install one of these from a repository, add the repository to the Marketplace, not to the app store.

Everything in the Marketplace comes from the community. The Home Assistant project doesn't make, test, or support it, and it can access your home, your data, and your system. Before you install something, review its author, recent project activity, and community feedback. For details, refer to the [Marketplace integration](/integrations/marketplace/).

## Apps

An app is a separate application. It runs next to Home Assistant, with its own settings and its own log. For example, the File editor app lets you edit your configuration files in your browser, and the Samba share app lets you open your Home Assistant folders from your computer.

Apps are only available on {% term "Home Assistant Operating System" %}. You install apps from the app store under {% my supervisor_store title="**Settings** > **Apps** > **Install app**" %}. The app store includes official apps, and you can add app repositories from the community. You manage the apps that you installed under {% my supervisor title="**Settings** > **Apps**" %}.

Each app uses disk space, memory, and processor time on your system, so only install the apps that you need.

Some integrations work together with an app. The documentation of the integration tells you if you need an app.
