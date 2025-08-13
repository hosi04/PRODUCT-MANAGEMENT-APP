# Sử dụng Python 3.9-slim làm base image để giảm kích thước
FROM python:3.9-slim

# Thiết lập biến môi trường
ENV PYTHONUNBUFFERED 1
# Thêm đường dẫn tới thư mục gốc của project vào PYTHONPATH
ENV PYTHONPATH=/app

# Tạo và thiết lập thư mục làm việc trong container
WORKDIR /app

# Cài đặt các dependencies hệ thống cần thiết cho mysqlclient
RUN apt-get update && apt-get install -y mariadb-client libmariadb-dev-compat gcc && rm -rf /var/lib/apt/lists/*

# Copy file requirements.txt và cài đặt các dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn của project vào container
COPY . .

# Expose port mà Gunicorn sẽ chạy trên đó
EXPOSE 8000

# Lệnh để chạy Gunicorn server.
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]
