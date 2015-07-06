<?php
$data = $_POST["entry"];
$f = fopen("js/entry.json", "a") or die("Unable to open file.");
fwrite($f, $data);
fclose($f);
?>