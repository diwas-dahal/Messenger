# Generated by Django 3.1.6 on 2021-02-06 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Messages', '0002_auto_20210206_0948'),
    ]

    operations = [
        migrations.AlterField(
            model_name='globalmessage',
            name='content',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
    ]
