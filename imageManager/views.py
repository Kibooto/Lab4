from django.shortcuts import render, HttpResponse

import os

class ImageManager:
    def __init__(self, images_directory):
        self.images_directory = images_directory

    def get_image_path(self, image_name):
        return os.path.join(self.images_directory, image_name)

    def get_image_data(self, image_name):
        image_path = self.get_image_path(image_name)
        try:
            with open(image_path, 'rb') as image_file:
                image_data = image_file.read()
                return image_data
        except FileNotFoundError:
            return None

def get_image(request, image_name):
    images_directory = 'toys'
    image_manager = ImageManager(images_directory)
    image_data = image_manager.get_image_data(image_name)
    if image_data is None:
        return HttpResponse('Image not found', status=404)
    return HttpResponse(image_data, content_type='image/jpeg')
