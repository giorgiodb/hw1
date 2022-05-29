<?php
session_start();
    if (isset($_POST["username"]) && isset($_POST["password"]) )
    {
        $conn = mysqli_connect("localhost", "root", "", "homework") or die(mysqli_error($conn));
        
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        $query = "SELECT id, username, password FROM user_s WHERE username = '".$username."'";

        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
        if (mysqli_num_rows($res)) {
            $entry = mysqli_fetch_assoc($res);
            if ($_POST['password'] == $entry['password']) 
            {
                $_SESSION["username"] = $entry['username'];
                $_SESSION["user_id"] = $entry['id'];
                header("Location: home.php");
                mysqli_close($conn);
                exit;
            }
        }
        $error = "Username e/o password errati.";
    }
    else if (isset($_POST["username"]) || isset($_POST["password"])) {
        $error = "Inserisci username e password.";
    }
?>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Record</title>
        <meta charset="utf-8">
        <link rel="icon" href="immagini/disco.png" type="image/x-icon">
        <link rel="stylesheet" href="login.css">
        <link href="https://fonts.googleapis.com/css2?family=Abel&family=Palette+Mosaic&family=Roboto&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Bebas Neue" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Open Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Dela Gothic One" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Fjalla One" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
    </head>
    <body>
        <header class="flex-tot">
            <div class="flex-img">
                <div class="title">
                    RECORD
                </div>
                <h2>Tutti gli artisti che desideri</h2>
                <h3>Quando vorrai e ovunque vorrai</h3>
                <h4>Crea la tua playlist e ascolta</h4>
            </div>
            <div class="flex">
                <div class="flex-form">
                    <form id=form name='nome_form' method='post'>
                        <?php
                            if (isset($error)) {
                                echo "<span class='error'>$error</span>";
                            }
                        ?>
                        <p>
                            <label>
                                Nome utente <input type='text' name='username' class="det">
                            </label>
                        </p>
                        <p>
                            <label>
                                Password <input type='password' name='password' class="det">
                            </label>
                        </p>
                        <div class="details">
                                <input type="submit" value="Accedi">
                        </div>
                        <div class="signup">
                            Non hai un account? <a href="signup.php">Iscriviti</a>
                        </div>
                    </form>
                </div>
                <div class="flex-contact">
                    <div class="tit">
                        Follow us
                    </div>
                    <div class="parag">
                        Attraverso le icone che vedete sotto sarete in grado di contattarci per qualsiasi dubbio:
                        FAQ, bug e sicurezza personale;
                    </div>
                    <div class="icons">
                        <a href=""><i class="fa-brands fa-instagram"></i></a>
                        <a href=""><i class="fa-brands fa-facebook"></i></a>
                        <a href=""><i class="fa-brands fa-twitter"></i></a>
                        <a href="mailto:giorgiodb2000@gmail.com"><i class="fa-solid fa-envelope"></i></a>
                    </div>
                </div>
            </div>
        </header>
    </body>
</html>