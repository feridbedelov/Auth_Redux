import React from 'react'
import { Field, ErrorMessage } from "formik"

const CustomInput = (props) => {
    const { name, label, ...rest } = props
    return (
        <div className="field">
            <label htmlFor={name}> {label} </label>
            <Field name={name} id={name} {...rest} />
            <ErrorMessage name={name} />

        </div>
    )
}

export default CustomInput
