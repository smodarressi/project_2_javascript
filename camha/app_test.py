import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///static/data/brewerywinery.db"
db = SQLAlchemy(app)


Base = automap_base()
Base.prepare(engine, reflect=True)

brew_wine = Base.classes.brewery_winery_yelp
City = Base.classes.brewery_winery_yelp

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/city")
def city():
    """Return a list of cities."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(City).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (cities)
    return jsonify(list(df.columns)[6:])

@app.route("/allData")
def allData():
    columns = inspector.get_columns('brewery_winery_yelp')

    column_ls = []

    for c in columns:
        column_ls.append(c['name'])

    query = session.query(brew_wine.ID,
                            brew_wine.names,
                            brew_wine.businesstype,
                            brew_wine.address,
                            brew_wine.city,
                            brew_wine.zip,
                            brew_wine.lat,
                            brew_wine.long,
                            brew_wine.numberofyelpreviews,
                            brew_wine.yelprating).all()

    brew_wine_ls = []

    for ID, names, businesstype, address, city, Zip, lat, long, numberofyelpreviews, yelprating in query:
        brew_wine_ls.append({column_ls[0]: ID,
                            column_ls[1]: names,
                            column_ls[2]: businesstype,
                            column_ls[3]: address,
                            column_ls[4]: city,
                            column_ls[5]: zip,
                            column_ls[6]: lat,
                            column_ls[7]: long,
                            column_ls[8]: numberofyelpreviews,
                            column_ls[9]: yelprating
                            })

    return jsonify(brew_wine_ls)

# NEED TO CAST RESULTS AS DICTIONARY BEFORE JSONIFYING (hawaii weather stations)

if __name__ == "__main__":
    app.run()
