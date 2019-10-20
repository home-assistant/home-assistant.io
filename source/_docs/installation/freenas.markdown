---
title: "Installation on FreeNAS 11.2"
description: "Installation of Home Assistant on your FreeNAS."
---

[FreeNAS](https://www.freenas.org) is a free and open-source network-attached storage (NAS) software based on FreeBSD and the OpenZFS file system. It is licensed under the terms of the BSD License and runs on commodity x86-64 hardware.

This has been tested on FreeNAS 11.2 and should also work on FreeBSD 11.x as well. These instructions assume you already have a running and accessible jail. For more information on creating a jail read the official FreeNAS User Guide regarding [Jails](https://www.ixsystems.com/documentation/freenas/11.2/jails.html). Once you have the jail available, follow the steps below. Directories used follow standard BSD conventions but can be adjusted as you wish.

Create the user and group that Home Assistant will run as. The user/group ID of `8123` can be replaced if this is already in use in your environment.

```bash
pw groupadd -n homeassistant -g 8123
echo 'homeassistant:8123:8123::::::/bin/csh:' | adduser -f -
```

Install the necessary Python packages and virtualenv:

```bash
pkg update
pkg upgrade
pkg install -y python37 py37-sqlite3 ca_root_nss
python3.7 -m ensurepip
pip3 install --upgrade pip
pip3 install --upgrade virtualenv
```

Create the installation directory:

```bash
mkdir -p /usr/local/share/homeassistant
chown -R homeassistant:homeassistant /usr/local/share/homeassistant
```

Install Home Assistant itself:

```bash
su homeassistant
cd /usr/local/share/homeassistant
virtualenv -p python3.7 .
source ./bin/activate.csh
pip3 install homeassistant
```

While still in the `venv`, start Home Assistant to populate the configuration directory.

```bash
hass --open-ui
```

Wait until you see:

```bash
(MainThread) [homeassistant.core] Starting Home Assistant
```

Then escape and exit the `venv`.

```bash
deactivate
exit
```

Create the directory and the `rc.d` script for the system-level service that enables Home Assistant to start when the jail starts.

```bash
mkdir /usr/local/etc/rc.d/
```

Then create a file at `/usr/local/etc/rc.d/homeassistant` and insert the content below:

```bash
vi /usr/local/etc/rc.d/homeassistant
```

```bash
#!/bin/sh
#
# Based upon work by tprelog at https://www.ixsystems.com/community/resources/fn-11-2-iocage-home-assistant-jail-plugins-for-node-red-mosquitto-amazon-dash-tasmoadmin.102/
#
# PROVIDE: homeassistant
# REQUIRE: LOGIN
# KEYWORD: shutdown
#
# homeassistant_enable:    Set to YES to enable the homeassistant service.
#            Default: NO
# homeassistant_user:    The user account used to run the homeassistant daemon.
#            This is optional, however do not specifically set this to an
#            empty string as this will cause the daemon to run as root.
#            Default: homeassistant
# homeassistant_group:    The group account used to run the homeassistant daemon.
#            This is optional, however do not specifically set this to an
#            empty string as this will cause the daemon to run with group wheel.
#            Default: homeassistant
# homeassistant_config_dir:    Directory where config files are located.
#            Default: /home/homeassistant/.homeassistant
# homeassistant_install_dir:    Directory where Home Assistant is installed.
#            Default: /usr/local/share/homeassistant
#
# sysrc homeassistant_enable=yes
# service homeassistant start

. /etc/rc.subr
name=homeassistant
rcvar=${name}_enable

pidfile_child="/var/run/${name}.pid"
pidfile="/var/run/${name}_daemon.pid"

load_rc_config ${name}
: ${homeassistant_enable:="NO"}
: ${homeassistant_user:="homeassistant"}
: ${homeassistant_group:="homeassistant"}
: ${homeassistant_config_dir:="/home/homeassistant/.homeassistant"}
: ${homeassistant_install_dir:="/usr/local/share/homeassistant"}

command="/usr/sbin/daemon"
start_precmd=${name}_precmd
homeassistant_precmd()
{
    rc_flags="-f -P ${pidfile} -p ${pidfile_child} ${homeassistant_install_dir}/bin/hass --config ${homeassistant_config_dir} ${rc_flags}"

    if [ ! -e "${pidfile_child}" ]; then
            install -g ${homeassistant_group} -o ${homeassistant_user} -- /dev/null "${pidfile_child}";
    fi

    if [ ! -e "${pidfile}" ]; then
            install -g ${homeassistant_group} -o ${homeassistant_user} -- /dev/null "${pidfile}";
    fi

    if [ ! -d "${homeassistant_config_dir}" ]; then
            install -d -g ${homeassistant_group} -o ${homeassistant_user} -- "${homeassistant_config_dir}";
    fi

    echo "Performing check on Home Assistant configuration:"
    eval "${homeassistant_install_dir}/bin/hass" --config "${homeassistant_config_dir}" --script check_config
}

stop_postcmd=${name}_postcmd
homeassistant_postcmd()
{
    rm -f -- "${pidfile}"
    rm -f -- "${pidfile_child}"
}

run_rc_command "$1"
```

Make the `rc.d` script executable:

```bash
# chmod +x /usr/local/etc/rc.d/homeassistant
```

Configure the service to start on boot and start the Home Assistant service:

```bash
sysrc homeassistant_enable="YES"
service homeassistant start
```

You can also restart the jail to ensure that Home Assistant starts on boot.

<div class='note'>

USB Z-wave sticks may give `dmesg` warnings similar to "data interface 1, has no CM over data, has no break". This doesn't impact the function of the Z-Wave stick in Home Assistant. Just make sure the proper `/dev/cu*` is used in the Home Assistant `configuration.yaml` file.

</div>
