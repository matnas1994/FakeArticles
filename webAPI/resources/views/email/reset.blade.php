<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
 Witaj , <br />
 Kliknij w link, aby zwerfikować swój e-mail,<a   target="_blank"> zweryfikuj</a>. <br />
 Dziekujemy.
 <br/>
 <br/>
 Pozdrawiamy,<br />{{ config('app.name') }}
</body>
</html>
