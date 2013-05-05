<?php
if(!isset($_REQUEST['type'])) die('No type specified.');
chdir($_REQUEST['type']);
echo json_encode(glob('*.json'))
?>