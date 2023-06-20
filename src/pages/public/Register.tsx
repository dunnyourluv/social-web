import { useEffect } from "react";
import Form from "../../components/auth/Form";
import Box from "../../components/primarys/Box";

function Register() {
    useEffect(() => {
        document.title = "Solve4X | Register"
      }, [])
        return <div className="w-screen h-screen flex justify-center items-center dark:bg-black-light bg-black-light/10">
            <Box>
                <>
                    <Form type="signup"/>
                </>
            </Box>
        </div>
}

export default Register;
