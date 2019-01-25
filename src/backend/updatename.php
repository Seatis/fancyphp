<?php
include("mysql_conn_names.php");

foreach($_GET as $key => $value) {
	$$key=$value;
}

$postdata = file_get_contents("php://input");


$obj = json_decode($postdata);  
if (isset($obj)) {
  foreach($obj as $key=>$value) {
    $$key=$value;
  }
}

function getNameById($id) {
  $sql = "SELECT name FROM names WHERE id='$id'";
  $result = $GLOBALS['conn']->query($sql);

  while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
    $rows[] = $row;
  }
  if (isset($rows)) {
    return $rows[0]['name'];
  } else {
    return NULL;
  }
}

if (isset($id)) {
  $name = getNameById($id);
  $response = new \stdClass();
  if (isset($name)) {
    if (isset($newName)) {
      $sql = "UPDATE names SET name='$newName' WHERE id='$id'";

      $result = $conn->query($sql);
  
      if (!$result) {
        $response->status = 'error';
        $response->error = $conn->error;
      } else {
        $response->status = 'Update OK!';  
        $response->updated_id = $id;
        $response->previous_name = $name;
        $response->new_name = getNameById($id);
      }
    } else {
      $response->status = 'error';
      $response->error = "body error (newName not found)";
    }
    
  } else {
    $response->status = 'error';
    $response->error = "id={$id} not found";
  }
  echo json_encode($response);
}

mysqli_close($conn);
?>