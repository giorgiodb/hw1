<?php
    session_start();
    if (!$userid = $_SESSION['user_id']){
        exit;
    }

    if (isset($_POST['text'])){

        $conn = mysqli_connect("localhost", "root", "", "homework") or die(mysqli_error($conn));
        
        $userid = mysqli_real_escape_string($conn, $_SESSION['user_id']);
        $text = mysqli_real_escape_string($conn, $_POST['text']);

        $query = "INSERT INTO posts (user, content) VALUES ('".$userid."' , '".$text."')";
        $res = mysqli_query($conn , $query) or die(mysqli_error($conn));
        
        if($res) {
            header("Location: home.php");
        }
    
        mysqli_close($conn);
    }
?>