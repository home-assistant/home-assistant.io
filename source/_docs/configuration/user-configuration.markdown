---
title: "People and user configuration"
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

## About persons and users

A person and a user are two different concepts in Home Assistant:

- A _person_ is used for presence detection. A person can be tracked, shown on the map, and used in automations that react when someone arrives or leaves.
- A _user_ is a login account. It is what someone uses to sign in to Home Assistant, see their own dashboards, and, with the right permissions, manage the system.

The two are linked only when the same individual needs both. You attach a user to a person by turning on **Allow login** for that person. This means you can have each one on its own:

- A _person without a user_ cannot sign in, but can still be tracked for presence, shown on the map, and used in automations. This is useful for household members, such as children, whose phone you track but who do not need their own login.
- A _user without a person_ can sign in, but is not tracked for presence and does not appear on the map or in presence-based automations. This is useful for logins that do not belong to a tracked person, such as:
  - A service or integration account that authenticates with the API, for example for a script or another app.
  - A local-only account for a wall-mounted tablet or kiosk.
  - An administrative or guest login where presence tracking is not needed.

To create a user that is not linked to a person, add it from the **Users** tab instead of from **People**.

## About user accounts

When you start Home Assistant for the first time, the _owner_ user account is created. The owner has the highest level of access and can manage every part of the system, including creating and managing other user accounts.

User accounts come in two levels of access:

- _Administrators_ can configure integrations, devices, and system settings, and manage other users. The owner is always an administrator.
- _Non-administrator users_ have restricted access. They can use Home Assistant and see their own dashboards, but cannot reach the configuration and system settings.

You set whether a user is an administrator with the **Administrator** toggle when you create or edit their account.

### About your account profile

Once you're signed in, you can manage your personal settings on the {% my profile title="**User profile**" %} page. To open it, select your name at the very bottom of the sidebar.

The profile page shows your account details, a **Theme** card, and a list of sections you can open:

- **Appearance**: Set your default dashboard and organize your sidebar.
- **Localization**: Set your language, time zone, and how dates, times, and numbers are shown.
- **This browser** (called **This mobile app** in the companion app): Adjust settings for the device you are currently using.
- **Security**: Manage how you sign in, such as your password, multi-factor authentication, and access tokens. For more information, refer to [Authentication](/docs/authentication/).

You can also sign out of Home Assistant from the profile page.

#### Changing the theme and organizing your sidebar

User preferences are tied to your account and follow you across the devices you sign in to.

1. Go to {% my profile title="**User profile**" %} and, under **Theme**, select the theme you want to use.
2. Go to {% my profile_preferences title="**User profile** > **Appearance**" %} and, under **Default dashboard**, choose the dashboard that opens when you start Home Assistant.
3. To change which items appear in the sidebar and in what order, select **Edit** next to **Change the order and hide items from the sidebar**.

#### Changing your localization settings

Localization settings control how dates, times, and numbers are shown. They are tied to your account.

1. Go to {% my profile_localization title="**User profile** > **Localization**" %}.
2. Under **Language**, select the language of the interface.
3. Adjust any of the following:
   - **Time zone**.
   - **Number format**.
   - **Time format**.
   - **Date format**.
   - **First day of the week**.

#### Changing your browser settings

These settings apply only to the device you are currently using and may reset when you sign out or clear local data. In the companion app, this section is called **This mobile app**.

1. Go to {% my profile_browser title="**User profile** > **This browser**" %}.
2. Adjust any of the available options, such as:
   - Always hide the sidebar.
   - Prevent automatic logout.
   - Enable keyboard shortcuts.
   - Vibration and push notifications, depending on your device.

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

Because a person and a user are [two different concepts](#about-persons-and-users), you can delete one without the other:

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

Delete only the user when you want to revoke someone's access to Home Assistant while still tracking them for presence. For example, when a household member should no longer be able to sign in, but you still want their presence to drive automations and show on the map.

1. Go to {% my people title="**Settings** > **People**" %} and select the person whose login you want to delete.
2. Turn off **Allow login**.
3. To confirm, select **OK**.

The user account and its login credentials are deleted, but the person remains.

### To delete a user via the Users tab

You can also delete a user account without going through the person. This is useful for user-only accounts.

1. Go to {% my people title="**Settings** > **People**" %} and select the **Users** tab.
2. Select the user you want to delete.
3. At the bottom of the dialog, select **Delete user**.
4. To confirm, select **OK**.
