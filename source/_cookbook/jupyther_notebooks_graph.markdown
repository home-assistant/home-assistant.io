---
layout: page
title: "Jupyter Notebooks Graph"
description: "Basic example how to create a graph with a Jupyter notebook."
date: 2016-07-20 09:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Jupyter Notebooks
---

This notebook show a way to create a graph with data provided by Home Assistant. Instead of SQLAlchemy is the built-in Python support for SQLite used. 

### Setup


```python
# matplotlib for plotting the data
%pylab inline
```

    Populating the interactive namespace from numpy and matplotlib



```python
import sqlite3

from matplotlib import dates

import homeassistant.util.dt as dt
```


```python
# Your database url as specified in configuration.yaml
# If using default settings, it's <path to config dir>/home-assistant_v2.db
DB = '/home/[your_user]/.homeassistant/home-assistant_v2.db'
SENSOR = 'sensor.aare'
```


```python
conn = sqlite3.connect(DB)
```

### Query


```python
data = conn.execute("SELECT state, last_changed FROM states where entity_id = '{}'".format(SENSOR))
```

### Prepare data for graph


```python
values = []
timestamps = []
for x in data:
    timestamps.append(dates.date2num(dt.parse_datetime(x[1])))
    values.append(float(x[0]))
```

### Plot the graph


```python
plt.plot_date(x=timestamps, y=values, fmt="r-")
plt.ylabel('Temperature')
plt.xlabel('Time line')
```




    <matplotlib.text.Text at 0x7faa6009a6d8>




<p class='img'>
  <img src='{{site_root}}/images/screenshots/jupyter-graph.png' />
</p>


