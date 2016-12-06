---
layout: page
title: "Jupyter Notebooks Introduction"
description: "Setup and first steps for Jupyter Notebooks and Home Assistant."
date: 2016-07-23 09:00
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

<p class='note warning'>
Certain notebooks hosted in the [Home Assistant notebooks repository](https://github.com/home-assistant/home-assistant-notebooks) require access to a running Home Assistant instance or parts of a Home Assistant installation. If you want to run those notebooks install Home Assistant with `$ pip3 install homeassistant` as well.
</p>

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

You will get an empty notebook with one cell. Cells can contain code or text. To get the output of a cell you need to execute them with "Cell" -> "Run Cells" from the menu or by pressing the icon. 

<p class='img'>
  <img src='{{site_root}}/images/screenshots/jupyter-notebook.png' />
</p>

The downloadable version of this notebook is available in the [Home Assistant notebooks repository](https://github.com/home-assistant/home-assistant-notebooks/blob/master/first-notebook.ipynb).


As you can see is the workflow very similar to working directly with a Python shell. One advantage is that you can go back and forth as you please and save your work.


