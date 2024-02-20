<?php
// Verifica se la password è stata inviata e se è corretta
if (isset($_POST['password']) && $_POST['password'] === 'montanellipetrarca') {
    // Password corretta, reindirizza l'utente alla pagina desiderata
    header('Location: https://user5095.github.io/Interrogazioni/');
    exit;