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

# from io       import StringIO
from unittest import main, TestCase

from models import Characters, Comics, Creators, Series
import data

# -----------
# TestModels
# -----------

class TestModels (TestCase) :
    # ----
    # Characters
    # ----

    def test_characters_1 (self) :
        realData = data.characters[0]
        test = Characters(**realData)
        testData = test.getValues()
        for attribute in realData.keys() :
            self.assertEqual(realData[attribute], testData[attribute])

    def test_characters_2 (self) :
        realData = data.characters[1]
        test = Characters(**realData)
        testData = test.getValues()
        for attribute in realData.keys() :
            self.assertEqual(realData[attribute], testData[attribute])

    def test_characters_3 (self) :
        realData = data.characters[2]
        test = Characters(**realData)
        testData = test.getValues()
        for attribute in realData.keys() :
            self.assertEqual(realData[attribute], testData[attribute])

    # ----
    # Comics
    # ----

    def test_comics_1 (self) :

    def test_comics_2 (self) :

    def test_comics_3 (self) :

    # ----
    # Creators
    # ----

    def test_creators_1 (self) :

    def test_creators_2 (self) :

    def test_creators_3 (self) :

    # ----
    # Series
    # ----

    def test_series_1 (self) :

    def test_series_2 (self) :

    def test_series_3 (self) :

# ----
# main
# ----

if __name__ == "__main__" : #pragma: no cover
    main()
