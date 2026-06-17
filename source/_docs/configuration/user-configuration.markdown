---
title: "User configuration"
description: "Manage the people who use your Home Assistant, such as changing display names, usernames, and authentication settings."
related:
  - docs: /docs/authentication/
    title: Authentication
  - docs: /docs/authentication/multi-factor-auth/
    title: Multi-factor authentication
  - docs: /docs/configuration/basic/
    title: Home information
---

Each person who uses Home Assistant can have their own display name and login credentials. This page explains how to change a person's display name, change a username, and where to find authentication settings.

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
