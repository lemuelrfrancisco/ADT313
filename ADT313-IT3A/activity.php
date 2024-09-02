<h1>Hands-on Activity2</h1>
<?php
    $table = array(
        "header"=> array(
        "StudentID",
        "Firstname",
        "Middlename",
        "Lastname",
        "Section",
        "Course",
        "Yearlevel" 
    ),
    "body"=>array(
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel"
            ),
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel",
            ),
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel",
            ),
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel",
            ),
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel",
            ),
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel",
            ),
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel",
            ),
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel",
            ),
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel",
            ),
            array(
                "firstname"=>"Firstname",
                "middlename"=>"Middlename",
                "lastname"=>"Lastname",
                "section"=>"Section",
                "course"=>"Course",
                "yearlevel"=>"Yearlevel",
            ),

         )
    );

?>

<table border="1">
    <thead>
    <?php
        for($i = 0; $i <= count($table["header"]) -1; $i++) {
            echo "<th>".$table["header"][$i]."</th>";
        }
    ?>
    </thead>
    <tbody>
        <?php
            for($i = 0; $i <= count($table["body"]) -1; $i++) {
                echo "<tr>";
                echo "<td>".$i."</td>";
                echo "<td>".$table["body"][$i]["firstname"]."</td>";
                echo "<td>".$table["body"][$i]["middlename"]."</td>";
                echo "<td>".$table["body"][$i]["lastname"]."</td>";
                echo "<td>".$table["body"][$i]["section"]."</td>";
                echo "<td>".$table["body"][$i]["course"]."</td>";
                echo "<td>".$table["body"][$i]["yearlevel"]."</td>";
                echo "</tr>";
            }
        ?>
    </tbody>
<table/>
