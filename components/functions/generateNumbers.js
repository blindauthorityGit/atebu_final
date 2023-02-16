export default function generateNumbers() {
    let numbers = [];

    while (numbers.length < 5) {
        let number = Math.floor(Math.random() * 56);
        if (!numbers.includes(number)) {
            numbers.push(number);
        }
    }

    return numbers;
}
