from django.shortcuts import render
from django.http import JsonResponse

from .models import *

# Create your views here.
def market_view(request):
    toys = Toy.objects.all()
    categories = Category.objects.all()

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Якщо запит є AJAX-запитом, відправляємо дані у форматі JSON
        data = {'toys': list(toys.values())}
        return JsonResponse(data)

    return render(request, 'market/index.html')

def get_toys(request):
    """
    Retrieve all toys from the database and send the data to the frontend.

    Returns:
        JsonResponse: A JSON response containing the toys data.
    """
    toys = Toy.objects.all()
    data = {'toys': list(toys.values())}
    print("sending toys data to frontend...")
    return JsonResponse(data)