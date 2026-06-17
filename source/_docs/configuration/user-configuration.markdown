---
title: "Person and user configuration"
description: "Manage the people who use your Home Assistant, such as changing display names, usernames, and authentication settings."
related:
  - docs: /docs/authentication/
    title: Authentication
  - docs: /docs/authentication/multi-factor-auth/
    title: Multi-factor authentication
  - docs: /integrations/person/
    title: Person
  - docs: /docs/locked_out/
    title: Help, I'm locked out
  - docs: /docs/configuration/basic/
    title: Home information
---

Each person who uses Home Assistant can have their own display name and login credentials. This page explains how to change a person's display name, change a username, and where to find authentication settings.

## Adding a person

To add a new person and optionally create a user account for them, refer to [adding a person to Home Assistant](/integrations/person/#adding-a-person-to-home-assistant).

## Changing a person's display name

The display name is the name that is shown in Home Assistant. It can differ from the username, which is the name used to log in.

### Prerequisites

- You need administrator rights to change a display name.

### To change a person's display name

1. To edit the display name of a person using Home Assistant, go to {% my people title="**Settings** > **People**" %}.
2. Select the person for whom you want to change the display name.
3. Change the **Name**, and then select **Save**.

## Changing a username

The username is the name that is used to log in. It can differ from the display name.

### Prerequisites

- You need owner rights to change a username.

### To change a username

1. To edit the username of a person using Home Assistant, go to {% my people title="**Settings** > **People**" %}.
2. Select the person whose username you want to change.
3. Next to the username, select {% icon "mdi:pencil" %} **Edit**.
4. In the **Change username** dialog, enter the **New username** and select **Change**.
   - The username must be lowercase and must not contain spaces.
   - Signing in is case-sensitive.

## Changing authentication settings

To learn how to edit authentication settings such as password or multi-factor authentication, refer to the following topics:

- [Authentication](/docs/authentication/)
- [multi-factor authentication](/docs/authentication/multi-factor-auth/)
- [Help, I'm locked out](/docs/locked_out/)

## Deleting a user or person

A person and a user are two different concepts in Home Assistant:

- A _person_ can be tracked for presence, shown on the map, and used in automations.
- A _user_ is a login account. A person only has a user account when **Allow login** is turned on for them.

Because of this, you can delete one without the other:

- If you delete the person, the linked user account is deleted as well.
- If you delete only the user, the person stays. The person can no longer sign in, but it can still be used for presence detection, shown on the map, and used in automations.

### Prerequisites

- You need owner or administrator rights to delete a user or person.
- You cannot delete the owner account or the account you are currently signed in with.

### To delete a person and its user account

1. Go to {% my people title="**Settings** > **People**" %} and select the person you want to delete.
2. At the bottom of the dialog, select **Delete**.
3. To confirm, select **OK**.

### To delete only the user account and keep the person

1. Go to {% my people title="**Settings** > **People**" %} and select the person whose login you want to delete.
2. Turn off **Allow login**.
3. To confirm, select **OK**.

The user account and its login credentials are deleted, but the person remains.

### To delete a user from the Users tab

You can also delete a user account without going through the person.

1. Go to {% my people title="**Settings** > **People**" %} and select the **Users** tab.
2. Select the user you want to delete.
3. At the bottom of the dialog, select **Delete user**.
4. To confirm, select **OK**.
