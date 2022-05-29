<?php
    session_start();

    $conn = mysqli_connect("localhost", "root", "", "homework") or die(mysqli_error($conn));
    $query = "SELECT * FROM pref";
    $res = mysqli_query($conn, $query);
    
    $jsonPosts = array();

    while($row = mysqli_fetch_assoc($res)){
        $jsonPosts[]= $row;
    }
    
    echo json_encode($jsonPosts);
    mysqli_close($conn);
?>