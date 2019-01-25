<?php
$servername = "localhost";
$username = "kodolole_root";
$password = "GR18pvbalaton";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

mysqli_select_db($conn,"kodolole_namesdb");
$conn->set_charset("utf8"); 
?>