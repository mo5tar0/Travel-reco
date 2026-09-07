const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const resultsSection = document.getElementById('results');

 let travelData = null;



  function searchCondition() {
		const input = document.getElementById('searchInput').value.toLowerCase();
		const resultDiv = document.getElementById('results');
		resultDiv.innerHTML = '';

		fetch('travel_recommendation_api.json')
		  .then(response => response.json())
		  .then(data => {
            console.log('DATA:', data); 
           
        let matches = [];
         let isCountrySearch = false; 
    
        if (input.includes('beach')) {
        matches = data.beaches || [];
        } else if (input.includes('temple')) {
        matches = data.temples || [];
        } else if (input.includes('countr')) {
        matches = data.countries || [];
        isCountrySearch = true; 
        } else {
            resultDiv.innerHTML = 'No matches found.';
        }
        if (isCountrySearch) {
            matches.forEach(function (place) {
     
                place.cities.forEach(function (city) {
                    const card = document.createElement('div');
                    card.className = 'result-card';
       
                    const img = document.createElement('img');
                    img.src = city.imageUrl;
                    img.alt = city.name;
       
                    const body = document.createElement('div');
                    body.className = 'result-body';
       
                    const title = document.createElement('h3');
                    title.textContent = city.name;
       
                    const desc = document.createElement('p');
                    desc.textContent = city.description;
       
                    const btn = document.createElement('button');
                    btn.textContent = 'Visit';
       
                    body.appendChild(title);
                    body.appendChild(desc);
                    body.appendChild(btn);
       
                    card.appendChild(img);
                    card.appendChild(body);
                    resultsSection.appendChild(card);
                })

          })
         
        }
        else{
    matches.forEach(function (place) {
      const card = document.createElement('div');
      card.className = 'result-card';
 
      const img = document.createElement('img');
      img.src = place.imageUrl;
      img.alt = place.name;
 
      const body = document.createElement('div');
      body.className = 'result-body';
 
      const title = document.createElement('h3');
      title.textContent = place.name;
 
      const desc = document.createElement('p');
      desc.textContent = place.description;
 
      const btn = document.createElement('button');
      btn.textContent = 'Visit';
 
      body.appendChild(title);
      body.appendChild(desc);
      body.appendChild(btn);
 
      card.appendChild(img);
      card.appendChild(body);
      resultsSection.appendChild(card);
            
          })
        }
        })
		  .catch(error => {
			console.error('Error:', error);
			resultDiv.innerHTML = 'An error occurred while fetching data.';
		  });
	  }

    function resetSearch() {
        searchInput.value = '';
        resultsSection.innerHTML = '';
    }

    btnReset.addEventListener('click', resetSearch);
    
	    btnSearch.addEventListener('click', searchCondition);

