#pragma strict

var Players : int;
var CurrentPlayer : int = 0;
var Untouchable_Total_Height : float;

var Game_Status : boolean = true;

var Title : UnityEngine.UI.Text;
var Sub : UnityEngine.UI.Text;
var SubmitButton : UnityEngine.UI.Button; //The Bottom UI section

var Original_Circle : GameObject;
var Canvas : GameObject; //Set it as the canvas, dingus

var TitleY : RectTransform;
var SubY : RectTransform;
var SubmitButtonY : RectTransform;
var CanvasSize : RectTransform; //Set it as the canvas too, dingus x 2

function Start () {
	Players = PlayerPrefs.GetInt("Players");
	Untouchable_Total_Height = TitleY.sizeDelta.y + SubY.sizeDelta.y + SubmitButtonY.sizeDelta.y + 10;
	Creation();
}

function Update () {
	if (PlayerPrefs.GetInt("Circles") <= 0) {
		Game_Status = false;
		Debug.Log("Game Ended");
		Title.text = "Player " + CurrentPlayer +" WINS!!!";
		Sub.text = "Tap again to return to the main menu";
		Title.color = Color.green;
	}else {
		Game_Status = true;
	}
	if (Input.GetMouseButtonDown(0) && Game_Status == false) {
		Application.LoadLevel ("MainMenu");
	}
}

function OneCircle () {
	PlayerPrefs.SetInt("Circles", PlayerPrefs.GetInt("Circles") - 1);
	if (PlayerPrefs.GetInt("Circles") <= 0) {

	}else {
		Creation();
	}
}

function TwoCircle () {
	PlayerPrefs.SetInt("Circles", PlayerPrefs.GetInt("Circles") - 2);
	if (PlayerPrefs.GetInt("Circles") <= 0) {

	}else {
		Creation();
	}
}

function ThreeCircle () {
	PlayerPrefs.SetInt("Circles", PlayerPrefs.GetInt("Circles") - 3);
	if (PlayerPrefs.GetInt("Circles") <= 0) {

	}else {
		Creation();
	}
}

function Creation () {
	var Clone_Circle : GameObject;
	var Circles = PlayerPrefs.GetInt("Circles");
	var Row_Total : float = Mathf.Round(Mathf.Sqrt(Circles)); //Sqrt total and rounds up
	var Column_Total : float = Mathf.CeilToInt(Mathf.Sqrt(Circles));
	var Row_Current : int = 1;
	var Column_Current : int = 0;
	var Circle_SpaceY : float = CanvasSize.sizeDelta.y - Untouchable_Total_Height;
	while (Circles > 0) {
		if (Column_Current >= Column_Total) {
			Column_Current = 1;
			Row_Current++;
		}else {
			Column_Current++;
		}
		var TheX : float = (CanvasSize.sizeDelta.x / Column_Total) * (Column_Current - .5) - (CanvasSize.sizeDelta.x / 2);
		var TheY : float = (Circle_SpaceY / Row_Total) * (Row_Total - Row_Current + .5) - (CanvasSize.sizeDelta.y / 2 - (TitleY.sizeDelta.y + SubY.sizeDelta.y));
		Clone_Circle = Instantiate(Original_Circle);
		Clone_Circle.transform.SetParent(Canvas.transform);
		Clone_Circle.transform.localPosition = Vector3(TheX, TheY, 0);
		Clone_Circle.transform.localScale = Vector3(1, 1, 1);
		var Clone_Circle_Size : RectTransform = Clone_Circle.transform;
		Clone_Circle_Size.sizeDelta.y = 275 / Mathf.CeilToInt(Mathf.Sqrt(PlayerPrefs.GetInt("Circles")));
		Clone_Circle_Size.sizeDelta.x = 275 / Mathf.CeilToInt(Mathf.Sqrt(PlayerPrefs.GetInt("Circles")));
		Clone_Circle.name = "Circle " + Row_Current + ":" + Column_Current; 
		Circles--;
	}
	if (CurrentPlayer == PlayerPrefs.GetInt("Players")) {
		CurrentPlayer = 1;
	}else {
		CurrentPlayer++;
	}
	Title.text = "Player " + CurrentPlayer +"'s Turn";
	Sub.text = "Select 1-3 circles...";
	Title.color = Color.white;
	Sub.color = Color.white;
}