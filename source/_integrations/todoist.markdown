---
title: Todoist
description: Instructions on how to integrate Todoist into Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: 0.54
ha_codeowners:
  - '@boralyl'
ha_domain: todoist
ha_platforms:
  - calendar
ha_integration_type: integration
---

This platform allows you to connect to your [Todoist Projects](https://todoist.com) and generate binary sensors. A different sensor will be created for each individual project, or you can specify "custom" projects which match against criteria you set (more on that below). These sensors will be `on` if you have a task due in that project or `off` if all the tasks in the project are completed or if the project doesn't have any tasks at all. All tasks get updated roughly every 15 minutes.

### Prerequisites

You need to determine your Todoist API token. This is fairly simple to do; just go [to the Integrations section on your Todoist settings page](https://todoist.com/app/settings/integrations) and find the section labeled "API token" at the bottom of the page. Copy that token and use it in your configuration file.

### Basic Setup

To integrate Todoist in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
calendar:
  - platform: todoist
    token: YOUR_API_TOKEN
```

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

### Custom Projects
Creating custom projects is super-easy and quite powerful. All you need to run the basic Todoist projects is your API token, but if you wanted, you could go even deeper. Here's an example:

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

### Sensor attributes

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

### Services

Todoist also comes with access to a service, `todoist.new_task`. This service can be used to create a new Todoist task. You can specify labels and a project, or you can leave them blank, and the task will go to your "Inbox" project.

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

- **project** (*Optional*): The project to put the task in.

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

- **reminder_date** (*Optional*): When should user be reminded of this task, in either YYYY-MM-DD format or YYYY-MM-DD HH:MM format (in UTC timezone). Mutually exclusive with `reminder_date_string`.

Note that there's (currently) no way to mark tasks as done through Home Assistant; task names do not necessarily have to be unique, so you could find yourself in a situation where you close the wrong task.
