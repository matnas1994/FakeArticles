@extends('layouts.app')

@section('title', 'Rejestracja')

@section('content')
    <div class='container'>
        <div class='row'>
            <div class='col-md-8 col-md-offset-2'>
            <div class='panel panel-default'>
                <div class='panel-body'>
                    <center><p><font size="5">Rejestracja</font></p></center>
                    <hr>
                    Twoj e-mail został zweryfikowany. Kliknij tu by się <a href="{{route('login')}}">zalogować</a>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
