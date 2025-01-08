---
title: Todoist
description: Instructions on how to integrate Todoist into Home Assistant.
ha_category:
  - Calendar
  - To-do list
ha_iot_class: Cloud Polling
ha_release: 0.54
ha_codeowners:
  - '@boralyl'
ha_domain: todoist
ha_platforms:
  - calendar
  - todo
ha_integration_type: integration
ha_config_flow: true
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - docs: /dashboards/dashboards/
    title: Dashboards
  - docs: /integrations/calendar/
    title: Calendar
  - url: https://todoist.com
    title: Todoist projects
---

This platform allows you to connect to your [Todoist projects](https://todoist.com) as [todo](/integrations/todo/) or [calendar](/integrations/calendar/) entities. All tasks get updated roughly every 15 minutes.


A calendar entity will be `on` if you have a task due in that project. It will be `off` if all the tasks in the project are completed or if the project doesn't have any tasks at all.

## Prerequisites

You need to determine your Todoist API token. Go to the [**Integrations** > **Developer** section on your Todoist settings page](https://todoist.com/app/settings/integrations/developer) and find the section labeled **API token** at the bottom of the page. Copy that token and use it in your configuration file.

{% include integrations/config_flow.md %}

## Custom projects

You can manually configure the Todoist calendar (only) integration using {% term "`configuration.yaml`" %} which can specify "custom" projects which match against criteria you set. You should
prefer the above instructions for configuring Todoist from the UI.

{% details "Manual custom projects configuration" %}

{% configuration %}
token:
  description: The API token used to authorize Home Assistant to access your projects. Above you have more info about it.
  required: true
  type: string
custom_projects:
  description: Details on any "custom" binary sensor projects you want to create.
  required: false
  type: list
  keys:
    name:
      description: The name of your custom project. Only required if you specify that you want to create a custom project.
      required: true
      type: string
    due_date_days:
      description: Only include tasks due within this many days. If you don't have any tasks with a due date set, this returns nothing.
      required: false
      type: integer
    include_projects:
      description: Only include tasks in these projects. Tasks in all other projects will be ignored.
      required: false
      type: list
    labels:
      description: Only include tasks with at least one of these labels (i.e., this works as an `or` statement).
      required: false
      type: list
{% endconfiguration %}

Here's an example of a more advanced {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
calendar:
  - platform: todoist
    token: YOUR_API_TOKEN
    custom_projects:
      - name: 'All Projects'
      - name: 'Due Today'
        due_date_days: 0
      - name: 'Due This Week'
        due_date_days: 7
      - name: 'Math Homework'
        labels:
          - Homework
        include_projects:
          - Mathematical Structures II
          - Calculus II
```

As you can see, there are 4 custom projects here:

- A project containing *all* of the tasks on this account.

- A project containing *all* the tasks on this account that are due today.

- A project containing *all* the tasks on this account due within the next week.

- A project containing everything with the label "Homework", taking only 2 projects into account.

You can mix-and-match these attributes to create all sorts of custom projects. You can even use [IFTTT](https://ifttt.com/todoist) to create a task with a certain label, then have Home Assistant do some kind of automation when a task with that label comes due.

Home Assistant does its best to [determine what task in each project is "most" important](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/todoist/calendar.py), and it's that task which has its state reported. You can access the other tasks you have due soon via the `all_tasks` array (see below).

{% enddetails %}

## To-do list entity

See the [todo](/integrations/todo/) integration for details on how to manage
items on the Todoist to-do list, including actions for creating and
deleting to-do items.

Todoist completed to-do items are not visible in Home Assistant because they
are not returned by the Todoist REST API. Marking a To-do item as completed is
effectively deleting it from Home Assistant, though completed tasks are visible in
the Todoist UI.

## Calendar entity attributes

 - **offset_reached**: Not used.

 - **all_day**: `True` if the reported task doesn't have a due date. `False` if there is a due date set.

 - **message**: The title of the "most important" task coming up in this project.

 - **description**: A URL pointing to the task on the Todoist website.

 - **location**: Not used.

 - **start_time**: The last time the Todoist integration got updated. Usually within the last 15 minutes.

 - **end_time**: When the task is due.

- **all_tasks**: A list of all tasks in this project, sorted from most important to least important.

- **priority**: The priority Todoist reports this task as having. 1 means lowest priority, 4 means highest. Note that this is the **opposite** of how things are displayed in the Todoist app!

- **task_comments**: Any comments added to this task.

- **task_labels**: All labels associated with this task.

- **overdue**: Whether the reported task is past its due date.

- **due_today**: Whether the reported task is due today.

## Actions

You may use the actions from the [todo](/integrations/todo/) integration for
creating, updating, or deleting to-do items on the to-do list.

Todoist also comes with an additional action, `todoist.new_task` that offers
more advanced attributes when creating a Todoist task. You can specify labels
and a project, or you can leave them blank, and the task will go to your
**Inbox** project.

Here are two example JSON payloads resulting in the same task:

```json
{
    "content": "Pick up the mail",
    "project": "Errands",
    "labels":"Homework,School",
    "priority":3,
    "due_date":"2017-09-12 14:00"
}
```

```json
{
    "content": "Pick up the mail",
    "project": "Errands",
    "labels":"Homework,School",
    "priority":3,
    "due_date_string":"tomorrow at 14:00",
    "due_date_lang":"en"
}
```

- **content** (*Required*): The name of the task you want to create.

- **description** (*Optional*): A description of the task.

- **project** (*Optional*): The project to put the task in.

- **section** (*Optional*): The section within the project to add the task to.

- **labels** (*Optional*): Any labels you want to add to the task, separated by commas.

- **assignee** (*Optional*): A member's username of a shared project to assign this task to. You find the username formatted as bold text in the collaborator menu of a shared project. 

- **priority** (*Optional*): The priority of the task, from 1-4. Again, 1 means least important, and 4 means most important.

- **due_date_string** (*Optional*): When the task should be due, in [natural language](https://get.todoist.help/hc/articles/205325931-Dates-and-Times). Mutually exclusive with `due_date`

- **due_date_lang** (*Optional*): When `due_date_string` is set, it is possible to set the language.
  Valid languages are: `en`, `da`, `pl`, `zh`, `ko`, `de`, `pt`, `ja`, `it`, `fr`, `sv`, `ru`, `es`, `nl`

- **due_date** (*Optional*): When the task should be due, in either YYYY-MM-DD format or YYYY-MM-DD HH:MM format  (in UTC timezone). Mutually exclusive with `due_date_string`.

- **reminder_date_string** (*Optional*):  When should user be reminded of this task, in [natural language](https://get.todoist.help/hc/articles/205325931-Dates-and-Times). Mutually exclusive with `reminder_date`

- **reminder_date_lang** (*Optional*): When `reminder_date_string` is set, it is possible to set the language.
  Valid languages are: `en`, `da`, `pl`, `zh`, `ko`, `de`, `pt`, `ja`, `it`, `fr`, `sv`, `ru`, `es`, `nl`

- **reminder_date** (*Optional*): When should the user be reminded of this task, in either YYYY-MM-DD format or YYYY-MM-DD HH:MM format (in UTC timezone). Mutually exclusive with `reminder_date_string`.
