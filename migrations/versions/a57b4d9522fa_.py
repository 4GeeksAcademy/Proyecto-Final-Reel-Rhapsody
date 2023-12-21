"""empty message

<<<<<<<< HEAD:migrations/versions/09d4ba76875f_.py
Revision ID: 09d4ba76875f
Revises: 
Create Date: 2023-12-17 23:32:13.696083
========
<<<<<<<< HEAD:migrations/versions/a57b4d9522fa_.py
Revision ID: a57b4d9522fa
Revises: 
Create Date: 2023-12-16 20:35:07.253796
========
Revision ID: 67a0ce19cd2d
Revises: 
Create Date: 2023-12-17 19:59:41.436445
>>>>>>>> d1cd822cb89b8d9ae73a8786cfa8c18738ff1f57:migrations/versions/67a0ce19cd2d_.py
>>>>>>>> 0a40eec9a9954c11a744f7545e386ce4984bf833:migrations/versions/a57b4d9522fa_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/09d4ba76875f_.py
revision = '09d4ba76875f'
========
revision = 'a57b4d9522fa'
>>>>>>>> 0a40eec9a9954c11a744f7545e386ce4984bf833:migrations/versions/a57b4d9522fa_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('full_name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###