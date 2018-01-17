#pragma strict
import UnityEngine.EventSystems;
var OGcirclecount : int;

function Start () {
	OGcirclecount = PlayerPrefs.GetInt("Circles");
}

function Update () {
	if (OGcirclecount != PlayerPrefs.GetInt("Circles")) {
		Destroy (gameObject);
	}
}

