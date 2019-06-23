import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import inspect
from sqlalchemy import MetaData
from sqlalchemy import Table

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


#################################################
# Database Setup
#################################################

db_uri = "sqlite:///static/data/brewerywinery.db"
engine = create_engine(db_uri)

Base = automap_base()
Base.prepare(engine, reflect=True)
brew_wine = Base.classes.brewery_winery_yelp
session = Session(engine)
inspector = inspect(engine)

app = Flask(__name__)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/allData")
def allData():
    columns = inspector.get_columns('brewery_winery_yelp')

    column_ls = []

    for c in columns:
        column_ls.append(c['name'])

    query = session.query(brew_wine.ID,
                            brew_wine.names,
                            brew_wine.address,
                            brew_wine.businesstype,
                            brew_wine.city,
                            brew_wine.zip,
                            brew_wine.lat,
                            brew_wine.long,
                            brew_wine.numberofyelpreviews,
                            brew_wine.yelprating).all()

    brew_wine_ls = []

    for ID, names, address, businesstype, city, Zip, lat, long, numberofyelpreviews, yelprating in query:
        brew_wine_ls.append({column_ls[0]: ID,
                            column_ls[1]: names,
                            column_ls[2]: address,
                            column_ls[3]: businesstype,
                            column_ls[4]: city,
                            column_ls[5]: Zip,
                            column_ls[6]: lat,
                            column_ls[7]: long,
                            column_ls[8]: numberofyelpreviews,
                            column_ls[9]: yelprating
                            })

    return jsonify(brew_wine_ls)

# NEED TO CAST RESULTS AS DICTIONARY BEFORE JSONIFYING (hawaii weather stations)

if __name__ == "__main__":
    app.run()
