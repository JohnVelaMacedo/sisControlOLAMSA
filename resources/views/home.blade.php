@extends('layouts.master')

@section('content')
<div id="app" class="{{ Auth::user()->tipo }}">
    <h1>Cargando...</h1>
</div>
@endsection
