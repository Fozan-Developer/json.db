const errors = [
    {
        number: "1.1",
        text: "Имя модели должно являться строкой",
        type: "TypeError"
    },
    {
        number: "1.2",
        text: "Такой модели не существует",
        type: "Error"
    },
    {
        number: "1.3",
        text: "Не указано время, или значение не является числом",
        type: "Error"
    },
    {
        number: "1.4",
        text: "Не указано поле models или в нём нет ни одной модели",
        type: "Error"
    },
    {
        number: "1.5",
        text: "Не указано название метода",
        type: "Error"
    },
    {
        number: "1.6",
        text: "Не указано название утилиты",
        type: "Error"
    },
    {
        number: "2.1",
        text: "Вы не указали поле model",
        type: "Error"
    },
    {
        number: "2.2",
        text: "Вы не указали поле fields",
        type: "Error"
    },
    {
        number: "2.3",
        text: "Поле fields должно быть объектом",
        type: "TypeError"
    },
    {
        number: "2.4",
        text: "Нельзя указывать в field поле _id",
        type: "Error"
    },
    {
        number: "2.5",
        text: "Вы не указали поле _id",
        type: "Error"
    }
];

module.exports = function error(number) {
    var error = errors.find(x=> x.number == number);

    if(error.type == "Error") {
        throw new Error(error.text);
    };

    if(error.type == "TypeError") {
        throw new TypeError(error.text);
    };
};
