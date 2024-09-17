## Network storage

You can configure both Network File Share (NFS) and Windows samba (CIFS) targets to be used within Home Assistant and add-ons.
To list all your currently connected network storages, go to **{% my storage title="Settings > System > Storage" %}** in the UI.

{% if page.installation == "os" %}

{% important %}
You need to update to Home Assistant Operating System 10.2 before you can use this feature.
{% endimportant %}

{% else %}

{% important %}

You need to make sure you run a supported {% term "Home Assistant Supervised" %} installation with the latest version of the [os-agent](https://github.com/home-assistant/os-agent). Make sure that your supervisor uses [slave bind propagation](https://docs.docker.com/storage/bind-mounts/#configure-bind-propagation) for the data volume.

{% endimportant %}

{% endif %}

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/list_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/list_light.png">
  </picture>
  Screenshot of the list of network shares inside the storage panel.
</p>

### Add a new network storage

1. Go to **{% my storage title="Settings > System > Storage" %}** in the UI.
2. Select **Add network storage**.
3. Fill out all the information for your network storage.
4. Select **Connect**.

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
  description: This is the name that will be used for the mounted directory on your system.
Usage:
  description: Here, you select how the target should be used. [See usage types below](#usage-types)
Server:
  description: The IP/hostname of the server running NFS/CIFS.
"Protocol<sup>3</sup>":
  description: The service the server is using for the network storage.
"[NFS]<sup>1</sup> Remote share path":
  description: The path used to connect to the remote storage server.
"[CIFS]<sup>2</sup> Username":
  description: The username to use when connecting to the storage server.
"[CIFS]<sup>2</sup> Password":
  description: The password to use when connecting to the storage server.
"[CIFS]<sup>2</sup> Share":
  description: The share to connect to on the storage server.
{% endconfiguration_basic %}

<sup>1</sup> _Options prefixed with `[NFS]` are only available for NFS targets._<br>
<sup>2</sup> _Options prefixed with `[CIFS]` are only available for CIFS targets._<br>
<sup>3</sup> _For the `CIFS` option, only version 2.1+ is supported._<br>

##### Usage types

{% configuration_basic "hassio.network_share.usage" %}
Backup:
  description: This will become a target.  You can use it in service calls or when manually creating a backup. The first storage you add of this type becomes your new default target. If you want to change the default target, [check out the documentation below](#change-default-backup-location).
Media:
  description: A new directory with the name you gave your network storage will be created under `/media`. This directory can be accessed by Home Assistant and add-ons.
Share:
  description: A new directory with the name you gave your network storage will be created under `/share`.  This directory can be accessed by Home Assistant and add-ons.
{% endconfiguration_basic %}

### Change default backup location

By default, the first network storage of type **Backup** that you add will be set as your default backup target.

If you want to change the default backup target, you can do the following:

1. Go to **{% my backup title="Settings > System > Backups" %}** in the UI.
2. Select the menu in the top right of the screen and select the **Change default backup location** option.
3. In the dialog, there is a single option to set the default backup target.
4. Choose the one you want from the list.
5. Select **Save**.

This list will contain all the network storage targets you have added of usage type **Backup**. It also contains another option to set it back to use `/backup` again.

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/change_backup_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/change_backup_light.png">
  </picture>
  Screenshot of changing the default backup target.
</p>
