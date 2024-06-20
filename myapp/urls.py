from django.urls import path
from . import views

app_name = 'myapp'

urlpatterns = [
    path('',views.home, name='home'),
    path('personal/',views.personal,name='personal'),

    path('add_note/',views.add_note,name='add_note'),
    path('delete_note/',views.delete_note,name='delete_note'),
    path('edit_note/',views.edit_note,name="edit_note")

]
