var username;
var roles;


function login() {
	
	var user = {
		'username' : $('#username').val(),
		'password': $('#password').val()
	}
	var userJSON = JSON.stringify(user);
	$.ajax({
	    url : '/auth/login',
	    type: 'POST',
	    data : userJSON,
	    contentType:"application/json; charset=utf-8",
	    dataType:"json",
	    success: function(data)
	    {
	    	$('#wrongCredentialsError').hide();
	    	
	    	// JWT token koji server salje u LocalStorage pod kljucem "jwt"
	    	// sacuvan token - (F12) -> Application -> Local Storage
	    	var jwt = data.accessToken;
	    	localStorage.setItem('jwt', jwt);
	    	
	    	// mi hocemo da procitamo podatke iz jwt tokena koji smo dobili i upisemo username u promenljivu "username" i uloge u "roles" promenljivu
	    	var decodedJWTData = _decodeJWT(jwt);
	    	if (decodedJWTData != null) {
	    		username = decodedJWTData.sub;
		    	roles = decodedJWTData.roles;
	    	}
	    	
	    	prikaziDruguForm();
	    
	    	
	    },
	    error: function (error)
	    {
	    	$('#wrongCredentialsError').show();
	    	return;
	    }
	});
}

function logout() {
	//stateless, ne salje se zahtev vec se izbrise jwt iz local storage-a
	localStorage.removeItem('jwt');

	$('#welcomeMessage').text('Vi upravo niste ulogovani!');
	$('#getAllUsersError').hide();
	$('#getAllUsersSuccess').hide();
	$('#whoAmIError').hide();
	$('#whoAmISuccess').hide();
	$('#fooError').hide();
	$('#fooSuccess').hide();
	
	$('#logoutButton').hide();

	$('#korisnikTabelaForm').hide();
	 $('#aktiviranjeKorisnikaTable').hide();

	
}

function goToLogin() {
	$('#korisnikTabelaForm').hide();
	// vrednosti u LocalStorage-u "prezive" reload stranice i zatvaranje Browser-a, pa ukoliko ima potrebe morate rucno obrisati token 
	// iz LocalStorage ili obrisati kes u browser-u
	localStorage.clear();
	location.reload();
	 $('#aktiviranjeKorisnikaTable').hide();
}

function registerForm(){
	$('#loginForm').hide();
	$('#drugaForma').hide();
	$('#registracijaForma').show();
	

}

function register(){
	var user = {
			'email' : $('#emailRegister').val(),
			'password': $('#lozinkaRegister').val(),
			'firstname' : $('#imeRegister').val(),
			'lastname': $('#prezimeRegister').val()
		}
	
	if(user.email=="" || user.password=="" || user.firstname=="" || user.lastname==""){
		$('#praznoPolje').show();
		$('#pogresanEmail').hide();
		return;
	}
		var userJSON = JSON.stringify(user);
		$.ajax({
		    url : '/auth/register',
		    type: 'POST',
		    data : userJSON,
		    contentType:"application/json; charset=utf-8",
		    dataType:"json",
		    success: function(data)
		    {
		    	$('#pogresanEmail').hide();
		    	$('#registracijaForma').hide();
		    	alert("Upravo ste registrovani.Unesite vas email i lozinku!")
		    	$('#loginForm').show();
		    },
		    error: function (error)
		    {
		    	$('#pogresanEmail').show();
		    	return;
		    }
		});
		    
}

function prikaziDruguForm() {
	$('#welcomeMessage').text('Zdravo ' + username + '!');
	$('#loginForm').hide();
	$('#drugaForma').show();
	console.log(roles);
	if(roles=='ROLE_USER'){
		$('#samoZaAdmina').hide();
	}
}

function _decodeJWT(token) {
	try {
		var decodedData = JSON.parse(atob(token.split('.')[1]));
		console.log('Decoded JWT token:');
		console.log(decodedData);
		console.log("===========================================================================");
	    return decodedData;
	  } catch (e) {
		console.log('Error decoding JWT. JWT Token is null.');
	    return null;
	  }
}


function activateUser(email){
	var URL = '/auth/activate/'+email;
	var nina = '#'+email;
	console.log(URL);
	$.ajax({
	    url : URL,
	    type: 'GET',
	    contentType:"application/json; charset=utf-8",
	    dataType:"json",
	    success: function(data)
		    {
		    	$(nina).hide();
		    },
	    error: function (error)
		    {
		    	alert('nesto je pogresno..');
		    }
	});
};

function getNeaktivneKorisnike(){
	var korisniciTable = $('#aktiviranjeKorisnikaTable');
	$.ajax({
	    url : "auth/users",
	    type: 'GET',
	    contentType:"application/json; charset=utf-8",
	    dataType:"json",
	    success: function(data)
	    {
	    	if (data==""){
	    		alert('svi korisnici su aktivni!');
	    		return;
	    	}
	    	$('#neaktivniKorisniciTable').show();
	    	for (user in data) {
	    		korisniciTable.append(
	    				'<tr id="'+data[user].email+'">' +
						'<td>' + data[user].email + '</td>' + 
						'<td>' + '<button type="button" class="btn btn-primary btn-sm" id="'+data[user].email+'" onclick="activateUser(this.id)">Activate</button>' + '</td>'
						+'</tr>')}
	    },
	    error: function (error)
	    {
	    	alert('Nesto je pogresno.Molimo vas pokusajte kasnije!');
	    	return;
	    }
	});
};

	


