---
title: "Set a Matter lock user"
action: matter.set_lock_user
domain: matter
description: "Creates or updates a user on a Matter lock."
related_actions:
  - matter.clear_lock_user
  - matter.get_lock_users
  - matter.set_lock_credential
---

Use this action to create or update a user on a Matter lock. A user is a person who can unlock the lock, and each user can have one or more credentials, such as a PIN code or an RFID tag.

If you leave the user index empty, the lock automatically assigns the next available slot.

Your lock must support the Matter Door Lock cluster user management features for this action to work. Use the [Get Matter lock info](/actions/matter.get_lock_info/) action to check what your lock supports.

{% include actions/ui_header.md %}

To set a lock user from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to manage.
6. From the actions shown for that target, select **Set a Matter lock user**.
7. Fill in the user details you want to set.
8. Select **Save**.

### Options in the UI

{% options_ui %}
User index:
  description: The user slot index (1-based). Leave empty to let the lock find an available slot.
  required: false
User name:
  description: A name for the user.
  required: false
User type:
  description: The type of user to create. See the list of user types below.
  required: false
Credential rule:
  description: How many credentials the user must present to unlock, either single, dual, or tri.
  required: false
{% endoptions_ui %}

The available user types are:

- `unrestricted_user`: A regular user with no access restrictions.
- `year_day_schedule_user`: Access is limited to specific date ranges.
- `week_day_schedule_user`: Access is limited to specific days and times each week.
- `programming_user`: A user who can manage other users and credentials on the lock.
- `non_access_user`: A user record that exists on the lock but cannot unlock it.
- `forced_user`: A user whose access triggers a special alarm or notification, for example a duress code.
- `disposable_user`: A user whose credential is automatically revoked after a single use.
- `expiring_user`: A user whose access expires after a set period.
- `schedule_restricted_user`: A user restricted by both week-day and year-day schedules.
- `remote_only_user`: A user who can only operate the lock remotely, not from the physical keypad.

The available credential rules are:

- `single`: One credential is required to unlock, for example just a PIN.
- `dual`: Two different credentials are required to unlock, for example a PIN and an RFID tag.
- `tri`: Three different credentials are required to unlock.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.set_lock_user`. A basic example looks like this:

{% example %}
action: |
  action: matter.set_lock_user
  target:
    entity_id: lock.front_door
  data:
    user_name: "Jane"
    user_type: unrestricted_user
    credential_rule: single
{% endexample %}

### Options in YAML

{% options_yaml %}
user_index:
  description: The user slot index (1-based). Omit this field to let the lock find an available slot.
  required: false
  type: integer
user_name:
  description: A name for the user.
  required: false
  type: string
user_type:
  description: The type of user to create. See the list of user types above.
  required: false
  type: string
credential_rule:
  description: "How many credentials the user must present to unlock: `single`, `dual`, or `tri`."
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Creating a user does not give them a way to unlock the door yet. Add a credential, such as a PIN, with the [Set a Matter lock credential](/actions/matter.set_lock_credential/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
