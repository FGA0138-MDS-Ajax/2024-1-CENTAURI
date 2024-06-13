import { CardWrapper } from "./card-wrapper"

export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel="Bem-vindo de volta"
            backButtonLabel="Não tem uma conta?"
            backButtonHref="/auth/register"
            showSocial
        >
            Formulário
        </CardWrapper>
    );
};
