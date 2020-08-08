import React from 'react'
import Input from "./CustomInput"


const FormControl = ({ control, ...props }) => {
    switch (control) {
        case "input":
            return <Input {...props} />;
        default:
            return null;
    }
}

export default FormControl
