---
layout: page
title: "Jupyter Notebooks Introduction"
description: "Basic example how to track the battery level of your mobile devices."
date: 2016-07-20 09:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Jupyter Notebooks
---

The [Jupyter Notebooks](http://jupyter.org/) allows you to create and share documents that contain live code, equations, visualizations, and explanatory text directly in your browser. The web application what is formerly known as the IPython Notebook supports over 40 programming languages.

Visit [https://try.jupyter.org/](https://try.jupyter.org/) to get a preview before you install it locally.

The very first step is to install the requirement to run Jupyter Notebooks.

```bash
$ pip3 install jupyter matplotlib
```

Now you are able to start the application.

```bash
$ jupyter notebook
[I 17:22:18.081 NotebookApp] Writing notebook server cookie secret to /run/user/1000/jupyter/notebook_cookie_secret
[I 17:22:18.921 NotebookApp] Serving notebooks from local directory: /home/fabaff/home-assistant
[I 17:22:18.921 NotebookApp] 0 active kernels 
[I 17:22:18.921 NotebookApp] The Jupyter Notebook is running at: http://localhost:8888/
[I 17:22:18.922 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
```

Open [http://localhost:8888/](http://localhost:8888/) in your browser. Press "New" -> "Python3" to open a new notebook.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/jupyter-new.png' />
</p>

This example below is using the [Home Assistant Python API](/developers/python_api/).

### Using the Home Assistant Python API


```python
import homeassistant.remote as remote
```


```python
api = remote.API('127.0.0.1', 'mypass')
```


```python
print(remote.validate_api(api))
```

    ok



```python
office_temperature = remote.get_state(api, 'sensor.kitchen_temperature')
```


```python
print('{} is {} {}.'.format(office_temperature.attributes['friendly_name'],
                            office_temperature.state,
                            office_temperature.attributes['unit_of_measurement']
                            )
      )
```

    Kitchen Temperature is 25 °C.

