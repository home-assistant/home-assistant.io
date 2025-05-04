---
title: Google Tasks
description: Instructions on how to use Google Tasks in Home Assistant.
ha_category:
  - To-do list
ha_iot_class: Cloud Polling
ha_release: 2023.11
ha_config_flow: true
ha_domain: google_tasks
ha_codeowners:
  - '@allenporter'
ha_integration_type: integration
ha_platforms:
  - todo
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://support.google.com/tasks/answer/7675772
    title: Google Tasks
  - url: https://console.cloud.google.com/apis/library/tasks.googleapis.com
    title: Google Developers Console
google_dev_console_link: https://console.developers.google.com/start/api?id=tasks
api: Google Tasks API
api_link: https://console.cloud.google.com/apis/enableflow?apiid=tasks.googleapis.com
---

The **Google Tasks** integration allows you to connect your [Google Tasks](https://support.google.com/tasks/answer/7675772)
to Home Assistant. The integration adds a [to-do list entity](/integrations/todo) for
each task list, allowing you to create, update, or delete items on the list
from the **To-do list** dashboard.

You can use to-do lists in automations, such as adding a new task when Home Assistant detects
a device has low batteries. When you combine with a Home Assistant voice assistant, you can
manage your Google Tasks by saying something like *Add clean out garage to personal task list*.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest), [Google Mail](/integrations/google_mail), and most other Google integrations.
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google).

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}

## Supported functionality

### Entities

The Google Tasks integration provides the following entities.

#### To-do lists

The integration will create a [to-do list entity](/integrations/todo) for every task list.
For example, a Google Tasks list named *My Tasks* then will have a Home Assistant
to-do list entity named *My Tasks*.

The Google Task integration can create, update, or delete items on a to-do list.
The to-do list entities support creating, updating, and deleting items on the to-do
list. A to-do list item supports the following fields:

- **Item**: The item is the Google Task *Title* field.
- **Due date**: The Google Tasks Date. The time field in Google Tasks is not supported
  by the Google Tasks API.
- **Description**: The Google Tasks *Details* field.
- **Status**: The Google Tasks *Completed* check box corresponds to the to-do list
  status `needs_action` when not checked and `completed` when checked.


## Actions

The Google Tasks integration provides all actions supported by a to-do list entity
including actions for retrieving, creating, updating, and deleting to-do list items and the fields
described above. See the [To-do list: Actions](/integrations/todo#actions) documentation
for more details.

## Examples

### Low Battery Maintenance

You can use Google Tasks to help you automate battery maintenance. To tackle this
you can use this blueprint to send a notification with devices that have low
low battery level. The notification includes a button that can add an item to your
Google Tasks to-do list.

[Low Battery Notifications & Actions](https://community.home-assistant.io/t/low-battery-notifications-actions/653754)


## Data updates

The Google Tasks integration fetches task lists once initially, and creates a
to-do list for each task list. Data for each to-do list refreshed refreshed by
{% term polling %} every 30 minutes.

Updates to the to-do list in Home Assistant use the Google Tasks API and changes
are reflected immediately in Google Tasks. This will also refresh the to-do
list contents, {% term polling %} again for any new changes.

## Known limitations

There are some known Google Tasks API limitations that affect this integration:

- Only supports {% term polling %}. Updates in Google Tasks are not reflected immediately in Home Assistant.
- Only supports viewing or setting a task due date. A task due *time* is not supported.

## Troubleshooting

### Can’t setup the integration

#### Symptom: “The OAuth client was not found.”

When trying to configure the integration, the Google OAuth flows shows the message *The OAuth client was not found* and *Error 401: invalid_client*.

##### Description

This means that the application credentials in Home Assistant do not match the
OAuth credentials in the Google Cloud console.

##### Resolution

To resolve this issue:

1. Follow the instructions in [Application Credentials](/integrations/application_credentials/#deleting-application-credentials) to remove any existing credentials.  
1. Follow the steps above in the [Prerequisites](#prerequisites).
1. Follow the steps above in the [Configuration](#configuration).

#### Symptom: "Unable to access the Google API: Tasks API has not been used in project before or it is disabled"

Home Assistant fails to configure the integration with the error *Unable to access the
Google API: Google Tasks API has not been used in project before or it is disabled*.

##### Description

This means that Home Assistant is unable to use the Google Tasks API because it was not
enabled in the Google Cloud Console.

##### Resolution

Follow the steps above in the [Prerequisites](#prerequisites) to enable the Google Tasks API.


## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

You will be asked if you would like to remove [Application Credentials](/integrations/application_credentials/) which you can do if you no longer plan to use
Google Tasks with Home Assistant. You may want to also remove any credentials
in the Google Cloud Console, created above in the Prerequisites, if they are no
longer in use with any of your other Home Assistant integrations.
