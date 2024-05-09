from django.shortcuts import render
from django.http import JsonResponse

from .models import News

# Create your views here.
def news_view(request):
    news = News.objects.all()

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        data = {'news': list(news.values())}
        return JsonResponse(data)

    return render(request, 'news/news.html')

def get_news(request):
    news = News.objects.all()
    data = {'news': list(news.values())}
    return JsonResponse(data)