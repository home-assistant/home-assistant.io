## Network storage

You can configure both Network File System (NFS) and Samba/Windows (CIFS) targets to be used within Home Assistant and apps.
To list all your currently connected network storages, go to {% my storage title="**Settings** > **System** > **Storage**" %} in the UI.

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/list_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/list_light.png">
  </picture>
  Screenshot of the list of network shares inside the storage panel.
</p>

### Add a new network storage

1. Go to {% my storage title="**Settings** > **System** > **Storage**" %}.
2. Select **Add storage**.
3. Enter the details of your network storage. For a description of each option, refer to [Network storage configuration](#network-storage-configuration).
4. Select **Connect**.
   - If the connection to a Samba/Windows (CIFS) share fails, the **Samba/Windows (CIFS) version** option appears. If your storage server only supports an older version, select it, and then select **Connect** again.

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/connect_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/connect_light.png">
  </picture>
  Screenshot of connecting a new network storage.
</p>

#### Network storage configuration

{% configuration_basic "hassio.network_share" %}
Name:
  description: The name of the folder for the network storage on your system. The name can only contain letters, numbers, and underscores.
Usage:
  description: Select how you want to use the storage. For the options, see [usage types](#usage-types).
Type:
  description: The type of storage. For network storage, select **Samba/Windows (CIFS)** or **Network File System (NFS)**.
Server:
  description: The IP address or host name of the storage server.
"[NFS]<sup>1</sup> Remote share path":
  description: The path used to connect to the remote storage server.
"[CIFS]<sup>2</sup> Samba/Windows (CIFS) version":
  description: "The version of the CIFS protocol to use. This option only appears if the connection fails, or if the network storage already uses an older version. Keep **Auto (2.1+)** unless your storage server only supports an older version. Then, select **Legacy (2.0)** or **Legacy (1.0)**. Older versions are less secure."
"[CIFS]<sup>2</sup> Remote share":
  description: The name of the share on the storage server.
"[CIFS]<sup>2</sup> Username":
  description: "Optional. The username to use when connecting to the storage server. Use User Principal Name for domain accounts. For example: `user@domain.com`."
"[CIFS]<sup>2</sup> Password":
  description: Optional. The password to use when connecting to the storage server.
{% endconfiguration_basic %}

<sup>1</sup> _Options prefixed with `[NFS]` are only available for NFS targets._<br>
<sup>2</sup> _Options prefixed with `[CIFS]` are only available for CIFS targets._<br>

##### Usage types

{% configuration_basic "hassio.network_share.usage" %}
Backup:
  description: The storage becomes a backup location. You can select it for automatic and manual backups on the **Backups** page. The first storage you add with this usage becomes the default local backup location. For details, refer to [Default local backup location](#default-local-backup-location).
Media:
  description: A new directory with the name you gave your storage will be created under `/media`. This directory can be accessed by Home Assistant and apps.
Share:
  description: A new directory with the name you gave your storage will be created under `/share`. This directory can be accessed by Home Assistant and apps.
{% endconfiguration_basic %}

### Default local backup location

By default, the first storage you add with the **Backup** usage becomes your default local backup location. This can be network storage or a local disk.

The default local backup location is used for backups that don't have their own location. This applies to the following backups:

- Backups that Home Assistant creates before it updates an app.
- Backups that Home Assistant creates before it updates Home Assistant Core or Home Assistant Operating System, if you haven't set up automatic backups. If you have, these backups are stored in the locations of your automatic backups.
- Backups that you create with the [**Create full backup**](/actions/hassio.backup_full/) or [**Create partial backup**](/actions/hassio.backup_partial/) action, if you leave **Location** empty. This includes backups that an automation creates with these actions.
- Backups that you create on the command line with `ha backups new`, if you don't use the `--location` option.
- Backups that `ha core update --backup` and `ha apps update --backup` create before an update.

Backups that you create on the **Backups** page, including automatic backups, are stored in the locations that you select there. For details, refer to [Defining backup locations](/common-tasks/general/#defining-backup-locations).

### Change default local backup location

To change the default local backup location, follow these steps:

1. Go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. Select **Configure backup settings**.
3. In the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu, and then select **Change default action location**.
4. Under **Default location**, select the storage you want to use, and then select **Save**.
   - If you don't see your storage, check that you added it with the **Backup** usage. The list only shows storage with this usage.
   - To store these backups on the system itself again, select **Use data disk for backup**.

## Local disk storage

You can also add a disk connected to your system, such as an internal drive or a USB drive, and use it for media, shared files, or backups. Home Assistant mounts the disk and reconnects it after a restart.

The disk needs to be formatted already. These file systems are supported:

- ext4, ext3, and ext2
- FAT and FAT32, reported as `vfat`
- exFAT
- NTFS
- Btrfs
- F2FS (requires {% term "Home Assistant Operating System" %} 18.3 or later)

Home Assistant does not format disks for you. If your disk uses a different file system, format it on a computer first.

### Adding a local disk

1. Go to {% my storage title="**Settings** > **System** > **Storage**" %} in the UI.
2. Select **Add storage**.
3. For **Type**, select **Local disk**.
4. Fill out the rest of the information for your disk.
5. Select **Connect**.

#### Local disk configuration

{% configuration_basic "hassio.local_disk" %}
Name:
  description: This is the name that will be used for the mounted directory on your system.
Usage:
  description: Select how you want to use the disk. For the options, see [usage types](#usage-types).
Disk:
  description: The disk you want to use. Disks that are already in use, or that belong to Home Assistant, are not listed. If you connect a disk while this dialog is open, close the dialog and open it again to see the disk.
Read-only:
  description: Home Assistant reads from the disk but never writes to it. A write-protected disk can only be added as read-only. Backup storage cannot be read-only.
{% endconfiguration_basic %}

### Keeping a local disk connected

Home Assistant remembers the disk by its file system identifier, not by a device name such as `/dev/sda1`. Device names can change after a restart or when you move a drive, so your storage keeps working either way.

If the disk is disconnected, or missing when the system starts, Home Assistant creates a repair issue at {% my repairs title="**Settings** > **System** > **Repairs**" %}. Anything using the disk's folder while it is disconnected gets an error instead of writing to internal storage.

After you reconnect the disk, Home Assistant can take up to 15 minutes to mount it again, and the repair issue then clears on its own. To mount the disk right away, open the repair issue and select **Reload**. If the disk uses Btrfs and you reconnect it before a repair issue appears, reboot the system to use the disk again.

If you no longer want to use the disk, open the repair issue and select **Remove**.
