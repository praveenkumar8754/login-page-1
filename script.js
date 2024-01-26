window.fbAsyncInit = function() {
  FB.init({
    appId      : '1298115754217113',
    cookie     : true,
    xfbml      : true,
    version    : 'v10.0'
  });
};

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    console.log('Logged in successfully');
    console.log(response.authResponse);
  } else {
    console.log('Not logged in');
  }
}

document.getElementById('facebook-login').addEventListener('click', function() {
  FB.login(checkLoginState, { scope: 'email' });
});
// Load the SDK asynchronously
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
const localAccessToken = "newAccessToken";


//sign in with google

function handleCredentialResponse(response) {
  console.log(JSON.stringify(response));
  var token = response.credential;

  var parts = token.split('.');
  var decodedPayload = JSON.parse(atob(parts[1]));
  console.log(decodedPayload);

  let responsePayload = decodedPayload;

  let profileHTML = '<h3>Welcome ' + responsePayload.given_name + '! <a href="javascript:void(0);" onclick="signOut(' + responsePayload.sub + ');">Sign out</a></h3>';
  profileHTML += '<img src="' + responsePayload.picture + '"/><p><b>Auth ID: </b>' + responsePayload.sub + '</p><p><b>Name: </b>' + responsePayload.name + '</p><p><b>Email: </b>' + responsePayload.email + '</p>';

  let proDataElement = document.getElementsByClassName("pro-data")[0];
  if (proDataElement) {
      proDataElement.innerHTML = profileHTML;
  } else {
      console.error('Element with class "pro-data" not found!');
  }

  document.querySelector("#btnWrap").classList.add("hidden");
  document.querySelector(".pro-data").classList.remove("hidden");
}

function signOut(authID) {
  let proDataElement = document.getElementsByClassName("pro-data")[0];
  if (proDataElement) {
      proDataElement.innerHTML = '';
  }

  document.querySelector("#btnWrap").classList.remove("hidden");
  document.querySelector(".pro-data").classList.add("hidden");
}
