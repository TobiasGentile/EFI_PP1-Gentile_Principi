"""Relacion_reload

Revision ID: 2a92bcdd7566
Revises: 66c800718f63
Create Date: 2024-08-06 22:08:37.311003

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '2a92bcdd7566'
down_revision = '66c800718f63'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('accesorio_equipo',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('equipo_id', sa.Integer(), nullable=False),
    sa.Column('accesorio_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['accesorio_id'], ['accesorio.id'], ),
    sa.ForeignKeyConstraint(['equipo_id'], ['equipo.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('accesorio', schema=None) as batch_op:
        batch_op.alter_column('modelo_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)
        batch_op.alter_column('proveedor_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)

    with op.batch_alter_table('caracteristica', schema=None) as batch_op:
        batch_op.alter_column('equipo_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)

    with op.batch_alter_table('equipo', schema=None) as batch_op:
        batch_op.alter_column('modelo_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)
        batch_op.alter_column('categoria_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)
        batch_op.alter_column('proveedor_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)

    with op.batch_alter_table('modelo', schema=None) as batch_op:
        batch_op.add_column(sa.Column('marca_id', sa.Integer(), nullable=False))
        batch_op.alter_column('fabricante_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)
        batch_op.create_foreign_key(None, 'marca', ['marca_id'], ['id'])

    with op.batch_alter_table('stock', schema=None) as batch_op:
        batch_op.alter_column('equipo_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('stock', schema=None) as batch_op:
        batch_op.alter_column('equipo_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)

    with op.batch_alter_table('modelo', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('fabricante_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)
        batch_op.drop_column('marca_id')

    with op.batch_alter_table('equipo', schema=None) as batch_op:
        batch_op.alter_column('proveedor_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)
        batch_op.alter_column('categoria_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)
        batch_op.alter_column('modelo_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)

    with op.batch_alter_table('caracteristica', schema=None) as batch_op:
        batch_op.alter_column('equipo_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)

    with op.batch_alter_table('accesorio', schema=None) as batch_op:
        batch_op.alter_column('proveedor_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)
        batch_op.alter_column('modelo_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)

    op.drop_table('accesorio_equipo')
    # ### end Alembic commands ###