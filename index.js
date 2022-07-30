const keyboard = document.querySelector('#keyboard');
const grid = document.querySelector('#grid');
const err = document.querySelector('.e');
const plevel = document.querySelector('.level');
const point = document.querySelector('.points');
const loading = document.querySelector('.container__loading')
const keyboardLetters = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
];

const pressLetters = [];
let myAnswer = [];
let rows = [];
let positions = [];
let level = 0;
let points = 0;
let attempts = 0;

const num = word_Secret;

const textPista = document.querySelector('.textPista')

plevel.innerText = `LEVEL: ${level + 1}`;
point.innerText = `Pts: ${points}`;

loading.innerHTML = '<div class="container__preloader"><div class="preloader"></div></div>';



const actualizador = () => {
	textPista.innerHTML = ""
	if (wordPista[level] === '') {

		textPista.innerHTML = "Esta Palabra no tiene pista"
		console.log('Sin pistas')

	} else {
		textPista.innerHTML = ""
		textPista.innerHTML = `${wordPista[level]}`
		console.log(wordPista[level])

	}



	rows = [];
	grid.innerHTML = ""
	loading.classList.add('display')
	for (let row = 0; row < 6; row++) {
		const list = document.createElement('ul');
		list.classList.add('grid-row');
		for (let colums = 0; colums < word_Secret[level].length; colums++) {
			const listItem = document.createElement('li');
			listItem.id = `${row}-${colums}`;
			listItem.classList.add('grid-item');
			list.appendChild(listItem);
		}
		rows.push(list);
	}
	grid.append(...rows);
};
function printKeyboad() {
	keyboardLetters.map((letters) => {
		const list = document.createElement('ul');
		letters.map((letter) => {
			const listItem = document.createElement('li');
			switch (letter) {
				case 'ENTER':
					listItem.innerHTML = `
						<button class="btn-letter" onclick="checkWord()" id="${letter}">${letter}</button>`;
					break;
				case 'DELETE':
					listItem.innerHTML = `
						<button class="btn-letter" onclick="removeLetter()" id="${letter}">${letter}</button>`;
					break;
				default:
					listItem.innerHTML = `
					<button class="btn-letter" onclick="pressLetter()" id="${letter}">${letter}</button>`;
					break;
			}

			list.appendChild(listItem);
		});
		pressLetters.push(list);
	});

	keyboard.append(...pressLetters);

}







const checkWord = () => {
	err.innerText = '';
	if (myAnswer.join('') === word_Secret[level].join('')) {
		level++;

		if (level === word_Secret.length) {
			puntos();
			grid.innerHTML = ""
			grid.innerHTML = `<div class="container__preloader">
			<div> <h1> 🎉Felicidades Ganaste✨ </h1> 
				<h3>Puntos Obtenidos: ${points}</h3></div>
			<div> <button onclick="reset()">Volver a jugar</button> </div>
			</div>`;
			level = 0;
			points = 0;
			point.innerText = `Pts: ${points}`;
			plevel.innerHTML = `LEVEL: ${level + 1}`;
			return;
		} else {
			plevel.innerText = `LEVEL: ${level + 1}`;
			puntos();
			reset();
		}
	} else {
		if (attempts === 5) {
			printerColors()
			setTimeout(() => {
				grid.innerHTML = ""
				grid.innerHTML = `<div class="container__preloader">
			<div> <h1> GAME OVER </h1>
			<h3>Puntos Obtenidos: ${points}</h3>
			</div>
			<div> <button onclick="reset()" type="button">Reintentar</button> </div>
			</div>`;
				level = 0;
				points = 0;
				point.innerText = `Pts: ${points}`;
				plevel.innerHTML = `LEVEL: ${level + 1}`;

				return;
			}, 1500)

		} else {
			if (myAnswer.length === word_Secret[level].length) {
				printerColors()

			} else {
				err.innerText = `Hey tienes ${myAnswer.length} letras te faltan ${word_Secret[level].length - myAnswer.length
					}`;
			}
		}
	}
};

let positionsLetters = []

const printerColors = () => {
	attempts += 1;
	for (let i = 0; i < word_Secret[level].length; i++) {
		switch (true) {
			case myAnswer[i] === word_Secret[level][i]:
				positions.push('correct');
				break;
			case word_Secret[level].includes(myAnswer[i]):
				positions.push('present');
				break;
			default:
				positions.push('incorrect');
		}
	}

	myAnswer.map((letter, index) => {
		const keyLetter = document.getElementById(letter)
		keyLetter.classList.add(positions[index])
	})
	positions.map((IsCorrect, id) => {
		const item = document.getElementById(`${attempts - 1}-${id}`);
		item.classList.add(IsCorrect);
	});
	myAnswer = [];
	positions = [];
}

const removeLetter = () => {
	err.innerText = '';
	if (myAnswer.length === 0) {
		err.innerText = 'No hay nada para borrar';
	} else {
		const currenItem = document.getElementById(`${attempts}-${myAnswer.length - 1}`);
		currenItem.textContent = '';
		myAnswer.pop();
	}
};

const pressLetter = () => {
	err.innerText = '';
	const button = event.target;
	if (myAnswer.length < word_Secret[level].length) {
		const currenItem = document.getElementById(`${attempts}-${myAnswer.length}`);
		currenItem.textContent = button.textContent;
		myAnswer.push(button.id);
	} else {
		err.classList.add('clgreen');
		err.classList.remove('e');
		err.innerText = 'Tu palabra ya esta completa';
	}
};

const reset = () => {
	grid.innerHTML = ""
	actualizador()
	err.innerText = '';
	myAnswer = [];
	attempts = 0;
	const letters = keyboardLetters.flat()
	letters.map(letter =>{
		const item = document.getElementById(letter)
		    item.classList.remove('correct');
			item.classList.remove('present');
			item.classList.remove('incorrect');
	})
	for (let row = 0; row < 6; row++) {
		for (let colums = 0; colums < word_Secret[level].length; colums++) {
			const listItem = document.getElementById(`${row}-${colums}`);
			listItem.classList.remove('correct');
			listItem.classList.remove('present');
			listItem.classList.remove('incorrect');
			listItem.textContent = '';
		}
	}
};

const puntos = () => {
	switch (true) {
		case attempts === 0:
			points += 100;
			point.innerHTML = `Pts: ${points}`;
			break;
		case attempts === 1:
			points += 80;
			point.innerHTML = `Pts: ${points}`;
			break;
		case attempts === 2:
			points += 50;
			point.innerHTML = `Pts: ${points}`;
			break;
		case attempts === 3:
			points += 25;
			point.innerHTML = `Pts: ${points}`;
			break;
		case attempts === 4:
			points += 15;
			point.innerHTML = `Pts: ${points}`;
			break;
		case attempts === 5:
			points += 5;
			point.innerHTML = `Pts: ${points}`;
			break;
	}
};
