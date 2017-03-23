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

from models import create_character, create_comic
from data import characters, comics, creators, series

# -----------
# TestModels
# -----------

class TestModels (TestCase) :
    # ----
    # Characters
    # ----

    def test_characters_1 (self) :
        realData = characters[0]
        test = create_character(realData)
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])
        

    def test_characters_2 (self) :
        realData = characters[1]
        test = create_character(realData)
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_characters_3 (self) :
        realData = characters[2]
        test = create_character(realData)
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    # ----
    # Comics
    # ----

    def test_comics_1 (self) :
        realData = comics[0]
        test = create_comic(realData)
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_comics_2 (self) :
        realData = comics[1]
        test = create_comic(realData)
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_comics_3 (self) :
        realData = comics[2]
        test = create_comic(realData)
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])
    # ----
    # Creators
    # ----

    def test_creators_1 (self) :
        pass
    def test_creators_2 (self) :
        pass
    def test_creators_3 (self) :
        pass
    # ----
    # Series
    # ----

    def test_series_1 (self) :
        pass
    def test_series_2 (self) :
        pass
    def test_series_3 (self) :
        pass
# ----
# main
# ----

if __name__ == "__main__" : #pragma: no cover
    main()
