import { Formik, Form, Field, ErrorMessage, useField} from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const CustomForm = () => {

    return (
       <Formik
        initialValues = {{
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        }}
        validationSchema = {Yup.object({
            name: Yup.string()
                    .min(2, 'Мінімум 2 символи!')
                    .required('Обов`язкове поле!'),
            email: Yup.string()
                    .email('Невірний адрес пошти')
                    .required('Обов`язкове поле!'),
            amount: Yup.number()
                    .min(5, 'Не менше 5')
                    .required('Обов`язкове поле!'),
            currency: Yup.string().required('Виберіть валюту'),
            text: Yup.string()
                    .min(10, 'Не менше 10 символів'),
            terms: Yup.boolean()
                    .required('Пітвердіть!')
                    .oneOf([true],'Пітвердіть!')
        })}
        onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
    >
         <Form className="form">
            <h2>Відправити кошти</h2>
            <MyTextInput
                label="Ваше ім`я"
                id="name"
                name="name"
                type="text"
                />
            <MyTextInput
                 label="Ваша пошта"
                 id="email"
                 name="email"
                 type="email"
                 />
            <MyTextInput
                label="Кількість"
                id="amount"
                name="amount"
                type="number"/>
            <label htmlFor="currency">Валюта</label>
            <Field
                id="currency"
                name="currency"
                as="select">
                    <option value="">Виберіть валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </Field>
            <ErrorMessage className="error" name='currency' component="div"/>
            <label htmlFor="text">Ваше повідомлення</label>
            <Field
                id="text"
                name="text"
                as="textarea"
            />
            <ErrorMessage className="error" name='text' component="div"/>
            <label className="checkbox">
                <Field
                name="terms" 
                type="checkbox"/>
                Погоджуєтесь з політикою конфідеційності?
            </label>
            <ErrorMessage className="error" name='terms' component="div"/>
            <button type="submit">Відправити</button>
        </Form>
       </Formik>
    )
}

export default CustomForm;