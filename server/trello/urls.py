from django.urls import path
from .views import (board_list, board_detail,
                    tasklist_list, tasklist_detail,
                    task_list, task_detail
)

urlpatterns = [
  path('boards/', board_list),
  path('boards/<int:pk>', board_detail),
  path('tasklists/', tasklist_list),
  path('tasklists/<int:pk>', tasklist_detail),
  path('tasks/', task_list),
  path('tasks/<int:pk>', task_detail),
]
