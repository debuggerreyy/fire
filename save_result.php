<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "flames_game";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the names and result from the form
    $yourName = $_POST['yourName'];
    $crushName = $_POST['crushName'];
    $leftoverLetters = calculateLeftoverLetters($yourName, $crushName);
    $result = flamesGame($leftoverLetters);

    // Insert data into the database
    $sql = "INSERT INTO results (your_name, crush_name, result) VALUES ('$yourName', '$crushName', '$result')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}

// Function to calculate leftover letters
function calculateLeftoverLetters($yourName, $crushName) {
    $combinedNames = strtolower($yourName . $crushName);
    $leftoverLetters = str_split($combinedNames);

    foreach (str_split($yourName) as $letter) {
        $index = array_search($letter, $leftoverLetters);
        if ($index !== false) {
            unset($leftoverLetters[$index]);
        }
    }

    return count($leftoverLetters);
}

// Function to get the FLAMES result
function flamesGame($count) {
    $flames = ['Friends', 'Lovers', 'Affectionate', 'Marriage', 'Enemies', 'Siblings'];
    return $flames[$count % count($flames)];
}
?>
