import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, 'Максимум 50 символов')
        .required('Обязательное поле'),
    password: Yup.string()
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,40}$/g,
            'только буквы латинского алфавита и цифры, от 8 до 40 символов, ' +
            'как минимум одна цифра и одна заглавная буква')
        .required('Обязательное поле'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    email: Yup.string()
        .email('Неверный email адрес')
        .required('Обязательное поле'),
    website: Yup.string()
        .url('Такого адреса не может быть'),
    age: Yup.number()
        .test({
            message:'Допустимый возраст от 18 до 65 лет',
            test: value => {
                return (value >= 18 && value <= 65)
            },
        })
        .required('Обязательное поле'),
    skills: Yup.array().of(
        Yup.object({
            skill: Yup.string().required('Заполните или удалитье это поле'),
        })
    ),
    acceptTerms: Yup.boolean()
        .oneOf([true], 'Условия должны быть приняты')
        .required('Условия должны быть приняты')
});

export default validationSchema;
