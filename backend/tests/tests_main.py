from typing import List
from django.test import TestCase


class testNothingAtAll(TestCase):

    def test_demo_equal(self):
        a_number: int = 1
        self.assertEqual(a_number, a_number)

    def test_demo_false(self):
        this_is_false: List = []  # an empty list is False
        self.assertFalse(this_is_false)
