# Сloud-storage. Сервис облачного хранилища с функцией шифрования загружаемых данных.
![Запись экрана 2023-06-07 в 22 25 06](https://github.com/afoninaanna/cloud-storage/assets/108758880/c5fbf429-f0e3-4d0b-8055-2bcd80c02f29)

  
## Содержание:
+ Описание примера работы с облачным хранилищем
+ Установка программы



## Описание примера работы с облачным хранилищем
Для начала необходимо авторизоваться, введя почту и пароль, или зарегистрироваться, нажав соответствующую кнопку в правом верхнем углу. После успешной авторизации будет доступна страница работы с облачным хранилищем, его корневая папка. 

В данном примере перейдем в папку server/айди пользователя/files, чтобы удостовериться, что там лежит всего 1 загруженный ранее файл. На локальном компьютере имеется подготовленный заранее файл "new.txt", в котором написана тема моей ВКР. Перенесем мышкой файл в облачное хранилище, после чего проверим его наличие в папке сервера. Файл появился, и мы видим, что он хранится в зашифрованном виде. Удалим файл с локального компьютера и попробуем скачать его с облака. Файл успешно скачивается в расшифрованном виде.

Также мы можем:
+ **Создавать папки** по нажатию на кнопку "Создать папку", откроется всплывающее окно с полем для ввода названия.

+ **Осуществлять навигацию по папкам**, нажимая на них и возвращаясь в случае необходимости по нажатию на кнопку "Назад".

+ **Искать папки и файлы** (вложенные в том числе), введя поисковый запрос в инпут, расположенный в верхнем правом углу шапки сайта.

+ **Менять представление файлов и папок** по нажатию на иконки списка и плитки.

+ **Сортировать** по названию, типу и дате создания.

+ **Загружать и удалять фотографию для аватара пользователя**, нажав на его инконку в правом верхнем углу.

   ![Запись экрана 2023-06-07 в 22 25 06](https://github.com/afoninaanna/cloud-storage/assets/108758880/e2419925-f578-40e2-bae5-22e1e45dc508)

## Установка программы

Система поставляется в виде zip-архива. 
1. Данный файл необходимо распаковать в любую директорию на жестком диске. В папке клиента и сервера должны быть папки config с секретными данными доступа к бд, порту и.т.д. 
2. Необходимо открыть разархивированную папку в среде разработки Visual Studio Code, запустить терминал и перейти в папку сервера, установив необходимые npm пакеты соответствующей командой. 

   <img width="482" alt="image" src="https://github.com/afoninaanna/cloud-storage/assets/108758880/1cbb45d0-c9fb-4c64-bf6c-67144ff31ed7">

3. То же самое проделать и с папкой клиента.

   <img width="482" alt="image" src="https://github.com/afoninaanna/cloud-storage/assets/108758880/289f28b4-cd9a-4d16-b2c8-eef5b0e028fb">

4. После этого необходимо запустить сервер.

   <img width="482" alt="image" src="https://github.com/afoninaanna/cloud-storage/assets/108758880/a9e37220-c958-4c0a-aa2d-f51bdb60a564">

5. А затем и клиент.

   <img width="478" alt="image" src="https://github.com/afoninaanna/cloud-storage/assets/108758880/2a83fd6c-2e4a-403c-888d-a20c24b9334b">

6. Откроется страница в браузере на указанном порту. Можно приступать к работе с облачным хранилищем.

   <img width="388" alt="image" src="https://github.com/afoninaanna/cloud-storage/assets/108758880/e538418c-0910-4d88-83e4-e9d1fe33f7c3">
