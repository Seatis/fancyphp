<?php
include("mysql_conn_names.php");

foreach($_GET as $key => $value) {
	$$key=$value;
}

if (isset($id)) {
  $sql = "SELECT name FROM names WHERE id='$id'";
  $result = $conn->query($sql);
  while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
    $rows[] = $row;
  }
  $response = new \stdClass();
  if (isset($rows)) {
    $sql = "DELETE FROM names WHERE id='$id'";

    $result = $conn->query($sql);

    if (!$result) {
      $response->status = 'error';
      $response->error = $conn->error;
    } else {
      $response->status = 'Delete OK!';  
      $response->deleted_id = $id;
      $response->deleted_name = $rows[0]['name'];
    }
  } else {
    $response->status = 'error';
    $response->error = "id={$id} not found";
  }
  echo json_encode($response);
}

mysqli_close($conn);
?>