---
title: "Supervisor update"
description: "Upcoming changes to the Supervisor"
date: 2021-08-24 00:00:00
date_formatted: "August 24, 2021"
comments: true
author: Joakim Sørensen
author_twitter: ludeeus
categories:
   - Announcements
   - Supervisor
---

## Renaming snapshot to backup

"Snapshot" is a term that we have been using in the Supervisor since the beginning,
but it's not very descriptive for those that do not know what it is.
Over the next few weeks, we will start using "backup"
in all our software and documentation.

The functionality of it does not change, this is just a rename to make it more understandable.

## Supervised installations

{% note %}
Having a supervisor does not make it a supervised installation, Home Assistant Operating System also has this, the information below does not apply to Home Assistant Operating System.
{% endnote %}

While we try not to break supervised installations, we do have a few things we need to change.
These adjustments you have to manually apply to your installation. Without these adjustments you will start to see warnings in your logs, and your installation will eventually be marked as unsupported.

If you are interested to make changes required on supervised installations more maintainable, have a look at the [blog on the developer site][dev_blog].

As an alternative to doing these adjustments, you can migrate your installation to [Home Assistant Operating System][installation_docs].

## Bullseye

Two weeks ago Debian 11 (Bullseye) was released. The upcoming version of the Supervisor will recognize that version as a supported Operating System. This means that if you are running Home Assistant Supervised, you can start upgrading that.

Support for the previous version (Debian 10 (Buster)) is now deprecated and will be removed in the first version of the Supervisor after the 4 months grace period.
This means that within the next 4 months you need to update to Debian 11.

### Environment variables

There are a few environment variables that you have to add in order to make the Supervisor work properly with newer versions of the Supervisor.
These variables have to be added to the run command for the Supervisor container, on most installations this is a script called from a service file.

- `SUPERVISOR_SHARE` - The path to the directory for the Supervisor data files, typically `/usr/share/hassio`.
- `SUPERVISOR_NAME` - The name of the supervisor container, typically `hassio_supervisor`
- `SUPERVISOR_MACHINE` - The machine you are using. For a list of machine types, [have a look here][machine_types]

### OS Agent

Recently, we created an [OS Agent][os_agent]. OS Agent allows for better communication between the host OS and the Supervisor which will enable new features.
You can find the installation instructions for OS Agent in its [GitHub repository][os_agent].

If you you are interested we have also just published a [blog on the developer site][dev_blog].

[os_agent]: https://github.com/home-assistant/os-agent
[dev_blog]: https://developers.home-assistant.io/blog/2021/08/24/supervisor_update/
[installation_docs]: /installation/
[machine_types]: https://github.com/home-assistant/supervised-installer#supported-machine-types
