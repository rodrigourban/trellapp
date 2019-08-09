from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import Board, TaskList, Task
from .serializers import BoardSerializer, TaskListSerializer, TaskSerializer


@api_view(['GET','POST'])
def board_list(request):
  """
  List all boards, or create one
  """
  if request.method == 'GET':
    boards = Board.objects.all().filter(active=True)
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)
  
  if request.method == 'POST':
    serializer = BoardSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
def board_detail(request,pk):
  """
  Retrieve, update or delete a board
  """
  try:
    board = Board.objects.get(pk=pk)
  except Board.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
    serializer = BoardSerializer(board)
    return Response(serializer.data)
  
  elif request.method == 'PUT':
    serializer = BoardSerializer(board, data=request.data)
    if (serializer.is_valid()):
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'DELETE':
    board.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET','POST'])
def tasklist_list(request):
  """
  List all tasklist, or create one
  """
  if request.method == 'GET':
    tasklist = TaskList.objects.all().filter(active=True)
    serializer = TaskListSerializer(tasklist, many=True)
    return Response(serializer.data)
  
  if request.method == 'POST':
    serializer = TaskListSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
def tasklist_detail(request,pk):
  """
  Retrieve, update or delete a task
  """
  try:
    tasklist = TaskList.objects.get(pk=pk)
  except TaskList.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
    tasks = TaskList.objects.all().filter(board=pk,active=True).order_by('order')
    serializer = TaskListSerializer(tasks, many=True)
    return Response(serializer.data)
  
  elif request.method == 'PUT':
    serializer = TaskListSerializer(tasklist, data=request.data)
    if (serializer.is_valid()):
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'DELETE':
    tasklist.active = False
    tasklist.save()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def task_list(request):
  """
  Create a task
  """
  if request.method == 'POST':
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT','DELETE'])
def task_detail(request,pk):
  """
  Update or delete task
  """
  try:
    task = Task.objects.get(pk=pk)
  except Task.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'PUT':
    serializer = TaskSerializer(task, data=request.data)
    if (serializer.is_valid()):
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'DELETE':
    task.active = False
    task.save()
    return Response(status=status.HTTP_204_NO_CONTENT)

