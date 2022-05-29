<?php
    session_start();
    if(!empty($_POST['name']) && !empty($_POST["surname"]) && !empty($_POST["username"]) && !empty($_POST["email"]) 
        && !empty($_POST["password"]) && !empty($_POST["confirm_password"]) && !empty($_POST["foto"]))
    {
        $error = [];
        $conn = mysqli_connect("localhost", "root", "", "homework") or die(mysqli_error($conn));

        //---USERNAME---
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username']))
        {
            $error[]= "Username non valido";
        }else{
            $username = mysqli_real_escape_string($conn, $_POST['username']); 
            $query = "SELECT username FROM user_s WHERE username = '".$username."';";
            $res = mysqli_query($conn , $query);
            if(mysqli_num_rows($res) > 0)
            {
                $error[]= "Username già presente";
            }
        }

        //---EMAIL---
        if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
        {
            $error[]= "Email non valida";
        }else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $res = mysqli_query($conn, "SELECT email FROM user_s WHERE email = '".$email."';");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
        }

        //---PASSWORD---
        if(strlen($_POST['password']) < 8)
        {
            $error[]= "Pochi caratteri presenti";
        }

        //---CONFIRM-PASSWORD---
        if(strcmp($_POST['password'],$_POST['confirm_password']) != 0){
            $error[]= "Le due password non coincidono";
        }

        
        //---REGDB---
        if(count($error) == 0){
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $surname = mysqli_real_escape_string($conn, $_POST['surname']);
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $password = mysqli_real_escape_string($conn, $_POST['password']);

            $query = "INSERT INTO user_s (`foto`, `name`,`surname`,`username`,`email`, `password`) VALUES ('".($_POST['foto'])."' ,'".($name)."' ,'".($surname)."' ,'".($username)."', '".($email)."', '".($password)."');";
            $val = mysqli_query($conn , $query) or die(mysqli_error($conn));

            $_SESSION['username'] = $username;
            $_SESSION['foto'] = $_POST['foto'];
            $_SESSION['user_id'] = mysqli_insert_id($conn);
            mysqli_close($conn);
            header("Location: home.php");
            exit;
        }
        mysqli_close($conn);
        exit;
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
        <link rel="stylesheet" href="signup.css">
        <script src="signup.js" defer></script>
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
            </div>
            <div class="flex-form">
                <p>
                    Scegli il tuo avatar:
                </p>
                <section class="choice-grid">
                    <div>
                        <img src="./immagini/img1.jpeg"/>
                    </div>
                    <div>
                        <img src="./immagini/img2.jpeg"/>
                    </div>
                    <div>
                        <img src="./immagini/img3.jpeg"/>
                    </div>
                    <div>
                        <img src="./immagini/img4.jpeg"/>
                    </div>
                </section>
                <form id=form name='nome_form' method='post'>
                    <p class="name">
                        <label>
                            Nome <input type='text' name='name' class="det">
                        </label>
                        <span class="error">Nome non valido</span>
                    </p>

                    <p class="surname">
                        <label>
                            Cognome <input type='text' name='surname' class="det">
                        </label>
                        <span class="error">Cognome non valido</span>
                    </p>

                    <p class="username">
                        <label>
                            Nome utente <input type='text' name='username' class="det">
                        </label>
                        <span class="error">Nome non disponibile</span>
                    </p>

                    <p class="email">
                        <label>
                            Email <input type='email' name='email' class="det">
                        </label>
                        <span class="error">Email non valida</span>
                    </p>
                    
                    <p class="password">
                        <label>
                            Password <input type='password' name='password' class="det">
                        </label>
                        <span class="error">Password troppo corta</span>
                    </p>

                    <p class="confirm_password">
                        <label>
                            Conferma password <input type='password' name='confirm_password' class="det">
                        </label>
                        <span class="error">Le password non coincidono</span>
                    </p>

                    <p class="foto">
                        <label>
                            <input type='hidden' name='foto'>
                        </label>
                    </p>
                    
                    <div class="details">
                        <input type="submit" value="Registrati">
                    </div>
                    <div class="signup">
                        Hai già un account? <a href="login.php">Accedi</a>
                    </div>
                </form>
            </div>
        </header>
    </body>
</html>