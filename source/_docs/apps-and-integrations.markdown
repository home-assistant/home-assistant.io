---
title: "Apps and integrations"
description: "Integrations connect Home Assistant to your devices and services. Apps are separate applications that run alongside Home Assistant, such as a file editor. Learn how they differ."
---

Integrations and apps both add features to Home Assistant, but they work differently. Integrations connect Home Assistant to your devices and services. Apps are separate applications that run alongside Home Assistant on the same system.

## Integrations

An {% term integration %} runs inside Home Assistant. It connects Home Assistant to a device or a service, for example, to your lights, your vacuum cleaner, or a weather service. An integration can add devices and entities that you can use in your dashboards and automations.

You add integrations under {% my integrations title="**Settings** > **Devices & services**" %}. Integrations are available on all installation types. For documentation on all integrations, refer to the [list of integrations](/integrations/).

## Apps

An app is a separate application. It runs next to Home Assistant, with its own settings and its own log. For example, the File editor app lets you edit your configuration files in your browser, and the Samba share app lets you open your Home Assistant folders from your computer.

Apps are only available on {% term "Home Assistant Operating System" %}. You install apps from the app store under {% my supervisor_store title="**Settings** > **Apps** > **Install app**" %}. The app store includes official apps, and you can add app repositories from the community. You manage the apps that you installed under {% my supervisor title="**Settings** > **Apps**" %}.

Each app uses disk space, memory, and processor time on your system, so only install the apps that you need.

Some integrations work together with an app. The documentation of the integration tells you if you need an app.
