# Generated by Django 3.0.5 on 2021-06-11 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hassmalieapp', '0006_projectfile_deleted'),
    ]

    operations = [
        migrations.AddField(
            model_name='bid',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]
