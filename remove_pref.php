<?php 
    $conn = mysqli_connect("localhost", "root", "", "homework") or die(mysqli_connect_error());
    
    $music_id = mysqli_real_escape_string($conn, $_GET["q"]);

    $query = "DELETE FROM pref WHERE id_canzone = $music_id";

    mysqli_query($conn, $query);

    mysqli_close($conn);
?>