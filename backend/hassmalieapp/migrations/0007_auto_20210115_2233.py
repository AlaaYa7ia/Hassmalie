# Generated by Django 3.0.8 on 2021-01-15 20:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hassmalieapp', '0006_auto_20210115_2229'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='age',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='title',
        ),
    ]
