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

from models import Characters, Comics, Creators, Series, create_characters_comics_table
from data import characters, comics

# -----------
# TestModels
# -----------

class TestModels (TestCase) :
    # ----
    # Characters
    # ----

    def test_characters_1 (self) :
        # realData = characters[0]
        # test = Characters(**realData)
        # testData = test.getValues()
        # for attribute in realData.keys() :
        #     self.assertEqual(realData[attribute], testData[attribute])
        create_characters_comics_table(characters, comics)

    def test_characters_2 (self) :
        # realData = characters[1]
        # test = Characters(**realData)
        # testData = test.getValues()
        # for attribute in realData.keys() :
        #     self.assertEqual(realData[attribute], testData[attribute])
        pass

    def test_characters_3 (self) :
        # realData = characters[2]
        # test = Characters(**realData)
        # testData = test.getValues()
        # for attribute in realData.keys() :
        #     self.assertEqual(realData[attribute], testData[attribute])
        pass

    # ----
    # Comics
    # ----

    def test_comics_1 (self) :
        pass
    def test_comics_2 (self) :
        pass
    def test_comics_3 (self) :
        pass
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
