import { useEffect } from "react";
import Form from "../../components/auth/Form";
import Box from "../../components/primarys/Box";

function Login() {
    useEffect(() => {
        document.title = "Solve4X | Login"
      }, [])
        return <div className="w-screen h-screen flex justify-center items-center dark:bg-dark-light bg-black-light/10">
            <Box>
                <>
                    <Form type="signin"/>
                </>
            </Box>
        </div>
}

export default Login;