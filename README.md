# Домашнє завдання. Тема 9. Робота з файлами та тестування додатків
Продовж створення REST API для роботи з колекцією контактів. Додай можливість завантаження аватарки користувача через `[Multer]`.

## Крок 1
 - Створи папку `public` для роздачі статики. У цій папці зроби папку `avatars`.
 - Налаштуй `Express` на роздачу статичних файлів з папки `public`.
 - Поклади будь-яке зображення в папку `public/avatars` і перевір, що роздача статики працює.
 - При переході по такому `URL` браузер відобразить зображення. `Shell http://locahost:<порт>/avatars/<ім'я файлу з розширенням>`

 ## Крок 2
 У схему користувача додай нову властивість `avatarURL` для зберігання зображення.
 ```
 {
  ...
  avatarURL: DataTypes.STRING,
  ...
}
```
Використовуй пакет `gravatar` для того, щоб при реєстрації нового користувача відразу згенерувати йому аватар по його `email`.

## Крок 3
При реєстрації користувача:
 - Створюй посилання на аватарку користувача за допомогою gravatar
 - Отриманий URL збережи в поле avatarURL під час створення користувача

## Крок 4
Додай можливість поновлення аватарки, створивши ендпоінт `/auth/avatars` і використовуючи метод `PATCH`.
 - Створи папку temp в корені проекту і зберігай в неї завантажену аватарку.
 - Перенеси аватарку користувача з папки `temp` в папку `public/avatars` і дай їй унікальне ім'я для конкретного користувача.
 - Отриманий `URL /avatars/<ім'я файлу з розширенням>` та збережи в поле `avatarURL` користувача.

 ## Перед початком роботи переконайтесь, що створені або створіть таблиці сontacts та users
 ```
create table сontacts (
	id SERIAL PRIMARY key,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(180) NOT NULL,
	phone VARCHAR(100) NOT NULL,
	favorite BOOLEAN DEFAULT false,
	owner INT NOT NULL
);


create table users (
	id SERIAL PRIMARY key,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	subscription VARCHAR(20) CHECK (subscription IN ('starter', 'pro', 'business')) DEFAULT 'starter',
	token TEXT DEFAULT NULL
);

ALTER TABLE contacts ADD CONSTRAINT fk_contacts_user FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE;
 ```