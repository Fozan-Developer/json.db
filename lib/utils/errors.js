const errors = [
    {
        number: "1.1",
        text: ""
    },
    {
        number: "1.2",
        text: ""
    },
    {
        number: "1.3",
        text: ""
    }
];

module.exports = function error(number) {
    var error = errors.find(x=> x.number == number);
    let text = "Json.db " + error.text;

    throw new Error(text);
};
