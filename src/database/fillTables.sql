INSERT INTO
  "users" ("name", "email", "password")
  VALUES
    ('Lucas', 'lucaspcotrim@gmail.com', '$2a$10$EqTz4FXwkoSpCO/5t5xY6Ol2IPxEPe/oPDefUSL0ZIP2h63a2fBb2'),
    ('Vovó JuJu', 'vovojuju@hotmail.com', '$2a$10$sd2dL3bMRxmjo0H5YrDfeuncV0oTq.UGqOSqpoKQN6bgP3OJPqJ6i'),
    ('Jorel', 'jorel@gmail.com', '$2a$10$ujfXC.0BTTTgx99LMYtZteByZ8q.YEAQjG8Xahi4euqyOuCvck8lC'),
    ('Irmão do Jorel', 'imraodojorel@gmail.com', '$2a$10$DBQ.rkyiMT5XCcswbN0nW.iaOqhRxA1P7x49YYsbOsny9LRCcyyhy'),
    ('Lele', 'lele@gmail.com', '$2a$10$C497wa//SZgDpppYmIy.S.DrRZb.gz.R2PLG623deThOKePkY.Dn.');

INSERT INTO
  "urls" ("url", "shortUrl", "visitCount", "userId")
  VALUES
    ('https://s3.amazonaws.com/www-inside-design/uploads/2019/02/hackerman.png', '3lJi7nGI', 3, 1),
    ('https://assets-global.website-files.com/5f3c19f18169b62a0d0bf387/60d33be745999ac3353f49bd_KyhyHs_Rlf3kWWoC8Al_C9Y9SZ4dQu_K0fiLIsiCA5Gl8M3Eq77np68PFUgDPd6lKA8EmhKgWs7joHpsQm8upaoIayr4hi6O7Oj3HTzcoVop1HORjy74OdVTZNqFg_mIlfotr0EJ.png', 'OvtOj9HG', 0, 2),
    ('https://res.cloudinary.com/practicaldev/image/fetch/s--hdBGvvFK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zp7vxtgnlczthk02e51o.png', 'Mhms0XBC', 1, 3),
    ('https://devs.lol/uploads/2021/12/meme-dev-humor-if-youre-a-programmer-there-is-i-in-for-250.jpg', 'hC4JzZzg', 10, 1);

SELECT * FROM users;
SELECT * FROM urls;
