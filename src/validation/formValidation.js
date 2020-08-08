import * as Yup from "yup"


export const validationSchema = Yup.object({
    title: Yup.string().required('Required').min(3, "At least 3 chars"),
    director: Yup.string().required('Required').min(5, "At least 5 chars"),
    year: Yup.number().min(1900, "Invalid year").max(2020, "Invalid year").required('Required'),
    link: Yup.string().required('Required'),
    imageLink: Yup.string().required("Required")
})

export const validateAuthForm = (fields) => {
    let errors = {}

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fields.email))) {
        errors.email = "Invalid Email"
    }
    if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(fields.password))) {
        errors.password = "Has to be at least 8 chars long 1digit and 1upperCase"
    }

    return errors
}