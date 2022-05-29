<?php 
    session_start();
    if (!$userid = $_SESSION['user_id']){
        exit;
    }

    $conn = mysqli_connect("localhost", "root", "", "homework") or die(mysqli_error($conn));
    $query = "SELECT u.username, u.foto, p.content, p.nlikes, p.id from posts as p join user_s as u on u.id = p.user";
    $res = mysqli_query($conn, $query);
    
    $jsonPosts = array();

    while($row = mysqli_fetch_assoc($res)){
        $jsonPosts[]= $row;
    }

    $query1 = "SELECT username FROM user_s WHERE id = '".$_SESSION['user_id']."'";
    $res = mysqli_query($conn, $query1);
    $row = mysqli_fetch_assoc($res);
    $user = $row['username'];

    for ($i=0; $i < count($jsonPosts); $i++) { 
        $query_1 = "SELECT * FROM likes WHERE post_id=".$jsonPosts[$i]["id"]." AND username = '$user'";
        $res1 = mysqli_query($conn, $query_1);
        $row = mysqli_fetch_assoc($res1);
        if($row){
            $jsonPosts[$i]["ok"] = true;
        } else {
            $jsonPosts[$i]["ok"] = false;
        }
    }
    
    echo json_encode($jsonPosts);
    mysqli_free_result($res);
    mysqli_close($conn);
?>