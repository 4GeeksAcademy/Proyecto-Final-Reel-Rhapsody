const apiUrl = process.env.BACKEND_URL + "/api"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			films: null,
			filmsGenres: null,
			series: null,
		},
		actions: {
			// Use getActions to call a function within a function
			loadSomeFilm: async () => {
				try {
					const options = {
						method: 'GET',
						headers: {
							accept: 'application/json',
							Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTNlY2YxZThlMDMwYzc1N2E5MGZlZWQ0NTgwNWY2MyIsInN1YiI6IjY1NzhmODUxZTkzZTk1MjE5MTA5OWE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.353ayqR42w_v4GqICi8fG8idllMAa4F_l06HE-RZxGA'
						}
					};
					fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
						.then(response => response.json())
						.then(response => setStore({ films: response.results }))
						.catch(err => setStore({ films: false }));

				} catch (error) {
					setStore({ films: false })
					console.log("Error loading message from backend", error);
				}
			},
			loadSomeSerie: async () => {
				try {
					const options = {
						method: 'GET',
						headers: {
							accept: 'application/json',
							Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTNlY2YxZThlMDMwYzc1N2E5MGZlZWQ0NTgwNWY2MyIsInN1YiI6IjY1NzhmODUxZTkzZTk1MjE5MTA5OWE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.353ayqR42w_v4GqICi8fG8idllMAa4F_l06HE-RZxGA'
						}
					};

					fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
						.then(response => response.json())
						.then(response => setStore({ series: response.results }))
						.catch(err => setStore({ series: false }));

				} catch (error) {
					setStore({ series: false })
					console.log("Error loading message from backend", error);
				}
			},
		

			loadFilmsGenres: async () => {
				try {
					const options = {
						method: 'GET',
						headers: {
							accept: 'application/json',
							Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTNlY2YxZThlMDMwYzc1N2E5MGZlZWQ0NTgwNWY2MyIsInN1YiI6IjY1NzhmODUxZTkzZTk1MjE5MTA5OWE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.353ayqR42w_v4GqICi8fG8idllMAa4F_l06HE-RZxGA'
						}
					};
					// fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US&page=1', options)
					// 	.then(response => response.json())
					// 	.then(response => setStore({ filmsGenres: response.genres }))
					// 	.catch(err => setStore({ filmsGenres: false }));
					const url = 'https://api.themoviedb.org/3/genre/tv/list'
					const requests = [fetch(url, options), fetch(url.replace('tv','movie'), options)]
					const responses = await Promise.all(requests)
					const datas = await Promise.all(responses.map(res => res.json()))
					console.log(datas)
					const dropdown = document.getElementById('genreDropdown');

					// const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US&page=1', options)
					// const data = await response.json()
					// const store = getStore()
					// setStore({
					// 	...store,
					// 	  filmsGenres: data,

					// })
					datas.forEach(data => {
						data.genres.forEach(genre => {
							const option = document.createElement('option');
							option.value = genre.id;
							option.text = genre.name;
							dropdown.appendChild(option);
						});
					});

				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			}, 

			sign_up: async (newUser) => {
				try {

					let result = await fetch(`${apiUrl}/sign_up`, {
						method: "POST",
						body: JSON.stringify(newUser),
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await result.json()
					console.log("respuesta al intentar un new user:", data);
					return data
				} catch (e) {
					console.error(e)
				}
			},

			logIn: async (newLogIn) => {

				try {

					let result = await fetch(`${apiUrl}/login`, {
						method: "POST",
						body: JSON.stringify(newLogIn),
						headers: {
							"Content-Type": "application/json"
						}
					})

					const data = await result.json();
					console.log("respuesta al intentar iniciar sesión:", data);
					localStorage.setItem("token", data.token);
					return data;
					
				} catch (e) {
					console.error(e);
				}
			},

		}
	};
}

export default getState;