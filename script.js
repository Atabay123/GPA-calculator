const subjectsList = document.getElementById('subjectsList')
const finalGpa = document.getElementById('finalGpa')
let totalCredits = 0
let totalGpa = 0

const subjects = [
	{
		name: 'Basics of computer control',
		credits: 4,
	},
	{
		name: 'Discrete structures of computer science',
		credits: 5,
	},
	{
		name: 'Fundamentals of computer simulation and modelling',
		credits: 5,
	},
	{
		name: 'Numerical methods',
		credits: 3,
	},
	{
		name: 'Operating systems',
		credits: 4,
	},
	{
		name: 'Physics',
		credits: 4.5,
	},
	{
		name: 'Programming languages',
		credits: 5,
	},
]

for (const subject of subjects) {
	totalCredits += subject.credits;
}

subjects.forEach((subject) => {
	const li = document.createElement('li')
	const gradeInput = document.createElement('input')
	const contributionResult = document.createElement('p')
	const calculateButton = document.createElement('button')

	gradeInput.setAttribute('type', 'text')
	gradeInput.setAttribute('placeholder', 'Enter grade')
	gradeInput.name = ('userGrade')
	gradeInput.min = 0
	gradeInput.max = 10

	li.innerHTML = `${subject.name} <small>${subject.credits} cr</small>`

	calculateButton.textContent = ('Calculate')

	subjectsList.append(li)
	subjectsList.append(gradeInput)
	subjectsList.append(contributionResult)
	subjectsList.append(calculateButton)

	let lastValue = 0
	const gradeRegex = /^(10(\.0+)?|[0-9](\.[0-9]+)?)$/

	calculateButton.addEventListener('click', () => {
		const rawValue = gradeInput.value.trim()
		if (!gradeRegex.test(rawValue)) {
			alert('Enter a valid grade between 0 and 10')
			return
		}

		const userGrade = Number(rawValue)
		const contribution = (userGrade * (subject.credits / totalCredits)) * 10
		contributionResult.textContent = `${contribution.toFixed(2)}%`

		totalGpa = totalGpa - lastValue + contribution
		lastValue = contribution
		finalGpa.textContent = (totalGpa / 10).toFixed(2)
	})
})

document.getElementById('resetBtn').addEventListener('click', () => {
	document.querySelectorAll('.subjects-list input').forEach((input) => (input.value = ''))
	document.querySelectorAll('.subjects-list p').forEach((p) => (p.textContent = ''))
	totalGpa = 0
	finalGpa.textContent = '0.00'
})
