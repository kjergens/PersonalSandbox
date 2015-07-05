<?php
$data = $_POST["entry"];
$f = fopen("js/entry.js", "a") or die("Unable to open file.");
fwrite($f, $data);
fclose($f);
?>