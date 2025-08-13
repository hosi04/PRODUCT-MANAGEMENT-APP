# # views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import SimpleUser

# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         try:
#             user = SimpleUser.objects.get(username=username)
#         except SimpleUser.DoesNotExist:
#             return Response({'detail': 'Sai tên đăng nhập hoặc mật khẩu'}, status=status.HTTP_401_UNAUTHORIZED)

#         if user.password == password:
#             return Response({'detail': 'Đăng nhập thành công', 'username': user.username})
#         else:
#             return Response({'detail': 'Sai tên đăng nhập hoặc mật khẩu'}, status=status.HTTP_401_UNAUTHORIZED)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from .models import SimpleUser
from .serializers import SimpleUserSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = SimpleUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Đăng ký thành công'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = SimpleUser.objects.get(username=username)
        except SimpleUser.DoesNotExist:
            return Response({'detail': 'Sai tên đăng nhập hoặc mật khẩu'}, status=status.HTTP_401_UNAUTHORIZED)

        if check_password(password, user.password):  # so sánh hash
            return Response({
                'detail': 'Đăng nhập thành công',
                'username': user.username,
                'rule': user.rule
            })
        else:
            return Response({'detail': 'Sai tên đăng nhập hoặc mật khẩu'}, status=status.HTTP_401_UNAUTHORIZED)


# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         try:
#             user = SimpleUser.objects.get(username=username)
#         except SimpleUser.DoesNotExist:
#             return Response({'detail': 'Sai tên đăng nhập hoặc mật khẩu'}, status=status.HTTP_401_UNAUTHORIZED)

#         # Kiểm tra password hash
#         if check_password(password, user.password):
#             return Response({
#                 'detail': 'Đăng nhập thành công',
#                 'username': user.username,
#                 'rule': user.rule
#             })
#         else:
#             return Response({'detail': 'Sai tên đăng nhập hoặc mật khẩu'}, status=status.HTTP_401_UNAUTHORIZED)
