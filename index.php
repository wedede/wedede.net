<?
require_once('geoip.php');

$geoplugin = new geoPlugin();
$geoplugin->locate();

// create a variable for the country code
$var_country_code = $geoplugin->countryCode;

$ru_array = array("AM", "AZ", "BY", "GE", "KZ","MD","RU","TJ","TM","UA");
//Армения,Азербайджан,Беларусь,Грузия,Казахстан, Молдова, Россия,Таджикистан,Туркменистан, Украина

// redirect based on country code:
if (in_array($var_country_code, $ru_array)) {
header('Location:/ru/');
}
else {
header('Location:/eng/');
}
?>
