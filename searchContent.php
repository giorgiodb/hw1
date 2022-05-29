<?php 
    $client_id = 'eadbeb5991b545c790931228d96c8ea1'; 
    $client_secret = 'ba6c657506214f04b4e6effd31c2704d'; 

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token' );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
    curl_setopt($ch, CURLOPT_POST, 1);
    
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials'); 
    $head = array('Authorization: Basic '.base64_encode($client_id.':'.$client_secret));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $head); 
    $token = json_decode(curl_exec($ch), true);

    curl_close($ch);    

    $query = urlencode($_GET["q"]);
    $url = 'https://api.spotify.com/v1/search?type=track&q='.$query;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$token['access_token'])); 
    $res=curl_exec($ch);
    curl_close($ch);

    echo $res;
?>
