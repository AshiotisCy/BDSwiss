import * as Yup from "yup";

export const CreateUserValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),

  email: Yup.string().email("Invalid email").required("This field is required"),

  password: Yup.string()
    .min(2, "Too Short!")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\+\=<>\-_£@$!%*#?&,./\\';[\]"\^\(\)]).{8,}$/gm,
      "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    )
    .required("Password is Required"),
});

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("This field is required"),
  password: Yup.string().required("This field is required"),
});
