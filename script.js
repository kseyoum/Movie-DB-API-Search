let endpoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=569dbde413c75f6564dffaeea39d0608";
		let xhr= new XMLHttpRequest();
		//.open(method-get or post?, endpoint)
		xhr.open("GET", endpoint);
		xhr.send();
		// Wait until we get some kind of response comes back form iTunes
		xhr.onreadystatechange=function()
		{
			console.log(this);

			// When iTunes gives us some kind of response, this code will get run
			if (xhr.readyState==this.DONE)
			{
				if(xhr.status==200)
				{
					//Siccessfully recieved a response
					console.log(xhr.responseText);
					// console.log(JSON.parse(xhr.responseText))
					displayResults(xhr.responseText);
				}
				else
				{
					//There was some error
					alert("AJAX error!");
					console.log(xhr.status)
				}
			}

		}

		console.log("at the end of onsubmit");

	
function displayResults(resultObject)
{

	//convert JSON into JS objects
	resultObject= JSON.parse(resultObject);
	console.log(resultObject);

	// Create a bunch of HTML elements so we can show the results on the browser in a nicely formatted way

	let conElement=document.querySelector("#movie-container");
	//let conImagae=document.querySelector(".imageCon");
	

	//clear previous results
	while(conElement.hasChildNodes())
	{
		conElement.removeChild(conElement.lastChild);
	}
	
	document.querySelector("#numofresults").innerHTML= "Showing " + resultObject.results.length + " of " + resultObject.total_results+ " result(s)!";


	//Run through the results and create a <tr> element for each result
	for(let i=0; i<resultObject.results.length; i++)
	{


		let rowElement= document.createElement("div");
		rowElement.classList.add("col");
		rowElement.classList.add("col-6");
		rowElement.classList.add("col-md-4");
		rowElement.classList.add("col-lg-3");
		let conImage=document.createElement("div");
		conImage.classList.add("imageCon");
		let movTitle=document.createElement("p");
		movTitle.classList.add("title");
		let movRelease=document.createElement("p");
		movRelease.classList.add("release");
		let movRating=document.createElement("p");
		movRating.classList.add("rating");
		let movVotes=document.createElement("p");
		movVotes.classList.add("numofVotes");
		let movDescription=document.createElement("p");
		movDescription.classList.add("description");


		
		let movPoster=document.createElement("img");
		if (resultObject.results[i].poster_path==null)
		{
			movPoster.src = "https://images-na.ssl-images-amazon.com/images/I/51lh93vBeRL._SY679_.jpg";
		}
		else
		{
			movPoster.src = "https://image.tmdb.org/t/p/w500/"+resultObject.results[i].poster_path;
		}
		

		
		

		console.log(movPoster);


		 movTitle.innerHTML= resultObject.results[i].title;
		 movRelease.innerHTML= resultObject.results[i].release_date;
		 movRating.innerHTML= "Rating: " + resultObject.results[i].vote_average + " out of 10";
		 movVotes.innerHTML= "Number of Votes: " + resultObject.results[i].vote_count;
		 if (resultObject.results[i].overview.length>200)
		 {
		 	movDescription.innerHTML=resultObject.results[i].overview.substring(0, 200) + "...";


		 }
		 else
		 {
		 	movDescription.innerHTML= resultObject.results[i].overview;
		 }
		 


		conImage.appendChild(movRating);
		conImage.appendChild(movVotes);
		conImage.appendChild(movDescription);
		conImage.appendChild(movPoster);
		rowElement.appendChild(conImage);
		rowElement.appendChild(movTitle);
		rowElement.appendChild(movRelease);
		

		console.log(rowElement);

		conElement.appendChild(rowElement);
		


	}
} 

document.querySelector("#search-form").onsubmit=function(event)
	{
		event.preventDefault();

		let searchInput = document.querySelector("#search-id").value.trim();
		if(searchInput=="")
		{
			alert("Need Text!")
		}
		else
		{
			console.log(searchInput);

		
	let endpoint = "https://api.themoviedb.org/3/search/movie?api_key=569dbde413c75f6564dffaeea39d0608&language=en-US&query="+ searchInput +"&page=1&include_adult=false"
		let xhr= new XMLHttpRequest();
		//.open(method-get or post?, endpoint)
		xhr.open("GET", endpoint);
		xhr.send();
	
		xhr.onreadystatechange=function()
		{
			console.log(this);

			
			if (xhr.readyState==this.DONE)
			{
				if(xhr.status==200)
				{
					//Siccessfully recieved a response
					console.log(xhr.responseText);
					// console.log(JSON.parse(xhr.responseText))
					displayResults(xhr.responseText);
				}
				else
				{
					//There was some error
					alert("Search something!");
					console.log(xhr.status)
				}
			}

		}

		console.log("at the end of onsubmit");

		}

		

	}
	
