window.fbAsyncInit = function() {
  FB.init({
    appId: '1559093321523510',
    cookie: true,
    xfbml: true,
    version: 'v10.0'
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

    // Reload the current page after successful login
    window.location.reload();
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






//sign in with google

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var userId = profile.getId();
  console.log('User ID: ' + userId);

  // Display the Google user ID on the web page
  document.getElementById('googleUserId').innerText = 'Google User ID: ' + userId;

  // Your existing code to store other user details in localStorage
  var name = profile.getName();
  var profilepic = profile.getImageUrl();
  var email = profile.getEmail();

  localStorage.setItem("username", name);
  localStorage.setItem("picture", profilepic);
  localStorage.setItem("email", email);
}

function signInWithGoogle() {
  // Trigger Google Sign-In
  gapi.auth2.getAuthInstance().signIn().then(onSignIn);
}

function signOut() {
  // Your existing signOut function
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      alert("You have been signed out successfully");
  });
}


// Load the Google API library
function loadGoogleAPI() {
  if (typeof gapi === 'undefined') {
    console.error('Error: Google API library not loaded.');
    return;
  }

  gapi.load('auth2', function () {
    gapi.auth2.init({
      client_id: '121326844781-0hhs3aefc6lc47gd3pj94m06hta8rqsf.apps.googleusercontent.com',
    })
    .then(function() {
      console.log('Google API initialized successfully.');
    })
    .catch(function(error) {
      console.error('Error initializing Google API:', error);
    });
  });
}

function signInWithGoogle() {
  if (typeof gapi.auth2 === 'undefined') {
    console.error('Error: Google API not initialized.');
    return;
  }

  // Trigger Google Sign-In
  gapi.auth2.getAuthInstance().signIn().then(onSignIn);
}

// Call the loadGoogleAPI function when the page is loaded
document.addEventListener('DOMContentLoaded', loadGoogleAPI);

