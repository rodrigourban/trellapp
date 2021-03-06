from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import Board, TaskList, Task
from .serializers import BoardSerializer, TaskListSerializer, TaskSerializer


@api_view(['GET', 'POST'])
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


@api_view(['GET', 'PUT', 'DELETE'])
def board_detail(request, pk):
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


@api_view(['GET', 'POST'])
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


@api_view(['GET', 'PUT', 'DELETE'])
def tasklist_detail(request, pk):
    """
    Retrieve, update or delete a task
    """
    if request.method == 'GET':
        tasks = TaskList.objects.all().filter(board=pk, active=True).order_by('order')
        serializer = TaskListSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        try:
            tasklist = TaskList.objects.get(pk=pk)
        except TaskList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TaskListSerializer(tasklist, data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Soft delete and reorder remaining
        try:
            tasklist = TaskList.objects.get(pk=pk)
        except TaskList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        remaining = TaskList.objects.all().filter(board=tasklist.board, active=True,
                                                  order__gt=tasklist.order)
        for el in remaining:
            el.order -= 1
            el.save()

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


@api_view(['PUT', 'DELETE'])
def task_detail(request, pk):
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
        # Soft delete and reorder remainings
        remaining = Task.objects.all().filter(task_list=task.task_list, active=True,
                                              order__gt=task.order)
        for el in remaining:
            el.order -= 1
            el.save()

        task.active = False
        task.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def reorder_list(request):
    """
      Allows to alter order for tasks
      Pre-requesite: { firstID, secondID}
    """
    if request.method == 'POST':
        if ('firstID' not in request.data.keys() or
                'secondID' not in request.data.keys()
            ):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            first = TaskList.objects.get(pk=request.data['firstID'])
            second = TaskList.objects.get(pk=request.data['secondID'])
        except TaskList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # The moved object should take place of the second index, and move one place forward the following.
        i = second.order
        if first.order <= second.order:
            tasks = TaskList.objects.all().filter(board=first.board, active=True,
                                                  order__gt=first.order, order__lte=second.order)
            for el in tasks:
                el.order -= 1
                el.save()

        else:
            tasks = TaskList.objects.all().filter(board=first.board, active=True,
                                                  order__gte=second.order, order__lt=first.order)
            for el in tasks:
                el.order += 1
                el.save()

        first.order = i
        first.save()

        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def reorder_tasks(request):
    """
     Allows to reorder tasks and change their tasklist
     firstID: origen, secondID: destination,
     taskListID: empty list ID to add new task
    """
    if request.method == 'POST':
        second = None
        tasklist = None
        if ('firstID' not in request.data.keys()):
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"message": "Please enter valid fields"})
        try:
            first = Task.objects.get(pk=request.data['firstID'])
            if 'tasklistID' in request.data.keys():
                tasklist = TaskList.objects.get(pk=request.data['tasklistID'])
            if 'secondID' in request.data.keys():
                second = Task.objects.get(pk=request.data['secondID'])
        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND,
                            data={"message": "Id given not found"})

        if tasklist:
            # Move into a empty list
            # If tasklist doesnt have any task, make it the first
            # Also rearrange source tasklist for missing element
            newOrder = 1
            tasks = Task.objects.all().filter(task_list=first.task_list, active=True,
                                              order__gt=first.order)
            for el in tasks:
                el.order -= 1
                el.save()

            destinyTasks = Task.objects.all().filter(
                task_list=tasklist, active=True).count()
            if destinyTasks >= 1:
                newOrder = destinyTasks + 1
            first.order = newOrder
            first.task_list = tasklist
            first.save()

        else:
            if second:
                # Change order inside a tasklist
                i = second.order
                if first.task_list.id == second.task_list.id:
                    # If they are within the same tasklist, order matters
                    if first.order < second.order:
                        tasks = Task.objects.all().filter(task_list=second.task_list, active=True,
                                                          order__gt=first.order, order__lte=second.order)
                        for el in tasks:
                            el.order -= 1
                            el.save()

                        first.order = i
                        first.save()

                    else:
                        tasks = Task.objects.all().filter(task_list=second.task_list, active=True,
                                                          order__gte=second.order, order__lt=first.order)
                        for el in tasks:
                            el.order += 1
                            el.save()

                        first.order = i
                        first.save()
                else:
                    # Elements are not in the same tasklist, order doesnt matters
                    # Rearrange the source tasklist
                    sourceTasks = Task.objects.all().filter(task_list=first.task_list, active=True,
                                                            order__gt=first.order)
                    for el in sourceTasks:
                        el.order -= 1
                        el.save()

                    tasks = Task.objects.all().filter(task_list=second.task_list, active=True,
                                                      order__gte=second.order)

                    for el in tasks:
                        el.order += 1
                        el.save()

                    first.order = i
                    first.task_list = second.task_list
                    first.save()

        return Response(status=status.HTTP_200_OK, data={"message": "Tasks reordered successfully"})
