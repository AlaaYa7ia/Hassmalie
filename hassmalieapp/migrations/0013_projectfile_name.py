# Generated by Django 3.0.5 on 2021-06-17 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hassmalieapp', '0012_car_driver_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectfile',
            name='name',
            field=models.TextField(default=''),
        ),
    ]
