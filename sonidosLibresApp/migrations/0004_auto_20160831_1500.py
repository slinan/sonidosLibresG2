# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-08-31 20:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sonidosLibresApp', '0003_auto_20160831_0903'),
    ]

    operations = [
        migrations.CreateModel(
            name='Multa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='TipoInfraccion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(max_length=40)),
                ('monto', models.DecimalField(decimal_places=2, max_digits=12)),
            ],
        ),
        migrations.AddField(
            model_name='puntoprestamo',
            name='direccion',
            field=models.CharField(default='cra1', max_length=60),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='usuario',
            name='tipoUsuario',
            field=models.CharField(choices=[('F', 'Funcionario'), ('U', 'Usuario'), ('A', 'Administrador')], max_length=1),
        ),
        migrations.AddField(
            model_name='multa',
            name='tipoDeInfraccion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sonidosLibresApp.TipoInfraccion'),
        ),
        migrations.AddField(
            model_name='multa',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sonidosLibresApp.Usuario'),
        ),
    ]
