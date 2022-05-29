<?php 
    $conn = mysqli_connect("localhost", "root", "", "homework") or die(mysqli_connect_error());
    
    $post_id = mysqli_real_escape_string($conn, $_GET["q"]);

    $query = "DELETE FROM posts WHERE id = $post_id";

    mysqli_query($conn, $query);

    mysqli_close($conn);
?>