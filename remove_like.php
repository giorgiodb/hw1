<?php 
    $conn = mysqli_connect("localhost", "root", "", "homework") or die(mysqli_connect_error());

    $post_id = mysqli_real_escape_string($conn, $_GET["id"]);
    $username = mysqli_real_escape_string($conn, $_GET["user"]);
    
    $query = "DELETE FROM likes WHERE post_id = $post_id AND username = '$username'";

    mysqli_query($conn, $query) or die(mysqli_error($conn));
    echo 1;

    mysqli_close($conn);
?>