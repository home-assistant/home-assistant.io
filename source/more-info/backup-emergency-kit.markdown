---
title: "Backup emergency kit"
description: "What the backup emergency kit is, how to download it and store it safely, and how to change your backup encryption key."
related:
  - docs: /common-tasks/general/backups/
    title: Backups
  - docs: /common-tasks/general/backups/#restoring-a-backup
    title: Restoring a backup
---

Home Assistant encrypts your [backups](/common-tasks/general/backups/) by default. Backups stored on Home Assistant Cloud are always encrypted. For backups stored on [other backup locations](/common-tasks/general/backups/#defining-backup-locations), you can choose whether to encrypt them. To [restore an encrypted backup](/common-tasks/general/backups/#restoring-a-backup), you need its encryption key. The backup emergency kit is a text file with this key. It also contains the name and address of your Home Assistant, and the date when you downloaded the kit.

## What is encryption, and why are backups encrypted?

Encryption is a method of converting data into a coded format so that it can only be read by someone who has the encryption key. This ensures that your data about your home remains private. So even if someone else had a copy of your Home Assistant backup, it is unreadable for them without the encryption key.

## Storing the backup emergency kit somewhere safe

1. Go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. Download the emergency kit:
   - If you haven't set up backups yet, select **Set up backups**. The first step of the setup is **Encryption key**, where you can download the emergency kit. For the full steps, refer to [setting up an automatic backup process](/common-tasks/general/backups/#setting-up-an-automatic-backup-process).
   - If you have already set up backups, on the **Encryption key** card, next to **Download emergency kit**, select **Download**.
   - If the card shows **Set encryption key** instead, you don't have an encryption key yet. Select **Set** to create one. Download the emergency kit, and then select **Set encryption key** to save the key.
   - To see the encryption key without downloading it, next to **Show my encryption key**, select **Show**.
3. Store the kit somewhere safe, outside Home Assistant.
   - Without the encryption key, there is no way to [restore an encrypted backup](/common-tasks/general/backups/#restoring-a-backup).
   - If you change the encryption key later, keep the old kit too. You need it to restore the backups that you made before the change.

## Changing your encryption key

When you set up your [backups](/common-tasks/general/backups/), Home Assistant creates an encryption key automatically. It uses this key for all your backups. You can replace it with a new key, which Home Assistant then uses for all future backups. To restore a backup that you made before the change, you still need the previous encryption key.

1. Go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. On the **Encryption key** card, next to **Change encryption key**, select **Change**.
   - Result: The **Save current encryption key** step opens.
3. Save your current encryption key: next to **Download old emergency kit**, select **Download**. You can also copy the key.
   - Keep the old kit somewhere safe, and note which backups it belongs to. The new encryption key doesn't work for the backups that you made until now.
4. Select **Next**.
   - Result: The **New encryption key** step shows your new key.
5. Save the new encryption key: next to **Download emergency kit**, select **Download**. You can also copy the key.
6. Select **Change encryption key**.
   - Result: Home Assistant uses the new key for all future backups, and shows **Encryption key changed**.
7. Select **Done**.

## I lost my backup encryption key. How can I get it back?

If you still have access to your Home Assistant instance, you might be able to get the key back. It depends on whether you changed the encryption key after you made the backup:

- If you haven't changed the encryption key, Home Assistant still has it.
  1. In Home Assistant, go to {% my backup title="**Settings** > **System** > **Backups**" %}.
  2. On the **Encryption key** card, download your emergency kit, or show the key and copy it.
     - If you download the backup from the Home Assistant backups page, Home Assistant decrypts the backup on the fly.
- If you have changed the encryption key, Home Assistant doesn't have the key of older backups anymore.
  - You need the encryption key that belongs to that backup. When you download or restore an older backup, Home Assistant asks for that key.
  - If you have lost that encryption key, there is no way to restore the backup.
  - Nabu Casa does not store your encryption key and cannot provide support in decrypting backups if the key goes missing.

## How Home Assistant encrypts backups

Home Assistant stores backups in the [SecureTar](https://github.com/home-assistant-libs/securetar) format, an open source archive format that supports encryption. Current backups use version 3 of the format. It encrypts the contents of the backup with XChaCha20-Poly1305 and derives the key from your encryption key with Argon2id. Version 3 also detects whether a backup file was changed or is incomplete. Backups made with older versions of Home Assistant use <abbr title="Advanced Encryption Standard">AES</abbr>-128 encryption. You can still restore them.

Some information about a backup isn't encrypted, so that Home Assistant can show it without the key. This includes the name and date of the backup, and the Home Assistant version that made it.
