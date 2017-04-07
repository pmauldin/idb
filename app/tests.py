#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# -------------------------------
# idb/marveldb-server/tests.py
# Jorge Zapien-Diaz, Christiano Contreras
# -------------------------------

# https://docs.python.org/3.4/reference/simple_stmts.html#grammar-token-assert_stmt

# -------
# imports
# -------

from unittest import main, TestCase

from models import *
from data import characters, comics, creators, series
import sqlalchemy

# -----------
# TestModels
# -----------

class TestModels (TestCase) :
    
    # ----
    # Characters
    # ----

    def test_characters_1 (self) :
        realData = characters[0]
        assert len(realData) == 11
        
        characters_table = get_characters_table(meta, con)
        select_clause = characters_table.select(characters_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in characters_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))
                
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                self.assertEqual(str(realData[key]), rowDict[key])

    def test_characters_2 (self) :
        realData = characters[1]
        assert len(realData) == 11
        
        characters_table = get_characters_table(meta, con)
        select_clause = characters_table.select(characters_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in characters_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))
                
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                self.assertEqual(str(realData[key]), rowDict[key])

    def test_characters_3 (self) :
        realData = characters[2]
        assert len(realData) == 11
        
        characters_table = get_characters_table(meta, con)
        select_clause = characters_table.select(characters_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in characters_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))
                
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                self.assertEqual(str(realData[key]), rowDict[key])

    # ----
    # Comics
    # ----

    def test_comics_1 (self) :
        realData = comics[0]
        assert len(realData) == 17
        
        comics_table = get_comics_table(meta, con)
        select_clause = comics_table.select(comics_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in comics_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))

        # Get Association Table for Series_Comics
        series_comics_table = get_series_comics_table(meta, con)
        select_clause = series_comics_table.select(series_comics_table.c.comic_id == realData["id"])
        rows2 = select_clause.execute()
        row2 = rows2.fetchone()
                        
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                if key == "series_id":
                    # Compare series_id in the database with that of the sampled data
                    self.assertEqual(realData["series_id"], row2[1])
                else:
                    self.assertEqual(str(realData[key]), rowDict[key])


    def test_comics_2 (self) :
        realData = comics[1]
        assert len(realData) == 17
        
        comics_table = get_comics_table(meta, con)
        select_clause = comics_table.select(comics_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in comics_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))

        # Get Association Table for Series_Comics
        series_comics_table = get_series_comics_table(meta, con)
        select_clause = series_comics_table.select(series_comics_table.c.comic_id == realData["id"])
        rows2 = select_clause.execute()
        row2 = rows2.fetchone()
                        
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                if key == "series_id":
                    # Compare series_id in the database with that of the sampled data
                    self.assertEqual(realData["series_id"], row2[1])
                else:
                    self.assertEqual(str(realData[key]), rowDict[key])

    def test_comics_3 (self) :
        realData = comics[2]
        assert len(realData) == 17
        
        comics_table = get_comics_table(meta, con)
        select_clause = comics_table.select(comics_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in comics_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))

        # Get Association Table for Series_Comics
        series_comics_table = get_series_comics_table(meta, con)
        select_clause = series_comics_table.select(series_comics_table.c.comic_id == realData["id"])
        rows2 = select_clause.execute()
        row2 = rows2.fetchone()
                        
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                if key == "series_id":
                    # Compare series_id in the database with that of the sampled data
                    self.assertEqual(realData["series_id"], row2[1])
                else:
                    self.assertEqual(str(realData[key]), rowDict[key])

    # ----
    # Creators
    # ----

    def test_creators_1 (self) :
        realData = creators[0]
        assert len(realData) == 8
        
        creators_table = get_creators_table(meta, con)
        select_clause = creators_table.select(creators_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in creators_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))
                
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                print(key, "|", rowDict[key])
                self.assertEqual(str(realData[key]), rowDict[key])

    def test_creators_2 (self) :
        realData = creators[1]
        assert len(realData) == 8
        
        creators_table = get_creators_table(meta, con)
        select_clause = creators_table.select(creators_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in creators_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))
                
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                self.assertEqual(str(realData[key]), rowDict[key])

    def test_creators_3 (self) :
        realData = creators[2]
        assert len(realData) == 8
        
        creators_table = get_creators_table(meta, con)
        select_clause = creators_table.select(creators_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in creators_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))
                
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                self.assertEqual(str(realData[key]), rowDict[key])

    # ----
    # Series
    # ----

    def test_series_1 (self) :
        realData = series[0]
        assert len(realData) == 16
        
        series_table = get_series_table(meta, con)
        select_clause = series_table.select(series_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in series_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))
                
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                self.assertEqual(str(realData[key]), rowDict[key])

    def test_series_2 (self) :
        realData = series[1]
        assert len(realData) == 16
        
        series_table = get_series_table(meta, con)
        select_clause = series_table.select(series_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in series_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))
                
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                self.assertEqual(str(realData[key]), rowDict[key])

    def test_series_3 (self) :
        realData = series[2]
        assert len(realData) == 16
        
        series_table = get_series_table(meta, con)
        select_clause = series_table.select(series_table.c.id == realData["id"])
        rows = select_clause.execute()
        row = rows.fetchone()
        rowDict = {}
        for column in series_table.columns:
            rowDict[column.name] = str(getattr(row, column.name))
                
        for key in realData.keys() :
            if not isinstance(realData[key], list) :
                self.assertEqual(str(realData[key]), rowDict[key])

# ----
# main
# ----

if __name__ == '__main__':
    con, meta = connect("jorge", "hummer256")
    main()
