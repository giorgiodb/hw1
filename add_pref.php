<?php 
    session_start();
    $conn = mysqli_connect("localhost", "root", "", "homework") or die(mysqli_connect_error());

    $music_id = mysqli_real_escape_string($conn, $_GET["id"]);
    $user = mysqli_real_escape_string($conn, $_GET["user"]);
    $img_track = mysqli_real_escape_string($conn, $_GET["img_track"]);
    $title_track = mysqli_real_escape_string($conn, $_GET["title_track"]);
    $author_track = mysqli_real_escape_string($conn, $_GET["author_track"]);
    $link_track = mysqli_real_escape_string($conn, $_GET["link_track"]);

    $query = "INSERT INTO pref (user, id_pref, track_img, track_title, track_author, track_link) VALUES ('$user', '$music_id', '$img_track', '$title_track', '$author_track', '$link_track')";

    $res = mysqli_query($conn, $query);
    echo 1;

    mysqli_close($conn);
?>