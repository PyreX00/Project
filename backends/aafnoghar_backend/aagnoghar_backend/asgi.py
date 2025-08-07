

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowHostOriginValidator
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aagnoghar_backend.settings')

application = get_asgi_application()

from chat import routing
from chat.auth.token import  TokenAuthMiddleware

application = ProtocolTypeRouter(
    {'http':get_asgi_application(),
    'websocket':TokenAuthMiddleware(
        URLRouter(
            routing.websocket_urlpatterns
        )
    )}
)
