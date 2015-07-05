$data = $_POST['data'];
$f = fopen('txt/entry.txt', 'w+');
fwrite(f, $data);
fclose($f);