let manualSecretWord = [
	['A','R','A','N','A'],
	['M','E','L','O','N'],
	['B','A','N','A','N','A'],
	['J','A','B','O','N'],
	['A','R','R','O','Z'],
	['A','L','M','A','S'],
	['B','A','F','L','E'],
	['T','I','G','R','E'],
	['A','R','E','P','A'],
	['M','A','N','G','O'],
	['R','E','L','O','J'],
]
let manualPistas = [
	['insecto con 6 patas negra y chiquita el la fobia de muchos '],
]
let word_Secret = [];
let wordPista = []
let apiURL = 'https://palabras-aleatorias-public-api.herokuapp.com/multiple-random';
let l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const getWord = async () => {
	try {
		const data = await fetch(apiURL);
		const words = await data.json();
		const filter = words.body
			.filter((word) => word.Word.length <= 6)
		const pistas = filter.map((pista) => pista.DefinitionMD).slice(0, 20)
		const lettersWord = filter.map((word) => word.Word).slice(0, 20);
		const palabras = [...lettersWord];
		wordPista = [...pistas]
		word_Secret = palabras.map((word) => {
			const sinTildes = removeAccents(word);
			return sinTildes.toLocaleUpperCase().split('');
		});
		console.log(word_Secret);
	
		actualizador();
		printKeyboad()
		
	} catch (error) {

		word_Secret = [...manualSecretWord]
		wordPista = [...manualPistas]
	
		actualizador()
		printKeyboad()
		
	}
};



const removeAccents = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const modalPista = document.querySelector('.modal')
const buttonPista = document.querySelector('.buttonPista')
const cerrarModal = document.querySelector('.close')

buttonPista.addEventListener('click', () => {
	const validar = [...modalPista.classList]
	validar.forEach(className =>{
		if(className === 'noShowModal'){
			modalPista.classList.remove('noShowModal')
		}else{
			modalPista.classList.add('noShowModal')
		}
	})
})
cerrarModal.addEventListener('click', () => {
	modalPista.classList.add('noShowModal')
})

console.log(buttonPista.classList)


getWord();
