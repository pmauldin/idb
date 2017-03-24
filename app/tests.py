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

from models import create_character, create_comic, create_creator, create_series,\
Character, Comic, Series, Creator
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
        assert(len(realData) == 11)
        test = create_character(realData)
        assert(isinstance(test, Character))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])


    def test_characters_2 (self) :
        realData = characters[1]
        assert(len(realData) == 11)
        test = create_character(realData)
        assert(isinstance(test, Character))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_characters_3 (self) :
        realData = characters[2]
        assert(len(realData) == 11)
        test = create_character(realData)
        assert(isinstance(test, Character))
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
        assert(len(realData) == 17)
        test = create_comic(realData)
        assert(isinstance(test, Comic))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_comics_2 (self) :
        realData = comics[1]
        assert(len(realData) == 17)
        test = create_comic(realData)
        assert(isinstance(test, Comic))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_comics_3 (self) :
        realData = comics[2]
        assert(len(realData) == 17)
        test = create_comic(realData)
        assert(isinstance(test, Comic))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])
    # ----
    # Creators
    # ----

    def test_creators_1 (self) :
        realData = creators[0]
        assert(len(realData) == 8)
        test = create_creator(realData)
        assert(isinstance(test, Creator))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_creators_2 (self) :
        realData = creators[1]
        assert(len(realData) == 8)
        test = create_creator(realData)
        assert(isinstance(test, Creator))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_creators_3 (self) :
        realData = creators[2]
        assert(len(realData) == 8)
        test = create_creator(realData)
        assert(isinstance(test, Creator))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    # ----
    # Series
    # ----

    def test_series_1 (self) :
        realData = series[0]
        assert(len(realData) == 16)
        test = create_series(realData)
        assert(isinstance(test, Series))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_series_2 (self) :
        realData = series[1]
        assert(len(realData) == 16)
        test = create_series(realData)
        assert(isinstance(test, Series))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])

    def test_series_3 (self) :
        realData = series[2]
        assert(len(realData) == 16)
        test = create_series(realData)
        assert(isinstance(test, Series))
        testData = test.getValues()
        for attribute in realData.keys() :
            # don't want to compare a relationship and a list
            if not isinstance(realData[attribute], list) :
                self.assertEqual(realData[attribute], testData[attribute])
# ----
# main
# ----

if __name__ == "__main__" : #pragma: no cover
    main()
