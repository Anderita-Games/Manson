#pragma strict
var Circles : UnityEngine.UI.InputField;
var Players : UnityEngine.UI.InputField;


function Continue () { 
	if (int.Parse(Players.text) <= 5 && int.Parse(Players.text) >= 1) {
		if (Circles.text == "") {
			PlayerPrefs.SetInt("Circles", Random.Range(5, 100));
		}else if (int.Parse(Circles.text) >= 1 && int.Parse(Circles.text) <= 100) {
			PlayerPrefs.SetInt("Circles", int.Parse(Circles.text));
		}else {
			return;
		}
		PlayerPrefs.SetInt("Players", int.Parse(Players.text));	
		Application.LoadLevel ("Game");
	}
}