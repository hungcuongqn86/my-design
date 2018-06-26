var backendUrl = 'http://mygift.com:8000/';
var apiUrl = backendUrl + 'api/v1/';
var bases = [];
var base = [];
var baseid = 0;
var file = '';

// Get the modal
var modal = document.getElementById('myModal');

function loadBase() {
	var url = apiUrl + 'bases';
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myArr = JSON.parse(this.responseText);
			bases = myArr.data.data;
			f_genimglist(bases);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function f_genimglist(arr) {
    var out = "";
    var i;
	if(arr.length > 0){
		baseid = arr[0].id;
		selectBase(baseid);
		for(i = 0; i < arr.length; i++) {
			out += '<li onclick="selectBase(' + arr[i].id + ')"><a><img src="' + backendUrl + arr[i].img + '"></a>';
			out += '<div class="base-inf"><p><a>Giá: '+ arr[i].price +'</a></p>';
			out += '<p class="base-name"><a>'+ arr[i].name +'</a></p></div></li>';
		}
	}
    document.getElementById("list-base").innerHTML = out;
}

function selectBase(id) {		
	for(i = 0; i < bases.length; i++) {
		if(bases[i].id===id){
			base = bases[i];
			document.getElementById("select-base").innerHTML = bases[i].name;
			modal.style.display = "none";
		}
	}
}

var galleryUploader = new qq.FineUploader({
    element: document.getElementById("fine-uploader-gallery"),
    template: 'qq-template-gallery',
	multiple: false,
    request: {
        endpoint: apiUrl + 'upload',
		inputName: "image"
    },
    text: {
        failUpload: 'Lỗi'
    },
    thumbnails: {
        placeholders: {
            waitingPath: 'plugin/fine-uploader/placeholders/waiting-generic.png',
            notAvailablePath: 'plugin/fine-uploader/placeholders/not_available-generic.png'
        }
    },
    validation: {
        allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
    },
	callbacks: {
		onComplete: function(id, name, response) {
			file = response.data;
		}
	}
});


// Get the button that opens the modal
var btn = document.getElementById("btnBase");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    loadBase();
});