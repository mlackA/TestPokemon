import { FormProvider, useForm } from "react-hook-form";
//@ts-ignore
export const FormComponent = ({ children, ...props }) => {
  const methods = useForm(props);

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
};