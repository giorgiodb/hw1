<?php
    $conn = mysqli_connect("localhost", "root", "", "homework");

    $email = mysqli_real_escape_string($conn, $_GET["q"]);

    $query = "SELECT email FROM user_s WHERE email = '".$email."';";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    if(mysqli_num_rows($res) > 0 ){
        $response = array('exists' => true);
    }else{
        $response = array('exists' => false);
    }
    echo json_encode($response);

    mysqli_close($conn);
?>