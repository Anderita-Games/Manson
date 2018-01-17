#pragma strict
function Play () {
	PlayerPrefs.SetInt("Circles", Random.Range(7, 17));
	PlayerPrefs.SetInt("Players", 2);
	Application.LoadLevel ("Game");
}

function Custom () {
		Application.LoadLevel ("Custom");
}

function Quit () {
		Application.Quit();
}