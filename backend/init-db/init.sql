-- -- backend/init-db/init.sql
-- CREATE USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'admin';
-- GRANT ALL PRIVILEGES ON product_management.* TO 'admin'@'%';
-- FLUSH PRIVILEGES;


-- backend/init-db/init.sql
-- Cấp các quyền cần thiết cho Debezium
-- Người dùng 'admin' đã được tạo tự động bởi docker-compose
GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'admin'@'%';

-- Đảm bảo các thay đổi về quyền có hiệu lực ngay lập tức
FLUSH PRIVILEGES;