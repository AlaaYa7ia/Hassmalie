# Generated by Django 3.0.8 on 2021-02-17 15:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hassmalieapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Costumer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('phone_number', models.IntegerField(default=None)),
                ('address', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_of_building', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Worker',
            fields=[
                ('user', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('license', models.DateField(default=None)),
            ],
        ),
        migrations.AlterField(
            model_name='mybusiness',
            name='manager',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='M', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reporting_date', models.DateField(default=None)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('description', models.TextField()),
                ('project_id', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='hassmalieapp.Project')),
                ('worker_id', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='hassmalieapp.Worker')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='architect_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='architect_id', to='hassmalieapp.Worker'),
        ),
        migrations.AddField(
            model_name='project',
            name='contractor_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='contractor_id', to='hassmalieapp.Worker'),
        ),
        migrations.AddField(
            model_name='project',
            name='owner_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='hassmalieapp.Costumer'),
        ),
        migrations.AddField(
            model_name='mybusiness',
            name='deputy_director',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.PROTECT, to='hassmalieapp.Worker'),
        ),
    ]
