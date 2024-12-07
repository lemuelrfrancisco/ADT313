import { useEffect } from "react";
const validateFields = () => {
const newErrors = {};
if (!FormData.username.trim()) {
    newErrors.username = 'Username is required';
}    
if (!FormData.apply.password.trim()) {
    newErrors.password = 'Password is required';
}
setErrors(newErrors);
};
