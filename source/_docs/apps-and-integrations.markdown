---
title: "Apps and integrations"
description: "Integrations connect Home Assistant to your devices and services. Custom integrations are integrations that the community creates. Apps are separate applications that run alongside Home Assistant, such as a file editor. Learn how they differ."
---

Integrations and apps both add features to Home Assistant, but they work differently. Integrations connect Home Assistant to your devices and services. Custom integrations are integrations that the community creates. Apps are separate applications that run alongside Home Assistant on the same system.

## Integrations

An {% term integration %} runs inside Home Assistant. It connects Home Assistant to a device or a service, for example, to your lights, your vacuum cleaner, or a weather service. An integration can add devices and entities that you can use in your dashboards and automations.

You add integrations under {% my integrations title="**Settings** > **Devices & services**" %}. Integrations are available on all installation types. For documentation on the integrations that come with Home Assistant, refer to the [list of integrations](/integrations/).

## Custom integrations

A {% term "custom integration" %} is an integration that someone from the community creates. It works like the integrations that come with Home Assistant: it runs inside Home Assistant and allows you to add devices and entities. Custom integrations offer support for devices and services that Home Assistant doesn't include.

You install custom integrations from the Marketplace. The Home Assistant project doesn't make, test, or support them. For details, including the risks, refer to the [Marketplace integration](/integrations/marketplace/).

## Apps

An app is a separate application. It runs next to Home Assistant, with its own settings and its own log. For example, the File editor app lets you edit your configuration files in your browser, and the Samba share app lets you open your Home Assistant folders from your computer.

Apps are only available on {% term "Home Assistant Operating System" %}. You install apps from the app store under {% my supervisor_store title="**Settings** > **Apps** > **Install app**" %}. The app store includes official apps, and you can add app repositories from the community. You manage the apps that you installed under {% my supervisor title="**Settings** > **Apps**" %}. For the steps, refer to [Installing and managing apps](/common-tasks/os/apps/).

Each app uses disk space, memory, and processor time on your system, so only install the apps that you need.

Some integrations work together with an app. The documentation of the integration tells you if you need an app.

If you use {% term "Home Assistant Container" %}, you can't install apps. Many apps are based on software that you can also run yourself, for example in its own container next to Home Assistant. If an integration needs that software, check the documentation of the integration for how to connect to it. To compare the installation types, refer to [About installation types](/installation/#about-installation-types).
